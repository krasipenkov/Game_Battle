<?
namespace app\config;

define('LOCALPATH', substr(dirname(__FILE__), 0, -6));
define('ENTITIES_PATH', LOCALPATH.'entities/');
define('LIB_PATH', LOCALPATH.'lib/');
define('API_PATH', LOCALPATH.'api/');

class Config
{
    public static $db = array(
        'host'      => '192.168.1.27',
        'user'      => 'gamedev',
        'dbname'    => 'gamedev',
        'password'  => 'xnXV3hGjH4GBLEYH'
    );
}



