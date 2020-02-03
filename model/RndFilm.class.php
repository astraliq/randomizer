<?php
declare(strict_types=1);
class RndFilm extends Model {
	// public $dataBase;
	public $filmsTable = 'films';
	public $categories = 'f_categories';
	public $countries = 'f_countries';
	public $filmsCategories = 'films_categories';
	public $filmsCountries = 'films_countries';

	public function __construct() {
		parent::__construct();
    }

	public function getRandomFilm($years, $categories, $countries) {
		if ($years[0] == 0) {
			$years = [0 => [
			    			'min' => 1900,
				    		'max' => 2030,
				    	]
				  	];
		}
		$allYears = [];
		$counter = 0;
		for ($i=0; $i < count($years); $i++) {
			for ($j=$years[$i]['min']; $j < ($years[$i]['max'] + 1); $j++) { 
				$allYears[$counter] = $j;
				$counter++;
			}
		}
		
		$countries = implode(', ', $countries);
		$allYears = implode(', ', $allYears);
		
		if ($countries[0] == 0) {
			$filterCountry = "";
		} else {
			$filterCountry = " AND f.`country_id` IN ($countries)";
		}
		
		if ($categories[0] == 0) {
			$filterCategory = "";
		} else {
			$filmsByCategories = $this->getFilmByCategories($categories);
			$filmsIds = [];
	        $k = 0;
	        foreach ($filmsByCategories as $cat) {
	        	$filmsIds[$k] = $cat['id'];
	        	$k++;
	        }
	        $filmsIds = implode(', ', $filmsIds);
			$filterCategory = " AND f.`id` IN ($filmsIds)";
		}

		$sql = "SELECT f.`id`, title_ru, description_ru, year, cat.`category_title` as `main_category`, cntr.`coutry_title` as `country`, f.`main_img`, f.`actors`, f.`genres`, duration  FROM `$this->filmsTable` as f LEFT JOIN `$this->categories` as cat ON f.`main_category_id` = cat.id LEFT JOIN `$this->countries` as cntr ON f.`country_id` = cntr.id WHERE `year` IN ($allYears)" . $filterCountry . $filterCategory;
		$films = $this->dataBase->getRows($sql, null);

		// $idFilms = [];
		// $k=0;
		// foreach ($films as $film) {
		// 	$idFilms[$k]= $film['id'];
		// 	$k++;
		// }
		// print_r($idFilms);
		// exit();

		$randomFilm = $films[array_rand($films, 1)];

		return $randomFilm;
	}

	public function getFilmById($id) {
		$sql = "SELECT f.`id`, title_ru, description_ru, year, cat.`category_title` as `main_category`, cntr.`coutry_title` as `country`, f.`main_img`, f.`actors`, f.`genres`, duration  FROM `$this->filmsTable` as f LEFT JOIN `$this->categories` as cat ON f.`main_category_id` = cat.id LEFT JOIN `$this->countries` as cntr ON f.`country_id` = cntr.id WHERE f.`id` = $id";
		$film = $this->dataBase->getRow($sql, null);
		
		return $film;
	}

	public function getFilmCategories($filmId) {
		$sql = "SELECT cat.`category_title` as `categories`  FROM `$this->filmsCategories` as f_cat LEFT JOIN `$this->categories` as cat ON f_cat.`category_id` = cat.id  WHERE `film_id` = $filmId";
		$films_categories = $this->dataBase->getRows($sql, null);
		
		return $films_categories;
	}

	public function getFilmByCategories($categories) {
		$categories = implode(', ', $categories);
		$sql = "SELECT f.`id` FROM `$this->filmsTable` as f LEFT JOIN `$this->filmsCategories` as films_cat ON f.`id` = films_cat.`film_id` WHERE films_cat.`category_id` IN ($categories)";
		$films = $this->dataBase->getRows($sql, null);
		
		return $films;
	}
}

?>

