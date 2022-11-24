<?php
class VkapiController extends Controller {
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
        $this->view = 'stub2';


        $redirect_url = '127.0.0.1:8000';
        $user_id = 7347408;
        $client_secret = 'W2RtPchFfJC27NI6BQlU';
        $code = 'a83298966f449c853e';


        // $get = 'https://oauth.vk.com/access_token?client_id=' . $user_id . '&client_secret=' . $client_secret . '&redirect_uri=' . $redirect_url . '&code=' . $code;

        $access_token_friends = Config::get('access_token_VK_friends');
        $access_token_wall= Config::get('access_token_VK_wall');
        // $get = 'https://api.vk.com/method/friends.getOnline?v=5.52&access_token=' . $access_token;

//https://vk.com/wall-47112298_438179
        $get = 'https://api.vk.com/method/wall.getReposts?v=5.52&owner_id=47112298&post_id=438179&access_token=' . $access_token_wall;

        $ch = curl_init($get);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        $data = curl_exec($ch);
        curl_close($ch);


        $json = json_decode($data);
        echo "<pre>";
        print_r($json);
        echo "</pre>";

        $arrayContent = [

        ];
        return $arrayContent;
	}
	
}



