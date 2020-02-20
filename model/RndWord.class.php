<?php
declare(strict_types=1);
class RndWord extends Model {
	public $wordTable = 'words';
	public $wordLang = 'words_language';
	public $history;

	public function __construct() {
		parent::__construct();
		$this->history = new History();
    }

	public function getRandomWord($language) {
		
		if ($language[0] === '') {
			$filterLang = "";
		} else {
			$language = implode(', ', $language);
			$lang_ids;
			$filterLang = " WHERE lang.`language_title` IN ($language)";
		}
		
		$sql = "SELECT w.`id`, w.`word`, w.`meaning`, lang.`language_title` as language FROM `$this->wordTable` as w LEFT JOIN `$this->wordLang` as lang ON w.`language_id` = lang.id" . $filterLang;

		$words = $this->dataBase->getRows($sql, null);
		$randomWord = $words[array_rand($words, 1)];

		$catId = $this->history->getCategoryId('Интересное слово');
		$addToGenHistory = $this->history->addRandomToGeneralHistory($catId, $randomWord['id']);
		return $randomWord;
	}

	public function getWordById($id) {
		$sql = "SELECT w.`id`, w.`word`, w.`meaning`, lang.`language_title` as language FROM `$this->wordTable` as w LEFT JOIN `$this->wordLang` as lang ON w.`language_id` = lang.id WHERE w.`id` = $id";

		$word = $this->dataBase->getRow($sql, null);
		
		return $word;
	}


}
?>

