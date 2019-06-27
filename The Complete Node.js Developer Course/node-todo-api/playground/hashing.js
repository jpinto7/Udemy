const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = 'hellodolly';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log('salt', salt);
    console.log(hash);
  });
});

const hashedPassword = '$2a$10$LO15rpAVQwAerx32eHQ3oOFFrHG7ICpetrq8pnAD5DRT2H5gOKAGu';

bcrypt.compare(password, hashedPassword, (err, success) => {
  console.log(success);
});

const thisalt = bcrypt.getSalt(hashedPassword);
bcrypt.hash(password, thisalt, (err, hash) => {
  if (hash === hashedPassword) {
    console.log('success');
  } else {
    console.log('nop');
  }
});