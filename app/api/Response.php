<?

namespace app\api;

class Response
{

    private $output = array();

    public function __construct(){}

    public function setResponse($data, $error = false)
    {
        if($error) {
            $this->output = ['error' => 1, 'msg' => $data];
            return;
        }
        $this->output = ['data' => $data];
    }

    public function getResponse()
    {
        return $this->_toJSON($this->output);
    }

    public function returnResponse()
    {
        echo $this->_toJSON($this->output);
        exit();
    }

    private function _toJSON($data)
    {
        return json_encode($data);
    }
}