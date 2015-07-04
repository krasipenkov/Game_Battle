'use strict';

var socket = io('localhost:3001');
var token = gup('token');

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
});

function joinLobby()
{
	socket.emit('lobby_join', token);
	log("send join command to lobby");
}

function log(m)
{
	console.log(m);
}