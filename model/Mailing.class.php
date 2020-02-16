<?php
declare(strict_types=1);
class Mailing extends Model {
	public $mailingTable = 'mailing';
	private $mailSMTP;
	// имена ключей должны быть одинаковыми

	public function __construct() {
		parent::__construct();
		$this->mailSMTP = new SendMailSmtp(Config::get('mail'), Config::get('mail_pass'), 'ssl://smtp.yandex.ru', Config::get('mail_name'), 465);
		// $mailSMTP = new SendMailSmtpClass('логин', 'пароль', 'хост', 'имя отправителя');
    }

    public function getMailsEW() {
    	$mails = $this->dataBase->uniSelect($this->mailingTable, ['send_ew'=>1]);
    	return $mails;
    }

	public function sendMailsEW($message) {
		$mailsData = $this->getMailsEW();
		if (is_array($mailsData[0])) {
			$mailsArr = array();
			foreach ($mailsData as $element) {
				$mailsArr[] = $element['email'];
			};
		} else {
			$mailsArr = $mailsData['email'];
		}
		
		// заголовок письма
		$headers= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
		$headers .= "From: Randomizer <randomizer.me@yandex.ru>\r\n"; // от кого письмо
		$result =  $this->mailSMTP->send($mailsArr, 'Подборка случайностей за неделю', $message, $headers); // отправляем письмо
		// $result =  $mailSMTP->send('Кому письмо', 'Тема письма', 'Текст письма', 'Заголовки письма');

		return $result;
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


}

?>