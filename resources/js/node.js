'use strict';

$(function() {
  var socket = io('localhost:3001');

  /* On connect */
  socket.on('connect', function () {
    console.log('socket connect');
  });

  /* On disconnect */
  socket.on('disconnect', function () {
    console.log('socket disconnect');
  });

  /* On error */
  socket.on('error', function(){
    console.log('socket error');
  });
});
