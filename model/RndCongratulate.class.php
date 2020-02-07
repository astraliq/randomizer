<?php
declare(strict_types=1);
class RndCongratulate extends Model {
	public $congratulateTable = 'congratulate';
	public $congratulateWho = 'congratulate_who';
	public $congratulateTheme = 'congratulate_theme';
	public $history;

	public function __construct() {
		parent::__construct();
		$this->history = new History();
    }

	public function getRandomCongratulate($filters) {

		if (empty($filters)) {
			$sql = "SELECT congr.`id`, who.`who_title` as who, theme.`theme_title_ru` as theme, congr.`congratulate` FROM `$this->congratulateTable` as congr LEFT JOIN `$this->congratulateWho` as who ON congr.`who_id` = who.id LEFT JOIN `$this->congratulateTheme` as theme ON congr.`theme_id` = theme.id LIMIT 10000";
		} else {
			$idWho = implode(", ", $filters);
			$sql = "SELECT congr.`id`, who.`who_title` as who, theme.`theme_title_ru` as theme, congr.`congratulate` FROM `$this->congratulateTable` as congr LEFT JOIN `$this->congratulateWho` as who ON congr.`who_id` = who.id LEFT JOIN `$this->congratulateTheme` as theme ON congr.`theme_id` = theme.id WHERE who.id IN ($idWho)";
		}

		$congratulates = $this->dataBase->getRows($sql, null);
		$randomCongr = $congratulates[array_rand($congratulates, 1)];
		$catId = $this->history->getCategoryId('Поздравление');
		$addToGenHistory = $this->history->addRandomToGeneralHistory($catId, $randomFilm['randomCongr']);
		return $randomCongr;
	}

}
?>

