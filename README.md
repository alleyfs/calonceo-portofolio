# CalonCEO — Portfolio Website

Website portofolio pribadi untuk mendokumentasikan proyek pemrograman, desain digital, pencapaian, perjalanan belajar, dan karya Photography & Videography. Versi pertama dibuat sebagai website statis agar ringan, mudah dipahami, dan dapat di-host melalui GitHub Pages.

## Teknologi

- **HTML5** semantik untuk struktur halaman dan aksesibilitas dasar.
- **CSS3** untuk layout responsif, komponen visual, tema terang/gelap, dan animasi ringan.
- **JavaScript vanilla** untuk menu mobile, tema yang tersimpan di browser, galeri konten, pratinjau poster, dan tahun footer.
- **Git + GitHub Pages** untuk version control dan publikasi statis.

Tidak ada framework, paket npm, backend, API eksternal, atau kredensial yang diperlukan.

## Struktur file

```text
calonceo/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── README.md
│   ├── poster-bijak-bermedsos.jpg   # tambahkan poster asli sendiri
│   └── photography/
│       └── README.md                # petunjuk menaruh foto
├── videos/
│   └── README.md                    # petunjuk mengelola video
├── README.md
├── PROJECT_STATUS.md
└── CHANGELOG.md
```

## Cara membuka dan menguji secara lokal

1. Unduh atau clone repository ke perangkat.
2. Buka `index.html` langsung di browser modern. Website dasar tidak membutuhkan server lokal.
3. Untuk pengalaman pengembangan yang lebih nyaman, buka folder dengan editor seperti VS Code. Ekstensi Live Server boleh digunakan, tetapi tidak wajib.
4. Periksa menu di layar kecil, tombol tema, tautan navigasi, pratinjau poster setelah aset tersedia, tab Photography/Videography, dan tampilan saat JavaScript dinonaktifkan.
5. Periksa DevTools Console dan panel Network untuk error JavaScript serta aset yang gagal dimuat.

Pemeriksaan statis awal yang sudah dijalankan: `node --check js/script.js`, parsing HTML dengan Python `HTMLParser`, pemeriksaan ID/anchor/path gambar, dan pemeriksaan integritas ZIP. Render Chromium headless tidak berhasil selesai di lingkungan pembuat, jadi jangan anggap tampilan lintas-browser sudah tervalidasi.

## Mengubah konten

### Judul, deskripsi, dan teks bagian

Buka `index.html`, lalu cari ID atau judul bagian, misalnya `hero-title`, `about-title`, `projects-title`, dan `achievements-title`. Pertahankan `id` jika tidak sedang mengubah tautan navigasi. Ganti teks di antara tag HTML, bukan tag HTML-nya.

### Mengganti poster lomba

1. Siapkan gambar poster asli dalam format JPG atau WebP yang sudah dioptimalkan.
2. Simpan sebagai `images/poster-bijak-bermedsos.jpg` agar tidak perlu mengubah kode. Jika menggunakan nama atau format berbeda, ubah atribut `src` pada elemen `#poster-image` di `index.html`.
3. Buka halaman dan periksa bahwa poster tampil lengkap. CSS memakai `object-fit: contain`, sehingga poster tidak dipotong untuk memenuhi kartu.
4. Tombol **Lihat poster ukuran penuh** aktif secara otomatis ketika gambar bisa dimuat.

File poster belum disertakan karena karya asli perlu berasal dari pemilik portofolio.

### Mengubah tautan kontak

Buka bagian `siteConfig` di bagian atas `js/script.js` dan isi tautan publik yang benar:

```js
const siteConfig = {
  links: {
    github: "https://github.com/username-anda",
    email: "mailto:email-anda@example.com",
    instagram: "",
    youtube: ""
  }
};
```

Contoh di atas hanya format penulisan; ganti dengan URL dan email milik sendiri sebelum publikasi. Jangan mengisi akun yang belum dimiliki. Tautan kosong atau tidak valid tidak akan ditampilkan. Jangan pernah menaruh password, token, atau API key di sini.

### Menambah proyek

Duplikasi satu elemen `<article class="project-card ...">` di bagian `Featured Projects` pada `index.html`. Ubah judul, deskripsi, label kategori, tag teknologi, dan status. Gunakan status yang sesuai kondisi nyata, misalnya `In progress` atau `Awarded`. Jangan menambahkan tombol repository kecuali URL repository sudah benar-benar tersedia. Pertahankan kelas `.project-card` dan struktur `.project-body` agar tampil konsisten.

### Menambah foto

1. Simpan foto asli yang sudah dioptimalkan di `images/photography/`. Gunakan nama pendek dan konsisten, misalnya `suasana-sore-01.jpg`.
2. Buka `js/script.js`, cari `const photographyItems = [];`, kemudian tambahkan objek ke dalam array:

