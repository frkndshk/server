const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MySQL veritabanı bağlantısı oluşturma
const connection = mysql.createConnection({
    host: 'brflrxzq5tg82kflfbmv-mysql.services.clever-cloud.com',
    user: 'uqcw9bdlanbwc4sn',
    password: 'CP8ER0OfZj4xD01po2xJ',
    database: 'brflrxzq5tg82kflfbmv'
});

// Veritabanına bağlanma
connection.connect((err) => {
    if (err) {
        console.error('Veritabanına bağlanırken hata oluştu:', err);
        return;
    }
    console.log('Veritabanına başarıyla bağlanıldı!');
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Merhaba Dünya!');
});

// Veritabanından veri çekme endpointi
app.get('/veri', (req, res) => {
    const sql = 'SELECT * FROM boe_menu';
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Veri çekerken hata oluştu: ?');
            console.log(err)
            return;
        }
        res.json(results);
    });
});
app.post('/menu', (req, res) => {
    const veri = req.body.menu_json;
    const id = req.body.menu_id;
    const sql = 'INSERT INTO beo_menu (json, id) VALUES(?,?);';
    connection.query(sql, [veri,id], (err, results) => {
        if (err) {
            res.status(500).send('Veri eklerken hata oluştu');
            return;
        }
        res.status(201).send('Veri başarıyla eklendi');
    });
});
// Sunucuyu başlatma
app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
