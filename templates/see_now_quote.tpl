<div class="see-now-main-data">
    <div class="data-title">
        <a class="data-title-link" onclick="quote.init()">Цитата</a>
    </div>
    <div class="data-desc-2">
        <div class="see-now-img">
            {% set img = 'img/quoters/stub.jpg' %} 
            {%if content.browseNowData.quoteData.picture is not null %}           
                {% set img = content.browseNowData.quoteData.picture %}                                   
            {% endif %}
            <img src="{{img}}" width="100" alt="Автор" title="Автор">
        </div>
        <div class="see-now-text">
            <p class="art-title">
            	{%if content.browseNowData.quoteData.author is not null %}           
				    {{content.browseNowData.quoteData.author}}     
				{% endif %} 
			</p>
            <p class="art-text">{{content.browseNowData.quoteData.text}}</p>
        </div>
    </div>
</div>