var utterance = new SpeechSynthesisUtterance();
utterance.text = '你好嗎，我要測試廣東話';

//utterance.lang = 'en-GB'; // language, default is 'en-US'
utterance.lang = 'zh-HK'; // language, default is 'en-US'
utterance.volume = 0.5;   // volume, from 0 to 1, default is 1
utterance.rate = 0.8;     // speaking rate, default is 1 

// speak it!
window.speechSynthesis.speak(utterance);
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
