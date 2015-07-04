<?
namespace app\entities;

class Chat
{
    private $fields = 'id';
    private $table = 'chat';


    public function getChat($id)
    {
        $id = (int)$id;
    }

    public function insertChat($data)
    {
        return true;
    }

    public function deleteChat($id)
    {
        $id = (int)$id;
        return true;
    }
}