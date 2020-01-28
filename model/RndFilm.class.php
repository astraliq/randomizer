<?php
declare(strict_types=1);
class RndFilm extends Model {
	// public $dataBase;
	public $filmsTable = 'films';
	public $categories = 'categories';
	public $countries = 'countries';
	public $filmsCategories = 'films_categories';
	public $filmsCountries = 'films_countries';

	public function __construct() {
		parent::__construct();
    }

	public function getRandomFilm($years, $rating, $categories) {
		$minYear = ($rating['min'] == '') ? 1950 : $rating['min'];
		$maxYear = ($rating['max'] == '') ? date("Y") : $rating['max'];
		$minRating = ($rating['min'] == '') ? 0 : $rating['min'];
		$maxRating = ($rating['max'] == '') ? 10 : $rating['max'];
		// print_r($maxRating);
		// exit();

		$sql = "SELECT f.`id`, title_ru, description_ru, year, cat.`category_title` as `main_category`, cntr.`coutry_title` as `country`, f.`main_img`  FROM `$this->filmsTable` as f LEFT JOIN `$this->categories` as cat ON f.`main_category_id` = cat.id LEFT JOIN `$this->countries` as cntr ON f.`country_id` = cntr.id WHERE `year` >= 2010 and `year` <= 2020 ORDER BY `year` DESC LIMIT 100";

		// var_dump($this->dataBase->getRows($sql, null));
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


public function getProduct($product_id) {
			$whereObject = [
				'id' => $product_id
			];
			return $this->dataBase->uniSelect($this->productsTable, $whereObject);
		}
public function getLastReviews($quantityOfReviews) {
		$sql = "SELECT * FROM `$this->reviewsTable` ORDER BY `date` DESC LIMIT $quantityOfReviews";
		// var_dump($this->dataBase->getRows($sql, null));
		return $this->dataBase->getRows($sql, null);
	}
}

?>

