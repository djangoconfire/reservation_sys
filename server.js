var http = require('http');
var app = require('./app');

var port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port);



