<?php
declare(strict_types=1);
class RndCongratulate extends Model {
	public $congratulateTable = 'congratulate';
	public $congratulateWho = 'congratulate_who';
	public $congratulateTheme = 'congratulate_theme';
	public $congratulateTypes = 'congratulate_types';
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

		if ($congratulates) {
			$randomCongr = $congratulates[array_rand($congratulates, 1)];
			$catId = $this->history->getCategoryId('Поздравление');
			$addToGenHistory = $this->history->addRandomToGeneralHistory($catId, $randomCongr['id']);
		} else {
			$randomCongr = null;
		}
		
		return $randomCongr;
	}

	public function getCongrById($id) {
		$sql = "SELECT congr.`id`, who.`who_title` as who, theme.`theme_title_ru` as theme, theme.`theme_title_en` as theme_en, congr.`congratulate` FROM `$this->congratulateTable` as congr LEFT JOIN `$this->congratulateWho` as who ON congr.`who_id` = who.id LEFT JOIN `$this->congratulateTheme` as theme ON congr.`theme_id` = theme.id WHERE congr.`id` = $id";
		$film = $this->dataBase->getRow($sql, null);
		
		return $film;
	}

	public function addCongratulates($congrs, $type, $who, $themeId) {
		$whoData = $this->dataBase->uniSelect('congratulate_who',['who_title'=>$who]);
		$whoId = $whoData['id'];
		if (!$whoData) {
			$addWho = $this->dataBase->uniInsert('congratulate_who',['who_title'=>$who]);
			if ($addWho) {
				$whoId = $this->dataBase->getLastInsertId();
			}
		}

		$typeData = $this->dataBase->uniSelect('congratulate_types',['type_title'=>$type]);
		$typeId = $typeData['id'];
		if (!$typeData) {
			$addType = $this->dataBase->uniInsert('congratulate_types',['type_title'=>$type]);
			if ($addType) {
				$typeId = $this->dataBase->getLastInsertId();
			}
		}
		$checkTypeTheme = $this->dataBase->uniSelect('congr_theme2types&who',['types_id'=>$typeId, 'who_id'=>$whoId, 'theme_id'=>$themeId]);
		if (!$checkTypeTheme) {
			$addTypeTheme = $this->dataBase->uniInsert('congr_theme2types&who',['types_id'=>$typeId, 'who_id'=>$whoId, 'theme_id'=>$themeId]);
		}

		for ($i=0; $i < count($congrs); $i++) { 
			if ($congrs[$i] != '') {
				$check = $this->dataBase->uniSelect($this->congratulateTable,['congratulate'=>$congrs[$i]]);
				if (!$check) {
					$object = [
						'who_id' => $whoId,
						'theme_id' => $themeId,
						'congratulate' => $congrs[$i],
					];
					$result = $this->dataBase->uniInsert($this->congratulateTable, $object);
					$congrId = $this->dataBase->getLastInsertId();
					$result = $this->dataBase->uniInsert('congratulate2type', ['congr_id'=>$congrId,'type_id'=>$typeId]);
				} else{
					$congrId = $check['id'];
					$checkType = $this->dataBase->uniSelect('congratulate2type',['congr_id'=>$congrId,'type_id'=>$typeId]);
					if (!$checkType) {
						$result = $this->dataBase->uniInsert('congratulate2type', ['congr_id'=>$congrId,'type_id'=>$typeId]);
					} else {
						$result = false;
					}
				}
			} else {
				$result = false;
			}
		}
		
		return $result;
	}

	public function addCongratulates2($types, $link, $whoId, $themeId) {

		for ($i=0; $i < count($types); $i++) { 
			$typeData = $this->dataBase->uniSelect('congratulate_types',['type_title'=>$types[$i]]);
			$typeId = $typeData['id'];
			if (!$typeData) {
				$addType = $this->dataBase->uniInsert('congratulate_types',['type_title'=>$types[$i]]);
				if ($addType) {
					$typeId = $this->dataBase->getLastInsertId();
				}
			}
			$checkTypeTheme = $this->dataBase->uniSelect('congr_theme2types&who',[
				'types_id'=>$typeId, 
				'who_id'=>$whoId, 
				'theme_id'=>$themeId
			]);
			if (!$checkTypeTheme) {
				$result = $this->dataBase->uniInsert('congr_theme2types&who',[
					'types_id'=>$typeId, 
					'link'=>$link[$i], 
					'who_id'=>$whoId, 
					'theme_id'=>$themeId
				]);
			} else {
				$result = false;
			}
		}
		
		return $result;
	}

	public function getFIlters($themeId, $whoId, $typeId) {

		$themeId = (int) $themeId;
		$whoId = (int) $whoId;
		$typeId = (int) $typeId;

		if (!$themeId) {
			$sql = "SELECT * FROM `$this->congratulateTheme`";
			$themes = $this->dataBase->getRows($sql, null);
			return $themes;
		}

		if (!$whoId) {
			// $sql = "SELECT DISTINCT `who_id` FROM `congr_theme2types&who` WHERE `theme_id` = $themeId" ;
			// $whoIds = $this->dataBase->uniSelectUnique('congr_theme2types&who', ['who_id'], ['theme_id'=>$themeId]);
			$sql = "SELECT DISTINCT c_f.`who_id`, c_who.`who_title`, c_theme.`theme_title_ru`, c_theme.`theme_title_en` FROM `congr_theme2types&who` as c_f LEFT JOIN `$this->congratulateWho` as c_who ON c_f.`who_id` = c_who.id LEFT JOIN `$this->congratulateTheme` as c_theme ON c_theme.id = $themeId WHERE `theme_id` = $themeId AND c_who.`who_title` IS NOT NULL";
			$whoIds = $this->dataBase->getRows($sql, null);
			return $whoIds;
		}

		if (!$typeId) {
			// $sql = "SELECT DISTINCT `who_id` FROM `congr_theme2types&who` WHERE `theme_id` = $themeId" ;
			// $typeIds = $this->dataBase->uniSelectAll('congr_theme2types&who', ['theme_id'=>$themeId, 'who_id'=>$whoId]);
			$sql = "SELECT DISTINCT c_types.id as 'type_id', c_types.`type_title`, c_f.`who_id`, c_who.`who_title`, c_theme.`theme_title_ru`, c_theme.`theme_title_en` FROM `congr_theme2types&who` as c_f LEFT JOIN `$this->congratulateWho` as c_who ON c_who.id = $whoId LEFT JOIN `$this->congratulateTypes` as c_types ON c_f.`types_id` = c_types.id LEFT JOIN `$this->congratulateTheme` as c_theme ON c_theme.id = $themeId WHERE `theme_id` = $themeId AND `who_id` = $whoId";
			$types = $this->dataBase->getRows($sql, null);
			return $types;
		}
		
		$sql = "SELECT c_theme.`theme_title_ru`, c_theme.`theme_title_en`, c_who.`who_title`, c_types.`type_title` FROM `$this->congratulateTheme` as c_theme LEFT JOIN `$this->congratulateWho` as c_who ON c_who.id = $whoId LEFT JOIN `$this->congratulateTypes` as c_types ON c_theme.`id` = $themeId WHERE c_theme.id = $themeId AND c_who.id = $whoId AND c_types.id = $typeId";
		$result = $this->dataBase->getRows($sql, null);
		return $result;
	}
}
?>