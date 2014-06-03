
var debug = require('debug')('builder:serve');
var app = require('./index');
var http = require('http');
var server = http.Server(app.callback());

module.exports = function(fn) {
  debug('starting server');
  server.listen(function() {
    var addr = server.address();
    var url = 'http://localhost:' + addr.port;
    console.log('started server: %s', url);
    fn(null, url, server);
  });
};
