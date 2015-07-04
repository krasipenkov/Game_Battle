'use strict';

var socket = io('localhost:3001');
var token = gup('token');
var user = {};

$(function() 
{
	/* socket connect */
	socket.on('connect', function () 
	{
		log('socket connect');
		joinLobby();
	});

	/* socket disconnect */
	socket.on('disconnect', function () {
		log('socket disconnect');
	});

	/* socket error */
	socket.on('error', function(){
		log('socket error');
	});

	/* socket lobby_join */
	socket.on('lobby_join', function(data)
	{
		log('socket lobby_join: ' + data);
	});
	
	/* socket on joined */
	socket.on('joined', function(u)
	{
		user = u;
		log('im logged');
		sendMessage();
	})
	
	/* new user joined to chat */
	socket.on('newUser', function(user)
	{
		log('new user');
	});
	
	/* new message to chat */
	socket.on('newMessage', function(data)
	{
		log('new message: '+data);
	});
	
	/* get user list */
	socket.on('userList', function(data)
	{
		log('getting user list');
		console.log(data);
	});
});

function getUsers()
{
	socket.emit('lobby_users');
}

function sendMessage()
{
	if(user.id && user.name)
	{
		var message = "Tetetete";
		var data = {message: message, user: user};
		
		log('add message to chat: '+message);
		socket.emit('lobby_message', data);
	}
}

function joinLobby()
{
	socket.emit('lobby_join', token);
	log("send join command to lobby");
}

function log(m)
{
	console.log(m);
}