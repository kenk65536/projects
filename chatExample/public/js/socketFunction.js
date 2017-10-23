var socket = io.connect();
function sendMsg(){
  socket.emit('msg', 'Hello');
}
