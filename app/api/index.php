<?php

use app\api\Router;
use app\api\Request;
use app\lib\acl\Auth;
use app\api\Response;

require 'core/autoload.php';

$Auth = new Auth();
$Response = new Response();

// Only if token valid
if($Auth->isTokenValid($_GET['token'])) {
    $r = new Router(new Request);

    $r->map('get', '/user/([0-9]+)', 'getUser/$1');
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
        $Response->setResponse($e->getMessage());
        $Response->returnResponse();
    }

    $Response->setResponse($data);
    $Response->returnResponse();
}
$Response->setResponse('Not authenticated!', true);
$Response->returnResponse();


