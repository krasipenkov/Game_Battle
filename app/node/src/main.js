'use strict';

module.exports = function(io)
{
	var Main = {};

	Main.connect = function(socket) {
		console.log('MAIN connect: [' + socket.id + ']');
	}

	Main.disconnect = function(socket) {
		console.log('MAIN disconnect: [' + socket.id + ']');
	}

	return Main;
}