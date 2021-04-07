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
    newNote.id = (notes.length + 1);
    notes.push(newNote);
    const response = JSON.stringify(notes);
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), response);
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    const rawId = req.params.id;
    const id = parseInt(rawId);
    const rawNotes = fs.readFileSync(path.join(__dirname, '/db/db.json'));
    const notes = JSON.parse(rawNotes);
    const rawOut = [];
    for (let i = 0; i<notes.length; i++){
        if(notes[i].id != id){
            notes[i].id = rawOut.length + 1;
            rawOut.push(notes[i]);
        }
    }
    const response = JSON.stringify(rawOut);
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), response);
    res.json(response);
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));