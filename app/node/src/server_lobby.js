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
			io.sockets.in(Lobby.room).emit('newUser', user); // send new user to the room
			
			socket.join(Lobby.room); // join to room
			socket.emit('joined', user);
			users.add(socket, user);
			
			console.log("USER LOGGED: "+user.id+ " / "+user.name);
		}
	};

	Lobby.message = function(socket, data) 
	{
		console.log('LOBBY message: [' + socket.id + '] ' + data.message);
		io.sockets.in(Lobby.room).emit('newMessage', data);
		console.log('rest resp: '+rest.post('chat', data));
	};
	
	Lobby.getUsers = function(socket)
	{
		console.log("LOBBY get users");
		var data = { userCount: users.count, userList: users.list };
		socket.emit('userList', data);
	}

	return Lobby;
}