const db = require('../config/database');

const GENRE_LIST = ['Fiksi', 'Sains', 'Teknologi', 'Sejarah', 'Biografi'];

const BukuModel = {
  GENRE_LIST,

  // READ (all) + filter genre & pencarian. Genre kosong = semua genre.
  getAll: async (genre, keyword) => {
    const sql = `
      SELECT * FROM buku
      WHERE (? = '' OR genre = ?)
        AND (judul LIKE CONCAT('%', ?, '%') OR penulis LIKE CONCAT('%', ?, '%'))
      ORDER BY id DESC
    `;
    const [rows] = await db.query(sql, [genre, genre, keyword, keyword]);
    return rows;
  },

  // READ (one)
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM buku WHERE id = ?', [id]);
    return rows[0];
  },

  // CREATE
  create: async (d) => {
    const sql = `
      INSERT INTO buku
        (judul, penulis, genre, tahun_terbit, jumlah_eksemplar, harga_ganti, sinopsis, foto, tanggal_registrasi)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      d.judul, d.penulis, d.genre, d.tahun_terbit,
      d.jumlah_eksemplar, d.harga_ganti, d.sinopsis, d.foto, d.tanggal_registrasi
    ]);
    return result;
  },

  // UPDATE
  update: async (id, d) => {
    const sql = `
      UPDATE buku
      SET judul = ?, penulis = ?, genre = ?, tahun_terbit = ?,
          jumlah_eksemplar = ?, harga_ganti = ?, sinopsis = ?, foto = ?, tanggal_registrasi = ?
      WHERE id = ?
    `;
    const [result] = await db.query(sql, [
      d.judul, d.penulis, d.genre, d.tahun_terbit,
      d.jumlah_eksemplar, d.harga_ganti, d.sinopsis, d.foto, d.tanggal_registrasi, id
    ]);
    return result;
  },

  // DELETE
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM buku WHERE id = ?', [id]);
    return result;
  }
};

module.exports = BukuModel;