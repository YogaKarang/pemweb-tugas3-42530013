const express = require('express');
const router = express.Router();
const c = require('../controllers/buku.controller');

router.get('/buku', c.getDaftarBuku);
router.get('/buku/tambah', c.getFormTambah);
router.post('/buku/tambah', c.postTambahBuku);
router.get('/buku/edit/:id', c.getFormEdit);
router.post('/buku/edit/:id', c.postUpdateBuku);
router.post('/buku/hapus/:id', c.postHapusBuku);

module.exports = router;
