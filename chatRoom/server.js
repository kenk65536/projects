'use strict';
/* ****************** *
 * Create http server *
 * ****************** */
var app = require('./app');
var http = require('http');
var PORT = 3000;
var server = http.Server(app);
//test point
//var db = require('./DBTest');
//test point
/* ****************************** *
 * Socket.io definition and setup *
 * ****************************** */
var io = require('socket.io').listen(server);
var roomUser = new Array();
var roomId = 0;
io.on('connection', function(socket){
  var user = '';
  socket.on('join', function(roomNum, userName){
    user = userName;
    roomId = roomNum;
    if(!roomUser[roomId])
      roomUser[roomId] = new Array();
    roomUser[roomId].push(user);
    socket.join(roomId);
    socket.to(roomId).emit('sys', user + ' 進來了');
    socket.emit('sys', user + ' 進來了');
  });
  socket.on('message', function(msg, roomNum){//Listen message from client
    if(roomUser[roomId].indexOf(user) < 0)//Verify user in room
      return false;
    socket.to(roomId).emit('new message', user, msg);
    socket.emit('new message', user, msg);
  });
  socket.on('disconnect', function(){
    socket.leave(roomId, function(error){
      if(error)
        log.error(error);
      else{
        var index = roomUser[roomId].indexOf(user);
        if(index !== -1){
          roomUser[roomId].splice(index, 1);
          socket.to(roomId).emit('sys', user + ' 離開了');
        }
      }
    });
  });
});
/* ***************** *
 * Setup http server *
 * ***************** */
if(!module.parent){
  server.listen(PORT);
  console.log('chatroom has start up on port ' + PORT);
}
module.exports = server;
