'use strict';

module.exports = function(io)
{
	var Lobby = {};

	Lobby.join = function(socket, room) {
		console.log('LOBBY join: [' + socket.id + '] ' + room);
		socket.join(room);
		io.sockets.in(room).emit('lobby_join', socket.id);
	}

	return Lobby;
}