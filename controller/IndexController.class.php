<?php
class IndexController extends Controller {
    public $title = '';
    public $mainTitle;
    public $pageName = 'main_page';
    public $randomType;

    public function __construct() {
        parent::__construct();
        $this->mainTitle .= '';
         $this->randomType = new Random();
    } 

	public function index($data) {
        $this->mainTitle .= '';
        // $catTitle = $this->randomType->getRandomCategory()['category_title'];
        $catTitle = $this->randomType->getRandomCategory();
        // print_r($catTitle);
        // exit();
        $arrayContent = [
            'categoryTitle' => $catTitle,
            'randomData' =>  $this->randomType->getRandomData($catTitle),
        ];
        return $arrayContent;
	}
	
}