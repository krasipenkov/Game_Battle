<?

namespace app\lib\acl;

use app\lib\db\DB;
use PDO;

class Auth
{
    /**
     *
     */
    const PASSPHRASE = 'rrj2kj1j31R$@$DAS@/89/())"D:S';
    const AUTH_TOKEN_LIFETIME = 864000;
    private $userTable = 'users';


    /**
     * Checks for valid combination of key and secret
     */
    public function login($user, $pass)
    {
        $statement = DB::getInstance()->getPDO()->prepare("SELECT id FROM ".$this->userTable." WHERE email=:email AND password=:password");
        $statement->bindValue(':password', $pass);
        $statement->bindValue(':email', $user);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);

        if($result['id'])
            return true;
        else
            return false;
    }

    /**
     * Generates auth token based on a valid key
     */
    public function generateToken()
    {
        $time = time()+self::AUTH_TOKEN_LIFETIME;
        $data['expires'] = $time;
        $data = json_encode($data);
        $token = self::encryptData($data);
        return $token;
    }

    /**
     * Checks if token is valid
     */
    public function isTokenValid($token)
    {
        $data = json_decode(self::decryptData($token), true);
        if($data['expires'] > time())
        {
            return true;
        }
        return false;
    }

    /**
     * Try to login client - based on API key
     */
    public function tryToLogin()
    {
        $key = '';

        if(isset($_POST['key']))
            $key = $_POST['key'];

        // Check for token in GET/POST
        if(!($_GET['token']) && !($_POST['token']))
        {
            // IF key exists in our DB
            if($this->login($_POST['user'], $_POST['pass']))
            {
                return $this->generateToken();
            }
            else
            {
                return null;
            }
        }
    }

    public static function encryptData($string)
    {
        return self::base64url_encode((mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5(self::PASSPHRASE), $string, MCRYPT_MODE_CBC, md5(self::PASSPHRASE))));
    }

    public static function decryptData($encrypted)
    {
        return rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, md5(self::PASSPHRASE), (self::base64url_decode($encrypted)), MCRYPT_MODE_CBC, md5(self::PASSPHRASE)), "\0");
    }

    public static function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    public static function base64url_decode($data) {
        return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
    }
}