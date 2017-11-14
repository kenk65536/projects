'use strict';
/* ****************************** *
 * Default server component serup *
 * ****************************** */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var con = require('./DBConnection');
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
 * ***************** */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
/* ***************** *
 * Router path setup *
 * ***************** */
var routes = require('./routes/index');
var users = require('./routes/users');
var accountList = require('./routes/accountList');
/* ************************* *
 * Default static path setup *
 * ************************* */
app.use(express.static('./public'));
/* ************** *
 * Database setup *
 * ************** */
app.use(function(request, response, next){
  request.con = con;
  next();
});
/* **************** *
 * Controller setup *
 * **************** */
app.use('/', routes);
app.use('/users', users);
app.use('/account', accountList);
/* ************ *
 * Method setup *
 * ************ */
/*
app.post('/processes', function(request, response){
  response.send(request.body.submit);
})
*/;
/* ************************************** *
 * catch 404 and forward to error hendler *
 * ************************************** */
/*
app.use(function(request, response, next){
  var err = new Error('404 Not Found');
  err.status = 404;
  next(err);
});
app.use(function(request, response, next){
  response.status(err.status || 500);
  response.render('error', {
    message: err.message,
    error: {}
  });
});
*/
module.exports = app;
