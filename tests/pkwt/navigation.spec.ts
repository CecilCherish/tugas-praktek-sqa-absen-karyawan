import { test, expect } from '../../fixtures';

test.describe('Navigasi Menu PKWT (@pkwt, @dashboard)', () => {

  test('TC-PKWT-NAV-001: Verifikasi navigasi menu Absensi membuka halaman riwayat presensi lengkap @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await pkwtDashboardPage.clickMenu('Absensi');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/activity/, { timeout: 15000 });
    await expect(authenticatedPkwtPage.getByText('History Absensi')).toBeVisible();

    await authenticatedPkwtPage.locator('button').first().click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
    await expect(pkwtDashboardPage.greetingText).toBeVisible();
  });

  test('TC-PKWT-NAV-002: Verifikasi navigasi menu Koreksi Absen membuka halaman daftar koreksi presensi @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await pkwtDashboardPage.clickMenu('Koreksi Absen');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/correction/, { timeout: 15000 });
    await expect(authenticatedPkwtPage.getByText('Halaman Koreksi')).toBeVisible();
    await expect(authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Koreksi' })).toBeVisible();

    await authenticatedPkwtPage.getByRole('button', { name: 'Kembali' }).click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
    await expect(pkwtDashboardPage.greetingText).toBeVisible();
  });

  test('TC-PKWT-NAV-003: Verifikasi navigasi menu Izin dan fungsionalitas pergantian tab Terlambat vs Pulang Cepat @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await pkwtDashboardPage.clickMenu('Izin');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/permit/, { timeout: 15000 });
    await expect(authenticatedPkwtPage.getByText('Halaman Izin')).toBeVisible();

    // Tab Terlambat
    await expect(authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Izin Terlambat' })).toBeVisible();

    // Pindah ke tab Pulang Cepat
    await authenticatedPkwtPage.getByRole('tab', { name: 'Pulang Cepat' }).click();
    await expect(authenticatedPkwtPage.locator('button:has-text("Ajukan")').first()).toBeVisible();

    await authenticatedPkwtPage.getByRole('button', { name: 'Kembali' }).click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
    await expect(pkwtDashboardPage.greetingText).toBeVisible();
  });

  test('TC-PKWT-NAV-004: Verifikasi navigasi menu Lembur membuka halaman daftar dan pengajuan lembur @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await pkwtDashboardPage.clickMenu('Lembur');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/overtime-client/, { timeout: 15000 });
    await expect(authenticatedPkwtPage.getByText('Halaman Lembur')).toBeVisible();
    await expect(authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Lembur' })).toBeVisible();

    await authenticatedPkwtPage.getByRole('button', { name: 'Kembali' }).click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
    await expect(pkwtDashboardPage.greetingText).toBeVisible();
  });

  test('TC-PKWT-NAV-005: Verifikasi navigasi menu Cuti membuka halaman daftar dan pengajuan cuti @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await pkwtDashboardPage.clickMenu('Cuti');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/leave-client/, { timeout: 15000 });
    await expect(authenticatedPkwtPage.getByText('Halaman Cuti')).toBeVisible();
    await expect(authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Cuti' })).toBeVisible();

    await authenticatedPkwtPage.getByRole('button', { name: 'Kembali' }).click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
    await expect(pkwtDashboardPage.greetingText).toBeVisible();
  });

  test('TC-PKWT-NAV-006: Verifikasi navigasi menu Sakit membuka halaman permohonan izin sakit @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await pkwtDashboardPage.clickMenu('Sakit');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/sick/, { timeout: 15000 });
    await expect(authenticatedPkwtPage.getByText('Halaman Sakit')).toBeVisible();
    await expect(authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Sakit' })).toBeVisible();

    await authenticatedPkwtPage.getByRole('button', { name: 'Kembali' }).click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
    await expect(pkwtDashboardPage.greetingText).toBeVisible();
  });

  test('TC-PKWT-NAV-007: Verifikasi navigasi menu Download Reports dan pilihan dropdown jenis laporan @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await pkwtDashboardPage.clickMenu('Download Reports');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/reports\/share_report/, { timeout: 15000 });
    await expect(authenticatedPkwtPage.getByText('Halaman Download Report')).toBeVisible();

    // Buka dropdown tipe report
    await authenticatedPkwtPage.getByRole('combobox').click();
    await expect(authenticatedPkwtPage.getByRole('option', { name: 'Harian' })).toBeVisible();
    await expect(authenticatedPkwtPage.getByRole('option', { name: 'Mingguan' })).toBeVisible();
    await expect(authenticatedPkwtPage.getByRole('option', { name: 'Bulanan' })).toBeVisible();

    await authenticatedPkwtPage.keyboard.press('Escape');
  });

  test('TC-PKWT-NAV-008: Verifikasi navigasi menu Staff membuka halaman daftar staf @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await pkwtDashboardPage.clickMenu('Staff');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/staff/, { timeout: 15000 });
    await expect(authenticatedPkwtPage.getByText('View Staff')).toBeVisible();

    await authenticatedPkwtPage.locator('button').first().click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
    await expect(pkwtDashboardPage.greetingText).toBeVisible();
  });

  test('TC-PKWT-NAV-009: Verifikasi tautan Selengkapnya pada riwayat absensi membuka halaman riwayat lengkap @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await pkwtDashboardPage.seeAllHistoryLink.scrollIntoViewIfNeeded();
    await pkwtDashboardPage.seeAllHistoryLink.click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/activity/, { timeout: 15000 });
    await expect(authenticatedPkwtPage.getByText('History Absensi')).toBeVisible();
  });

});
