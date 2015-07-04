'use strict';

module.exports = function()
{
	var Game = {};

	Game.games = {};

	Game.open = function(socket, data) {
		console.log('GAME open: [' + socket.id + '] ' + data);

		Game.games[socket.user_id] = { 
			id: socket.user_id,
			host: socket.user_name
		};

		Game.list(socket);
	};

	Game.list = function(socket) {
		console.log('GAME list: [' + socket.id + '] ' + JSON.stringify(Game.games));
		io.sockets.in(lobby.room).emit('game_list', JSON.stringify(Game.games));
	};

	Game.delete = function(socket) {
		console.log('GAME delete: [' + socket.id + ']');
		delete Game.games[socket.user_id];
		io.sockets.in(lobby.room).emit('game_list', JSON.stringify(Game.games));
	};

	return Game;
}