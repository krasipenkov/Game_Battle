var rest = {
	url: 'http://localhost/test_api.php',
	
	send: function(method, object, object_id, params)
	{
		if(!object_id)
			object_id = '';
		
		var url = this.url+object+'/'+object_id;
		
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( method, url, true );
		
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.setRequestHeader("Content-length", params.length);
		http.setRequestHeader("Connection", "close");
		
		xmlHttp.send( params );
		return xmlHttp.responseText;
	},

	get: function(object, object_id)
	{
		return this.send('GET', object, object_id);
	},
	
	del: function(object, object_id)
	{
		return this.send('DELETE', object, object_id);
	},
	
	post: function(object, params)
	{
		return this.send('POST', object, '', params);
	},
	
	put: function(object, object_id, params)
	{
		return this.send('PUT', object, object_id, params);
	}
}