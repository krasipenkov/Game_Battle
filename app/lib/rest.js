function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0)
        {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}

var rest = {
	//url: '/test_api.php/',
    url: '/app/api/',
	
	send: function(method, object, object_id, params, callback)
	{
        var token = readCookie('token');


		if(!object_id)
			object_id = '';

		var url = this.url+object+'/'+object_id+'?token='+token;

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( method, url, true );

        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        console.log(params);
        if(params)
        {
            xmlHttp.setRequestHeader("Content-length", params.length);
        }
        //xmlHttp.setRequestHeader("Connection", "close");


        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var data = JSON.parse(xmlHttp.responseText);
                callback(data);
            }
        }

        xmlHttp.send( params );
	},

	get: function(object, object_id, params, callback)
	{
		//var user = {'name': 'Kostadin Buglow', 'id': '1'};
		//return user;
		return this.send('GET', object, object_id, params, callback);
	},
	
	del: function(object, object_id, callback)
	{
		return this.send('DELETE', object, object_id, callback);
	},
	
	post: function(object, params, callback)
	{
		return this.send('POST', object, '', params, callback);
	},
	
	put: function(object, object_id, params, callback)
	{
		return this.send('PUT', object, object_id, params, callback);
	},

    login: function(user, pass)
    {
        this.send('POST', 'login', '', '', this.setToken);
    },
    setToken: function(resp)
    {
        if(resp.data.token.length > 0)
        {
            var token = resp.data.token;
            document.cookie = 'token='+token;
        }
    }
}


var restResponseHandler = function(){
    this.user = {
        getUser: function(data){
            if(data)
            {
                console.log(data);
            }
        }
    }
};