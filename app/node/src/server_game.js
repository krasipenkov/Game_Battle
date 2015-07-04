'use strict';

module.exports = function(io)
{
	var lobby = require('./server_lobby')(io);

	var Game = {};

	var games = {};

	Game.open = function(socket) {
		console.log('GAME open: [' + socket.id + ']');

		Game.games[socket.user_id] = { 
			id: socket.user_id,
			host: socket.user_name
		};

		
	};

	Game.list = function(socket) {
		console.log('GAME list: [' + socket.id + ']');
		io.sockets.in(Lobby.room).emit('game_list', Game.games);
	};

	return Game;
}