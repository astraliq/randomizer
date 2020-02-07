<?php
declare(strict_types=1);
class Random extends Model {
	public $categoriesTable = 'random_categories';
	public $film;
	public $quote;

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

}

?>