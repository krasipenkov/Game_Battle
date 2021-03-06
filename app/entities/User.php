<?
namespace app\entities;

use app\lib\db\DB;
use PDO;
use Exception;




class User
{
    private $fields = 'id, email, password, username, date_entered';
    private $table = 'users';

    private $requestData = null;

    public function __construct($data)
    {
        $this->requestData = $data;
    }

    public function getUser($id = 0)
    {
        $id = (int)$id;
        $where = '';
        $params = array();
        if($id)
        {
            $where .= ' AND id=:id ';
            $params[':id'] = $id;
        }
        $statement = DB::getInstance()->getPDO()->prepare("SELECT ".$this->fields." FROM ".$this->table." WHERE 1 $where");
        $statement->execute($params);

        if($id)
            $result = $statement->fetch(PDO::FETCH_ASSOC);
        else
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        if(!$result)
        {
            throw new Exception(API_ERROR_NOT_EXISTING_NODE_ID.$id);
        }
        return $result;
    }

    public function updateUser($id)
    {
        $id = (int)$id;

        $data = $this->requestData;
        $parameters = array();
        $updateArray = $data;


        $parameters = DB::getInstance()->prepareArrayData($data);

        if($updateArray)
        {
            $parameters[':id'] = $id;

            $statement = DB::getInstance()->getPDO()->prepare("UPDATE ".$this->table." SET ".DB::getInstance()->buildUpdateFields(($updateArray))." WHERE id=:id");

            $result = $statement->execute($parameters);

            if($statement->rowCount())
            {
                return 'success';
            }
            else
            {
                if($this->getUser($id))
                {
                    throw new Exception(API_ERROR_NO_CHANGES_TO_BE_MADE);
                }
                else
                    throw new Exception(API_ERROR_NOT_EXISTING_NODE_ID.$id);
            }
        }
        else
        {
            throw new Exception(API_ERROR_PASS_VALID_FIELDS_TO_UPDATE);
        }
    }

    public function insertUser()
    {
        $parameters = array();
        $data = $this->requestData;
        $updateArray = $data;

        $parameters = DB::getInstance()->prepareArrayData($data);

        if($updateArray)
        {
            $statement = DB::getInstance()->getPDO()->prepare("INSERT INTO ".$this->table." ( ".implode(',', array_keys($updateArray))." ) VALUES ( :".implode(',:', array_keys($updateArray))." )");

            $result = $statement->execute($parameters);

            if($statement->rowCount())
            {
                return 'success';
            }
            else
            {
                if($this->getUser($id))
                {
                    throw new Exception(API_ERROR_NO_CHANGES_TO_BE_MADE);
                }
                else
                    throw new Exception(API_ERROR_NOT_EXISTING_NODE_ID.$id);
            }
        }
        else
        {
            throw new Exception(API_ERROR_PASS_VALID_FIELDS_TO_UPDATE);
        }
    }

    public function deleteUser($id)
    {
        $id = (int)$id;
        $statement = DB::getInstance()->getPDO()->prepare("DELETE FROM ".$this->table." WHERE id=:id");
        $statement->bindValue(':id', $id, PDO::PARAM_INT);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);

        if($statement->rowCount())
        {
            return true;
        }
        else
        {
            if(!$this->getUser($id))
            {
                throw new Exception(API_ERROR_NOT_EXISTING_NODE_ID.$id);
            }
        }
        return false;
    }




}