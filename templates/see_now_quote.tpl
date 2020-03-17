<div class="see-now-main-data">
    <div class="see-now-cat">
        <a class="see-now-cat-link" href="/quote">Цитата</a>
    </div>
    <p class="data-text"><span class="quote-left-aquo">&laquo;{{content.browseNowData.quoteData.text}}&raquo;</span></p>
    <p class="quote-person">
        {%if content.browseNowData.quoteData.author is not null %}           
                {{content.browseNowData.quoteData.author}}     
            {% endif %} 
    </p>
</div>