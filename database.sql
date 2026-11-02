-- phpMyAdmin SQL Dump
-- Host: localhost
-- Generation Time: Nov 02, 2026 at 10:40 PM
-- Server version: 8.0.30
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_katalog_buku`
--
CREATE DATABASE IF NOT EXISTS `db_katalog_buku` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `db_katalog_buku`;

-- --------------------------------------------------------

--
-- Struktur dari tabel `buku`
--

CREATE TABLE `buku` (
  `id_buku` int NOT NULL AUTO_INCREMENT,
  `judul_buku` varchar(150) NOT NULL,
  `nama_penulis` varchar(100) NOT NULL,
  `kategori_genre` enum('Fiksi','Sains','Teknologi','Sejarah','Biografi') NOT NULL,
  `tahun_terbit` int NOT NULL,
  `stok_eksemplar` int NOT NULL DEFAULT '1',
  `harga_ganti_rugi` decimal(10,2) NOT NULL,
  `ringkasan_sinopsis` text,
  `url_sampul` varchar(255) DEFAULT NULL,
  `tgl_registrasi` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_buku`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `buku`
--

INSERT INTO `buku` (`id_buku`, `judul_buku`, `nama_penulis`, `kategori_genre`, `tahun_terbit`, `stok_eksemplar`, `harga_ganti_rugi`, `ringkasan_sinopsis`, `url_sampul`, `tgl_registrasi`) VALUES
(1, 'Bumi Manusia', 'Pramoedya Ananta Toer', 'Fiksi', 1980, 4, 125000.00, 'Kisah Minke, pribumi terpelajar di masa kolonial Hindia Belanda.', NULL, '2026-01-10'),
(2, 'Clean Code', 'Robert C. Martin', 'Teknologi', 2008, 3, 450000.00, 'Panduan menulis kode yang bersih, mudah dibaca, dan mudah dirawat.', 'https://covers.openlibrary.org/b/isbn/9780132350884-M.jpg?default=false', '2026-02-03'),
(3, 'Sapiens', 'Yuval Noah Harari', 'Sejarah', 2011, 5, 150000.00, 'Sejarah singkat umat manusia dari zaman batu hingga era modern.', 'https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg?default=false', '2026-02-15'),
(4, 'Cosmos', 'Carl Sagan', 'Sains', 1980, 2, 180000.00, 'Perjalanan memahami alam semesta dan tempat manusia di dalamnya.', NULL, '2026-03-01'),
(5, 'Habibie & Ainun', 'B.J. Habibie', 'Biografi', 2010, 3, 95000.00, 'Kisah hidup dan cinta B.J. Habibie bersama Ainun.', NULL, '2026-03-20');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;