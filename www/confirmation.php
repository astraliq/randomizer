<?PHP
require ("../autoload.php");
if (isset($_SERVER) && isset($_GET)) {
	$this->web(isset($_GET['path']) ? $_GET['path'] : '');		
}

$loader = new \Twig\Loader\FilesystemLoader('../templates');
$twig = new \Twig\Environment($loader);
$template = $twig->loadtemplate('confirm_success.tpl');


$data = $randomType->getRandomDataByCats(['Фильм']);

$arrayContent = [
    'email' =>  $email,
];
echo '<pre>';
print_r($arrayContent);
echo '</pre/>';
exit();

echo $template->render($arrayContent);

?>