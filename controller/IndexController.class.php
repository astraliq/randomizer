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
        $browseFirst = $this->randomType->getRndBrowseNowCat([$catTitle]);
        $browseSecond = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst]);
        $browseThird = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond]);
        $browseNowData = $this->randomType->getBrowseNowData([$browseFirst, $browseSecond, $browseThird]);
        $arrayContent = [
            'categoryTitle' => $catTitle,
            'randomData' =>  $randomData,
            'browseNow1' =>  $this->randomType->browseNowTpl[$browseFirst],
            'browseNow2' =>  $this->randomType->browseNowTpl[$browseSecond],
            'browseNow3' =>  $this->randomType->browseNowTpl[$browseThird],
            'browseNowData' => $browseNowData,
        ];
        return $arrayContent;
	}
	
}