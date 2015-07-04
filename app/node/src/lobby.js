'use strict';

module.exports = function(io)
{
	var Lobby = {
		room: 'Lobby'
	};

	Lobby.join = function(socket) {		
		socket.join(Lobby.room);
		io.sockets.in(Lobby.room).emit('lobby_join', socket.id);
	};

	Lobby.message = function(socket, data) {
		console.log('LOBBY message: [' + socket.id + '] ' + data);
	};

	return Lobby;
}