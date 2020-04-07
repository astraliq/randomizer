<div class="see-now-main-data">
    <div class="see-now-cat">
        <a class="see-now-cat-link" href="/quote">Цитата</a>
    </div>

    <div class="see-now-text">
    	<p class="see-now-subtitle quote-person">
        	{%if content.browseNowData.quoteData.author is not null %}           
                {{content.browseNowData.quoteData.author}}     
            {% endif %}
        </p>
        <div class="see-now-wrapper">
            <label for="button-q" onclick="changeStatus('quote', 'quote_desc')" id="quote">Больше описания</label>
            <input type="checkbox" id="button-q">
            <p class="quote-text" id="quote_desc">&laquo;{{content.browseNowData.quoteData.text|raw}}&raquo;</p>
        </div>
    </div>
</div>