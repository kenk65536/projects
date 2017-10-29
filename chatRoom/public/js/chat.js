'use strict';
$(function(){
  var userName = prompt('Please input your name');
  $('.name').html(userName);
  var input = $('.inputMessage');
  var socket = io();
  function scrollToButtom(){
    $('#chat-area').scrollTop($(#chat-area)[0].scrollHeight);
  };
  socket.on('connect', function(){
    var name = $('.name').text() || '匿名';
    socket.emit('join', name);
  });
  socket.on('sys', function(message){
    $('.messages').append('<p>' + message + '</p>');
    scrollToBottom();
  });
  socket.on('new message', function(message, user){
    $('.message').append('<p>' + user + ' : ' + message + '</p>');
    scrollToBottom();
  });
  input.on('keydown', function(e){
    if(e.which === 13){
      var message = $(this).val();
      if(!message)
        return;
      socket.send(message);
      $(this).val('');
    }
  });
});
