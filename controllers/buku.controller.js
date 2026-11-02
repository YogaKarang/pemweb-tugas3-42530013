const BukuModel = require('../models/buku.model');

// Validasi & normalisasi input form (server-side)
const validasi = (body) => {
  const errors = [];
  const judul = (body.judul || '').trim();
  const penulis = (body.penulis || '').trim();
  const genre = (body.genre || '').trim();
  const sinopsis = (body.sinopsis || '').trim();
  const foto = (body.foto || '').trim();
  const tanggal = (body.tanggal_registrasi || '').trim();
  const tahun = Number(body.tahun_terbit);
  const eksemplar = Number(body.jumlah_eksemplar);
  const harga = Number(body.harga_ganti);
  const tahunMax = new Date().getFullYear() + 1;

  if (!judul || judul.length > 150) errors.push('Judul wajib diisi (maks. 150 karakter).');
  if (!penulis || penulis.length > 100) errors.push('Penulis wajib diisi (maks. 100 karakter).');
  if (!BukuModel.GENRE_LIST.includes(genre)) errors.push('Genre tidak valid.');
  if (!Number.isInteger(tahun) || tahun < 1000 || tahun > tahunMax) errors.push('Tahun terbit tidak valid.');
  if (!Number.isInteger(eksemplar) || eksemplar < 0) errors.push('Jumlah eksemplar harus bilangan bulat >= 0.');
  if (!Number.isFinite(harga) || harga < 0) errors.push('Harga ganti harus angka >= 0.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggal)) errors.push('Tanggal registrasi tidak valid.');
  if (foto && (foto.length > 255 || !/^(https?:\/\/|\/)\S+$/i.test(foto))) {
    errors.push('URL foto harus diawali http://, https://, atau / (maks. 255 karakter).');
  }

  return {
    errors,
    data: {
      judul, penulis, genre, sinopsis,
      foto: foto || null,
      tahun_terbit: tahun, jumlah_eksemplar: eksemplar,
      harga_ganti: harga, tanggal_registrasi: tanggal
    }
  };
};

const hariIni = () => new Date().toISOString().slice(0, 10);

const bukaForm = (res, opts) =>
  res.status(opts.status || 200).render('pages/buku-form', {
    pageTitle: opts.pageTitle,
    judulForm: opts.judulForm,
    action: opts.action,
    tombol: opts.tombol,
    buku: opts.buku,
    errors: opts.errors || [],
    genreList: BukuModel.GENRE_LIST
  });

// READ (all)
exports.getDaftarBuku = async (req, res) => {
  try {
    const genre = BukuModel.GENRE_LIST.includes(req.query.genre) ? req.query.genre : '';
    const q = (req.query.q || '').trim();
    const bukuList = await BukuModel.getAll(genre, q);
    const totalEksemplar = bukuList.reduce((sum, b) => sum + b.jumlah_eksemplar, 0);
    res.render('pages/buku-list', {
      pageTitle: 'Katalog Buku',
      bukuList, genreList: BukuModel.GENRE_LIST, genreAktif: genre, q,
      totalJudul: bukuList.length, totalEksemplar
    });
  } catch (err) {
    console.error('[ERROR getDaftarBuku]:', err);
    res.status(500).send('Terjadi galat saat mengambil data.');
  }
};

// CREATE
exports.getFormTambah = (req, res) => {
  bukaForm(res, {
    pageTitle: 'Tambah Buku', judulForm: 'Tambah Buku Baru',
    action: '/buku/tambah', tombol: 'Simpan',
    buku: { tahun_terbit: '', jumlah_eksemplar: 1, tanggal_registrasi: hariIni() }
  });
};

exports.postTambahBuku = async (req, res) => {
  try {
    const { errors, data } = validasi(req.body);
    if (errors.length) {
      return bukaForm(res, {
        status: 400, pageTitle: 'Tambah Buku', judulForm: 'Tambah Buku Baru',
        action: '/buku/tambah', tombol: 'Simpan', buku: req.body, errors
      });
    }
    await BukuModel.create(data);
    console.log(`[DATABASE] Buku "${data.judul}" berhasil di-insert.`);
    res.redirect('/buku'); // PRG
  } catch (err) {
    console.error('[ERROR postTambahBuku]:', err);
    res.status(500).send('Gagal menyimpan data.');
  }
};

// UPDATE
exports.getFormEdit = async (req, res) => {
  try {
    const buku = await BukuModel.getById(req.params.id);
    if (!buku) return res.status(404).render('pages/404', { pageTitle: 'Buku Tidak Ditemukan' });
    bukaForm(res, {
      pageTitle: 'Edit Buku', judulForm: 'Edit Buku #' + buku.id,
      action: '/buku/edit/' + buku.id, tombol: 'Perbarui', buku
    });
  } catch (err) {
    console.error('[ERROR getFormEdit]:', err);
    res.status(500).send('Galat saat memuat form edit.');
  }
};

exports.postUpdateBuku = async (req, res) => {
  try {
    const { id } = req.params;
    const { errors, data } = validasi(req.body);
    if (errors.length) {
      return bukaForm(res, {
        status: 400, pageTitle: 'Edit Buku', judulForm: 'Edit Buku #' + id,
        action: '/buku/edit/' + id, tombol: 'Perbarui', buku: req.body, errors
      });
    }
    const result = await BukuModel.update(id, data);
    if (result.affectedRows === 0) {
      return res.status(404).render('pages/404', { pageTitle: 'Buku Tidak Ditemukan' });
    }
    console.log(`[DATABASE] Record ID ${id} berhasil diperbarui.`);
    res.redirect('/buku'); // PRG
  } catch (err) {
    console.error('[ERROR postUpdateBuku]:', err);
    res.status(500).send('Gagal memperbarui data.');
  }
};

// DELETE
exports.postHapusBuku = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BukuModel.delete(id);
    if (result.affectedRows === 0) {
      console.warn(`[DATABASE] Tidak ada record yang terhapus untuk ID ${id}`);
    } else {
      console.log(`[DATABASE] Record ID ${id} berhasil dihapus.`);
    }
    res.redirect('/buku'); // PRG
  } catch (err) {
    console.error('[ERROR postHapusBuku]:', err);
    res.status(500).send('Gagal menghapus data.');
  }
};
