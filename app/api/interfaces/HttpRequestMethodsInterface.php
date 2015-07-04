<?php

namespace app\api\interfaces;

interface HttpRequestMethodsInterface 
{
	
	public function get();
	
	public function post();
	
	public function put();
	
	public function delete();
	
}