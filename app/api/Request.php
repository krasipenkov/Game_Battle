<?php

namespace app\api;

class Request {
		
	private $validHttpMethods = array('get', 'post', 'put', 'delete');
	
	private $method;
	
	public function __construct() 
	{
		$this->setHttpRequestMethod();
	}
		
	protected function setHttpRequestMethod()
    {
		
		$this->method = $_SERVER['REQUEST_METHOD'];
		
		if ($this->method == 'POST' && isset($_SERVER['HTTP_X_HTTP_METHOD']))
		{
			if ($_SERVER['HTTP_X_HTTP_METHOD'] == 'DELETE')
			{
				$this->method = 'DELETE';
			}
			else if ($_SERVER['HTTP_X_HTTP_METHOD'] == 'PUT')
			{
				$this->method = 'PUT';
			}
			else
			{
				throw new Exception(API_ERROR_INVALID_METHOD);
			}
		}
    }
	
	public function getHttpRequestMethod() 
	{
		
		return in_array(strtolower($this->method), $this->validHttpMethods) ? $this->method : false;
				
	}
	
	public function getRestUriComponent() {
				
		return ( isset($_REQUEST['_url']) ) ? $_REQUEST['_url'] : false;
		
	}
	
}
