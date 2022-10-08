<div class="see-now-main-data">
    <div class="see-now-cat">
        <a class="see-now-cat-link" href="/word">Интересное слово</a>
    </div>
    <div class="see-now-text">
    	<h4 class="see_now-qoute_head">Слово: {{ content.browseNowData.wordData.word }}</h4>
        <h4 class="see_now-qoute_head">Язык: {{ content.browseNowData.wordData.language }}</h4>
        <div class="see-now-wrapper">
	        <label for="button-w" onclick="changeStatus('word', 'word_desc')" id="word">Больше описания</label>
	        <input type="checkbox" id="button-w">
	        <p class="word-text" id="word_desc"><span>Значение: </span> {{ content.browseNowData.wordData.meaning }}</p>
	    </div>
    </div>
</div>