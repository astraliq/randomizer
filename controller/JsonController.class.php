<?php
class JsonController extends Controller {
    public $title = 'JSON_PARSE';
    public $mainTitle;
    public $pageName = 'json_parse';
    public $json;

    public function __construct() {
        parent::__construct();
        $this->mainTitle .= 'JSON_PARSE';
        $this->json = new JsonFileParse();
    } 

	public function index($data) {
        $this->mainTitle .= 'JSON_PARSE';
        $this->view = 'stub';
        $jsonArr = $this->json->getArrayFromFile();
        $this->json->addArrToSql($jsonArr);
        
        $arrayContent = [

        ];
        return $arrayContent;
	}
	
}