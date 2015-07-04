<?php

use app\api\Router;
use app\api\Request;
use app\lib\acl\Auth;
use app\api\Response;

require 'core/autoload.php';

$Auth = new Auth();
$Response = new Response();

$r = new Router(new Request);

// Only if token valid
if($Auth->isTokenValid($_GET['token'])) {

    $r->map('get', '/user', 'getUser');
    $r->map('post', '/user', 'insertUser');
    $r->map('put', '/user/([0-9]+)', 'updateUser/$1');
    $r->map('delete', '/user/([0-9]+)', 'deleteUser/$1');

    $r->map('get', '/chat/([0-9]+)', 'getUser/$1');
    $r->map('post', '/chat', 'insertUser');
    $r->map('put', '/chat', 'updateUser/$1');
    $r->map('delete', '/chat/([0-9]+)', 'deleteUser/$1');

    try {
        $data = $r->execute();
    }
    catch (Exception $e)
    {
        $Response->setResponse($e->getMessage(), true);
        $Response->returnResponse();
    }

    $Response->setResponse($data);
    $Response->returnResponse();
}

$r->map('post', '/login', function(){
    $Auth = new Auth();
    $Response = new Response();

    //$_POST['user'] = 'djamal@tarasoft.bg';
    //$_POST['pass'] = 'a8f5f167f44f4964e6c998dee827110c';
    $Response->setResponse(['token' => $Auth->tryToLogin()]);
    $Response->returnResponse();
});

try {
    $data = $r->execute();
}
catch (Exception $e)
{
    $Response->setResponse($e->getMessage(), true);
    $Response->returnResponse();
}

$Response->setResponse('Not authenticated!', true);
$Response->returnResponse();


