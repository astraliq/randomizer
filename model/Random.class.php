<?php
declare(strict_types=1);
class Random extends Model {
	public $categoriesTable = 'random_categories';
	public $browseNowTable = 'browse_now';
	public $film;
	public $quote;
	// имена ключей должны быть одинаковыми
	public $categories = [
		'Фильм' => [
			'tpl' => 'see_now_film.tpl',
			'case' => 'фильмов',
			'function' => 'film.getRndFilm()',
		],
		'Цитата' => [
			'tpl' => 'see_now_quote.tpl',
			'case' => 'цитат',
			'function' => 'quote.init()',
		],
		'Подарок' => [
			'tpl' => 'see_now_gift.tpl',
			'case' => 'подарков',
			'function' => '',
		],
		'Произведение искусства' => [
			'tpl' => 'see_now_artwork.tpl',
			'case' => 'произведений искусств',
			'function' => '',
		],
		'Слово на иностранном языке' => [
			'tpl' => 'see_now_foreign_word.tpl',
			'case' => 'иностранных слов',
			'function' => '',
		],
		'Поздравление' => [
			'tpl' => 'see_now_congratulate.tpl',
			'case' => 'поздравлений',
			'function' => '',
		],
	];

	public function __construct() {
		parent::__construct();
		$this->film = new RndFilm();
		$this->quote = new RndQuote();
    }

	public function getRandomData($categoryTitle) {
		$result;
		switch ($categoryTitle) {
		    case "Фильм":
		    	$years = [
			    		0 => [
			    			'min' => 1900,
				    		'max' => 2030,
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
		        $result = $this->quote->getRandomQuote('');
		        break;
		}
		// print_r($result);
  //       exit();
		return $result;
	}

	public function getRandomCategory() {
		$categories = $this->dataBase->uniSelect($this->categoriesTable, []);
		// $randomCategory = $categories[array_rand($categories, 1)];
		$list = ['Фильм', 'Цитата'];
		$randomCategory = $list[array_rand($list, 1)];
		return $randomCategory;
	}

	public function getRndBrowseNowCat($usedCategories) {
		$check;
		do {
			$check = 0;
			$randCat = array_rand($this->categories, 1);
			foreach ($usedCategories as $cat) {
				if ($randCat === $cat) {
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
					break;
				case 'Цитата':
					$object = [
						'category_id' => 2
					];
					$browse = $this->dataBase->uniSelectLast($this->browseNowTable, $object, 'id');
					$data['quoteData'] = $this->quote->getQuoteById($browse['random_id']);
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