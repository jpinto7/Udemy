const fs = require('fs');

console.log('Starting notes.js...');

var addNote = (title = '', body = '') => {
    const originalNoteString = JSON.stringify(originalNote);
    fs.writeFileSync('notes.json', originalNoteString); 
};

var getAll = () => {

};

var getNote = (title = '') => {

};

var removeNote = (title = '') => {

};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};