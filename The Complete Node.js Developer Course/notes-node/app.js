const yargs = require('yargs');
const notes = require('./notes');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't',
  type: 'string'
};

const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b',
  type: 'string'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .command('read', 'List a note', {
    title: titleOptions
  })    
  .argv;

const command = argv._[0];

switch (command) {
  case 'list':
    notes.getAll();
    break;
  case 'add':
    notes.addNote(argv.title, argv.body);
    break;
  case 'remove':
    notes.removeNote(argv.title);
    break;
  case 'read':
    notes.getNote(argv.title);
    break;
  default:
    console.log('command not recognized');
}