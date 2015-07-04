var request = require('sync-request');

var rest = {};

rest.url = 'http://localhost/test_api.php';
	
rest.send = function(method, object, object_id, params)
{
	if(!object_id)
		object_id = '';
	
	var url = this.url+object+'/'+object_id;
	
	var res = request(method, 'http://localhost/test_api.html');
	if( res.statusCode == '200' )
	{
		return res.body;
	}

	return false;
};

rest.get = function(object, object_id)
{
	var user = new Array();
	user[1] = {'name': 'Kostadin Buglow', 'id': '1'};
	user[2] = {'name': 'Djamal', 'id': '2'};
	user[3] = {'name': 'Iwan', 'id': '3'};
	return user[object_id];
	return this.send('GET', object, object_id);
};

rest.del = function(object, object_id)
{
	return this.send('DELETE', object, object_id);
};

rest.post = function(object, params)
{
	return this.send('POST', object, '', params);
};

rest.put = function(object, object_id, params)
{
	return this.send('PUT', object, object_id, params);
};

module.exports = rest;