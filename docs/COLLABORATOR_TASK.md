# Panduan Tugas Rekan Tim (Engineer 2) & AI Agent

Selamat datang di repositori proyek **SIT & Automation Testing Web Absensi Hadir (Dika Hadir)**!

Dokumen ini disusun oleh **Engineer 1** sebagai acuan resmi agar Rekan Tim (**Engineer 2**) atau AI Agent yang mendampingi dapat melanjutkan pengerjaan otomatisasi testing secara jelas, terstruktur, dan selaras dengan arsitektur proyek.

---

## 1. Status Pengerjaan oleh Engineer 1

Engineer 1 telah menyelesaikan seluruh fondasi arsitektur dasar dan 28 Test Case (100% Passed):

1. **Kerangka POM (Page Object Model)** di folder `pages/`:
   - `BasePage.ts`
   - `LoginPage.ts`
   - `PkwtDashboardPage.ts`
   - `MitraDashboardPage.ts`
   - `ResetPasswordPage.ts`
   - `RegisterPage.ts`
   - Barrel export `pages/index.ts`
2. **Fixtures & Konfigurasi** di folder `fixtures/` & root:
   - `fixtures/testFixtures.ts` (menyediakan `loginPage`, `pkwtDashboardPage`, `mitraDashboardPage`, `authenticatedPkwtPage`, `authenticatedMitraPage` dengan pre-set geo & kamera, dan `geoDeniedMitraPage`).
   - `playwright.config.ts` (Viewport Desktop Chrome 1280x720, timeout 45s, tracing retain-on-failure).
   - `utils/env.ts` (kredensial akun PKWT & Mitra terintegrasi `.env`).
3. **Dokumen SIT & Perencanaan**:
   - Master Excel: `docs/DOKUMEN_SIT_MAGANG_DIKAHADIR_RAPI.xlsx`
   - Draft Skenario Lengkap: `docs/sit-draft.md`
   - Tag Mapping: `docs/tc-tag-map.md`
   - Status Pelacakan: `docs/tasklist.md`
4. **28 Automated Test Cases (Selesai & Lulus 100%)**:
   - `tests/auth/auth.spec.ts` (11 TC: TC-AUTH-001 s/d 011)
   - `tests/auth/security.spec.ts` (7 TC: TC-SEC-001 s/d 007)
   - `tests/pkwt/dashboard.spec.ts` (6 TC: TC-PKWT-DSH-001 s/d 006)
   - `tests/visual/layout-desktop.spec.ts` (4 TC: TC-NF-UI-001 s/d 004)

> ⚠️ **PERHATIAN**: Jangan mengubah atau menghapus file dan folder kerangka dasar di atas maupun test case milik Engineer 1.

---

## 2. Tugas Engineer 2: Implementasi 4 File Test (Total 31 TC)

Engineer 2 bertanggung jawab mengimplementasikan **4 file test** berikut di folder `tests/`:

### 📁 File 1: `tests/pkwt/navigation.spec.ts` (9 TC)
Menguji navigasi menu sidebar dan drawer pada role Karyawan PKWT:
- **TC-PKWT-NAV-001**: Navigasi menu Absensi (`/apps/absent`)
- **TC-PKWT-NAV-002**: Navigasi menu Koreksi Absen (`/apps/absent/koreksi-absen`)
- **TC-PKWT-NAV-003**: Navigasi menu Izin - Terlambat & Pulang Cepat (`/apps/absent/izin`)
- **TC-PKWT-NAV-004**: Navigasi menu Lembur (`/apps/absent/lembur`)
- **TC-PKWT-NAV-005**: Navigasi menu Cuti (`/apps/absent/cuti`)
- **TC-PKWT-NAV-006**: Navigasi menu Sakit (`/apps/absent/sakit`)
- **TC-PKWT-NAV-007**: Navigasi menu Download Reports (`/apps/absent/download-report`)
- **TC-PKWT-NAV-008**: Navigasi menu Staff (`/apps/absent/staff`)
- **TC-PKWT-NAV-009**: Navigasi tautan "Selengkapnya" pada riwayat absensi

### 📁 File 2: `tests/pkwt/submission-forms.spec.ts` (5 TC)
Menguji modal / form pengajuan pada menu PKWT:
- **TC-PKWT-FRM-001**: Validasi isian kosong form koreksi absen
- **TC-PKWT-FRM-002**: Validasi isian kosong form izin terlambat
- **TC-PKWT-FRM-003**: Validasi isian kosong form lembur
- **TC-PKWT-FRM-004**: Status tombol submit form pengajuan cuti belum lengkap
- **TC-PKWT-FRM-005**: Status tombol submit form pengajuan sakit belum lengkap

