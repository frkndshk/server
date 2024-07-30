const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3002;
var yedekler = null;

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'brflrxzq5tg82kflfbmv-mysql.services.clever-cloud.com',
    user: process.env.DB_USER || 'uqcw9bdlanbwc4sn',
    password: process.env.DB_PASSWORD || 'CP8ER0OfZj4xD01po2xJ',
    database: process.env.DB_DATABASE || 'brflrxzq5tg82kflfbmv'
});

// CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Veritabanı bağlantı olaylarını izleme
connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Verileri al
app.get('/api/menuler', (req, res) => {
    connection.query('SELECT * FROM beo_menu', (error, results, fields) => {
        if (error) {
            console.error('Error querying the database:', error);
            if (yedekler) {
                res.json(yedekler);
            }
            return;
        }
        res.json(results);
        yedekler = results;
    });
});

// Verileri kaydet
app.post('/api/menuler', (req, res) => {
    const jsonData = JSON.stringify(req.body);

    connection.query('INSERT INTO boe_menu (json_data) VALUES (?)', [jsonData], (error, results) => {
        if (error) {
            console.error('Error inserting into the database:', error);
            return res.status(500).send('Error inserting data');
        }
        res.status(200).send(`JSON kaydedildi! ID: ${results.insertId}`);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
