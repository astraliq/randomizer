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
                    	{% set img = 'film-error.png' %} 
						{%if content.randomData.data.main_img is not null %}           
					        {% set img = content.randomData.data.main_img %}                                   
					    {% endif %}
                        <img src="img/films/{{img}}" width="276" alt="Фильм &laquo;{{ content.randomData.data.title_ru }}&raquo;" title="{{ content.randomData.data.title_ru }}">
                    </div>
                    <div class="main-block-data-text">
                        <p class="main-data-title">
							<span class="left-aquo">«{{ content.randomData.data.title_ru }}»</span>
						</p>
                        <p class="film-info">{{ content.randomData.data.year }}, 
                        {%if content.randomData.categories %}           
                            {{ content.randomData.categories|join(', ') }}, 
                        {% endif %}
                        {{ content.randomData.data.country }}, {{ content.randomData.data.duration }} мин.</p>
                        <p class="film-desc">{{ content.randomData.data.description_ru }}</p>
                        <p class="film-desc"><b>В главных ролях:</b>
                            {% if not content.randomData.data.actors %}           
                                нет данных
                            {% else %}
                                 {{ content.randomData.data.actors }}
                            {% endif %}
                        </p>
                        <p class="film-desc"><b>Режиссёр:</b>
                            {% if not content.randomData.data.genres %}           
                                нет данных
                            {% else %}
                                 {{ content.randomData.data.genres }}
                            {% endif %}
                    </p>
                    </div>
                </div>
            </div>

        {% include 'other_cat.tpl' %}
    </section>
