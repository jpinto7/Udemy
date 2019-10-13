const http = require('http');
const websocket = require('ws');

const server = http.createServer((req, res) => {
  res.end('I am connected');
});

const wss = new websocket.Server({ server });

wss.on('headers', (headers, req) => {
  console.log(headers);
});

wss.on('connection', (ws, req) => {
  ws.send('Welcome to the WebSocket Server');
  ws.on('message', data => {
    console.log('data', data);
  });
});

server.listen(8000);
