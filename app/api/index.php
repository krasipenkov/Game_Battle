<?

require_once '../config/config.inc.php';
require_once '../config/error.consts.php';

require_once LIB_PATH.'db/DB.php';
require_once ENTITIES_PATH.'User.php';
require_once API_PATH.'Response.php';

use app\config\Config;
use app\lib\db\DB;
use app\api\Response;

DB::getInstance();



use app\entities\User;

$user = new User();
$data = ($user->getUser());
$response = new Response($data);

echo $response->getResponse();

