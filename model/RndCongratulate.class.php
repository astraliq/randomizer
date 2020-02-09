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
			$sql = "SELECT congr.`id`, who.`who_title` as who, theme.`theme_title_ru` as theme, congr.`congratulate` FROM `$this->congratulateTable` as congr LEFT JOIN `$this->congratulateWho` as who ON congr.`who_id` = who.id LEFT JOIN `$this->congratulateTheme` as theme ON congr.`theme_id` = theme.id LIMIT 10000";
		} else {
			$whoIds = implode(", ", $who);
			$whoSql = (!empty($who)) ? "who.id IN ($whoIds)" : '';
			
			$and = (!empty($who) and !empty($theme)) ? ' AND ' : '';

			$themeIds = implode(", ", $theme);
			$themeSql = (!empty($theme)) ? "theme.id IN ($themeIds)" : '';

			$sql = "SELECT congr.`id`, who.`who_title` as who, theme.`theme_title_ru` as theme, congr.`congratulate` FROM `$this->congratulateTable` as congr LEFT JOIN `$this->congratulateWho` as who ON congr.`who_id` = who.id LEFT JOIN `$this->congratulateTheme` as theme ON congr.`theme_id` = theme.id WHERE " . $whoSql . $and . $themeSql;
		}

		$congratulates = $this->dataBase->getRows($sql, null);
		$randomCongr = $congratulates[array_rand($congratulates, 1)];
		$catId = $this->history->getCategoryId('Поздравление');
		$addToGenHistory = $this->history->addRandomToGeneralHistory($catId, $randomFilm['randomCongr']);
		return $randomCongr;
	}

}
?>

