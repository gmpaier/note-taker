const express = require('express');
const path = require('path');
var fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/css/styles.css', (req, res) => res.sendFile(path.join(__dirname, '/public/assets/css/styles.css')));

app.get('/js/index.js', (req, res) => res.sendFile(path.join(__dirname, '/public/assets/js/index.js')));

app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));

app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), function(err, data){
        if (err) throw err;
        let notes = JSON.parse(data);
        notes.push(req.body);
    });
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));