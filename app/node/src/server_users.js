'use strict';


/*
 * 
 */
var Users = {};

/*
 * 
 */
Users.userlist = [];

/*
 * 
 */
Users.add = function (socket, user) {
	Users.userlist[user.id] = { user: user, socket_id: socket.id };
}

/*
 * 
 */
Users.del = function (id) {
	delete Users.userlist[id];
}

/*
 * 
 */
Users.get = function (name) {
	return Users.userlist[name];
}

/*
 * 
 */
Users.count = function () {
	return Users.userlist.length;
}

/*
 * 
 */
Users.list = function () {
	return Object.keys(Users.userlist);
}

/*
 * 
 */
Users.listtv = function () {
	var tvs = Object.keys(Users.userlist);
	
	for(var i = tvs.length - 1; i >= 0; i--) {
		if(tvs[i].substring(0, 3) == "WWW") {
		   tvs.splice(i, 1);
		}
	}
	
	return tvs;
}

/* */
module.exports = Users;