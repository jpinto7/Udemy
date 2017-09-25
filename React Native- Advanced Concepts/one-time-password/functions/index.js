const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./createUser');
const requestOneTimePassword = require('./requestOneTimePassword');
const verifyOneTimePassword = require('./verifyOneTimePassword');
const serviceAccount = require('./service_account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-f4485.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);
exports.verifyOneTimePassword = functions.https.onRequest(verifyOneTimePassword);
