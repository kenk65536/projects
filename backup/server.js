'use strict';
/* ****************************** *
 * Default server component serup *
 * ****************************** */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/* ********************* *
 * 1. Application setiup *
 * 2. chatroom setup     *
 * ********************* */
var app = express();
app.locals.title = '聊天室';
/* ********************************** *
 * Parser components define and setup *
 * ********************************** */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
/* ***************** *
 * MVC engine setup  *
 * Router path setup *
 * ***************** */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//var routes = require('./routes/index');
//var users = require('./routes/users');
/* ********** *
 * Path setup *
 * ********** */
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', routes);
//app.use('/users', users);
/* ************************************** *
 * catch 404 and forward to error hendler *
 * ************************************** */
//app.use(function(request, response, next){
//  var err = new Error('404 Not Found');
//  err.status = 404;
//  next(err);
//});
//app.use(function(err, request, response, next){
//  response.status(err.status || 500);
//  response.render('error',{
//    message: err.message,
//    error: {}
//  });
//});
/* ****************** *
 * Create http server *
 * ****************** */
var http = require('http');
var PORT = 3000;
//var server = http.Server(app);
/* ****************************** *
 * Socket.io definition and setup *
 * ****************************** */
//var io = require('socket.io').listen(server);
//var roomUser = {};
//io.on('connection', function(socket){
//  /*Get room id from url*/
//  var url = socket.request.headers.referer;
//  var split_arr = url.split('/');
//  var roomId = split_arr[split_arr.lenggth - 1] || 'index';
//  var user = '';
//  socket.on('join', function(userName){
//    user = userName;
//    if(!roomUser[roomId])//Addition user
//      roomUser[roomId] = [];
//    roomUser[roomId].push(user);
//    socket.join(roomId);
//    socket.to(roomId).emit('sys', user + ' 進來了');
//    socket.emit('sys', user + ' 進來了');
//  });
//  socket.on('message', function(msg){//Listen message from client
//    if(roomUser[roomId].indexOf(user) < 0)//Verify user in room
//      return false;
//    socket.to(roomId).emit('new message', msg, user);
//    socket.emit('new message', msg, user);
//  });
//  socket.on('disconnect', function(){
//    socket.leave(roomId, function(err){
//      if(error)
//        log.error(err);
//      else{
//        var index = roomUser[roomId].indexOf(user);
//        if(index !== -1){
//          roomUser[roomId].splice(index, 1);
//          socket.to(roomId).emit('sys', user + '離開了');
//        }
//      }
//    });
//  });
//});
/* ***************** *
 * Setup http server *
 * ***************** */
//if(!module.parent){
//  server.listen(PORT);
//  console.log('chatroom has start up on port ' + PORT);
//}
//module.exports = server;
