<?PHP
require ("../autoload.php");

class VerifyToken extends Model {
	public function __construct() {
		parent::__construct();
    }

	public function verify($token) {

		$loader = new \Twig\Loader\FilesystemLoader('../templates');
		$twig = new \Twig\Environment($loader);

		$checkToken = $this->dataBase->uniSelect('mailing',['token'=>$token]);
		
		if ($checkToken) {
			$changeStatus = $this->dataBase->uniUpdate('mailing',['confirm'=>1,'token'=>NULL],['id'=>$checkToken['id']]);
			$template = $twig->loadtemplate('confirmation_success.tpl');
		} else {
			$template = $twig->loadtemplate('confirmation_false.tpl');
		}
		
		$arrayContent = [
		    'email' =>  $checkToken['email'],
		];

		echo $template->render($arrayContent);
	}
}

if (isset($_SERVER) && isset($_GET)) {
	$token = isset($_GET['token']) ? $_GET['token'] : 'error';
	if ($token === 'error') {
		echo '404. Error.';
		exit();
	}
	$verify = new VerifyToken();
	$verify->verify($token); 		
} else {
	echo '404. Error.';
	exit();
}





?>