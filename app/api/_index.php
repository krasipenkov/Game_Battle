<?

require_once '../config/config.inc.php';
require_once '../config/error.consts.php';

require_once LIB_PATH.'db/DB.php';
require_once ENTITIES_PATH.'User.php';
require_once API_PATH.'Response.php';
require_once LIB_PATH.'acl/Auth.php';

use app\config\Config;
use app\lib\db\DB;
use app\api\Response;


DB::getInstance();

//$statement = DB::getInstance()->getPDO()->prepare("SELECT * FROM users");
//$statement->execute();

use app\entities\User;

$user = new User();
//$data = ($user->getUser());


$_POST['user'] = 'djamal@tarasoft.bg';
$_POST['pass'] = 'a8f5f167f44f4964e6c998dee827110c';

$response = new Response($user->login());
echo $response->getResponse();
die;

//$user->deleteUser(31);

//$user->insertUser(['fid' => 1, 'email' => 'dsadsada', 'password' => '32132123', 'username' => '32131231', 'date_entered' => '111111']);


//$auth = new Auth();
//$auth->login('djamal@tarasoft.bg', 'a8f5f167f44f4964e6c998dee827110c');

$response = new Response($data);

//echo $response->getResponse();

