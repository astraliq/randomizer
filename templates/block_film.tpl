    <section class="main-block main-color-1">
            <h1 class="hidden-title">Случайный фильм</h1>
            <h2 class="hidden-title">Рандомный фильм по жанрам, по годам</h2>
            <div class="main-block-menu">
                <div>Cлучайность из категории:<span class="cat-sel">{{ content.categoryTitle }}</span></div>
                <div>
                    <span class="cat-settings" id="film-filter-open">Настроить фильтр</span>
                    <span class="next-random" onclick="film.getRndFilm()">Следующий фильм</span>
                </div>
            </div>

            <div class="main-block-data">
                <div class="main-block-data-primary">
                    <div class="main-block-data-pic" width="276">
                    	{% set img = 'img/films/film-error.png' %} 
						{%if content.randomData.data.main_img is not null %}           
					        {% set img = '' %}                                   
					    {% endif %}
                        <img class="film-pic" src="{{ img }}" width="276" height="380" alt="Фильм &laquo;{{ content.randomData.data.title_ru }}&raquo;" title="{{ content.randomData.data.title_ru }}" data-c="m" data-i="{{content.randomData.data.main_img}}">      
                    </div>
                    <div class="main-block-data-text">
                        <p class="main-data-title">
							<span class="left-aquo">«{{ content.randomData.data.title_ru }}»</span>
						</p>
                        <p class="film-info">{{ content.randomData.data.year }}, 
                        {%if content.randomData.categories %}           
                            {{ content.randomData.categories|join(', ') }}, 
                        {% endif %}
                        {{ content.randomData.data.country }},
                            {% if content.randomData.data.duration %}
                            {{ content.randomData.data.duration }} мин.</p>
                            {% endif %}
                        <p class="film-desc" #="film-rating_block">
                            {% if not content.randomData.data.kp_id %}
                            <b>Рейтинг Кинопоиска:</b>
                            {% else %}
                            <b>Рейтинг <a target="_blank" href="https://www.kinopoisk.ru/film/{{ content.randomData.data.kp_id }}/"> <img height="20" class="img_kp" src="/img/other/kp_small.jpg" alt="">инопоиска</a>: </b>
                            {% endif %}

                        {% if content.randomData.data.rating == 0 %}           
                                нет данных
                            {% else %}
                                 {{ content.randomData.data.rating }}
                            {% endif %}
                        </p>
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
