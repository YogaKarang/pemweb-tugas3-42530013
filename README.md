# Tugas 3 Pemrograman Web - Sistem Katalog Buku Perpustakaan

Proyek ini dibangun untuk memenuhi penugasan terstruktur **Tugas 3 (Sub-CPMK 2.3)** Mata Kuliah Pemrograman Web. Aplikasi ini mengimplementasikan arsitektur **MVC (Model-View-Controller)**, **MySQL Connection Pool**, **Prepared Statements** (parameterized queries) untuk mitigasi celah SQL Injection, serta pola **Post-Redirect-Get (PRG)** pada seluruh mutasi data.

---

## 👨‍💻 Identitas Mahasiswa
- **Nama Lengkap**: I Wayan Yoga Karang Saputra
- **NIM**: 42530013
- **Program Studi**: Teknologi Informasi
- **Universitas**: Universitas Pendidikan Nasional (Undiknas)

---

## 📽️ Video Walkthrough & Demo (YouTube)
- **Tautan Video**: [https://youtu.be/ipQo1Xt5g9U]
- **Status Video**: **PUBLIC**

---

## 🚀 Fitur Utama & Spesifikasi Teknis
1. **Operasi CRUD Relasional Lengkap**:
   - **Create**: Menambah data buku baru melalui formulir input berbasis POST & PRG Pattern.
   - **Read**: Menampilkan seluruh katalog data buku dari basis data MySQL ke dalam tabel dinamis EJS.
   - **Update**: Mengubah data buku spesifik berbasis rute dinamis `/buku/edit/:id` (formulir *pre-filled*).
   - **Delete**: Menghapus data buku berbasis rute dinamis `/buku/hapus/:id` dengan dialog konfirmasi presisi.
2. **Keamanan Prepared Statements**: Seluruh kueri SQL dinamis (`INSERT`, `SELECT WHERE`, `UPDATE`, `DELETE`) menggunakan query berparameter (tanda penampung `?`) tanpa konkatenasi string.
3. **MySQL Connection Pool**: Manajemen koneksi basis data menggunakan pustaka `mysql2/promise` pool.
4. **Isolasi Kredensial Lingkungan**: Kredensial sensitif diisolasi pada berkas `.env` dan menyertakan berkas `.env.example` di repositori.

---

## 📁 Struktur Direktori
```text
pemweb-tugas3-42530013/
├── config/
│   └── database.js
├── controllers/
│   └── buku.controller.js
├── models/
│   └── buku.model.js
├── public/
│   └── css/
│       └── style.css
├── routes/
│   └── buku.routes.js
├── views/
│   ├── pages/
│   │   ├── buku-list.ejs
│   │   ├── buku-form-edit.ejs
│   │   └── buku-form-tambah.ejs
│   └── partials/
│       ├── footer.ejs
│       └── header.ejs
├── .env.example
├── .gitignore
├── app.js
├── database.sql
├── package.json
└── README.md