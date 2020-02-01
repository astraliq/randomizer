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

	public function getRandomFilm($years, $categories) {
		$minYear = ($years['min'] == '') ? 1900 : $years['min'];
		$maxYear = ($years['max'] == '') ? date("Y") : $years['max'];
		// $minRating = ($rating['min'] == '') ? 0 : $rating['min'];
		// $maxRating = ($rating['max'] == '') ? 10 : $rating['max'];
		// print_r($maxRating);
		// exit();

		$sql = "SELECT f.`id`, title_ru, description_ru, year, cat.`category_title` as `main_category`, cntr.`coutry_title` as `country`, f.`main_img`, f.`actors`, f.`genres`, duration  FROM `$this->filmsTable` as f LEFT JOIN `$this->categories` as cat ON f.`main_category_id` = cat.id LEFT JOIN `$this->countries` as cntr ON f.`country_id` = cntr.id WHERE `year` >= $minYear and `year` <= $maxYear ORDER BY `year`";

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

	public function getFilmCategories($filmId) {

		$sql = "SELECT cat.`category_title` as `categories`  FROM `$this->filmsCategories` as f_cat LEFT JOIN `$this->categories` as cat ON f_cat.`category_id` = cat.id  WHERE `film_id` = $filmId";

		$films_categories = $this->dataBase->getRows($sql, null);

		return $films_categories;
	}
}
?>

