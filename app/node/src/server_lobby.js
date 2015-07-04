'use strict';

var rest = require('./server_rest');
var users = require('./server_users');

module.exports = function(io)
{
	var Lobby = {
		room: 'Lobby'
	};

	Lobby.join = function(socket, token) 
	{
		console.log('LOBBY loggged: [' + socket.id + '] / user token: ' + token);
		var user = rest.get('user', token);
		if(user.id && user.name)
		{
			socket.emit('joined', user);
			
			socket.join(Lobby.room); // join to room
			io.sockets.in(Lobby.room).emit('newUser', user); // send new user to the room
			
			users.add(socket, user);
			
			console.log("USER LOGGED: "+user.id+ " / "+user.name);
		}
	};

	Lobby.message = function(socket, data) {
		console.log('LOBBY message: [' + socket.id + '] ' + data);
		io.sockets.in(Lobby.room).emit('lobby_message', data);
	};

	return Lobby;
}