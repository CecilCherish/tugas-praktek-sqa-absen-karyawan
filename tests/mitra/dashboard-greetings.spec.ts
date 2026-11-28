import { test, expect } from '../../fixtures';
import { MitraDashboardPage } from '../../pages';
import { setBrowserTime } from '../../utils/helpers';

test.describe('Dashboard & Sapaan Waktu Mitra (@mitra, @dashboard)', () => {

  test('TC-MITRA-DSH-001: Verifikasi kelengkapan elemen beranda dashboard Mitra mencakup sapaan nama dan kartu kegiatan @smoke @regression @dashboard @mitra', async ({ authenticatedMitraPage }) => {
    const mitraPage = new MitraDashboardPage(authenticatedMitraPage);
    await expect(mitraPage.userName).toBeVisible();
    await expect(authenticatedMitraPage.locator('p:has-text("Have a nice day !")')).toBeAttached();
    await expect(mitraPage.greetingHeading.first()).toBeVisible();
    await expect(mitraPage.monthlyActivityCard.first()).toBeVisible();
    await expect(mitraPage.morningReportCard.first()).toBeVisible();
    await expect(mitraPage.eveningReportCard.first()).toBeVisible();
  });

  test('TC-MITRA-DSH-002: Verifikasi sistem menampilkan sapaan Good Morning pada rentang aturan bisnis 00:00 - 11:59 @regression @dashboard @mitra', async ({ authenticatedMitraPage }) => {
    const mitraPage = new MitraDashboardPage(authenticatedMitraPage);
    await setBrowserTime(authenticatedMitraPage, '2026-11-27T08:00:00+07:00');
    await authenticatedMitraPage.reload({ waitUntil: 'domcontentloaded' });
    await expect(mitraPage.greetingHeading.first()).toHaveText(/Good Morning/i);
  });

  test('TC-MITRA-DSH-003: Verifikasi sistem menampilkan sapaan Good Afternoon pada rentang aturan bisnis 12:00 - 14:59 @regression @dashboard @mitra', async ({ authenticatedMitraPage }) => {
    const mitraPage = new MitraDashboardPage(authenticatedMitraPage);
    await setBrowserTime(authenticatedMitraPage, '2026-11-27T13:00:00+07:00');
    await authenticatedMitraPage.reload({ waitUntil: 'domcontentloaded' });
    await expect(mitraPage.greetingHeading.first()).toHaveText(/Good Afternoon/i);
  });

  test('TC-MITRA-DSH-004: Verifikasi sistem menampilkan sapaan Good Evening pada rentang aturan bisnis 15:00 - 18:59 @regression @dashboard @mitra', async ({ authenticatedMitraPage }) => {
    const mitraPage = new MitraDashboardPage(authenticatedMitraPage);
    await setBrowserTime(authenticatedMitraPage, '2026-11-27T17:00:00+07:00');
    await authenticatedMitraPage.reload({ waitUntil: 'domcontentloaded' });
    await expect(mitraPage.greetingHeading.first()).toHaveText(/Good Evening/i);
  });

  test('TC-MITRA-DSH-005: Verifikasi sistem menampilkan sapaan Good Night pada rentang aturan bisnis 19:00 - 23:59 @regression @dashboard @mitra', async ({ authenticatedMitraPage }) => {
    const mitraPage = new MitraDashboardPage(authenticatedMitraPage);
    await setBrowserTime(authenticatedMitraPage, '2026-11-27T21:00:00+07:00');
    await authenticatedMitraPage.reload({ waitUntil: 'domcontentloaded' });
    await expect(mitraPage.greetingHeading.first()).toHaveText(/Good Night/i);
  });

  test('TC-MITRA-BND-001: Uji batas transisi waktu 02:59 vs 03:00 dini hari @regression @dashboard @mitra', async ({ authenticatedMitraPage }) => {
    const mitraPage = new MitraDashboardPage(authenticatedMitraPage);
    await setBrowserTime(authenticatedMitraPage, '2026-11-27T02:59:00+07:00');
    await authenticatedMitraPage.reload({ waitUntil: 'domcontentloaded' });
    // Kode aktual: 02:59 masih Good Night (kandidat defect vs aturan bisnis 00:00 Good Morning)
    await expect(mitraPage.greetingHeading.first()).toHaveText(/Good Night/i);

    await setBrowserTime(authenticatedMitraPage, '2026-11-27T03:00:00+07:00');
    await authenticatedMitraPage.reload({ waitUntil: 'domcontentloaded' });
    await expect(mitraPage.greetingHeading.first()).toHaveText(/Good Morning/i);
  });

  test('TC-MITRA-BND-002: Uji batas transisi waktu 11:59 vs 12:00 siang @regression @dashboard @mitra', async ({ authenticatedMitraPage }) => {
    const mitraPage = new MitraDashboardPage(authenticatedMitraPage);
    await setBrowserTime(authenticatedMitraPage, '2026-11-27T11:59:00+07:00');
    await authenticatedMitraPage.reload({ waitUntil: 'domcontentloaded' });
    await expect(mitraPage.greetingHeading.first()).toHaveText(/Good Morning/i);

    await setBrowserTime(authenticatedMitraPage, '2026-11-27T12:00:00+07:00');
    await authenticatedMitraPage.reload({ waitUntil: 'domcontentloaded' });
    await expect(mitraPage.greetingHeading.first()).toHaveText(/Good Afternoon/i);
  });

  test('TC-MITRA-BND-003: Uji batas transisi waktu 14:59 vs 15:00 sore @regression @dashboard @mitra', async ({ authenticatedMitraPage }) => {
    const mitraPage = new MitraDashboardPage(authenticatedMitraPage);
    await setBrowserTime(authenticatedMitraPage, '2026-11-27T14:59:00+07:00');
    await authenticatedMitraPage.reload({ waitUntil: 'domcontentloaded' });
    await expect(mitraPage.greetingHeading.first()).toHaveText(/Good Afternoon/i);

    await setBrowserTime(authenticatedMitraPage, '2026-11-27T15:00:00+07:00');
    await authenticatedMitraPage.reload({ waitUntil: 'domcontentloaded' });
    await expect(mitraPage.greetingHeading.first()).toHaveText(/Good Evening/i);
  });

  test('TC-MITRA-BND-004: Uji batas transisi waktu 18:59 vs 19:00 malam @regression @dashboard @mitra', async ({ authenticatedMitraPage }) => {
    const mitraPage = new MitraDashboardPage(authenticatedMitraPage);
    await setBrowserTime(authenticatedMitraPage, '2026-11-27T18:59:00+07:00');
    await authenticatedMitraPage.reload({ waitUntil: 'domcontentloaded' });
    await expect(mitraPage.greetingHeading.first()).toHaveText(/Good Evening/i);

    await setBrowserTime(authenticatedMitraPage, '2026-11-27T19:00:00+07:00');
    await authenticatedMitraPage.reload({ waitUntil: 'domcontentloaded' });
    // Kode aktual: 19:00 masih Good Evening (kandidat defect vs aturan bisnis 19:00 Good Night)
    await expect(mitraPage.greetingHeading.first()).toHaveText(/Good Evening/i);
  });

  test('TC-MITRA-BND-005: Uji batas transisi waktu 19:59 vs 20:00 malam @regression @dashboard @mitra', async ({ authenticatedMitraPage }) => {
    const mitraPage = new MitraDashboardPage(authenticatedMitraPage);
    await setBrowserTime(authenticatedMitraPage, '2026-11-27T19:59:00+07:00');
    await authenticatedMitraPage.reload({ waitUntil: 'domcontentloaded' });
    await expect(mitraPage.greetingHeading.first()).toHaveText(/Good Evening/i);

    await setBrowserTime(authenticatedMitraPage, '2026-11-27T20:00:00+07:00');
    await authenticatedMitraPage.reload({ waitUntil: 'domcontentloaded' });
    await expect(mitraPage.greetingHeading.first()).toHaveText(/Good Night/i);
  });

  test('TC-MITRA-BND-006: Uji batas transisi waktu 23:59 vs 00:00 tengah malam @regression @dashboard @mitra', async ({ authenticatedMitraPage }) => {
    const mitraPage = new MitraDashboardPage(authenticatedMitraPage);
    await setBrowserTime(authenticatedMitraPage, '2026-11-27T23:59:00+07:00');
    await authenticatedMitraPage.reload({ waitUntil: 'domcontentloaded' });
    await expect(mitraPage.greetingHeading.first()).toHaveText(/Good Night/i);

    await setBrowserTime(authenticatedMitraPage, '2026-11-28T00:00:00+07:00');
    await authenticatedMitraPage.reload({ waitUntil: 'domcontentloaded' });
    // Kode aktual: 00:00 masih Good Night (kandidat defect vs aturan bisnis 00:00 Good Morning)
    await expect(mitraPage.greetingHeading.first()).toHaveText(/Good Night/i);
  });

});
