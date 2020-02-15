<?php
class KinoController extends Controller {
    public $title = 'KINO';
    public $mainTitle;
    public $pageName = 'KINO';
    public $parser;

    public function __construct() {
        parent::__construct();
        $this->mainTitle .= 'KINO';
        $this->parser = new Parser();
    } 

	public function index($data) {
        $this->mainTitle .= 'KINO';
        $this->view = 'stub';
        $id = $_GET['id'];
        $html = $this->parser->getPage([
            "url" => "https://www.kinopoisk.ru/film/" . $id . "/", // string Ссылка на страницу
            "useragent" => "Opera/9.80 (Windows NT 6.2; WOW64) Presto/2.12.388 Version/12.17", // string Содержимое заголовка "User-Agent: ", посылаемого в HTTP-запросе
            //User-Agent: Opera/9.80 (Windows NT 6.2; WOW64) Presto/2.12.388 Version/12.17
            "timeout" => 5, // int Максимально позволенное количество секунд для выполнения CURL-функций
            "connecttimeout" => 10, // int Количество секунд ожидания при попытке соединения
            "head" => false, // bool Для вывода заголовков без тела документа
            "cookie" => [
                "file" => "cookie.txt", // string Файл для хранения cookie
                "session" => false // bool Для указания текущему сеансу начать новую "сессию" cookies
            ],
            // "proxy" => [
            //     "ip" => "127.0.0.1", // string IP адрес прокси сервера
            //     "port" => 80, // int Порт прокси сервера
            //     "type" => "CURLPROXY_HTTP" // string Тип прокси сервера
            // ],
            "headers" => [ // array Массив устанавливаемых HTTP-заголовков
                // "authority: www.kinopoisk.ru",
                "method: GET",
                // "path: /film/300/",
                "scheme: https",
                "accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding: gzip, deflate, br",
                "accept-language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control: no-cache",
                "cookie: PHPSESSID=2qs3923nulqedtnoophehie5k0; yandex_gid=49; _csrf_csrf_token=GEZ4PPYAvougsWd3pfqwHZgOxkPX16zgiUTIh17Snk0; desktop_session_key=92c95928cae3f37c6568ededd749394a0c5a58e28efabcf13a8a9a1fa057475b09552a038ecb0e994179beda66dc2a071f9d85a63fe3c1704731078e47b148f0ef1247ad3caf962fcaf261548f6fc1ce2fa7ba5193239da630d11e633586643a; desktop_session_key.sig=Bq_eOZIWjyK5pmzXOZwYu0zST_k; mda_exp_enabled=1; _ym_uid=1570553801458839649; mda=0; yandexuid=4817540051524515603; i=VZca9DjPYCIScOD0Rx6YYnJAlQ7dhdOcWU6dDXP2FgYqkJkG0Vc3dWR9du4ii6Nl2HV98kyi88Meisn6i5rdYrzInkY=; yuidss=4817540051524515603; uid=35571779; mobile=no; _ym_isad=2; yp=1583820806.oyu.4817540051524515603#1581315206.yu.4817540051524515603; user-geo-region-id=49; user-geo-country-id=2; _ym_wasSynced=%7B%22time%22%3A1581229224148%2C%22params%22%3A%7B%22eu%22%3A0%7D%2C%22bkParams%22%3A%7B%7D%7D; tc=503; fuid01=5ae828af28d4dda6.VqYNJWAVgOcYFEVyKtGMgybJIr3JC6voVlHeHrZRYHNihMi5DqfSHyuUC0xUOLFFCKmJoahKddFapt33a532kpfoyG-4SxyVcIJW4hP3BH2Q9_O1LJffFTrIKmTFzfd2; session_key=eyJzZWNyZXQiOiJEMTB4VTV1bDA4T2s2YWxjU05OLXZWdjQiLCJfZXhwaXJlIjoxNTgxMzE2ODgxODQ1LCJfbWF4QWdlIjo4NjQwMDAwMH0=; session_key.sig=8jTGMfWUtWuY98erJeL1CuLxheM; oscargame_vote=2ce7eec684199e768e365b80d132a3fd; oscargame_vote.sig=NvL7KBbKejcNsjsXflOPFlxqQiQ; gdpr=0; user_country=ru; _ym_visorc_56177992=b; _ym_visorc_22663942=b; _ym_visorc_52332406=b; ya_sess_id=noauth:1581250849; ys=udn.cDphc3RyYWw0NTc%3D#c_chck.2840723652; mda2_beacon=1581250849391; sso_status=sso.passport.yandex.ru:synchronized; yandex_plus_metrika_cookie=true; _ym_d=1581255766; cycada=LuvHUR+Ui2O5OJFgQ+npsVwos2NpIxQ89ypSzKf+2g4=",
                "pragma: no-cache",
                "sec-fetch-mode: navigate",
                "sec-fetch-site: none",
                "sec-fetch-user: ?1",
                "upgrade-insecure-requests: 1",
                "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",

                // "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                // "Accept-Encoding: gzip, deflate, br",
                // "Accept-Language: ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
                // "Host: www.kinopoisk.ru",
                // "Connection: keep-alive",

                // "Content-type: text/plain",
                // "Content-length: 100000"
            ],
            // "post" => "'param1=val1&param2=val2" // string Все данные, передаваемые в HTTP POST-запросе
        ]);
        echo $html['data']['content'];
        // echo '<pre>';
        // print_r($html['data']);
        // echo '</pre>';
        // exit();
        $arrayContent = [
            'html' => $html
        ];
        return $arrayContent;
	}

