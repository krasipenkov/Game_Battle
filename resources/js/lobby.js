'use strict';

var socket = io('192.168.1.59:3001');
var token = gup('token');
var user = {};
var fb_token = '838216586255512|d5b3185abb5b8d442f74ec062eaf189f';

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
			var image = 'https://graph.facebook.com/'+rooms[room].id+'/picture?width=50&height=50&access_token='+fb_token;
			var str = '<div class="row"><img src="'+image+'" alt="'+rooms[room].host+'" title="'+rooms[room].host+'" /><div class="name">'+rooms[room].host+'</div><div class="btnInGame">Join</div></div>';
			$(".gamesHolder").append(str);
		}
	});
	
	/* new message to chat */
	socket.on('newMessage', function(data)
	{
		data.message = filterMessage(data.message);
		var image = 'https://graph.facebook.com/'+data.user.id+'/picture?width=30&height=30&access_token='+fb_token;
		if(user.id == data.user.id)
			var str = '<div class="chatRow main"><img src="'+image+'" alt="'+data.user.name+'" title="'+data.user.name+'" /><div class="text">'+data.message+'</div></div>';
		else
			var str = '<div class="chatRow"><img src="'+image+'" alt="'+data.user.name+'" title="'+data.user.name+'" /><div class="text">'+data.message+'</div></div>';
		
		$(".chatConversationHolder").append(str).animate({ scrollTop: $(document).height() }, "slow");
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
		       var image = 'https://graph.facebook.com/'+u.id+'/picture?width=50&height=50&access_token='+fb_token;
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







/* EMOTICONS */
var emoticons_string = {"(A)":"angel",":-@":"angry",":-[":"bat","(B)":"beer","(Z)":"boy","(":"cake","(P)":"camera","(":"cat","(O)":"clock","(D)":"cocktail",":-S":"confused",":'(":"cry","(C)":"cup","(6)":"devil","(":"dog","(":"dude_hug",":-$":"embarassed","(E)":"email","(":"film","(X)":"girl","(":"girl_hug","(K)":"kiss","(I)":"lightbulb","(L)":"love","(M)":"messenger","(":"note",":-O":"omg","(T)":"phone","(G)":"present","(F)":"rose",":-(":"sad","(H)":"shade",":-)":"smile","(":"star",":-D":"teeth","(N)":"thumbs_down","(Y)":"thumbs_up",":-P":"tongue","(U)":"unlove","(W)":"wilted_rose",";-)":"wink"};
var emoticons = {
	"(A)": "angel",
	"(a)": "angel",
	"O:-)": "angel",
	"O:)": "angel",
	"o:-)": "angel",
	"o:)": "angel",
	":-@": "angry",
	":@": "angry",
	">:-(": "angry",
	">:(": "angry",
	":-[": "bat",
	":[": "bat",
	"(B)": "beer",
	"(b)": "beer",
	"(Z)": "boy",
	"(z)": "boy",
	"(P)": "camera",
	"(p)": "camera",
	"(O)": "clock",
	"(o)": "clock",
	"(D)": "cocktail",
	"(d)": "cocktail",
	":-S": "confused",
	":S": "confused",
	":-s": "confused",
	":s": "confused",
	":'(": "cry",
	":'-(": "cry",
	";-(": "cry",
	";(": "cry",
	"(C)": "cup",
	"(c)": "cup",
	"(6)": "devil",
	">:-)": "devil",
	">:)": "devil",
	"}:->": "devil",
	"}:>": "devil",
	":-$": "embarassed",
	":$": "embarassed",
	"(E)": "email",
	"(e)": "email",
	"(X)": "girl",
	"(x)": "girl",
	"(K)": "kiss",
	"(k)": "kiss",
	":-X": "kiss",
	":X": "kiss",
	":-x": "kiss",
	":x": "kiss",
	"(I)": "lightbulb",
	"(i)": "lightbulb",
	"(L)": "love",
	"(l)": "love",
	"<3": "love",
	"(M)": "messenger",
	"(m)": "messenger",
	":-O": "omg",
	":O": "omg",
	":-o": "omg",
	":o": "omg",
	"(T)": "phone",
	"(t)": "phone",
	"(G)": "present",
	"(g)": "present",
	"(F)": "rose",
	"(f)": "rose",
	":-(": "sad",
	":(": "sad",
	"(H)": "shade",
	"(h)": "shade",
	"8-)": "shade",
	"8)": "shade",
	":-)": "smile",
	":)": "smile",
	":o)": "smile",
	":-D": "teeth",
	":D": "teeth",
	"(N)": "thumbs_down",
	"(n)": "thumbs_down",
	"(Y)": "thumbs_up",
	"(y)": "thumbs_up",
	":-P": "tongue",
	":P": "tongue",
	":-p": "tongue",
	":p": "tongue",
	"(U)": "unlove",
	"(u)": "unlove",
	"(W)": "wilted_rose",
	"(w)": "wilted_rose",
	";-)": "wink",
	";)": "wink"
};


var filterMessage = function(string)
{
	for(var i in emoticons)
	{
		string = replaceAll(string, i, '<div class="sprite '+emoticons[i]+'"></div>');
	}

	return string;
}

var replaceAll = function( string, find, replace ) 
{
    return string.replace(new RegExp(escapeRegExp(find), 'gi'), replace);
}

var escapeRegExp = function( string ) 
{
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}