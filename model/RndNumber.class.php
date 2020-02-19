<?php
declare(strict_types=1);
class RndNumber extends Model {
	public $table = 'numbers';

	public function __construct() {
		parent::__construct();
    }

	public function getNumberInfo($number) {
		$object = [
			'number' => $number
		];
		$info = $this->dataBase->uniSelectAll($this->table, $object);
		if ($info) {
			$randomInfo = $info[array_rand($info, 1)];
		} else {
			$randomInfo = null;
		}
		return $randomInfo;
	}

}

?>

