<div class="see-now-main-data">
    <div class="see-now-cat">
        <a class="see-now-cat-link" onclick="words.init();">Интересное слово</a>
    </div>
    <div class="see-now-text">
    	<h1>Слово: {{ content.browseNowData.wordData.word }}</h1>
        <h3>Язык: {{ content.browseNowData.wordData.language }}</h3>
        <div class="see-now-wrapper">
	        <label for="button-w" onclick="changeStatus('word', 'word_desc')" id="word">Больше описания</label>
	        <input type="checkbox" id="button-w">
	        <p class="word-text" id="word_desc"><span style="font-size: 24px">Значение: </span> {{ content.browseNowData.wordData.meaning }}</p>
	    </div>
    </div>
</div>