<?
namespace app\lib\db;

use PDO;
use app\config\Config;

class DB
{
    private static $instance = null;

    private $pdo = null;

    private function __construct()
    {
    }

    static function getInstance()
    {
        if( !isset(self::$instance))
        {
            self::$instance = new self;
            self::$instance->pdo = new PDO('mysql:host='.config::$db['host'].';dbname='.config::$db['dbname'], config::$db['user'], config::$db['password']);
        }

        return self::$instance;
    }

    public function getAll()
    {

    }

    public function getRow()
    {

    }

    public function deleteRow()
    {

    }

    public function insertRow()
    {

    }

    public function updateRow()
    {

    }

    public function getPDO()
    {
        return $this->pdo;
    }

    public function prepareArrayData($data)
    {
        $array = [];
        if($data)
            foreach($data as $key => $item)
            {
                $array[':'.$key] = $item;
            }
        return $array;
    }

    public function closeConnection()
    {
        $this->pdo = null;
    }
}