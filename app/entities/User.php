<?
namespace app\entities;

use app\lib\db\DB;
use PDO;
use Exception;

class User
{
    private $fields = 'id, email, password, username, date_entered';
    private $table = 'users';


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
        $statement = DB::getInstance()->prepare("SELECT ".$this->fields." FROM ".$this->table." WHERE 1 $where");
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

    public function insertUser($data)
    {
        $id = (int)$id;


        $parameters = array();
        $updateArray = array();

        if(isset($data['title']))
        {
            $updateArray[] = 'title=:title';
            $parameters[':title'] = $data['title'];
            //$statement->bindValue(':title', $data['title'], PDO::PARAM_STR);
        }
        if(isset($data['text']))
        {
            $updateArray[] = 'text=:text';
            $parameters[':text'] = $data['text'];
            //$statement->bindValue(':text', $data['text'], PDO::PARAM_STR);
        }
        if(isset($data['date']))
        {
            $data['date'] = date('Y-m-d', strtotime($data['date']));
            $updateArray[] = 'date=:date';
            $parameters[':date'] = $data['date'];
            //$statement->bindValue(':date', $data['date'], PDO::PARAM_STR);
        }
        if($updateArray)
        {
            $parameters[':id'] = $id;
            $statement = DB::getInstance()->prepare("UPDATE '.$this->table.' SET ".implode(',', $updateArray)." WHERE id=:id");

            $result = $statement->execute($parameters);

            if($statement->rowCount())
            {
                return 'success';
            }
            else
            {
                if($this->getNode($id))
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

    public function getUsers()
    {
        $users = [];
        return $users;
    }

    public function deleteUser($id)
    {
        $id = (int)$id;
        $statement = DB::getInstance()->prepare("DELETE FROM '.$this->table.' WHERE id=:id");
        $statement->bindValue(':id', $id, PDO::PARAM_INT);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);

        if($statement->rowCount())
        {
            return true;
        }
        else
        {
            if(!$this->getNode($id))
            {
                throw new Exception(API_ERROR_NOT_EXISTING_NODE_ID.$id);
            }
        }
        return false;
    }




}