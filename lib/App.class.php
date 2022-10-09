<?php
class App {
	
	public function __construct() {
    }

	public function init() {
		/*установка часового пояса*/	
		date_default_timezone_set('Europe/Moscow');
		
		if (isset($_SERVER) && !empty($_POST)) {
			$this->api($_POST);		
		}
		if (isset($_SERVER) && isset($_GET)) {
			$this->web($_GET['path'] ?? '');
		}
	}
	
	//http://site.ru/index.php?path=news/edit/5

	/**
	 * @throws Throwable
	 * @throws \Twig\Error\SyntaxError
	 * @throws \Twig\Error\RuntimeError
	 * @throws \Twig\Error\LoaderError
	 */
	protected function web($url) {
		$newGen = new SomeGenerator();
		$_SESSION['h'] = $newGen->genHash(strtotime('now'));

		// if (empty($_SESSION['referrer'])) {
		//     $_SESSION['referrer'] = $_SERVER['REQUEST_URI'];
		//     $_SESSION['request'] = $_SERVER['REQUEST_URI'];
		// } else {
		// 	$_SESSION['referrer'] = $_SESSION['request'];
		//     $_SESSION['request'] = $_SERVER['REQUEST_URI'];
		// }
		// if (!empty($_SESSION['user'])) {
		// 	$userModel = new UserModel();
		// 	$userModel->addPageToUserHistory($_SESSION['user']['id'], $_SESSION['request']);
		// }

		/*парсинг строки*/
		$url= explode("/",$url);

		if (!empty($url[0])) {
			$_GET['page']=$url[0];//часть имени контроллера
			if (isset($url[1])) {
				if (is_numeric($url[1])) {
					$_GET['id']=$url[1];
				} else {
					$_GET['action']=$url[1];	
				}	
				if (isset($url[2]))	{
					$_GET['id']=$url[2];
				}
			}				
		} else {
			$_GET['page'] = 'Index';	
		}

		$_SESSION['vk_token'] = $_SESSION['vk_token'] ?? $_SESSION['vk_token'];
		//$_GET['page']='Index';	
		/*парсинг строки*/	
		/*поиск контролера*/
		if (isset($_GET['page'])) {
			$controllerName = ucfirst($_GET['page'])."Controller";
		//	echo ($controllerName)."<br>";
			$methodName = $_GET['action'] ?? 'index';
		//	echo ($methodName)."<br>";
			$controller = new $controllerName(); //создаем контролер класса с указанным именем
		/*поиск контролера*/	
		/*формирование контроллером данных для шаблона*/	
			$data = [
					'content' => $controller->$methodName($_GET),
					'mainTitle' => $controller->mainTitle, 
					'head' => $controller->headcontent,
					'title' => $controller->title,
					'menu' => $controller->showMenu(),
					'pagename' => $controller->pageName,
					'userCheck'=> $controller->checkUser(),   //проверка юзера
					'user'=> $_SESSION['user']['login'],
			];
		/*формирование контроллером данных для шаблона*/		
		/*вытаскивание из контроллера название шаблона и подгрузка twig*/
			$view = $controller->view.'.tpl';
			$loader = new \Twig\Loader\FilesystemLoader('../templates');
			$twig = new \Twig\Environment($loader);
			$template = $twig->loadtemplate($view);
			echo $template->render($data);	
		/*вытаскивание из контроллера название шаблона и подгрузка twig c отрисовкой страницы с посланными данными*/
		}

	}	

	protected function api($post) {
		$postHeaders = getallheaders();
		// if ($postHeaders['Origin'] === 'https://randomizer.me' || $postHeaders['Host'] === 'randomizer.me' ||
			// $postHeaders['Origin'] === 'http://randomizer' || $postHeaders['Host'] === 'randomizer') {
		if (true) {

			if (isset($post['apiMethod'])) {
				$methodName = $post['apiMethod'];
				$model = new ApiMethod($methodName); //создаем модель класса api
				if (!method_exists($model, $methodName)) {
					// header('Content-Type: application/json; charset=utf-8');
					echo json_encode([
						'error' => true,
						'error_text' => 'Api метод "' . $methodName . '" не существует!',
						'data' => null
					], JSON_UNESCAPED_UNICODE);
					exit();
				}
				$data = $model->$methodName(); 
				exit();	
			} else {
				header('Content-Type: application/json; charset=utf-8');
				echo json_encode([
					'error' => true,
					'error_text' => 'Не передан api метод!',
					'data' => null
				], JSON_UNESCAPED_UNICODE);
				exit();
			}
			
		} else {
			echo json_encode([
				'error' => true,
				'error_text' => 'Access denied.',
				'data' => null
			], JSON_UNESCAPED_UNICODE);
			exit();
		}
	}
}

?>
