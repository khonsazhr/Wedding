# Undangan Pernikahan Digital: Panduan Setup & Perawatan

## Isi Folder
- `index.html`: seluruh website (edit blok `CONFIG` di bagian bawah file)
- `Code.gs`: Google Apps Script (database RSVP + daftar ucapan)
- `assets/`: `music.mp3`, `bride.webp`, `groom.webp`, `duo.webp`, `sheet.webp` (lembar stiker lengkap, cadangan)

## 1. Google Sheets + Apps Script (sekitar 3 menit, perlu login Google kamu)
1. Buat Google Sheet baru, beri nama "Wedding RSVP".
2. Buka **Extensions (Ekstensi) > Apps Script**, hapus kode contoh, tempel isi `Code.gs`, lalu simpan.
3. Klik **Deploy > New deployment > Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Klik Authorize dan setujui izinnya. Google akan menampilkan peringatan "aplikasi belum diverifikasi" karena ini script buatanmu sendiri; pilih **Advanced > Continue**.
5. Salin **Web app URL**, lalu tempel ke `scriptURL` di `index.html`.

Struktur Sheet (dibuat otomatis saat RSVP pertama masuk):

| Timestamp | Name | Attendance | Guests | Message |
|---|---|---|---|---|

Data bisa diekspor kapan saja lewat **File > Download > CSV/Excel**.
Kalau nanti kamu mengubah `Code.gs`, gunakan **Deploy > Manage deployments > Edit > New version** supaya URL-nya tidak berubah.

## 2. GitHub Pages
1. Buat repo baru (misalnya `wedding`), lalu upload semua isi folder ini (folder `assets/` harus tetap berupa folder).
2. Buka **Settings > Pages > Deploy from a branch > `main` / root > Save**.
3. Website aktif di `https://<username>.github.io/<nama-repo>/` sekitar 1 menit kemudian.

## 3. Mengedit Data Pernikahan
Ubah nilai di blok `CONFIG` pada `index.html`: nama mempelai, orang tua, alamat venue, `weddingISO`, `dateLabel`, rekening bank, dan alamat pengiriman hadiah.

Format `weddingISO`: `2026-12-12T10:00:00+08:00` (+08:00 = WITA; gunakan +07:00 untuk WIB, +09:00 untuk WIT).

Link Google Maps, peta, link Google Calendar, dan countdown otomatis mengikuti nilai-nilai ini.

## 4. Link Undangan per Tamu
Tambahkan `?to=Nama%20Tamu` di akhir URL, contoh: `.../wedding/?to=Ade%20Fitriyani`. Nama tamu akan tampil di cover dan otomatis terisi di form RSVP.

## Catatan
- Musik baru berputar setelah tamu menekan tombol "Open invitation" (aturan dari browser iPhone dan Android).
- Ukuran `music.mp3` sekitar 4 MB. Untuk memperkecil, encode ulang dengan `ffmpeg -i music.mp3 -b:a 64k -ac 1 small.mp3` atau potong durasinya.
- Ucapan diperbarui otomatis setiap 30 detik. Hapus baris di Sheet untuk menghilangkan ucapan dari website.
