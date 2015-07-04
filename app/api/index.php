<?php

use app\api\Router;
use app\api\Request;

require 'core/autoload.php';

$r = new Router(new Request);

$r->map('get', '/user/([0-9]+)', 'getUsers/$1');
$r->map('post', '/user/', 'insertUser');
$r->map('put', '/user/', 'updateUser/$1');
$r->map('delete', '/user/([0-9]+)', 'deleteUser/$1');

$r->map('get', '/chat/([0-9]+)', 'getUsers/$1');
$r->map('post', '/chat/', 'insertUser');
$r->map('put', '/chat/', 'updateUser/$1');
$r->map('delete', '/chat/([0-9]+)', 'deleteUser/$1');

$r->execute();
