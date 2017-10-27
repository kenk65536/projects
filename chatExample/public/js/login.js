'use stric';
var socket = io.connect();
window.onload = function(){
  var chatForm = new ChatForm();
  chatForm.init();
}
var ChatForm = function(){
  this.socket = null;
}
ChatForm.prototype = {
  init: function(){
    this.socket = io.connect();
    this.socket.on('connect', function(){
      document.getElementById('info').textContent = 'Enter your name';
      document.getElementById('nickWrapper').style.display = 'block';
      document.getElementById('nicknameInput').focus();
    });
    socket.on('nameExisted', function(checkName){
      alert('The ' + checkName + ' already existed');
    });
    socket.on('loginSuccess', function(){
      document.title = 'Chat form | ' + document.getElementById('loginName').value;
      document.getElementById('loginWrapper').style.display = 'none';
      document.getElementById('messageInput').focus();
    });
    socket.on('addUser', function(loginUser, userCount, type){
      var msg = loginUser + ' ' + (type == 'login' ? 'joined': 'left');
      p = document.createElement('p');
      p.innerHTML = msg;
      document.getElementById('historyMsg').appendChild(p);
      this.displayMsg();
    });
    document.getElementById('loginBtn').addEventListener('click',function(){
      var loginName = document.getElementById('loginName').value;
      if(loginName.trim().length != 0)
        socket.emit('login', loginName);
      else
        document.getElementById('loginName').focus();
    }, false);
  },
  displayMsg: function(){
    alert('test');
  }
}
