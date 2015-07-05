<?php 

namespace app\api;

use app\entities as ent;

class Router {
	
	private $routesArray;
	private $method;
	private $uri;
    private $requestData;
	
	public function __construct(Request $request) 
	{
		$this->method 	= $request->getHttpRequestMethod();
		$this->uri 		= $request->getRestUriComponent();
        $this->requestData     = $request->data;
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
        $this->uri = trim($this->uri, '/');

		foreach( $this->routesArray[strtolower($this->method)] as $route ) {
			if ( preg_match( '~^' . $route['pattern'] . '$~i', $this->uri, $params ) ) {

                switch ($route['callback'])
                {
                    case $route['callback'] instanceof \Closure:
                        $route['callback']();
                        break;
                    default:
                        $node = ucfirst(explode('/', $this->uri)[0]);
                        $n = 'app\\entities\\'.$node;
                        $u = new $n($this->requestData);
                        $funcParams = $params;
                        array_shift($funcParams);
                        return $this->callFunc($u, explode('/', $route['callback'])[0], $funcParams);
                        break;
                }

			}
		}
		
	}

    private function callFunc($object, $func, $params)
    {
        $countArgs = count($params);

        // Using switch because it save us execution time instead using for example call_user_func_array
        switch($countArgs)
        {
            case 0:
                return ($object->$func());
                break;
            case 1:
                return ($object->$func($params[0]));
                break;
            case 2:
                return ($object->$func($params[0], $params[1]));
                break;
            case 3:
                return ($object->$func($params[0], $params[1], $params[2]));
                break;
        }
    }
}

spl_autoload_register(function($class) {

	$class = str_replace('app\\', '', $class);
    $class = str_replace('\\', '/', $class);

	$entityClassFilePath =   LOCALPATH.$class . '.php';

	if(is_file($entityClassFilePath)) {
		require_once $entityClassFilePath;
	}
	
});