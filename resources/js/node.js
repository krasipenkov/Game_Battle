'use strict';

$(function() {
  var socket = io('localhost:3001');

  /* socket connect */
  socket.on('connect', function () {
    console.log('socket connect');
  });

  /* socket disconnect */
  socket.on('disconnect', function () {
    console.log('socket disconnect');
  });

  /* socket error */
  socket.on('error', function(){
    console.log('socket error');
  });
});
