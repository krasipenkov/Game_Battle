'use strict';

var rest = require('./server_rest');
var users = require('./server_users');
var messages = new Array();

module.exports = function()
{
	var Lobby = {
		room: 'Lobby'
	};

	Lobby.join = function(socket, token) 
	{
		console.log('LOBBY loggged: [' + socket.id + '] / user token: ' + token);
		//var user = rest.get('user', token);
		
		var user = Lobby.getFB(token);
		if(token && user.id && user.name)
		{
			io.sockets.in(Lobby.room).emit('newUser', user); // send new user to the room
			
			socket.join(Lobby.room); // join to room
			socket.emit('joined', user);
			users.add(socket, user);
			socket.user_id = user.id;
			socket.user_name = user.name;
			
			console.log("USER LOGGED: "+user.id+ " / "+user.name);
			Lobby.userList();
			game.list(socket);
			
			// load messages
			for(var k in messages)
			{
				socket.emit('newMessage', messages[k]);
			}
		}
	};

	Lobby.message = function(socket, data) 
	{
		console.log('LOBBY message: [' + socket.id + '] ' + data.message);
		io.sockets.in(Lobby.room).emit('newMessage', data);
		rest.post('chat', data);
		
		var count_messages = messages.length;
		if(count_messages == 100)
			messages.splice(0, 1);
		
		messages.push(data);
		console.log(messages);
	};
	
	Lobby.getUsers = function(socket)
	{
		console.log("LOBBY get users");
		var data = { userCount: users.count(), userList: users.list() };
		socket.emit('userList', data);
	}
	
	Lobby.removeUser = function(socket)
	{
		console.log("REMOVE USER: "+socket.user_id);
		users.del(socket.user_id);
		Lobby.userList();
	}
	
	Lobby.userList = function()
	{
		var data = { userCount: users.count(), userList: users.list() };
		io.sockets.in(Lobby.room).emit('userList', data);
	}
	
	Lobby.login = function(user)
	{
		fb[user.id] = {id: user.id, name: user.name};
	}
	
	Lobby.getFB = function(uid)
	{
		return fb[uid];
	}

	return Lobby;
}