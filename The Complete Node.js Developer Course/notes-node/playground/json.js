const fs = require('fs');

const originalNote = {
    title: 'Go and touch it',
    body: 'Preta preta pretinha'
};

const originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json', originalNoteString);

const noteString = fs.readFileSync('notes.json');

const note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);