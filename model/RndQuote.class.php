<?php
declare(strict_types=1);
class RndQuote extends Model {
	public $quoteTable = 'quotes';
	public $quoteCategories = 'quotes_categories';
	public $quoteAuthors = 'quotes_authors';
	public function __construct() {
		parent::__construct();
    }

	public function getRandomQuote($filters) {

		if (empty($filters)) {
			$sql = "SELECT q.`id`, `text`, `author_title` as author, `category_title` as categories FROM `$this->quoteTable` as q LEFT JOIN `$this->quoteCategories` as cat ON q.`category_id` = cat.id LEFT JOIN `$this->quoteAuthors` as author ON q.`author_id` = author.id LIMIT 10000";
		} else {
			$idCategories = implode(", ", $filters);
			$sql = "SELECT q.`id`, `text`, `author_title` as author, `category_title` as categories FROM `$this->quoteTable` as q LEFT JOIN `$this->quoteCategories` as cat ON q.`category_id` = cat.id LEFT JOIN `$this->quoteAuthors` as author ON q.`author_id` = author.id WHERE cat.id IN ($idCategories)";
		}

		$quotes = $this->dataBase->getRows($sql, null);
		$randomQuote = $quotes[array_rand($quotes, 1)];

		return $randomQuote;
	}

}
?>

