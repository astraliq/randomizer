<?php
declare(strict_types=1);
class SomeGenerator extends Model {

	public function __construct() {
		parent::__construct();
    }

    public function genHash($string) {

    	$token = openssl_random_pseudo_bytes(30, $cstrong);
		$hash = md5(bin2hex($token) . $string);
    	return $hash;
    }

}

?>