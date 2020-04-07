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
	public $rndQuote;
	public $rndNumber;
	public $rndWord;
	public $userModel;
	public $rndCongratulate;
	public $history;
	public $randomType;
	public $mailing;

    public function __construct($method) {
        $this->method = $method;
        $this->dataBase = SQL::getInstance();
        $this->rndFilm = new RndFilm();
        $this->rndQuote = new RndQuote();
        $this->rndNumber = new RndNumber();
        $this->rndWord = new RndWord();
        $this->userModel = new UserModel();
        $this->rndCongratulate = new RndCongratulate();
        $this->history = new History();
        $this->randomType = new Random();
        $this->mailing = new Mailing();
    }

	//Функция вывода ошибки
	private static function error($error_text, $code = 404) {
		http_response_code($code);
		echo json_encode([
			'error' => true,
			'error_text' => $error_text,
			'data' => null
		], JSON_UNESCAPED_UNICODE);
		exit();

	}

	//Функция успешного ответа
	private static function success($data = true) {
		header('Content-Type: application/json; charset=utf-8');
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
		
		$years = $_POST['postData']['years'] ?? [0];
		$countries = $_POST['postData']['countries'] ?? [0];
		$categories = $_POST['postData']['categories'] ?? [0];
		$film = $this->rndFilm->getRandomFilm($years, $categories, $countries);
		$categories = $this->rndFilm->getFilmCategories($film['id']);
		$currentCategory = 'Фильм';
		$otherCat = $this->randomType->getRndBrowseNowCat([$currentCategory]);
		$otherCatData = $this->randomType->categories[$otherCat];

		if ($film && $otherCat) {
			$data['rnd'] = $film;
			$data['categories'] = $categories;
			$data['otherCat'] = [
				'nameCase' => $this->randomType->categories[$currentCategory]['case'],
				'function' => $otherCatData['function'],
				'name' => $otherCat,
			];
			$data['result'] = "OK";

			$_SESSION['films'][] = $film['id'];
			
			$this->success($data);
		} else {
			if (is_null($film)) {
				$this->error('Ошибка чтения из БД', 404);
			}
		}
	}

	public function getRndQuote() {
		
		$authors = $_POST['postData']['authors'] ?? '';
		$categories = $_POST['postData']['categories'] ?? '';
		$alreadyViewedIds = $_POST['postData']['alreadyViewedIds'] ?? '';
		$quote = $this->rndQuote->getRandomQuote($categories, $authors);
		$currentCategory = 'Цитата';
		$otherCat = $this->randomType->getRndBrowseNowCat([$currentCategory]);
		$otherCatData = $this->randomType->categories[$otherCat];

		// print_r($_POST['postData']);
		// exit();
		if ($quote) {
			$data['rnd'] = $quote;
			$data['otherCat'] = [
				'nameCase' => $this->randomType->categories[$currentCategory]['case'],
				'function' => $otherCatData['function'],
				'name' => $otherCat,
			];
			$data['result'] = "OK";
			$this->success($data);
		} else {
			$this->error('Ошибка чтения из БД',404);
		}
	}

	public function getRndCongratulate() {
		$who = $_POST['postData']['who'] ?? '';
		$theme = $_POST['postData']['theme'] ?? '';
		$alreadyViewedIds = $_POST['postData']['alreadyViewedIds'] ?? '';
		$congr = $this->rndCongratulate->getRandomCongratulate($who, $theme);
		if ($congr) {
			$data['rnd'] = $congr;
			$data['result'] = "OK";
			$this->success($data);
		} else {
			$this->error('Ошибка чтения из БД');
		}
	}

	public function getRndWord() {
		
		$language = $_POST['postData']['language'] ?? '';
		$word = $this->rndWord->getRandomWord($language);
		$currentCategory = 'Интересное слово';
		$otherCat = $this->randomType->getRndBrowseNowCat([$currentCategory]);
		$otherCatData = $this->randomType->categories[$otherCat];

		// print_r($_POST['postData']);
		// exit();
		if ($word) {
			$data['rnd'] = $word;
			$data['otherCat'] = [
				'nameCase' => $this->randomType->categories[$currentCategory]['case'],
				'function' => $otherCatData['function'],
				'name' => $otherCat,
			];
			$data['result'] = "OK";
			$this->success($data);
		} else {
			$this->error('Ошибка чтения из БД');
		}
	}


	public function getNumberInfo() {
		$number = $_POST['postData']['number'] ?? '';
		$info = $this->rndNumber->getNumberInfo($number);
		$otherCat = $this->randomType->getRndBrowseNowCat([$currentCategory]);
		$currentCategory = 'Число';
		$otherCat = $this->randomType->getRndBrowseNowCat([$currentCategory]);
		$otherCatData = $this->randomType->categories[$otherCat];
		if ($info) {
			$data['info'] = $info;
			$data['result'] = "OK";
			$data['otherCat'] = [
				'nameCase' => $this->randomType->categories[$currentCategory]['case'],
				'function' => $otherCatData['function'],
				'name' => $otherCat,
			];
			$this->success($data);
		} else {
			$this->error('Ошибка чтения из БД',200);
		}
	}

	public function getBrowseNowData() {
		
		$catTitle = $_POST['postData']['currentCat'] ?? '';

		$browseFirst = $this->randomType->getRndBrowseNowCat([$catTitle]);
        $browseSecond = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst]);
        $browseThird = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond]);
        $browseFourth = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond, $browseThird]);
        $browseNowData = $this->randomType->getBrowseNowData([$browseFirst, $browseSecond, $browseThird, $browseFourth]);
		if ($browseThird) {
			$data['browseFirst'] = $browseFirst;
			$data['browseSecond'] = $browseSecond;
			$data['browseThird'] = $browseThird;
			$data['browseFourth'] = $browseFourth;
			$data['browseNowData'] = $browseNowData;
			$data['result'] = "OK";
			$this->success($data);
		} else {
			$this->error('Ошибка чтения из БД');
		}
	}

	public function getOtherCatData() {
		
		$catTitle = $_POST['postData']['currentCat'] ?? '';

		$otherCat = $this->randomType->getRndBrowseNowCat([$catTitle]);
		$otherCatData = $this->randomType->categories[$otherCat];
		if ($otherCatData) {
			$data['otherCatName'] = $otherCat;
			$data['function'] = $otherCatData['function'];
			$data['case'] = $this->randomType->categories[$catTitle]['case'];
			$data['result'] = "OK";
			$this->success($data);
		} else {
			$this->error('Ошибка чтения из БД');
		}
	}

	public function addParserData() {
		
		$film = $_POST['postData']['film'] ?? '';

        $nextId = $this->rndFilm->addFilmToDB($film);
		if ($nextId) {
			$data['result'] = "OK";
			$data['nextId'] = $nextId;
			$this->success($data);
		} else {
			$this->error('Ошибка записи в БД');
		}
	}

	public function addParserDataPozdravok() {
		
		$congrs = $_POST['postData']['congrs'] ?? '';
		$type = $_POST['postData']['type'] ?? '';
		$who = $_POST['postData']['who'] ?? '';
		$whoId = 31;
		$themeId = 2;
        $res = $this->rndCongratulate->addCongratulates($congrs, $type, $who, $themeId);
		if ($res) {
			$data['result'] = "OK";
			$this->success($data);
		} else {
			$this->error('Ошибка записи в БД',200);
		}
	}
	public function addParserDataPozdravok2() {
		
		$link = $_POST['postData']['link'] ?? '';
		$types = $_POST['postData']['types'] ?? '';
		$whoId = 20;
		$themeId = 2;
        $res = $this->rndCongratulate->addCongratulates2($types, $link, $whoId, $themeId);
		if ($res) {
			$data['result'] = "OK";
			$this->success($data);
		} else {
			$this->error('Ошибка записи в БД',200);
		}
	}

	public function addParserDataSocratify() {
		
		$authors = $_POST['postData']['authors'] ?? '';

        $res = $this->rndQuote->addAuthor($authors);
		if ($res) {
			$data['result'] = "OK";
			$this->success($data);
		} else {
			$this->error('Ошибка записи в БД',200);
		}
	}

	public function addParserQuoteSocratify() {
		
		$author = $_POST['postData']['author'] ?? '';
		$quotes = $_POST['postData']['quotes'] ?? '';

        $res = $this->rndQuote->addQuotes($author, $quotes);
		if ($res) {
			$data['result'] = "OK";
			$this->success($data);
		} else {
			$this->error('Ошибка записи в БД',200);
		}
	}

	public function addParserNumbers() {
		
		$numbers = $_POST['postData']['numbers'] ?? '';

        $res = $this->rndNumber->addNumbers($numbers);
		if ($res) {
			$data['result'] = "OK";
			$this->success($data);
		} else {
			$this->error('Ошибка записи в БД',200);
		}
	}


	public function addFilmsIds() {
		
		$filmsIds = $_POST['postData']['film'] ?? '';

		$add = $this->rndFilm->addKinoIdToBD($filmsIds);
		if ($add) {
			$data['result'] = "OK";
			$this->success($data);
		} else {
			$this->error('Ошибка записи в БД');
		}
	}

	public function addEmailToMailing() {
		
		$email = $_POST['postData']['email'] ?? '';
		$check = preg_match("/.+@./i", $email);

		if (!$check) {
			$this->error('Отсутствует символ @ в адресе электронной почты!');
		}

		$checkExist = $this->mailing->checkEmailExist($email);
		if ($checkExist) {
			$this->error('Email already exist in mailing.');
		}

		$add = $this->mailing->addMailToDB($email);
		if ($add) {
			// отправка письма с подтверждением
			$send = $this->mailing->sendConfirmMail($email);
			if ($send['result']) {
				$updToken = $this->dataBase->uniUpdate('mailing',['token'=>$send['hash']],['email'=>$email]);
			}
			if (!$updToken) {
				$this->error('Ошибка записи в БД');
			}
			$data['sendConfirm'] = $send ? "OK" : "error";
			$data['result'] = "OK";
			$this->success($data);
		} else {
			$this->error('Ошибка записи в БД');
		}
	}

	public function vkAuthSet() {
		$vkAuth = $_POST['postData']['vkAuth'] ?? '';
		if ($vkAuth === 1) {
			try {
				$_SESSION['vkAuth'] = 1;
				$data['result'] = "OK";
				$this->success($data);
			} catch (Exception $e) {
				$this->error('Ошибка сесии');
			}
			
		}
	}

};

?>