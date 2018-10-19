const fs = require('fs');
const path = require('path');

const printNote = note => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync(path.join(__dirname, 'notes.json'));
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  fs.writeFileSync(path.join(__dirname, 'notes.json'), JSON.stringify(notes));
};

const addNote = (title = '', body = '') => {
  const notes = fetchNotes();
  const duplicateNotes = notes.filter(note => note.title === title);
  if (duplicateNotes.length === 0) {
    const note = {
      title,
      body
    };
    notes.push(note);
    saveNotes(notes);
    console.log('Note created.');
    printNote(note);
  } else {
    console.log('Note title taken.');
  }
};

const getAll = () => {
  const notes = fetchNotes();
  const numNotes = notes.length;
  if (numNotes > 0) {
    console.log(`Printing ${numNotes} note(s).`);
    notes.forEach(note => {
      printNote(note);
    });
  } else {
    console.log('Notes not found.');
  }
};

const getNote = (title = '') => {
  const notes = fetchNotes().filter(note => note.title === title);
  if (notes.length > 0) {
    console.log('Note read.');
    printNote(notes[0]);
  } else {
    console.log('Note not found.');
  }
};

const removeNote = (title = '') => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title !== title);
  if (notes.length !== filteredNotes.length) {
    saveNotes(filteredNotes);
    console.log('Note removed.');
  } else {
    console.log('Note not found.');
  }
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};