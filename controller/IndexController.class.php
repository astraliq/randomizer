<?php
class IndexController extends Controller {
    public $title = '';
    public $mainTitle;
    public $pageName = 'main_page';
    public $randomType;
    public $history;

    public function __construct() {
        parent::__construct();
        $this->mainTitle .= '';
        $this->randomType = new Random();
        $this->history = new History();
    } 

	public function index($data) {
        $this->mainTitle .= '';
        // $catTitle = $this->randomType->getRandomCategory()['category_title'];
        $catTitle = $this->randomType->getRandomCategory();
        $randomData = $this->randomType->getRandomData($catTitle);
        
        $arrayContent = [
            'categoryTitle' => $catTitle,
            'randomData' =>  $randomData,

        ];
        return $arrayContent;
	}
	
}