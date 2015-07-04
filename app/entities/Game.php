<?
namespace app\entities;

class Game
{
    private $fields = 'id, user_1_id, user_2_id, start_date, end_date, winner_id';
    private $table = 'games';


    public function getGameHistory($userId)
    {
        $userId = (int)$userId;
    }

    public function insertGameHistory($data)
    {
        return true;
    }

    public function deleteGameHistory($id)
    {
        $id = (int)$id;
        return true;
    }
}