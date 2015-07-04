'use strict';

var server = require('http').createServer();
var io = require('socket.io')(server);

var port = 3001;

/* Start server */
server.listen(port, function() {
	console.log('APP: Server listening at port ' + port);
});

/* Handle server errors */
server.on('error', function(err) {
	console.log('APP:' + err);
});

/* Handle connected sockets */
io.on('connection', function(socket) {	
	try {		
		main.connect(socket);

		/* Handle disconnected sockets */
		socket.on('disconnect', function() {

		});

		/* Handle socket errors */
		socket.on('error', function(err) {
			console.log('APP: ' + err);
		});
	} catch (e) {
		console.log('APP: ' + err);
	}
});