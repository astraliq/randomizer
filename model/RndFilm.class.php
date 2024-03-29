<?php
declare(strict_types=1);

class RndFilm extends Model {

    public $filmsTable = 'films';
    public $categories = 'f_categories';
    public $countries = 'f_countries';
    public $filmsCategories = 'films_categories';
    public $filmsCountries = 'films_countries';
    public $history;

    public function __construct()
    {
        parent::__construct();
        $this->history = new History();
    }

    public function getRandomFilm($years, $categories, $countries, $rating)
    {
        if ($years[0] == 0) {
            $years = [0 => ['min' => 1900, 'max' => 2030,]];
        }
        $allYears = [];
        $counter = 0;
        for ($i = 0; $i < count($years); $i++) {
            for ($j = $years[$i]['min']; $j < ($years[$i]['max'] + 1); $j++) {
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
        if ($rating) {
            $filterRating = " AND (";
            for ($i = 0; $i < count($rating); $i++) {
                $filterRating = $filterRating . "(f.`rating` >= " . $rating[$i]['min'];
                $filterRating = $filterRating . " AND f.`rating` <= " . $rating[$i]['max'] . ")";
                if ($i != count($rating)-1) {
                    $filterRating = $filterRating . " OR ";
                }
            }
            $filterRating = $filterRating . " )";
        }


        $exclude = empty($_SESSION['films']) ? '' : ' AND f.`id` NOT IN  (' . implode(', ', $_SESSION['films']) . ')';


        $sql = "SELECT f.`id`, f.`kp_id`, title_ru, description_ru, year, cat.`category_title` as `main_category`, cntr.`country_title` as `country`, f.`main_img`, f.`actors`, f.`director`, duration, f.`rating`  FROM `$this->filmsTable` as f LEFT JOIN `$this->categories` as cat ON f.`main_category_id` = cat.id LEFT JOIN `$this->countries` as cntr ON f.`country_id` = cntr.id WHERE f.`year` IN ($allYears)" . $filterCountry . $filterCategory . $filterRating . $exclude;
        $films = $this->dataBase->getRows($sql, null);

        if (!empty($films)) {
            $randomFilm = $films[array_rand($films, 1)];
            $catId = $this->history->getCategoryId('Фильм');
            $addToGenHistory = $this->history->addRandomToGeneralHistory($catId, $randomFilm['id']);
        } else {
            $randomFilm = null;
        }
        return $randomFilm;
    }

    public function getFilmById($id)
    {
        $sql = "SELECT f.`id`, title_ru, description_ru, year, cat.`category_title` as `main_category`, cntr.`country_title` as `country`, f.`main_img`, f.`actors`, f.`director`, duration  FROM `$this->filmsTable` as f LEFT JOIN `$this->categories` as cat ON f.`main_category_id` = cat.id LEFT JOIN `$this->countries` as cntr ON f.`country_id` = cntr.id WHERE f.`id` = $id";
        $film = $this->dataBase->getRow($sql, null);

        return $film;
    }

    public function getNextFilmId($prevId)
    {
        $sql = "SELECT `id`, `title_ru`, `kp_id`  FROM `$this->filmsTable` WHERE `id` >= $prevId AND `rating` > 5 ORDER BY `id` ASC LIMIT 2";
        $nextFilm = $this->dataBase->getRows($sql, null)[1];
        return $nextFilm;
    }

    public function getFilmCategories($filmId)
    {
        $sql = "SELECT cat.`category_title` as `categories`  FROM `$this->filmsCategories` as f_cat LEFT JOIN `$this->categories` as cat ON f_cat.`category_id` = cat.id  WHERE `film_id` = $filmId";
        $films_categories = $this->dataBase->getRows($sql, null);

        return $films_categories;
    }

    public function getFilmByCategories($categories)
    {
        $categories = implode(', ', $categories);
        $sql = "SELECT f.`id` FROM `$this->filmsTable` as f LEFT JOIN `$this->filmsCategories` as films_cat ON f.`id` = films_cat.`film_id` WHERE films_cat.`category_id` IN ($categories)";
        $films = $this->dataBase->getRows($sql, null);

        return $films;
    }

    public function addFilmToDB($film)
    {

        if ($film['imgSrc']) {
            $path = Config::get('path_public') . '/img/films/' . $film['main_img'];
            file_put_contents($path, file_get_contents($film['imgSrc']));
        }


        $counter1 = 0;
        $film['category_id'] = [];
        foreach ($film['categories'] as $cat) {
            if ($cat === 'длявзрослых') {
                $cat = 'Для взрослых';
            };
            $sql = "SELECT * FROM `$this->categories` WHERE LOWER(`category_title`) = LOWER('$cat')";
            $catID = $this->dataBase->getRow($sql, null);
            $film['category_id'][$counter1] = $catID['id'];
            $counter1++;
        }

        $counter2 = 0;
        $film['country_id'] = [];
        foreach ($film['countries'] as $country) {
            $sql = "SELECT * FROM `$this->countries` WHERE LOWER(`country_title`) = LOWER('$country')";
            $countryID = $this->dataBase->getRow($sql, null);
            $film['country_id'][$counter2] = $countryID['id'];
            $counter2++;
        }

        try {
            if ($film['description_ru'] != '') {
                $object = ['title_ru' => $film['title_ru'], 'title_en' => $film['title_en'],
                    'description_ru' => $film['description_ru'], 'main_category_id' => $film['category_id'][0],
                    'country_id' => $film['country_id'][0], 'rating' => $film['rating'],
                    'main_img' => $film['main_img'],
                    'year' => $film['year'], 'actors' => $film['actors'], 'director' => $film['director'],
                    'duration' => $film['duration'], 'kp_id' => $film['kp_id']];
                $result = $this->dataBase->uniInsert($this->filmsTable, $object);
                $lastID = $this->dataBase->getLastInsertId();

                $columns = ['film_id', 'category_id'];
                $object = array();
                foreach ($film['category_id'] as $element) {
                    $object[] = [$lastID, $element];
                }
                $result = $this->dataBase->uniInsertArray($this->filmsCategories, $columns, $object);

                $columns = ['film_id', 'country_id'];
                $object = array();
                foreach ($film['country_id'] as $element) {
                    $object[] = [$lastID, $element];
                };
                $result = $this->dataBase->uniInsertArray($this->filmsCountries, $columns, $object);
            } else {
                $result = false;
            }
        } catch (Exception $e) {
            $log = date('Y-m-d H:i:s') . ' Ошибка: ' . $e;
            file_put_contents(Config::get('path_root_project') . '/parse_log.txt', $log . PHP_EOL, FILE_APPEND);
            return false;
        }

        $ifExist = $this->dataBase->uniSelect($this->filmsTable, ['main_img' => $film['main_img']]);


        if ($result || $film['description_ru'] === '' || $ifExist || $film['countries'][0] === '') {
            $id = $this->dataBase->uniSelect('kinopoisk_id', ['film_id' => $film['id']]);
        }
        if ($id) {
            $nextId = $this->dataBase->uniSelect('kinopoisk_id', ['id' => $id['id'] + 1]);
        }

        return $nextId['film_id'];
    }

    public function updateFilm($film)
    {

        if ($film['imgSrc']) {
            $path = Config::get('path_public') . '/img/films/' . $film['main_img'];
            file_put_contents($path, file_get_contents($film['imgSrc']));
        }

        $counter1 = 0;
        $film['category_id'] = [];

        foreach ($film['categories'] as $cat) {
            if ($cat === 'длявзрослых') {
                $cat = 'Для взрослых';
            };
            $sql = "SELECT * FROM `$this->categories` WHERE LOWER(`category_title`) = LOWER('$cat')";
            $catID = $this->dataBase->getRow($sql, null);
            $film['category_id'][$counter1] = $catID['id'];
            $counter1++;
        }

        $counter2 = 0;
        $film['country_id'] = [];
        foreach ($film['countries'] as $country) {
            $sql = "SELECT * FROM `$this->countries` WHERE LOWER(`country_title`) = LOWER('$country')";
            $countryID = $this->dataBase->getRow($sql, null);
            $film['country_id'][$counter2] = $countryID['id'];
            $counter2++;
        }

        try {
            if ($film['description_ru'] != '') {
                $object = [
//                    'title_ru' => $film['title_ru'],
//                    'title_en' => $film['title_en'],
//                    'description_ru' => $film['description_ru'],
//                    'main_category_id' => $film['category_id'][0],
//                    'main_img' => $film['main_img'],
                    'year' => $film['year'],
                    'actors' => implode(', ', $film['actors']),
                    'director' => implode(', ', $film['director']),
                    'kp_id' => $film['kp_id'],
                ];
                if ($film['country_id']) {
                    $object['country_id'] = $film['country_id'][0];
                }

                if ($film['rating'] !== '') {
                    $object['rating'] = $film['rating'];
                }
                if ($film['rating_imdb'] !== '') {
                    $object['rating_imdb'] = $film['rating_imdb'];
                }
                if ($film['duration'] !== '') {
                    $object['duration'] = $film['duration'];
                }
                if ($film['premier_date'] !== '' && !is_null($film['premier_date'])) {
                    $object['premier_date'] = $film['premier_date'];
                }

                if ($film['category_id'][0] && $film['category_id'][0] !== '') {
                    $object['main_category_id'] = $film['category_id'][0];
                }

                $result = $this->dataBase->uniUpdate($this->filmsTable, $object, ['kp_id' => $film['kp_id']]);
                $lastID = $this->dataBase->uniSelect($this->filmsTable, ['kp_id' => $film['kp_id']]);

                $columns = ['film_id', 'category_id'];
                $object = array();
                if ($film['category_id']) {
                    foreach ($film['category_id'] as $element) {
                        $object[] = [$lastID['id'], $element];
                    }
                    $result = $this->dataBase->uniInsertArray($this->filmsCategories, $columns, $object);
                }

                if ($film['country_id']) {
                    $columns = ['film_id', 'country_id'];
                    $object = array();
                    foreach ($film['country_id'] as $element) {
                        $object[] = [$lastID['id'], $element];
                    };
                    $result = $this->dataBase->uniInsertArray($this->filmsCountries, $columns, $object);
                }

            } else {
                $result = false;
            }
        } catch (Exception $e) {
            $log = date('Y-m-d H:i:s') . ' Ошибка: ' . $e;
            file_put_contents(Config::get('path_root_project') . '/parse_log.txt', $log . PHP_EOL, FILE_APPEND);
            return false;
        }

        return true;
    }

    public function updatePersonsFilm($film)
    {

        try {
            $object = [
                'actors' => implode(', ', $film['actors']),
                'director' => implode(', ', $film['director']),
                'kp_id' => $film['kp_id'],
            ];

            $result = $this->dataBase->uniUpdate($this->filmsTable, $object, ['kp_id' => $film['kp_id']]);

        } catch (Exception $e) {
            $log = date('Y-m-d H:i:s') . ' Ошибка: ' . $e;
            file_put_contents(Config::get('path_root_project') . '/parse_log.txt', $log . PHP_EOL, FILE_APPEND);
            return false;
        }

        return true;
    }

    public function addKinoIdToBD($ids)
    {

        $columns = ['film_id'];
        $object = array();
        foreach ($ids['id'] as $id) {
            $object[] = [$id];

        };
        $result = $this->dataBase->uniInsertArray('kinopoisk_id', $columns, $object);

        return $result;
    }
}

?>