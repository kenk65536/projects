$(function(){
  var roomId = $('#roomId').text();
  var user = $('#name').text();
  var socket = io();
  socket.on('connect', function(){
    socket.emit('join', roomId, user);
  });
  socket.on('sys', function(msg){
    $('#messages').append('<p>' + msg + '</p>');
  });
  socket.on('new message', function(user, msg){
    $('#messages').append('<p>' + user +' says : '+ msg + '</p>');
  });
  var input = $('#inputMessage');
  input.on('keydown', function(e){
    if(e.which === 13){
      var message = $(this).val();
      if(!message)
       return;
      socket.send(message, roomId);
      $(this).val('');
    }
  });
});
