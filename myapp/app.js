'use strict';
//var PythonShell = require('python-shell');
//var options = {
//    mode: 'json',
//    pythonOptions: ['-u'],
//    scriptPath: './',
//};
//var test =  new PythonShell('test.py', options);
//test.on('message',function (message) {
//    console.log(message);
//});

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.engine('.html', require('ejs').__express);
app.set('view engine','ejs');
app.use(express.static('./public'));
app.get('/SpeechToText', function(request, response){
  response.sendFile('public/speechToText.html', {root: __dirname});
});
app.get('/ejsExample', function(request, response){
  response.render('index.html');
//  response.render('index');
});
app.get('/me', function(request, response){
  response.send('Hello, this is my router');
});
app.get('/who/:name?', function(request, response){
  var name = request.params.name;
  response.send('Welcome<br>'+ name);
});
app.get('/who/:name?/:age?', function(request, response){
  var name = request.params.name;
  var age = request.params.age;
  response.send('Your name : ' + name + ' and your age : ' + age);
});
app.get('/getComment', function(request, response){
  console.log('name: ' + request.query.name);
  console.log('email: ' + request.query.email);
  console.log('comment: ' + request.query.comment);
  response.send(request.query.name + ' Thank your comment');
});
app.post('/postComment', urlencodedParser, function(request, response){
  console.log('name: '  + request.body.name);
  console.log('email: '  + request.body.email);
  console.log('comment: '  + request.body.comment);
  response.send('Thank your command');
});
app.get('*', function(request, response){
  response.send('<center><h1>404 not found</h1></center>');
})
module.exports = app