### 📁 File 3: `tests/mitra/dashboard-greetings.spec.ts` (11 TC)
Menguji tampilan dashboard dan logika sapaan dinamis (clock mocking) pada role Karyawan Mitra:
- **TC-MITRA-DSH-001**: Verifikasi visual elemen beranda Mitra (`/apps/absent/mitra`)
- **TC-MITRA-DSH-002**: Verifikasi sapaan waktu pagi (mock clock 08:00 WIB -> "Good Morning")
- **TC-MITRA-DSH-003**: Verifikasi sapaan waktu siang (mock clock 13:00 WIB -> "Good Afternoon")
- **TC-MITRA-DSH-004**: Verifikasi sapaan waktu sore (mock clock 17:00 WIB -> "Good Evening")
- **TC-MITRA-DSH-005**: Verifikasi sapaan waktu malam (mock clock 21:00 WIB -> "Good Night")
- **TC-MITRA-DSH-006** *(TC-MITRA-BND-001)*: Boundary test transisi sapaan 02:59 vs 03:00
- **TC-MITRA-DSH-007** *(TC-MITRA-BND-002)*: Boundary test transisi sapaan 11:59 vs 12:00
- **TC-MITRA-DSH-008** *(TC-MITRA-BND-003)*: Boundary test transisi sapaan 14:59 vs 15:00
- **TC-MITRA-DSH-009** *(TC-MITRA-BND-004)*: Boundary test transisi sapaan 18:59 vs 19:00 (bisnis)
- **TC-MITRA-DSH-010** *(TC-MITRA-BND-005)*: Boundary test transisi sapaan 19:59 vs 20:00 (kode)
- **TC-MITRA-DSH-011** *(TC-MITRA-BND-006)*: Boundary test transisi sapaan 23:59 vs 00:00 (tengah malam)

### 📁 File 4: `tests/mitra/presence-clock.spec.ts` (6 TC)
Menguji izin geolokasi/kamera dan alur tombol presensi Mitra:
- **TC-MITRA-CLK-001**: Validasi penanganan saat penolakan izin geolokasi diblokir (gunakan fixture `geoDeniedMitraPage`)
- **TC-MITRA-CLK-002**: Validasi penanganan saat penolakan izin kamera diblokir
- **TC-MITRA-CLK-003**: Presensi Masuk (Kegiatan Pagi) - *Tag: `@smoke`, `@regression`, `@clock`, `@mitra`, `@mutating`*
- **TC-MITRA-CLK-004**: Verifikasi status tombol berganti ke Kegiatan Sore
- **TC-MITRA-CLK-005**: Presensi Pulang (Kegiatan Sore) - *Tag: `@smoke`, `@regression`, `@clock`, `@mitra`, `@mutating`*
- **TC-MITRA-CLK-006**: Verifikasi tombol presensi dinonaktifkan / dihilangkan setelah absen lengkap

---

## 3. Dokumen Acuan & Standar Koding

Saat mengimplementasikan test case, WAJIB merujuk pada:
1. **Skenario, Steps & Expected Result**:
   - Buka `docs/sit-draft.md` atau Excel `docs/DOKUMEN_SIT_MAGANG_DIKAHADIR_RAPI.xlsx` (Sheet `SIT - Aplikasi Karyawan`).
   - Setiap test case memiliki langkah pengujian, data uji, dan ekspektasi yang jelas.
2. **Pemetaan Tag & Naming**:
   - Buka `docs/tc-tag-map.md` untuk menyematkan tag yang sesuai di title test Playwright (misal: `test('TC-PKWT-NAV-001: ... @regression @dashboard @pkwt', async (...) => { ... })`).
3. **Penggunaan Page Object & Fixtures**:
   - Selalu impor fixture kustom:
     ```typescript
     import { test } from '../../fixtures/testFixtures';
     import { expect } from '@playwright/test';
     ```
   - Gunakan `authenticatedPkwtPage` untuk pengujian PKWT sehingga tidak perlu melakukan login ulang secara manual.
   - Gunakan `authenticatedMitraPage` untuk pengujian Mitra yang memerlukan izin geolokasi & kamera otomatis.
   - Gunakan method helper di `PkwtDashboardPage` (`pages/PkwtDashboardPage.ts`) dan `MitraDashboardPage` (`pages/MitraDashboardPage.ts`). Jika memerlukan method tambahan, tambahkan secara rapi ke class POM terkait.

---

## 4. Instruksi Eksekusi & Kriteria Sukses

Setelah membuat ke-4 file test tersebut:
1. Jalankan test untuk memverifikasi file Anda:
   ```bash
   npx playwright test tests/pkwt/navigation.spec.ts
   npx playwright test tests/pkwt/submission-forms.spec.ts
   npx playwright test tests/mitra/dashboard-greetings.spec.ts
   npx playwright test tests/mitra/presence-clock.spec.ts
   ```
2. Jalankan full regression suite:
   ```bash
   npx playwright test
   ```
3. **Kriteria Sukses (Definition of Done)**:
   - Seluruh **59 Test Case** (28 TC milik Engineer 1 + 31 TC milik Engineer 2) berhasil dieksekusi dan **100% Passed**.
   - Perbarui checklist di `docs/tasklist.md` (Task 3.2, Task 3.3, dan Task 4.2) menjadi `[x]` setelah semua test lulus.
