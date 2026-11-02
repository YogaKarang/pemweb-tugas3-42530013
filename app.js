require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./config/database');
const bukuRoutes = require('./routes/buku.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.redirect('/buku'));
app.use('/', bukuRoutes);

app.use((req, res) => {
  res.status(404).render('pages/404', { pageTitle: '404 Tidak Ditemukan' });
});

// Verifikasi koneksi pool saat startup
db.query('SELECT 1 + 1 AS result')
  .then(() => {
    console.log('[DATABASE] Terhubung ke MySQL Pool secara aman.');
    app.listen(PORT, () => console.log(`[SERVER] Aktif di http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('[DATABASE ERROR] Gagal terhubung ke MySQL:', err.message);
  });
