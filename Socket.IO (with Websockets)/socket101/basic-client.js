const socket = io('http://localhost:8000');

socket.on('connect', data => {
  socket.on('welcome', msg => {
    console.log(msg);
  });
  socket.emit('message', {
    data: 'I am so excited I am connected!'
  });
});