    public function poiskid($data) {
        $this->mainTitle .= 'KINO';
        $this->view = 'stub';
        $id = $_GET['id'];
        $page = $_GET['page'] ? 'page='.$_GET['page'].'&' : '';
        $sort = $_GET['sort'] ? 'sort='.$_GET['sort'].'&' : '';
        $quick_filters = $_GET['quick_filters'] ? 'quick_filters='.$_GET['quick_filters'] : '';
        // print_r($page);
        // print_r($sort);
        // print_r($quick_filters);
        // exit();

        $html = $this->parser->getPage([
            // "url" => "https://www.kinopoisk.ru/lists/navigator/2018/?" . $page . $sort . $quick_filters, // string Ссылка на страницу
            // "url" => "https://www.kinopoisk.ru/top/navigator/m_act[years]/2000%3A2009/m_act[is_film]/on/m_act[is_mult]/on/order/rating/perpage/50/#results", // string Ссылка на страницу
            "url" => "https://www.kinopoisk.ru/top/navigator/m_act[years]/2000%3A2009/m_act[is_film]/on/m_act[is_mult]/on/order/rating/page/".$id."/#results", // string Ссылка на страницу
            "useragent" => "Opera/9.80 (Windows NT 6.2; WOW64) Presto/2.12.388 Version/12.17", // string Содержимое заголовка "User-Agent: ", посылаемого в HTTP-запросе
            //User-Agent: Opera/9.80 (Windows NT 6.2; WOW64) Presto/2.12.388 Version/12.17
            "timeout" => 5, // int Максимально позволенное количество секунд для выполнения CURL-функций
            "connecttimeout" => 10, // int Количество секунд ожидания при попытке соединения
            "head" => false, // bool Для вывода заголовков без тела документа
            "cookie" => [
                "file" => "cookie.txt", // string Файл для хранения cookie
                "session" => false // bool Для указания текущему сеансу начать новую "сессию" cookies
            ],
            // "proxy" => [
            //     "ip" => "127.0.0.1", // string IP адрес прокси сервера
            //     "port" => 80, // int Порт прокси сервера
            //     "type" => "CURLPROXY_HTTP" // string Тип прокси сервера
            // ],
            "headers" => [ // array Массив устанавливаемых HTTP-заголовков
                // "authority: www.kinopoisk.ru",
                "method: GET",
                // "path: /film/300/",
                "scheme: https",
                "accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding: gzip, deflate, br",
                "accept-language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control: no-cache",
                "cookie: PHPSESSID=2qs3923nulqedtnoophehie5k0; yandex_gid=49; _csrf_csrf_token=GEZ4PPYAvougsWd3pfqwHZgOxkPX16zgiUTIh17Snk0; desktop_session_key=92c95928cae3f37c6568ededd749394a0c5a58e28efabcf13a8a9a1fa057475b09552a038ecb0e994179beda66dc2a071f9d85a63fe3c1704731078e47b148f0ef1247ad3caf962fcaf261548f6fc1ce2fa7ba5193239da630d11e633586643a; desktop_session_key.sig=Bq_eOZIWjyK5pmzXOZwYu0zST_k; mda_exp_enabled=1; _ym_uid=1570553801458839649; mda=0; yandexuid=4817540051524515603; i=VZca9DjPYCIScOD0Rx6YYnJAlQ7dhdOcWU6dDXP2FgYqkJkG0Vc3dWR9du4ii6Nl2HV98kyi88Meisn6i5rdYrzInkY=; yuidss=4817540051524515603; uid=35571779; mobile=no; _ym_isad=2; yp=1583820806.oyu.4817540051524515603#1581315206.yu.4817540051524515603; user-geo-region-id=49; user-geo-country-id=2; _ym_wasSynced=%7B%22time%22%3A1581229224148%2C%22params%22%3A%7B%22eu%22%3A0%7D%2C%22bkParams%22%3A%7B%7D%7D; tc=503; fuid01=5ae828af28d4dda6.VqYNJWAVgOcYFEVyKtGMgybJIr3JC6voVlHeHrZRYHNihMi5DqfSHyuUC0xUOLFFCKmJoahKddFapt33a532kpfoyG-4SxyVcIJW4hP3BH2Q9_O1LJffFTrIKmTFzfd2; session_key=eyJzZWNyZXQiOiJEMTB4VTV1bDA4T2s2YWxjU05OLXZWdjQiLCJfZXhwaXJlIjoxNTgxMzE2ODgxODQ1LCJfbWF4QWdlIjo4NjQwMDAwMH0=; session_key.sig=8jTGMfWUtWuY98erJeL1CuLxheM; oscargame_vote=2ce7eec684199e768e365b80d132a3fd; oscargame_vote.sig=NvL7KBbKejcNsjsXflOPFlxqQiQ; gdpr=0; user_country=ru; _ym_visorc_56177992=b; _ym_visorc_22663942=b; _ym_visorc_52332406=b; ya_sess_id=noauth:1581250849; ys=udn.cDphc3RyYWw0NTc%3D#c_chck.2840723652; mda2_beacon=1581250849391; sso_status=sso.passport.yandex.ru:synchronized; yandex_plus_metrika_cookie=true; _ym_d=1581255766; cycada=LuvHUR+Ui2O5OJFgQ+npsVwos2NpIxQ89ypSzKf+2g4=",
                "pragma: no-cache",
                "sec-fetch-mode: navigate",
                "sec-fetch-site: none",
                "sec-fetch-user: ?1",
                "upgrade-insecure-requests: 1",
                "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
                "Access-Control-Allow-Origin: https://www.kinopoisk.ru",

                // "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                // "Accept-Encoding: gzip, deflate, br",
                // "Accept-Language: ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
                // "Host: www.kinopoisk.ru",
                // "Connection: keep-alive",

                // "Content-type: text/plain",
                // "Content-length: 100000"
            ],
            // "post" => "'param1=val1&param2=val2" // string Все данные, передаваемые в HTTP POST-запросе
        ]);
        echo $html['data']['content'];
        // echo '<pre>';
        // print_r($html['data']);
        // echo '</pre>';
        // exit();
        $arrayContent = [
            'html' => $html
        ];
        return $arrayContent;
    }
	
}