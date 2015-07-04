'use strict';

var socket = io('192.168.1.59:3001');
var token = gup('token');
var user = {};
var image = 'http://i00.i.aliimg.com/wsphoto/v0/32296824042/Popular-font-b-Steven-b-font-font-b-Gerrard-b-font-Printed-font-b-Poster-b.jpg';

$(function() 
{
	$('#lobby_msg').keypress(function(e) 
	{
	    if(e.which == 13) {
	    	LobbySendMessage();
	    }
	});
});

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
	})
	
	/* new user joined to chat */
	socket.on('newUser', function(user)
	{
		log('new user');
		getUsers();
	});
	
	/*  */
	socket.on('game_list', function(rooms)
	{
		log('game_list: ' + rooms);
		rooms = JSON.parse(rooms);

		$(".gamesHolder").html('');

		for (var room in rooms)
		{
			var str = '<div class="row"><img src="'+image+'" alt="'+rooms[room].host+'" title="'+rooms[room].host+'" /><div class="name">'+rooms[room].host+'</div><div class="btnInGame">Join</div></div>';
			$(".gamesHolder").append(str);
		}
	});
	
	/* new message to chat */
	socket.on('newMessage', function(data)
	{
		if(user.id == data.user.id)
			var str = '<div class="chatRow main"><img src="'+image+'" alt="'+data.user.name+'" title="'+data.user.name+'" /><div class="text">'+data.message+'</div></div>';
		else
			var str = '<div class="chatRow"><img src="'+image+'" alt="'+data.user.name+'" title="'+data.user.name+'" /><div class="text">'+data.message+'</div></div>';
		
		$(".chatConversationHolder").append(str);
	});
	
	/* get user list */
	socket.on('userList', function(data)
	{
		log('getting user list');
		$("#userCount").html('PLAYERS: '+data.userCount+' online');
		var user_string = '';
		
		for (var key in data.userList) 
		{
		   if (data.userList.hasOwnProperty(key)) 
		   {
		       var obj = data.userList[key];
		       var u = obj.user;
		       user_string = user_string + '<div class="row"><img src="'+image+'" alt="'+u.name+'" title="'+u.name+'" /><div class="name">'+u.name+'</div></div>';
		    }
		}
		
		$("#userList").html(user_string);
	});


	$("#btnCreateGame").click(function() {
		$(this).hide();
		socket.emit('game_open', JSON.stringify(user));
		log("send game_open: " + JSON.stringify(user));
	});

});

function getUsers()
{
	socket.emit('lobby_users');
}

function LobbySendMessage()
{
	var message = $("#lobby_msg").val();
	
	if(user.id && user.name && message)
	{
		var data = {message: message, user: user};
		
		log('add message to chat: '+message);
		socket.emit('lobby_message', data);
		$("#lobby_msg").val('');
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