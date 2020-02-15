<?php
class MailController extends Controller {
    public $title = 'MAIL';
    public $mainTitle;
    public $pageName = 'mail';

    public function __construct() {
        parent::__construct();
        $this->mainTitle .= 'MAIL';
    } 

	public function index($data) {
        $this->mainTitle .= 'MAIL';
        $this->view = 'stub';

        $mailSMTP = new SendMailSmtpClass(Config::get('mail'), Config::get('mail_pass'), 'ssl://smtp.yandex.ru', 'Evgeniy', 465);
		// $mailSMTP = new SendMailSmtpClass('логин', 'пароль', 'хост', 'имя отправителя');
		  
		// заголовок письма
		$headers= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
		$headers .= "From: Evgeniy <admin@vk-book.ru>\r\n"; // от кого письмо
		$result =  $mailSMTP->send('zhenikipatov@yandex.ru', 'Тема письма', 'Текст письма', $headers); // отправляем письмо
		// $result =  $mailSMTP->send('Кому письмо', 'Тема письма', 'Текст письма', 'Заголовки письма');
		if($result === true){
		    echo "Письмо успешно отправлено";
		}else{
		    echo "Письмо не отправлено. Ошибка: " . $result;
		}
        $arrayContent = [

        ];
        return $arrayContent;
	}
	
}