```js
const photographyItems = [
  {
    src: "images/photography/nama-foto.jpg",
    title: "Judul foto",
    description: "Deskripsi singkat tentang karya ini.",
    category: "Nature",
    alt: "Deskripsi visual foto untuk pembaca layar",
    device: "",    // opsional, isi hanya jika benar
    technique: ""  // opsional, isi hanya jika benar
  }
];
```

3. Foto akan masuk ke grid dan dapat diketuk untuk dilihat dalam ukuran penuh. Jangan mengisi perangkat, teknik, atau lokasi berdasarkan tebakan.

### Menambah video

1. Unggah video ke platform publik yang sesuai atau simpan file kecil di `videos/`.
2. Siapkan thumbnail karya sendiri di folder gambar, misalnya `images/videography/nama-thumbnail.jpg` (buat folder jika diperlukan).
3. Tambahkan objek pada array `videographyItems` di `js/script.js`:

```js
const videographyItems = [
  {
    title: "Judul video",
    description: "Deskripsi singkat video.",
    category: "Cinematic",
    thumbnail: "images/videography/nama-thumbnail.jpg",
    videoUrl: "https://youtu.be/ID_VIDEO"
  }
];
```

`videoUrl` dapat berupa URL http/https yang benar atau path video lokal seperti `videos/nama-video.mp4`. Untuk lokal, browser akan menampilkan kontrol pemutaran. Video besar sebaiknya ditempatkan di platform hosting video karena ukuran repository dan pemuatan halaman.

### Memperbarui tema dan tampilan

- Warna, ukuran teks, jarak, breakpoint, dan layout ada di `css/style.css`.
- Variabel warna terpusat di blok `:root` dan `html[data-theme="light"]` pada awal CSS.
- Interaksi menu, tema, galeri, lightbox, dan tahun footer ada di `js/script.js`.
- Animasi scroll secara otomatis dilewati ketika sistem meminta `prefers-reduced-motion: reduce`.

## Deployment ke GitHub Pages

1. Buat repository GitHub baru bernama `calonceo` (atau nama repository yang dipilih).
2. Unggah seluruh isi folder proyek; pastikan `index.html` berada di root repository, bukan hanya di dalam subfolder tambahan.
3. Commit dan push perubahan.
4. Di GitHub, buka **Settings → Pages**.
5. Pada **Build and deployment**, pilih **Deploy from a branch**, pilih branch `main` dan folder `/(root)`, lalu simpan.
6. Tunggu proses deployment selesai dan buka URL GitHub Pages yang ditampilkan oleh GitHub.
7. Uji versi publik melalui HP dan desktop. Pastikan path aset tetap relatif seperti `css/style.css`, `js/script.js`, dan `images/...`.

Jika nama repository bukan `<username>.github.io`, website biasanya berada di bawah path repository. Karena itu, gunakan path relatif seperti yang ada pada proyek ini dan hindari path absolut yang dimulai dari `/`.

## Menghubungkan domain `calonceo.my.id` nanti

Setelah website GitHub Pages aktif dan Anda dapat mengelola DNS domain:

1. Buka **Settings → Pages** pada repository dan isi **Custom domain** dengan `calonceo.my.id`.
2. Ikuti instruksi DNS yang ditampilkan GitHub untuk domain apex. Umumnya, domain apex memakai record `A`/`ALIAS`/`ANAME` yang didukung penyedia DNS; GitHub juga mendokumentasikan konfigurasi `A` dan `AAAA` yang berlaku. Gunakan nilai terbaru dari dokumentasi resmi GitHub, jangan menyalin IP dari panduan lama tanpa verifikasi.
3. Jika juga ingin `www.calonceo.my.id`, buat record `CNAME` sesuai target yang ditunjukkan GitHub.
4. Pastikan konfigurasi DNS tidak mengganggu record email atau layanan lain yang sudah digunakan domain.
5. Kembali ke GitHub Pages, tunggu pemeriksaan DNS selesai, lalu aktifkan **Enforce HTTPS** saat tersedia.
6. Periksa domain dari jaringan berbeda karena propagasi DNS bisa memerlukan waktu.

Domain kustom belum dikonfigurasi oleh proyek ini. Anda harus memiliki akses ke pengelola domain/DNS dan mengikuti instruksi GitHub yang berlaku ketika melakukan deployment.

## Sebelum publikasi

- Tambahkan poster asli dan karya media yang memang ingin dipublikasikan.
- Atur link GitHub/kontak di `js/script.js`.
- Verifikasi status proyek dan pencapaian; tambahkan tahun atau penyelenggara penghargaan hanya jika datanya benar.
- Cek tampilan mobile, keyboard navigation, console, tautan, dan alt text gambar.
- Jangan memasukkan nomor telepon pribadi, alamat rumah, password, token, atau API key ke repository publik.
