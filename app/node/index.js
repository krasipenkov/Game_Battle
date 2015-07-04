'use strict';

var server = require('http').createServer();
var io = require('socket.io')(server);
var users = require('./src/users');
var main = require('./src/main')(io);
var lobby = require('./src/lobby')(io);
var game = require('./src/game')(io);

var port = 3001;

/* Start server */
server.listen(port, function() {
	main.server_listen(port);
});

/* Handle server errors */
server.on('error', function(err) {
	main.server_error(err);
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
			main.socket_error(socket, err);
		});
		
		/* LOBBY FUNCTIONS */	
		socket.on('lobby_join', function(token) {
			lobby.join(socket, token);
		});

		/* Handle lobby message */		
		socket.on('lobby_message', function(data) {
			lobby.message(socket, data);
		});

		/* GAME FUNCTIONS */
		socket.on('game_open', function() {
			game.open(socket);
		});
	} catch (e) {
		dumpError(e);
	}
});

function dumpError(err) {
  if (typeof err === 'object') {
    if (err.message) {
      console.log('\nMessage: ' + err.message)
    }
    if (err.stack) {
      console.log('\nStacktrace:')
      console.log('====================')
      console.log(err.stack);
    }
  } else {
    console.log(err);
  }
}