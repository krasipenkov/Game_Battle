'use strict';

var rest = require('./rest');
var users = require('./users');

module.exports = function(io)
{
	var Lobby = {
		room: 'Lobby'
	};

	Lobby.join = function(socket, token) 
	{
		console.log('LOBBY loggged: [' + socket.id + '] ' + user.name);
		socket.join(Lobby.room);
		io.sockets.in(Lobby.room).emit('lobby_join', user);
		users.add(socket, user);
	};

	Lobby.message = function(socket, data) {
		console.log('LOBBY message: [' + socket.id + '] ' + data);
		io.sockets.in(Lobby.room).emit('lobby_message', data);
	};

	return Lobby;
}