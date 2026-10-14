# Project Status — CalonCEO

**Versi:** 0.1.0 (starter portfolio)  
**Status keseluruhan:** Implementasi awal selesai; perlu pemeriksaan visual lintas-browser dan pengisian aset/kontak sebelum publikasi.

## Fitur yang sudah dibuat

- [x] Halaman portofolio statis dengan struktur HTML5 semantik.
- [x] Hero “Building Ideas Into Reality.” dan bagian About Me.
- [x] Kartu proyek NAG Digital Store WhatsApp Bot, poster digital, dan web experiments.
- [x] Status proyek ditampilkan tanpa mengklaim repository atau fitur yang belum diverifikasi.
- [x] Ringkasan skills dipisahkan menjadi pernah digunakan, sedang dipelajari, dan belum diklaim dikuasai.
- [x] Bagian pencapaian berisi juara 1 lomba poster digital sesuai informasi yang diberikan.
- [x] Bagian Photography & Videography dengan array data terpisah dan keadaan kosong yang informatif.
- [x] Pratinjau poster ukuran penuh melalui dialog setelah aset poster dapat dimuat.
- [x] Tema gelap/terang dan penyimpanan pilihan tema jika localStorage tersedia.
- [x] Navigasi mobile dengan tombol menu dan atribut aksesibilitas dasar.
- [x] Tahun footer otomatis melalui JavaScript.
- [x] Dokumentasi README, CHANGELOG, dan petunjuk direktori aset.
- [x] CSS mendukung `prefers-reduced-motion` dan layout responsif.

## Belum selesai / perlu data pemilik

- [ ] Tambahkan poster asli ke `images/poster-bijak-bermedsos.jpg`.
- [ ] Isi URL repository yang benar untuk proyek NAG jika sudah siap dipublikasikan.
- [ ] Isi tautan GitHub dan kontak publik di `siteConfig` pada `js/script.js`.
- [ ] Tambahkan foto dan video asli bila sudah siap ditampilkan.
- [ ] Tambahkan tahun/penyelenggara penghargaan jika ingin dipajang dan datanya tersedia.
- [ ] Buat repository GitHub, aktifkan GitHub Pages, dan verifikasi URL publik.
- [ ] Konfigurasi domain `calonceo.my.id` setelah akses DNS siap.

## Masalah yang diketahui

- Aset poster asli belum disertakan; halaman sengaja menampilkan frame dokumentasi, bukan gambar pengganti yang seolah-olah poster asli. Tombol pratinjau baru aktif setelah gambar tersedia.
- Galeri foto dan video kosong sampai data karya ditambahkan ke array terkait. Ini kondisi awal yang disengaja, bukan error.
- Link kontak serta repository tidak ditampilkan jika belum dikonfigurasi.
- Pemeriksaan visual otomatis lintas-browser/perangkat belum dijalankan di lingkungan ini.
- Belum ada audit Lighthouse atau pengujian aksesibilitas otomatis.

## Pengujian yang benar-benar dijalankan

- [x] `node --check js/script.js` — lulus; tidak ada kesalahan sintaks JavaScript yang dilaporkan.
- [x] Parsing CSS dengan `tinycss2` — tidak ditemukan parse error pada stylesheet.
- [x] Python `HTMLParser` — berhasil membaca `index.html` tanpa exception parser.
- [x] Pemeriksaan ID HTML — tidak ditemukan ID duplikat.
- [x] Pemeriksaan target anchor `href="#..."` — tidak ditemukan target yang hilang.
- [x] Pemeriksaan referensi lokal untuk CSS, JavaScript, dan aset — tidak ada path lokal yang hilang selain poster asli yang memang belum disediakan.
- [x] Pemeriksaan `alt` pada gambar HTML — kedua elemen gambar memiliki teks alternatif.
- [x] `unzip -t calonceo-portfolio-v0.1.0.zip` — arsip berhasil diperiksa tanpa error.
- [ ] Render visual melalui Chromium headless — dicoba, tetapi proses browser tidak selesai dalam batas waktu lingkungan uji; tidak dianggap sebagai tes visual yang lulus.
- [ ] Pengujian interaksi langsung pada browser, Lighthouse, dan deployment GitHub Pages — belum dilakukan.

Pemeriksaan parser HTML di atas bukan pengganti validator HTML5 penuh. Uji visual dan interaksi tetap perlu dilakukan di Chrome/Firefox atau browser ponsel sebelum publikasi.

## File yang dibuat pada tugas ini

- `index.html` — kerangka dan konten halaman.
- `css/style.css` — sistem visual, mode gelap/terang, layout responsif, dan status animasi.
- `js/script.js` — tema, navigasi, galeri, lightbox, link kontak, dan tahun footer.
- `README.md` — dokumentasi pengembangan dan deployment.
- `PROJECT_STATUS.md` — catatan status ini.
- `CHANGELOG.md` — riwayat perubahan awal.
- `.gitignore` — mengabaikan file sistem operasi yang tidak dibutuhkan repository.
- `images/README.md` — petunjuk aset gambar.
- `images/photography/README.md` — petunjuk galeri foto.
- `videos/README.md` — petunjuk aset video.

## Langkah berikutnya yang direkomendasikan

1. Tambahkan poster asli dan isi URL akun publik yang ingin ditampilkan.
2. Buka halaman pada Chrome Android dan desktop; uji navigasi, tema, lightbox, tab galeri, serta tampilan pada lebar layar kecil.
3. Buat repository GitHub dan deploy dari root repository melalui GitHub Pages.
4. Periksa status dan setting GitHub Pages sebelum menghubungkan domain kustom.
