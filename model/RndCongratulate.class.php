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

	public function getRandomCongratulate($who, $theme) {

		if (empty($who) and empty($theme)) {
			$sql = "SELECT congr.`id`, who.`who_title` as who, theme.`theme_title_ru` as theme, theme.`theme_title_en` as theme_en, congr.`congratulate` FROM `$this->congratulateTable` as congr LEFT JOIN `$this->congratulateWho` as who ON congr.`who_id` = who.id LEFT JOIN `$this->congratulateTheme` as theme ON congr.`theme_id` = theme.id LIMIT 10000";
		} else {
			if (!empty($who)) {
				// $whoIds = implode("', '", $who);
				// $whoSql = "who.who_title IN ('$whoIds')";
				$whoSql = "who.who_title = '$who'";
			} else {
				$whoSql = '';
			};
			$and = (!empty($who) and !empty($theme)) ? ' AND ' : '';
			if (!empty($theme)) {
				// $themeIds = implode("', '", $theme);
				// $themeSql = "theme.theme_title_ru IN ('$themeIds')";
				$themeSql = "theme.theme_title_ru = '$theme'";
			} else {
				$themeSql = '';
			};

			$sql = "SELECT congr.`id`, who.`who_title` as who, theme.`theme_title_ru` as theme, theme.`theme_title_en` as theme_en, congr.`congratulate` FROM `$this->congratulateTable` as congr LEFT JOIN `$this->congratulateWho` as who ON congr.`who_id` = who.id LEFT JOIN `$this->congratulateTheme` as theme ON congr.`theme_id` = theme.id WHERE " . $whoSql . $and . $themeSql;
		}

		$congratulates = $this->dataBase->getRows($sql, null);
		$randomCongr = $congratulates[array_rand($congratulates, 1)];
		$catId = $this->history->getCategoryId('Поздравление');
		$addToGenHistory = $this->history->addRandomToGeneralHistory($catId, $randomFilm['randomCongr']);
		return $randomCongr;
	}

}
?>

