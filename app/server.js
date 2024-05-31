const express = require('express');
const moment = require('moment-timezone');
const os = require('os');

// Twój pełne imię i nazwisko
const studentName = 'Imię i Nazwisko Studenta';

// Tworzenie aplikacji Express
const app = express();
const port = 3000;

// Logowanie informacji o uruchomieniu serwera
console.log(`Data uruchomienia: ${new Date().toISOString()}`);
console.log(`Autor: ${studentName}`);
console.log(`Serwer nasłuchuje na porcie: ${port}`);

// Middleware do logowania informacji o kliencie
app.use((req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const clientTime = moment().tz(moment.tz.guess());

    console.log(`Połączenie od klienta: ${clientIp}`);
    console.log(`Data i czas w strefie czasowej klienta: ${clientTime.format('YYYY-MM-DD HH:mm:ss z')}`);

    next();
});

// Endpoint główny
app.get('/', (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const clientTime = moment().tz(moment.tz.guess());

    res.send(`
        <h1>Informacje o kliencie</h1>
        <p>Adres IP klienta: ${clientIp}</p>
        <p>Data i czas w strefie czasowej klienta: ${clientTime.format('YYYY-MM-DD HH:mm:ss z')}</p>
    `);
});

// Uruchamianie serwera
app.listen(port, () => {
    console.log(`Serwer uruchomiony na porcie ${port}`);
});
