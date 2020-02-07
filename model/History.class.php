<?php
declare(strict_types=1);
class History extends Model {
	public $categoriesTable = 'random_categories';
	public $browseNowTable = 'browse_now';

	public function __construct() {
		parent::__construct();
    }

    public function getCategoryId($catName) {
    	$object = [
			'category_title' => $catName
		];

		$category = $this->dataBase->uniSelect($this->categoriesTable, $object);
		$id = !$category ? 'Unknown category name.' : $category['id'];
    	return $id;
    }

	public function addRandomToGeneralHistory($categoryId, $randomId) {
		$object = [
			'category_id' => $categoryId,
			'random_id' => $randomId
		];

		$add = $this->dataBase->uniInsert($this->browseNowTable, $object);
		return $add;
	}
}

?>