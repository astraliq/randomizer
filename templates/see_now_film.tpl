<div class="see-now-main-data">
    <div class="data-title">
        <a class="data-title-link" onclick="film.getRndFilm()">Фильм</a>
    </div>
    <div class="data-desc-2">
        {% set img = 'stub.jpg' %} 
        {%if content.browseNowData.filmData.main_img != '' %}           
            {% set img = content.browseNowData.filmData.main_img %}                                   
        {% endif %}
        <div class="see-now-img">
            <img src="img/films/{{img}}" width="100" alt="Фильм &laquo;{{ content.browseNowData.filmData.title_ru }}&raquo;" title="{{ content.browseNowData.filmData.title_ru }}">
        </div>
        <div class="see-now-text">
            <p class="art-title">{{ content.browseNowData.filmData.title_ru }}</p>
            <p class="art-title">{{ content.browseNowData.filmData.year }}, {{ content.browseNowData.filmData.country }}, {{ content.browseNowData.filmData.duration }} мин.</p>
            <p class="art-text">{{ content.browseNowData.filmData.description_ru }}</p>
        </div>
    </div>
</div>