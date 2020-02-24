<?PHP
require ("../autoload.php");
session_start();

$hash = $_SESSION['h'] . 'c';

if (empty($_GET['hash']) || $_GET['hash'] != $hash || empty($_GET['c']) || empty($_GET['i'])) {
    http_response_code(400);
	exit();
}

//UPDATE `films` SET `main_img`=REPLACE(`main_img`, 'iphone360_', '') WHERE `main_img` LIKE 'iphone%'
//UPDATE `quotes` SET `img`=REPLACE(`img`, 'img/quoters/', '') WHERE `img` LIKE 'img%'
// print_r($_SESSION);
// exit();

$postHeaders = getallheaders();
// print_r($postHeaders);

// if ($postHeaders['Host'] === 'randomizer.me' && ($postHeaders['Origin'] === 'https://randomizer.me' || $postHeaders['Origin'] === 'http://randomizer.me') && $postHeaders['X-Requested-With'] === 'XMLHttpRequest'&& 
// 	($postHeaders['Referer'] === 'https://randomizer.me/index.php' || $postHeaders['Referer'] === 'https://randomizer.me/' || 
// 	$postHeaders['Referer'] === 'http://randomizer.me/index.php' || $postHeaders['Referer'] === 'http://randomizer.me/') && 
// 	$postHeaders['User-Agent']) {
if (true) {

	$name = $_GET['i'];

	$imgDir = [
		'm' => 'films',
		'a' => 'arts',
		'o' => 'other',
		'p' => 'poem',
		'q' => 'quoters',
	];

	$path = '../images/' . $imgDir[$_GET['c']] . '/' . $name;

	header('Content-Type: image/jpeg');
	readfile($path);

} else {
	http_response_code(400);
	echo json_encode([
		'error' => true,
		'error_text' => 'произошла ошибка, пожалуйста напишите нам о возникновении ошибки: info@randomizer.me',
		'data' => null
	], JSON_UNESCAPED_UNICODE);
	exit();
}












?>