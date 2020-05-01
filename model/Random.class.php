<?php
declare(strict_types=1);
class Random extends Model {
	public $categoriesTable = 'random_categories';
	public $browseNowTable = 'browse_now';
	public $film;
	public $quote;
	public $congratulate;
	// имена ключей должны быть одинаковыми
	public $categories = [
		'Фильм' => [
			'tpl' => 'see_now_film.tpl',
			'case' => 'фильмов',
			'function' => 'film',
		],
		'Цитата' => [
			'tpl' => 'see_now_quote.tpl',
			'case' => 'цитат',
			'function' => 'quote',
		],
		// 'Подарок' => [
		// 	'tpl' => 'see_now_gift.tpl',
		// 	'case' => 'подарков',
		// 	'function' => '',
		// ],
		'Произведение искусства' => [
			'tpl' => 'see_now_artwork.tpl',
			'case' => 'произведений искусств',
			'function' => '',
		],
		'Интересное слово' => [
			'tpl' => 'see_now_foreign_word.tpl',
			'case' => 'интересных слов',
			'function' => 'word',
		],
		'Поздравление' => [
			'tpl' => 'see_now_congratulate.tpl',
			'case' => 'поздравлений',
			'function' => "congratulate",
		],
		'Число' => [
			'tpl' => 'empty.tpl',
			'case' => 'случайных чисел',
			'function' => 'number',
		]
	];

	public function __construct() {
		parent::__construct();
		$this->film = new RndFilm();
		$this->quote = new RndQuote();
		$this->word = new RndWord();
		$this->number = new RndNumber();
		$this->congratulate = new RndCongratulate();
    }

	public function getRandomData($categoryTitle) {
		$result;
		switch ($categoryTitle) {
		    case "Фильм":
		    	$years = [
			    		0 => [
			    			'min' => 1900,
				    		'max' => 1950,
				    	]
			    ];
		        $film = $this->film->getRandomFilm($years,[0],[0]);
		        $getCategories = $this->film->getFilmCategories($film['id']);
		        $categories = [];
		        $k = 0;
		        foreach ($getCategories as $id) {
		        	$categories[$k] = $id['categories'];
		        	$k++;
		        }
		        $result = [
		        	'data' => $film,
		        	'categories' => $categories
		        ];
		        break;
		    case "Цитата":
		        $result = $this->quote->getRandomQuote('','');
		        break;
		    case "Интересное слово":
		        $result = $this->word->getRandomWord(['']);
		        break;
		    case "Число":
		    	$rand = rand(0, 50);
		        $info = $this->number->getNumberInfo($rand);
		        $result = [
		        	'number' => $rand,
		        	'info' => $info['info'],
		        ];
		        break;
		    case "Поздравление":
		        $result = $this->congratulate->getRandomCongratulate(null,null,null);
		        break;
		}
		// print_r($result);
  //       exit();
		return $result;
	}

	public function getRandomCategory() {
		$categories = $this->dataBase->uniSelect($this->categoriesTable, []);
		// $randomCategory = $categories[array_rand($categories, 1)];
		$list = ['Фильм', 'Цитата', 'Поздравление', 'Число', 'Интересное слово'];
		$randomCategory = $list[array_rand($list, 1)];
		return $randomCategory;
	}

	public function getRndBrowseNowCat($usedCategories) {
		$check;
		do {
			$check = 0;
			$randCat = array_rand($this->categories, 1);
			foreach ($usedCategories as $cat) {
				if ($randCat === $cat || $randCat === 'Число') {
					$check = 1;
				};
			}
		} while ( $check === 1 );
		return $randCat;
	}

	public function getBrowseNowData($usedCategories) {
		$data;
		foreach ($usedCategories as $cat) {
			switch ($cat) {
				case 'Фильм':
					$object = [
						'category_id' => 1
					];
					$browse = $this->dataBase->uniSelectLast($this->browseNowTable, $object, 'id');
					$data['filmData'] = $this->film->getFilmById($browse['random_id']);
					$cats = $this->film->getFilmCategories($browse['random_id']);
					$object = array();
					foreach ($cats as $element) {
						$object[] = [$element['categories']];
					};
					$data['filmData']['categories'] = $object;
					
					break;
				case 'Цитата':
					$object = [
						'category_id' => 2
					];
					$browse = $this->dataBase->uniSelectLast($this->browseNowTable, $object, 'id');
					$data['quoteData'] = $this->quote->getQuoteById($browse['random_id']);
					break;
				case 'Поздравление':
					$object = [
						'category_id' => 8
					];
					$browse = $this->dataBase->uniSelectLast($this->browseNowTable, $object, 'id');
					$data['congrData'] = $this->congratulate->getCongrById($browse['random_id']);
					break;
				case 'Интересное слово':
					$object = [
						'category_id' => 10
					];
					$browse = $this->dataBase->uniSelectLast($this->browseNowTable, $object, 'id');
					$data['wordData'] = $this->word->getWordById($browse['random_id']);
					break;
				default:
					// code...
					break;
			}
		}
		return $data;
	}


	public function getRandomDataByCats($usedCategories) {
		$data;
		foreach ($usedCategories as $cat) {
			switch ($cat) {
				case 'Фильм':
					$data['filmData'] = $this->film->getRandomFilm([0],[0],[0]);
					$cats = $this->film->getFilmCategories($data['filmData']['id']);
					$object = array();
					foreach ($cats as $element) {
							$object[] = $element['categories'];
					};
					$data['filmData']['categories'] = $object;
					break;
				case 'Цитата':
					$data['quoteData'] = $this->quote->getRandomQuote('');
					break;
				case 'Поздравление':
					$data['congrData'] = $this->congratulate->getRandomCongratulate(null,null,null);
					break;
				case 'Интересное слово':
					$data['wordData'] = $this->word->getRandomWord(['']);
					break;
				default:
					// code...
					break;
			}
		}
		return $data;
	}
}

?>