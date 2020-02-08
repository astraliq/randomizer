<?php
declare(strict_types=1);
class JsonFileParse extends Model {
	public $table_main = 'foreignword';
	public $table_first = '';
	public $table_second = '';

	public function __construct() {
		parent::__construct();
    }

	public function getArrayFromFile() {
		$string = file_get_contents($config['sitename'] . "foreignword.json");
		if ($string === false) {
		    echo 'Ошибка чтения файла'; 
		    exit;
		}
		$json_a = json_decode($string, true);
		if ($json_a === null) {
		    echo 'Файл пустой'; 
		    exit;
		}
		// echo '<pre>'; 
		// print_r($json_a);
		// echo '</pre>';
		// exit;
		$result = $json_a;
		return $result;
	}

	public function addArrToSql($arr) {
		$columns = ['word','transcription','translation','example','language_id'];
		$object = array();
		foreach ($arr as $element) {
			$object[] = [$element['word'],$element['transcription'],$element['translation'],$element['example'],$element['language']];
			
		};
		echo '<pre>'; 
		print_r($object);
		echo '</pre>';
		exit;
		$result = $this->dataBase->uniInsertArray($this->table_main, $columns, $object);
		echo $result;
		
		return $result;
	}
}

?>