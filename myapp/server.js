var server = require('./app');
var port = process.env.PORT || process.env.VCAP_APP_PORT || 3001;
server.listen(port, function(){
  console.log('The server on %d', port);
});
