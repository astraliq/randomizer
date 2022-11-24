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
        // $catTitle = $this->randomType->getRandomCategory();
        $catTitle = 'Число';
        $randomData = $this->randomType->getRandomData($catTitle);
        $browseFirst = $this->randomType->getRndBrowseNowCat([$catTitle]);
        $browseSecond = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst]);
        $browseThird = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond]);
        $browseFourth = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond, $browseThird]);
        $browseNowData = $this->randomType->getBrowseNowData([$browseFirst, $browseSecond, $browseThird, $browseFourth]);
        $otherCategory = $this->randomType->getRndBrowseNowCat([$catTitle]);
        $hash = $_SESSION['h'];
        $arrayContent = [
            'categoryTitle' => $catTitle,
            'randomData' =>  $randomData,
            'browseNow1' =>  $this->randomType->categories[$browseFirst]['tpl'],
            'browseNow2' =>  $this->randomType->categories[$browseSecond]['tpl'],
            'browseNow3' =>  $this->randomType->categories[$browseThird]['tpl'],
            'browseNow4' =>  $this->randomType->categories[$browseFourth]['tpl'],
            'browseNowData' => $browseNowData,
            'categoryCase' => $this->randomType->categories[$catTitle]['case'],
            'otherCategory' => $otherCategory,
            'otherCatParams' => $this->randomType->categories[$otherCategory],
            'hash' => $hash
        ];
        return $arrayContent;
	}
	
    public function film($data) {
        $this->mainTitle .= '';
        // $catTitle = $this->randomType->getRandomCategory()['category_title'];
        $catTitle = 'Фильм';
        $randomData = $this->randomType->getRandomData($catTitle);
        $browseFirst = $this->randomType->getRndBrowseNowCat([$catTitle]);
        $browseSecond = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst]);
        $browseThird = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond]);
        $browseFourth = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond, $browseThird]);
        $browseNowData = $this->randomType->getBrowseNowData([$browseFirst, $browseSecond, $browseThird, $browseFourth]);
        $otherCategory = $this->randomType->getRndBrowseNowCat([$catTitle]);
        $hash = $_SESSION['h'];
        $arrayContent = [
            'categoryTitle' => $catTitle,
            'randomData' =>  $randomData,
            'browseNow1' =>  $this->randomType->categories[$browseFirst]['tpl'],
            'browseNow2' =>  $this->randomType->categories[$browseSecond]['tpl'],
            'browseNow3' =>  $this->randomType->categories[$browseThird]['tpl'],
            'browseNow4' =>  $this->randomType->categories[$browseFourth]['tpl'],
            'browseNowData' => $browseNowData,
            'categoryCase' => $this->randomType->categories[$catTitle]['case'],
            'otherCategory' => $otherCategory,
            'otherCatParams' => $this->randomType->categories[$otherCategory],
            'hash' => $hash
        ];
        return $arrayContent;
    }

    public function quote($data) {
        $this->mainTitle .= '';
        // $catTitle = $this->randomType->getRandomCategory()['category_title'];
        $catTitle = 'Цитата';
        $randomData = $this->randomType->getRandomData($catTitle);
        $browseFirst = $this->randomType->getRndBrowseNowCat([$catTitle]);
        $browseSecond = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst]);
        $browseThird = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond]);
        $browseFourth = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond, $browseThird]);
        $browseNowData = $this->randomType->getBrowseNowData([$browseFirst, $browseSecond, $browseThird, $browseFourth]);
        $otherCategory = $this->randomType->getRndBrowseNowCat([$catTitle]);
        $hash = $_SESSION['h'];
        $arrayContent = [
            'categoryTitle' => $catTitle,
            'randomData' =>  $randomData,
            'browseNow1' =>  $this->randomType->categories[$browseFirst]['tpl'],
            'browseNow2' =>  $this->randomType->categories[$browseSecond]['tpl'],
            'browseNow3' =>  $this->randomType->categories[$browseThird]['tpl'],
            'browseNow4' =>  $this->randomType->categories[$browseFourth]['tpl'],
            'browseNowData' => $browseNowData,
            'categoryCase' => $this->randomType->categories[$catTitle]['case'],
            'otherCategory' => $otherCategory,
            'otherCatParams' => $this->randomType->categories[$otherCategory],
            'hash' => $hash
        ];
        return $arrayContent;
    }

    public function number($data) {
        $this->mainTitle .= '';
        // $catTitle = $this->randomType->getRandomCategory()['category_title'];
        $catTitle = 'Число';
        $randomData = $this->randomType->getRandomData($catTitle);
        $browseFirst = $this->randomType->getRndBrowseNowCat([$catTitle]);
        $browseSecond = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst]);
        $browseThird = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond]);
        $browseFourth = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond, $browseThird]);
        $browseNowData = $this->randomType->getBrowseNowData([$browseFirst, $browseSecond, $browseThird, $browseFourth]);
        $otherCategory = $this->randomType->getRndBrowseNowCat([$catTitle]);
        $hash = $_SESSION['h'];
        $arrayContent = [
            'categoryTitle' => $catTitle,
            'randomData' =>  $randomData,
            'browseNow1' =>  $this->randomType->categories[$browseFirst]['tpl'],
            'browseNow2' =>  $this->randomType->categories[$browseSecond]['tpl'],
            'browseNow3' =>  $this->randomType->categories[$browseThird]['tpl'],
            'browseNow4' =>  $this->randomType->categories[$browseFourth]['tpl'],
            'browseNowData' => $browseNowData,
            'categoryCase' => $this->randomType->categories[$catTitle]['case'],
            'otherCategory' => $otherCategory,
            'otherCatParams' => $this->randomType->categories[$otherCategory],
            'hash' => $hash
        ];
        return $arrayContent;
    }

    public function congratulate($data) {
        $this->mainTitle .= '';
        // $catTitle = $this->randomType->getRandomCategory()['category_title'];
        $catTitle = 'Поздравление';
        $randomData = $this->randomType->getRandomData($catTitle);
        $browseFirst = $this->randomType->getRndBrowseNowCat([$catTitle]);
        $browseSecond = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst]);
        $browseThird = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond]);
        $browseFourth = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond, $browseThird]);
        $browseNowData = $this->randomType->getBrowseNowData([$browseFirst, $browseSecond, $browseThird, $browseFourth]);
        $otherCategory = $this->randomType->getRndBrowseNowCat([$catTitle]);
        $hash = $_SESSION['h'];
        $arrayContent = [
            'categoryTitle' => $catTitle,
            'randomData' =>  $randomData,
            'browseNow1' =>  $this->randomType->categories[$browseFirst]['tpl'],
            'browseNow2' =>  $this->randomType->categories[$browseSecond]['tpl'],
            'browseNow3' =>  $this->randomType->categories[$browseThird]['tpl'],
            'browseNow4' =>  $this->randomType->categories[$browseFourth]['tpl'],
            'browseNowData' => $browseNowData,
            'categoryCase' => $this->randomType->categories[$catTitle]['case'],
            'otherCategory' => $otherCategory,
            'otherCatParams' => $this->randomType->categories[$otherCategory],
            'hash' => $hash
        ];
        return $arrayContent;
    }

    public function word($data) {
        $this->mainTitle .= '';
        // $catTitle = $this->randomType->getRandomCategory()['category_title'];
        $catTitle = 'Интересное слово';
        $randomData = $this->randomType->getRandomData($catTitle);
        $browseFirst = $this->randomType->getRndBrowseNowCat([$catTitle]);
        $browseSecond = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst]);
        $browseThird = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond]);
        $browseFourth = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond, $browseThird]);
        $browseNowData = $this->randomType->getBrowseNowData([$browseFirst, $browseSecond, $browseThird, $browseFourth]);
        $otherCategory = $this->randomType->getRndBrowseNowCat([$catTitle]);
        $hash = $_SESSION['h'];
        $arrayContent = [
            'categoryTitle' => $catTitle,
            'randomData' =>  $randomData,
            'browseNow1' =>  $this->randomType->categories[$browseFirst]['tpl'],
            'browseNow2' =>  $this->randomType->categories[$browseSecond]['tpl'],
            'browseNow3' =>  $this->randomType->categories[$browseThird]['tpl'],
            'browseNow4' =>  $this->randomType->categories[$browseFourth]['tpl'],
            'browseNowData' => $browseNowData,
            'categoryCase' => $this->randomType->categories[$catTitle]['case'],
            'otherCategory' => $otherCategory,
            'otherCatParams' => $this->randomType->categories[$otherCategory],
            'hash' => $hash
        ];
        return $arrayContent;
    }

    public function vk($data) {
        $this->mainTitle .= '';
        // $catTitle = $this->randomType->getRandomCategory()['category_title'];
        $catTitle = 'Определение победителя в ВК по лайкам и репостам';
        $randomData = $this->randomType->getRandomData($catTitle);
        $browseFirst = $this->randomType->getRndBrowseNowCat([$catTitle]);
        $browseSecond = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst]);
        $browseThird = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond]);
        $browseFourth = $this->randomType->getRndBrowseNowCat([$catTitle, $browseFirst, $browseSecond, $browseThird]);
        $browseNowData = $this->randomType->getBrowseNowData([$browseFirst, $browseSecond, $browseThird, $browseFourth]);
        $otherCategory = $this->randomType->getRndBrowseNowCat([$catTitle]);
        $hash = $_SESSION['h'];
        $arrayContent = [
            'categoryTitle' => $catTitle,
            'randomData' =>  $randomData,
            'browseNow1' =>  $this->randomType->categories[$browseFirst]['tpl'],
            'browseNow2' =>  $this->randomType->categories[$browseSecond]['tpl'],
            'browseNow3' =>  $this->randomType->categories[$browseThird]['tpl'],
            'browseNow4' =>  $this->randomType->categories[$browseFourth]['tpl'],
            'browseNowData' => $browseNowData,
            'categoryCase' => 'розыгрыша',
            'otherCategory' => $otherCategory,
            'otherCatParams' => $this->randomType->categories[$otherCategory],
            'hash' => $hash
        ];
        return $arrayContent;
    }

}