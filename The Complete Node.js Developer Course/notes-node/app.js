const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes');

console.log('Starting app...');

const argv = yargs.argv;
const command = argv._[0];

console.log('Command', command);
console.log('Yargs', argv);

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