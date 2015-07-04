<?php 

namespace app\api;

use app\entities\User as Entity;

class Router {
	
	private $routesArray;
	private $method;
	private $uri;
	
	public function __construct(Request $request) 
	{
		$this->method 	= $request->getHttpRequestMethod();
		$this->uri 		= $request->getRestUriComponent();
	}

	public function map($method, $route, $target)
	{
		$this->routesArray[strtolower($method)][] = array(
			'method' 	=> $method, 
			'pattern' 	=> trim($route, '/'), 
			'callback'	=> $target
		);
	}
	
	public function execute() {
		
		foreach( $this->routesArray[strtolower($this->method)] as $route ) {
			if ( preg_match( '~^' . $route['pattern'] . '$~i', $this->uri, $params ) ) {
				$u = new Entity;
				var_dump($u);
			}
		}
		
	}
	
}

spl_autoload_register(function($class) {
	
	$class = str_replace('app\\', '', $class);
	
	$entityClassFilePath = LOCALPATH . $class . '.php';
	
	if(is_file($entityClassFilePath)) {
		require_once $entityClassFilePath;
	}
	
});