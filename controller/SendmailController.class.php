<?php
class SendmailController extends Controller {
    public $title = 'MAIL';
    public $mainTitle;
    public $pageName = 'mail';
    public $mailing;

    public function __construct() {
        parent::__construct();
        $this->mainTitle .= 'MAIL';
        $this->mailing = new Mailing();
    } 

	public function index($data) {
        $this->mainTitle .= 'MAIL';
        $this->view = 'stub';
        $message = '
            <div class="main-block-data">
                <div class="main-block-data-primary">
                    <div class="main-block-data-pic">
					   <img src="img/films/iphone360_679.jpg" width="276" alt="Фильм &laquo;Дар&raquo;" title="Дар">
                    </div>
                    <div class="main-block-data-text">
                        <p class="main-data-title">
							<span class="left-aquo">«Дар»</span>
						</p>
                        <p class="film-info">2000, Ужасы, Фэнтези, Драма, Детектив, Триллер, США, 112 мин.</p>
                        <p class="film-desc">Вдова Энни Уилсон наделена редким даром ясновидения. И когда происходит таинственное убийство девушки из богатой семьи, ее талант приходится как нельзя кстати в установлении личности убийцы. Но все не так просто, как кажется. Дар опасен для своего носителя, разрушает психику героини и не дает однозначных ответов.Тем временем круг подозреваемых расширяется с каждым днем, вовлекая в эпицентр событий все новых персонажей, каждый из которых может быть убийцей. И чем дальше продвигается Энни в своем расследовании, тем четче осознает, что поиск правды может сокрушить ее разум.</p>
                        <p class="film-desc"><b>В главных ролях:</b> Кейт Бланшетт, Джованни Рибизи, Киану Ривз, Кэти Холмс, Грег Кинниэр, Хилари Суэнк, Майкл Джитер, Ким Диккенс, Гэри Коул, Розмари Харрис</p>
                        <p class="film-desc"><b>Режиссёр:</b> Сэм Рэйми</p>
                    </div>
                </div>
            </div>';

		$result = $this->mailing->sendMailsEW($message);

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



