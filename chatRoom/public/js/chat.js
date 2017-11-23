$(function(){
  var login = $('#verifyLogin');
  login.click(function(){
    $('#chatForm').hide();
    $('#divLogin').show(500);
  });
  var spanClose = $('#spanClose');
  spanClose.click(function(){
    $('#divLogin').hide(500);
  });
  var buttonCancel = $('#buttonCancel');
  buttonCancel.click(function(){
    $('#divLogin').hide(500);
  });
  var roomId = $('#roomId').text();
  var user = $('#name').text();
  var test = $('#roomId').attr('name');
  alert(test);
  var socket = io();
  socket.on('connect', function(){
    socket.emit('join', roomId, user);
  });
  socket.on('sys', function(msg){
    $('#messages').append('<p>' + msg + '</p>');
  });
  socket.on('nameExisted', function(){
    alert('The Name already existed');
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
