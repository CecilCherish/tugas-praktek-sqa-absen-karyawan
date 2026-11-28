import { test, expect } from '../../fixtures';

test.describe('Validasi Form Pengajuan PKWT (@pkwt, @dashboard)', () => {

  test('TC-PKWT-FRM-001: Verifikasi validasi penolakan form pengajuan koreksi absen saat field jam dikosongkan @regression @dashboard @pkwt', async ({ authenticatedPkwtPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent/correction');
    await authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Koreksi' }).click();

    const submitBtn = authenticatedPkwtPage.getByRole('button', { name: 'Ajukan', exact: true });
    await submitBtn.waitFor({ state: 'visible', timeout: 5000 });
    await submitBtn.click();

    await expect(authenticatedPkwtPage.getByText('Salah satu harus diisi!')).toBeVisible();
  });

  test('TC-PKWT-FRM-002: Verifikasi validasi penolakan form pengajuan izin terlambat saat field wajib dikosongkan @regression @dashboard @pkwt', async ({ authenticatedPkwtPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent/permit');
    await authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Izin Terlambat' }).click();

    const submitBtn = authenticatedPkwtPage.getByRole('button', { name: 'Ajukan', exact: true });
    await submitBtn.waitFor({ state: 'visible', timeout: 5000 });
    await submitBtn.click();

    await expect(authenticatedPkwtPage.getByText('Tanggal Harus diisi!')).toBeVisible();
    await expect(authenticatedPkwtPage.getByText('Jam Harus diisi!')).toBeVisible();
    await expect(authenticatedPkwtPage.getByText('Keterangan Harus diisi!')).toBeVisible();
  });

  test('TC-PKWT-FRM-003: Verifikasi validasi penolakan form pengajuan lembur saat field wajib dikosongkan @regression @dashboard @pkwt', async ({ authenticatedPkwtPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent/overtime-client');
    await authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Lembur' }).click();

    const submitBtn = authenticatedPkwtPage.getByRole('button', { name: 'Ajukan', exact: true });
    await submitBtn.waitFor({ state: 'visible', timeout: 5000 });
    await submitBtn.click();

    await expect(authenticatedPkwtPage.getByText('Jam masuk harus di isi!')).toBeVisible();
    await expect(authenticatedPkwtPage.getByText('Jam Keluar harus di isi!')).toBeVisible();
    await expect(authenticatedPkwtPage.getByText('Masukan minimal 5 karakter')).toBeVisible();
  });

  test('TC-PKWT-FRM-004: Verifikasi tombol submit form pengajuan cuti tidak aktif saat data formulir belum lengkap @regression @dashboard @pkwt', async ({ authenticatedPkwtPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent/leave-client');
    await authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Cuti' }).click();

    const submitBtn = authenticatedPkwtPage.getByRole('button', { name: 'Ajukan', exact: true });
    await submitBtn.waitFor({ state: 'visible', timeout: 5000 });
    await submitBtn.click();
    // Form tidak tersubmit dan tetap berada di halaman Cuti
    await expect(authenticatedPkwtPage).toHaveURL(/\/apps\/absent\/leave-client/);
  });

  test('TC-PKWT-FRM-005: Verifikasi tombol submit form pengajuan sakit tidak aktif sebelum tanggal dan dokumen bukti diisi @regression @dashboard @pkwt', async ({ authenticatedPkwtPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent/sick');
    await authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Sakit' }).click();

    const submitBtn = authenticatedPkwtPage.getByRole('button', { name: 'Ajukan', exact: true });
    await submitBtn.waitFor({ state: 'visible', timeout: 5000 });
    await submitBtn.click();
    // Form tidak tersubmit dan tetap berada di halaman Sakit
    await expect(authenticatedPkwtPage).toHaveURL(/\/apps\/absent\/sick/);
  });

});
