var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var command = require('../sqlCommand');
router.get('/', function(request, response, next){
  var db = request.con;
  db.query(command.getUsers, function(error, rows){
  if(error)
    console.log(error);
  var data = rows;
  response.render('accounts', {title: 'Account information', data: data});
  });
  db.end();
});
router.post('/processes', urlencodedParser, function(request, response, next){
  response.send(request.body.submit);
});
module.exports = router;
