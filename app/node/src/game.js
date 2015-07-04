'use strict';

module.exports = function(io)
{
	var Game = {};

	Game.open = function(socket) {
		console.log('GAME open: [' + socket.id + ']');
	};

	return Game;
}