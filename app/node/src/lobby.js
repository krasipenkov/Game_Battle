'use strict';

module.exports = function(io)
{
	var Lobby = {};

	Lobby.join = function(socket) {
		console.log('LOBBY join: [' + socket.id + ']');
	}

	return Lobby;
}