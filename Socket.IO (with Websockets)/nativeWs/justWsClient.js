let ws = new WebSocket('ws://localhost:8000');

ws.onopen = event => {
  ws.send('We are excited to be connected!');
};

ws.onmessage = event => {
  console.log(event);
};
