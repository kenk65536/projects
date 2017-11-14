var mysql = require('mysql');
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '4294967296',
  port: '3306',
  database: 'chatroom'
});
con.connect(function(error){
  if(error){
    console.log('database connecting error');
    return;
  }
  console.log('database connecting success');
});
module.exports = con;
