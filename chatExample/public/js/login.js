window.onload = function(){
  var chatForm = new ChatForm();
  chatForm.init();
};
var ChatForm = function(){
  this.socket = null;
};
ChatForm.prototype = {
  init: function(){
    var that = this;
    this.socket = io.connect();
    this.socket.on('connect', function(){
      document.getElementById('info').textContent = 'Enter your name';
      document.getElementById('nickWrapper').style.display = 'block';
      document.getElementById('nicknameInput').focus();
    });
  }
};
