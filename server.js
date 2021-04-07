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
    const newNote = req.body;
    const rawNotes = fs.readFileSync(path.join(__dirname, '/db/db.json'));
    const notes = JSON.parse(rawNotes);
    notes.push(newNote);
    const response = JSON.stringify(notes);
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), response);
    res.json(newNote);

});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));