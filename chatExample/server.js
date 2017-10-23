'use strict';
var app = require('./app');
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('msg', function(data){
    console.log(data);
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});
