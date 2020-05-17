const express = require('express');
const http = require('http');
const https = require('https');
const socketio = require('socket.io');
const fs = require('fs');

const expressApp = express();
// HTTP server
const server = http.createServer(expressApp);

//HTTPS server
const secureServer = https.createServer({
  key: fs.readFileSync('./socketio.key'),
  cert: fs.readFileSync('./socketio.crt')
}, expressApp);

const io = socketio(server);
const ios = socketio(secureServer);

//Setup public file
expressApp.use(express.static('public'))

const HTTP_PORT = 9000;
const HTTPS_PORT = 9001;

server.listen(HTTP_PORT, () => {
  console.log(`server started at ${HTTP_PORT}`);
});

secureServer.listen(HTTPS_PORT, () => {
  console.log(`secure server started at ${HTTPS_PORT}`);
});

ios.on('connection', socket => {
  socket.emit('messageFromServer', { data: 'Welcome to the socket.io server!' });
  socket.on('messageToServer', dataFromClient => {
    console.log(dataFromClient);
  });
});

ios.of('/admin').on('connection', socket => {
  console.log('Someone connected to the admin channel');
  socket.emit('welcome', 'Welcome to the admin channel');
});
