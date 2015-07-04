'use strict';

module.exports = function(io)
{
	var lobby = require('./server_lobby')(io);

	var Main = {};

	Main.connect = function(socket) {
		console.log('SOCKET connect: [' + socket.id + ']');
	};

	Main.disconnect = function(socket) {
		console.log('SOCKET disconnect: [' + socket.id + ']');
		lobby.removeUser(socket);
	};

	Main.socket_error = function(socket, err) {
		console.log('SOCKET error: [' + socket.id + ']' + err);
	};

	Main.server_listen = function(port) {
		console.log('SERVER listen: Server listening at port ' + port);
	};

	Main.server_error = function(err) {
		console.log('SERVER error: ' + err);
	};

	return Main;
}