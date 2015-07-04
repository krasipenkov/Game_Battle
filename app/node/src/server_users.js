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

/* */
module.exports = Users;