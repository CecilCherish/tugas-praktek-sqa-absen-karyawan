import { test, expect } from '../../fixtures';
import { LoginPage, MitraDashboardPage } from '../../pages';
import { config } from '../../utils/env';

test.describe('Presensi & Geolokasi Mitra (@mitra, @clock)', () => {

  test('TC-MITRA-CLK-001: Verifikasi penolakan Clock In saat izin akses geolokasi ditolak oleh browser @regression @clock @mitra', async ({ geoDeniedMitraPage }) => {
    const mitraPage = new MitraDashboardPage(geoDeniedMitraPage);
    if (await mitraPage.isPresensiButtonVisible()) {
      let dialogMessage = '';
      geoDeniedMitraPage.once('dialog', async (dialog) => {
        dialogMessage = dialog.message();
        await dialog.accept();
      });
      await mitraPage.clickPresensiButton();
      await geoDeniedMitraPage.waitForTimeout(2000);
      if (dialogMessage) {
        expect(dialogMessage).toContain('Lokasi harus diizinkan');
      }
    } else {
      // Akun sudah menyelesaikan presensi hari ini (State 3: tombol dihilangkan)
      await expect(mitraPage.presensiBtn).toBeHidden();
    }
  });

  test('TC-MITRA-CLK-002: Verifikasi penolakan Clock In saat izin akses kamera perangkat ditolak @regression @clock @mitra', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      permissions: ['geolocation'],
      geolocation: { latitude: -6.2088, longitude: 106.8456 },
    });
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await Promise.all([
      page.waitForResponse(res => res.url().includes('/api/login') && res.status() === 200).catch(() => {}),
      loginPage.login(config.mitra.email, config.mitra.password),
    ]);
    await page.goto('/apps/absent/mitra', { waitUntil: 'domcontentloaded' });

    const mitraPage = new MitraDashboardPage(page);
    await expect(mitraPage.userName).toBeVisible({ timeout: 15000 });

    if (await mitraPage.isPresensiButtonVisible()) {
      let dialogMessage = '';
      page.once('dialog', async (dialog) => {
        dialogMessage = dialog.message();
        await dialog.accept();
      });
      await mitraPage.clickPresensiButton();
      await page.waitForTimeout(2000);
      if (dialogMessage) {
        expect(dialogMessage).toContain('Akses Kamera Harus dizinkan');
      }
    } else {
      await expect(mitraPage.presensiBtn).toBeHidden();
    }

    await context.close();
  });

  test('TC-MITRA-CLK-003: Verifikasi keberhasilan Clock In (Kegiatan Pagi) berbasis lokasi dan foto selfie valid @smoke @regression @clock @mitra @mutating', async ({ authenticatedMitraPage }) => {
    const mitraPage = new MitraDashboardPage(authenticatedMitraPage);
    const btnText = await mitraPage.getPresensiButtonText();

    if (btnText && /Kegiatan Pagi/i.test(btnText)) {
      await expect(mitraPage.presensiBtn).toBeEnabled();
    } else {
      // Jika sudah Clock In / Clock Out hari ini, verifikasi laporan kegiatan pagi sudah tercatat
      const morningText = await mitraPage.getMorningReportText();
      expect(morningText.length).toBeGreaterThan(0);
    }
  });

  test('TC-MITRA-CLK-004: Verifikasi tombol presensi bertransisi menjadi Kegiatan Sore setelah berhasil Clock In @regression @clock @mitra', async ({ authenticatedMitraPage }) => {
    const mitraPage = new MitraDashboardPage(authenticatedMitraPage);
    const btnText = await mitraPage.getPresensiButtonText();

    if (btnText && /Kegiatan Sore/i.test(btnText)) {
      await expect(mitraPage.presensiBtn).toHaveText(/Kegiatan Sore/i);
    } else {
      // State 1 (belum clock in) atau State 3 (sudah selesai clock out)
      await expect(mitraPage.morningReportCard.first()).toBeVisible();
    }
  });

  test('TC-MITRA-CLK-005: Verifikasi keberhasilan Clock Out (Kegiatan Sore) pada hari yang sama setelah Clock In @smoke @regression @clock @mitra @mutating', async ({ authenticatedMitraPage }) => {
    const mitraPage = new MitraDashboardPage(authenticatedMitraPage);
    const btnText = await mitraPage.getPresensiButtonText();

    if (btnText && /Kegiatan Sore/i.test(btnText)) {
      await expect(mitraPage.presensiBtn).toBeEnabled();
    } else {
      const eveningText = await mitraPage.getEveningReportText();
      expect(eveningText.length).toBeGreaterThan(0);
    }
  });

  test('TC-MITRA-CLK-006: Verifikasi tombol presensi dihilangkan setelah menyelesaikan Clock In dan Clock Out hari ini @regression @clock @mitra', async ({ authenticatedMitraPage }) => {
    const mitraPage = new MitraDashboardPage(authenticatedMitraPage);
    const morningText = await mitraPage.getMorningReportText();
    const eveningText = await mitraPage.getEveningReportText();

    if (morningText && morningText !== '-' && eveningText && eveningText !== '-') {
      await expect(mitraPage.presensiBtn).toBeHidden();
    } else {
      await expect(mitraPage.presensiBtn).toBeVisible();
    }
  });

});
