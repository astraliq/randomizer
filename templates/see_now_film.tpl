<div class="see-now-main-data">
    <div class="see-now-cat">
        <a class="see-now-cat-link" href="/film">Фильм</a>
    </div>
    <div class="see-now-desc">
        <div class="see-now-img">
            {% set img = 'img/films/film-error.png' %} 
            {%if content.browseNowData.filmData.main_img != '' %}           
                {% set img = '' %}                                   
            {% endif %}
            <img src="{{img}}" width="100" alt="Фильм &laquo;{{ content.browseNowData.filmData.title_ru }}&raquo;" title="{{ content.browseNowData.filmData.title_ru }}" data-c="m" data-i="{{content.browseNowData.filmData.main_img}}">
        </div>
        <div class="see-now-text">
            <p class="see-now-subtitle">{{ content.browseNowData.filmData.title_ru }}
                <br>{{ content.browseNowData.filmData.year }}, {{ content.browseNowData.filmData.country }}, {{ content.browseNowData.filmData.duration }} мин.</p>
            <div class="see-now-wrapper">
                <label for="button-m" onclick="changeStatus('movie', 'moviedesc')" id="movie">Больше описания</label>
                <input type="checkbox" id="button-m">
                <p class="movie-text" id="moviedesc">{{ content.browseNowData.filmData.description_ru }}</p>
            </div>
        </div>
    </div>
</div>