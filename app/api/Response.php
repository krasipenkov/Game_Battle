<?

namespace app\api;

class Response
{

    private $output = array();

    public function __construct($data, $error = false)
    {
        if($error) {
            $this->output = ['error' => 1, 'msg' => ''];
            return;
        }
        $this->output = ['data' => $data];
    }

    public function getResponse()
    {
        return $this->_toJSON($this->output);
    }

    private function _toJSON($data)
    {
        return json_encode($data);
    }
}