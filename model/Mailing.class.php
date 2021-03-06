<?php
declare(strict_types=1);
class Mailing extends Model {
	public $mailingTable = 'mailing';
	public $generator;
	private $mailSMTP;
	// имена ключей должны быть одинаковыми

	public function __construct() {
		parent::__construct();
		$this->generator = new SomeGenerator();
		$this->mailSMTP = new SendMailSmtp(Config::get('mail'), Config::get('mail_pass'), 'ssl://smtp.yandex.ru', Config::get('mail_name'), 465);
		// $mailSMTP = new SendMailSmtpClass('логин', 'пароль', 'хост', 'имя отправителя');
    }

    public function getMailsEW() {
    	$mails = $this->dataBase->uniSelectAll($this->mailingTable, ['send_ew'=>1,'confirm'=>1]);
    	return $mails;
    }

	public function sendMailsEW($message) {
		$mailsData = $this->getMailsEW();
		$mailsArr = array();
		foreach ($mailsData as $element) {
			$mailsArr[] = $element['email'];
		};
		// заголовок письма
		$headers= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
		$headers .= "From: Randomizer <randomizer.me@yandex.ru>\r\n"; // от кого письмо
		$result =  $this->mailSMTP->send($mailsArr, 'Подборка случайностей за неделю', $message, $headers); // отправляем письмо
		// $result =  $mailSMTP->send('Кому письмо', 'Тема письма', 'Текст письма', 'Заголовки письма');

		return $result = [
			'result' => $result,
			'emails' => $mailsArr
		];
	}

	public function updMailingAfterSend($mails) {

	}

	public function addMailToDB($email) {
		$add = $this->dataBase->uniInsert($this->mailingTable, [
			'email'=>$email,
			'send_ew'=>1
		]);
    	return $add;
	}

	public function checkEmailExist($email) {
		$check = $this->dataBase->uniSelect($this->mailingTable, [
			'email'=>$email,
		]);
    	return $check;
	}

	public function sendConfirmMail($email) {
		$loader = new \Twig\Loader\FilesystemLoader('../mail_templates');
		$twig = new \Twig\Environment($loader);
		$template = $twig->loadtemplate('confirm_mailing.tpl');

		$hash = $this->generator->genHash($email);

		$arrayContent = [
		    'hash' =>  $hash,
		];
		// echo '<pre>';
		// print_r($arrayContent);
		// echo '</pre/>';
		// exit();
		$message = $template->render($arrayContent);
		$headers= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
		$headers .= "From: Randomizer <randomizer.me@yandex.ru>\r\n"; // от кого письмо
		$result =  $this->mailSMTP->send([$email], 'Подтверждение подписки', $message, $headers); // отправляем письмо

    	return $result = [
    		'result' => $result,
    		'hash' => $hash
    	];
	}

	public function updateMailingCounter($emails) {

		$updCounter = $this->dataBase->uniUpdateArray('mailing',"`mailing_counter`=`mailing_counter`+1",'email',$emails);

    	return $updCounter;
	}
}

?>