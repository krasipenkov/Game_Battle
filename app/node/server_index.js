'use strict';

var server = require('http').createServer();
global.io = require('socket.io')(server);
global.users = require('./src/server_users');
global.main = require('./src/server_main')();
global.lobby = require('./src/server_lobby')();
global.game = require('./src/server_game')();

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
io.on('connection', function(socket) 
{	
	try {		
		/* SOCKET FUNCTIONS */

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

		/* Handle lobby join */
		socket.on('lobby_join', function(token) {
			lobby.join(socket, token);
		});

		/* Handle lobby message */		
		socket.on('lobby_message', function(data) {
			lobby.message(socket, data);
		});

		/* Handle lobby users */		
		socket.on('lobby_users', function() {
			lobby.getUsers(socket);
		});

		/* GAME FUNCTIONS */

		/* Handle game open */
		socket.on('game_open', function(data) {
			game.open(socket, data);
		});

		/* Handle game open */
		socket.on('game_list', function() {
			game.list(socket);
		});
	} 
	catch (e) 
	{
		dumpError(e);
	}
});


function log(err) 
{
	if (typeof err === 'object') 
	{
		if (err.message) 
		{
			console.log('Message: ' + err.message)
		}
		
		if (err.stack) 
		{
			console.log('Stacktrace:')
			console.log('====================')
			console.log(err.stack);
		}
	} 
	else 
	{
		console.log(err);
	}
}