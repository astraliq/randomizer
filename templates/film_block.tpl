	<section class="main-block main-color-1">

            <div class="main-block-menu">
                <div>Cлучайность из категории:<span class="cat-sel">{{ content.categoryTitle }}</span></div>
                <div>
                    <span class="cat-settings" id="film-filter-open">Настроить фильтр</span>
                    <span class="next-random" onclick="film.getRndFilm()">Следующий фильм</span>
                </div>
            </div>

            <div class="main-block-data">
                <div class="main-block-data-primary">
                    <div class="main-block-data-pic">
                    	{% set img = 'stub.jpg' %} 
						{%if content.randomData.data.main_img is not null %}           
					        {% set img = content.randomData.data.main_img %}                                   
					    {% endif %}
                        <img src="img/films/{{img}}" width="276" alt="Фильм &laquo;{{ content.randomData.data.title_ru }}&raquo;" title="{{ content.randomData.data.title_ru }}">
                    </div>
                    <div class="main-block-data-text">
                        <p class="main-data-title">
							<span class="left-aquo">«{{ content.randomData.data.title_ru }}»</span>
						</p>
                        <p class="film-info">{{ content.randomData.data.year }}, {{ content.randomData.categories|join(', ') }}, {{ content.randomData.data.country }}, {{ content.randomData.data.duration }} мин.</p>
                        <p class="film-desc">{{ content.randomData.data.description_ru }}</p>
                        <p class="film-desc"><b>В главных ролях:</b> {{ content.randomData.data.actors }}</p>
                        <p class="film-desc"><b>Режиссёр:</b> {{ content.randomData.data.genres }}</p>
                    </div>
                </div>
            </div>

        {% include 'other_cat.tpl' %}
    </section>
