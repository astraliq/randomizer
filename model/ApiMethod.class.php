<?php
/*
 * Файл работы API
 * Файл ожидает что в _POST придет apiMethod с задачей, которую нужно выполнить
 * И (при необходимости) postData с информацией, необходимой для этой задачи
 *
 */

/*
 * Комментарий по json
 * Если использовать header('Content-Type: application/json');
 * То весь текст на странице попытается преобразоваться в json.
 * Следовательно нельзя будет увидеть ошибки, которые вам покажет php,
 * поэтому задает заголовок передаем в последний момент
 *
 * Если до этого были ошибки на php заголовок задать не получится
 *
 */
class ApiMethod {

	public $dataBase;
	public $method;
	public $rndFilm;
	public $userModel;

    public function __construct($method) {
        $this->method = $method;
        $this->dataBase = SQL::getInstance();
        $this->rndFilm = new RndFilm();
        $this->userModel = new UserModel();
    }

	//Функция вывода ошибки
	private static function error($error_text) {
		// header('Content-Type: application/json; charset=utf-8');
		echo json_encode([
			'error' => true,
			'error_text' => $error_text,
			'data' => null
		], JSON_UNESCAPED_UNICODE);
		exit();

	}

	//Функция успешного ответа
	private static function success($data = true) {
		// header('Content-Type: application/json; charset=utf-8');
		echo json_encode($data, JSON_UNESCAPED_UNICODE);
		exit();

	}

	public function login() {
		//Получаем логин и пароль из postData
		$login = $_POST['postData']['login'] ?? '';
		$password = $_POST['postData']['password'] ?? '';

		//Если нет логина или пароля вызываем ошибку
		if (!$login || !$password) {
			$this->error('Логин или пароль не введены');
		}

		//приводим пароль к тому же виду, как он хранится в базе
		$password = SQL::cryptPassword($password, null);

		$whereObj = [
			'login' => $login,
			'password' => $password
		];

		//пытаемся найти пользователя
		$user = $this->dataBase->uniSelect($this->userModel->usersTable, $whereObj);
		//Если пользователь найден, записываем информацию о пользователе в сессию,
		//что бы к ней можно было обратиться с любой страницы
		//Если пользователь не найден, возвращаем ошибку
		// /index.php?path=user/createorder
		if ($user) {
			$_SESSION['user'] = $user;
			$data['result'] = 'OK';
			$data['referrer'] = $_SESSION['referrer']; 
			if (!$this->cartModel->getUserCart($_SESSION['user']['id']) && !empty($_COOKIE['cart'])) {
				if ($this->cartModel->insertCookieInCart($_COOKIE['cart'], $_SESSION['user']['id'])) {
					$this->success($data);
				}
			}
			$this->success($data);
		} else {
			$this->error('Неверный логин или пароль');
		}
	}

	public function reg() {
		//Получаем логин и пароль из postData
		$login = $_POST['postData']['login'] ?? '';
		$password = $_POST['postData']['password'] ?? '';
		$password_repeat = $_POST['postData']['password_repeat'] ?? '';
		$name = $_POST['postData']['name'] ?? NULL;
		$surname = $_POST['postData']['surname'] ?? NULL;
		//Если нет логина или пароля вызываем ошибку

		if (!$login || !$password) {
			$this->error('Логин или пароль не введены');
		}
		if (!$password_repeat) {
			$this->error('Повторите пароль');
		}
		if ($password != $password_repeat) {
			$this->error('Пароли не совпадают');
		}
		if ($this->userModel->checkUser($login)) {
			$this->error('Пользователь с данным логином уже зарегистрирован');
		}

		//генерируем запрос и пытаемся добавить пользователя в базу
		$result = $this->userModel->regUser($login, $password, $name, $surname);

		//Если пользователь найден, записываем информацию о пользователе в сессию,
		//что бы к ней можно было обратиться с любой страницы
		//Если пользователь не найден, возвращаем ошибку
		if ($result) {
			$_SESSION['user']['login'] = $login;
			$this->success('OK');
		} else {
			$this->error('Ошибка записи пользователя в БД');
		}
	}


	public function getRndFilm() {
		
		$years = $_POST['postData']['years'] ?? '';
		$rating = $_POST['postData']['rating'] ?? '';
		$categories = $_POST['postData']['categories'] ?? '';
		$film = $this->rndFilm->getRandomFilm($years,$rating,$categories);
		if ($film) {
			$data['film'] = $film;
			$data['result'] = "OK";
			$this->success($data);
		} else {
			$this->error('Ошибка чтения из БД');
		}
	}

}

?>