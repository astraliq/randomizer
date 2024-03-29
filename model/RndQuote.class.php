<?php
declare(strict_types=1);
class RndQuote extends Model {
	public $quoteTable = 'quotes';
	public $quoteCategories = 'quotes_categories';
	public $quoteAuthors = 'quotes_authors';
	public $history;

	public function __construct() {
		parent::__construct();
		$this->history = new History();
    }

	public function getRandomQuote($categories, $authors) {
		
		if ($categories === '') {
			$filterCat = "";
		} else {
			$categories = implode(', ', $categories);
			$filterCat = " q.`category_id` IN ($categories)";
		}
		
		if ($authors === '') {
			$filterAuthors = "";
		} else {
			$authors = implode(', ', $authors);
			$filterAuthors = ($categories !== '') ? " AND q.`author_id` IN ($authors)" : " q.`author_id` IN ($authors)";
		}

		$where = (($categories !== '') || ($authors !== '')) ? ' WHERE ' : '';

		$sql = "SELECT q.`id`, `text`, `author_title` as author, `category_title` as categories, author.`authorInfo`, q.`img` as picture FROM `$this->quoteTable` as q LEFT JOIN `$this->quoteCategories` as cat ON q.`category_id` = cat.id LEFT JOIN `$this->quoteAuthors` as author ON q.`author_id` = author.id" . $where . $filterCat . $filterAuthors;

		$quotes = $this->dataBase->getRows($sql, null);

		if ($quotes) {
			$randomQuote = $quotes[array_rand($quotes, 1)];
			$catId = $this->history->getCategoryId('Цитата');
			$addToGenHistory = $this->history->addRandomToGeneralHistory($catId, $randomQuote['id']);
		} else {
			$randomQuote = null;
		}
		
		return $randomQuote;
	}

	public function getQuoteById($id) {
		$sql = "SELECT q.`id`, `text`, `author_title` as author, `category_title` as categories, author.`authorInfo`, q.`img` as picture FROM `$this->quoteTable` as q LEFT JOIN `$this->quoteCategories` as cat ON q.`category_id` = cat.id LEFT JOIN `$this->quoteAuthors` as author ON q.`author_id` = author.id WHERE q.`id` = $id";

		$quote = $this->dataBase->getRow($sql, null);
		
		return $quote;
	}

	public function addAuthor($authors) {
		$columns = ['author_title','href'];

		foreach ($authors as $author) {
			$object = [
				'author_title' => $author['title'],
				'href' => $author['href'],
			];
			$result = $this->dataBase->uniInsert($this->quoteAuthors, $object);
		};
		
		return $result;

	}

	public function addQuotes($author, $quotes) {
		$columns = ['text','author_id','href'];

		$ifExist = $this->dataBase->uniSelect($this->quoteAuthors, ['author_title'=>$author]);
		// print_r($ifExist);
		// exit();
		$object = array();
		if ($ifExist) {
			$authorID = $ifExist['id'];
			foreach ($quotes as $quote) {
				$object[] = [$quote['text'],$authorID,$quote['href']];
			}
			$result = $this->dataBase->uniInsertArray($this->quoteTable, $columns, $object);
		};
			
		
		return $result;

	}
}
?>