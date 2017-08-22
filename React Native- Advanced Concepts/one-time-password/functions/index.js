const functions = require('firebase-functions');
const createUser = require('./createUser');

exports.helloWorld = functions.https.onRequest((req, res) => {
 res.send("Hello from Firebase!");
});

exports.createUser = functions.https.onRequest(createUser);
