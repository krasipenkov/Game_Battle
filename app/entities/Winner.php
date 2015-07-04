<?
namespace app\entities;

class Winner
{
    private $fields = 'id, user_id, game_id, date_commit';
    private $table = 'winners';


    public function getWinner($userId)
    {
        $userId = (int)$userId;
    }

    public function insertWinner($data)
    {
        return true;
    }

    public function deleteWinner($id)
    {
        $id = (int)$id;
        return true;
    }
}