'use strict';

$(function() 
{
	var token = gup('token');
	log('token is: '+token);
	var socket = io('localhost:3001');

	/* socket connect */
	socket.on('connect', function () 
	{
		log('socket connect');
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
	
	socket.emit('lobby_join', token);
});

function log(m)
{
	console.log(m);
}