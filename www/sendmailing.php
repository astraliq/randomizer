<?PHP
require ("../autoload.php");

$mailing = new Mailing();
$randomType = new Random();

$loader = new \Twig\Loader\FilesystemLoader('../mail_templates');
$twig = new \Twig\Environment($loader);
$template = $twig->loadtemplate('week_mailing.tpl');


$data = $randomType->getRandomDataByCats(['Фильм']);
$arrayContent = [
    'randomData' =>  $data,
];
// echo '<pre>';
// print_r($arrayContent);
// echo '</pre/>';
// exit();
$message = $template->render($arrayContent);
$result = $mailing->sendMailsEW($message);

if($result['result'] === true){
	// увеличение счетчика рассылок
	$updCounter = $mailing->updateMailingCounter($result['emails']);
    echo "Письма успешно отправлены";
}else{
    echo "Письма не отправлены. Ошибка: " . $result['result'];
}


?>