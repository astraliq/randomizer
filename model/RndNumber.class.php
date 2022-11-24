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

	public function addNumbers($numbers) {

		$columns = ['number', 'info'];
		$object = array();
		foreach ($numbers as $number) {
			$object[] = [$number['number'],$number['text']];
			
		};
		$result = $this->dataBase->uniInsertArray($this->table, $columns, $object);
		
		return $result;
	}

}

?>