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

// Veritabaný baðlantý olaylarýný izleme
connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }

    console.log('Connected to MySQL');
});

app.get('/api/menuler', (req, res) => {
    connection.query('SELECT * FROM menuler', (error, results, fields) => {
        if (error) {
            console.error('Error querying the database:', error);
            if (yedekler) {
                res.json(yedekler)
            }
            return;
        }

        res.json(results);
        yedekler = results;
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
