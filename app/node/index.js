'use strict';

var server = require('http').createServer();
var io = require('socket.io')(server);
var main = require('./src/main')(io);
var lobby = require('./src/lobby')(io);
var game = require('./src/game')(io);

var port = 3001;

/* Start server */
server.listen(port, function() {
	console.log('APP: Server listening at port ' + port);
});

/* Handle server errors */
server.on('error', function(err) {
	console.log('SERVER error: ' + err);
});

/* Socket connection */
io.on('connection', function(socket) {	
	try {		
		/* Handle connected sockets */
		main.connect(socket);

		/* Handle disconnected sockets */		
		socket.on('disconnect', function() {
			main.disconnect(socket);
		});

		/* Handle socket errors */
		socket.on('error', function(err) {
			main.error(socket, err);
		});
	} catch (e) {
		console.log('APP: ' + e);
	}
});