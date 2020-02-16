<div style="">
    <div class="see-now-main-data">
        <div class="data-title">
            <a class="data-title-link">Фильм</a>
        </div>
        <div class="data-desc-2">
            <div class="see-now-img">
                {% set img = 'stub.jpg' %} 
                {%if randomData.filmData.main_img != '' %}           
                    {% set img = randomData.filmData.main_img %}                                   
                {% endif %}
                <img src="https://randomizer.me/img/films/{{img}}" width="250" alt="Фильм &laquo;{{ randomData.filmData.title_ru }}&raquo;" title="{{ randomData.filmData.title_ru }}">
            </div>
            <div class="see-now-text">
                <p class="art-title">{{ randomData.filmData.title_ru }}</p>
                <p class="art-title">{{ randomData.filmData.year }}, {{ randomData.filmData.categories|join(', ') }}, {{ randomData.filmData.country }}, {{ randomData.filmData.duration }} мин.</p>
                <p class="art-text">{{ randomData.filmData.description_ru }}</p>
                <p class="art-text"><b>В главных ролях:</b> {{ randomData.filmData.actors }}</p>
                <p class="art-text"><b>Режиссёр:</b> {{ randomData.filmData.genres }}</p>
            </div>
        </div>
    </div>

</div>