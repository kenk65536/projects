'use strict';
var app = require('./app');
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var users = [];
io.sockets.on('connection', function(socket){
  socket.on('login', function(loginName) {
    if(users.indexOf(loginName) > -1)
      socket.emit('nameExisted', loginName);
    else{
      socket.userIndex = users.length;
      socket.loginName = loginName;
      users.push(loginName);
      socket.emit('loginSuccess');
      socket.broadcast.emit('addUser', loginName, users.length, 'login');
      console.log(loginName + ' login');
    }
  });
  socket.on('disconnect', function(){
    if(socket.loginName != null){
      users.splice(users.indexOf(socket.loginName), 1);
      socket.broadcast.emit('addUser', socket.loginName, users.length, 'logout');
      console.log(socket.loginName + ' logout');
    }
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});
