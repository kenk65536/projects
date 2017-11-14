var express = require('express');
var router = express.Router();
var command = require('../sqlCommand');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
router.get('/', function(request, response, next){
  response.render('login');
});
router.post('/chat', urlencodedParser, function(request, response, next){
  var dric = {
    roomId: request.body.selectRoom,
    user: request.body.inputUser,
    passwd: request.body.inputPWD
  };
  var db = request.con;
  db.query(command.getUsers, function(error, rows){
    if(error)
      console.log(error);
    var data = rows;
    for(var i=0; i<data.length; i++)
      if(data[i].userName === dric.user)
        if(data[i].userPassword === dric.passwd)
          if(data[i].roomId === parseInt(dric.roomId))
            response.render('index', {roomId: dric.roomId, userName: dric.user});
          else
            response.send('You don\'t have join ' + dric.roomId + ' room permission');
        else
          response.send('Wrong password');
      else
        response.send('User not found');
  });
});
module.exports = router;
