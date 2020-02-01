<p class="main-block-data-menu">Ваша случайность из категории:
	<span class="cat-sel">{{ content.categoryTitle }}</span>
	<a href="#openModal" id="film-filter-open">
		<span class="cat-settings">Настроить фильтр</span>
	</a>
	<span class="next-random" onclick="film.getRndFilm()">Следующий фильм</span>
</p>
<div class="main-block-data-primary">
                	
	<div class="main-block-data-pic">
		{% set img = 'stub.jpg' %} 
		{%if content.randomData.data.main_img != '' %}           
	        {% set img = content.randomData.data.main_img %}                                   
	    {% endif %} 
		<img src="img/films/{{img}}" width="276" height="415">
	</div>
	<div class="main-block-data-text">
		<h1 class="film-title">«{{ content.randomData.data.title_ru }}»</h1>
		<p class="film-info">{{ content.randomData.data.year }}, {{ content.randomData.categories|join(', ') }}, {{ content.randomData.data.country }}, {{ content.randomData.data.duration }} мин.</p>
		<p class="film-desc">{{ content.randomData.data.description_ru }}</p>
		<p class="film-desc"><b>В главных ролях:</b> {{ content.randomData.data.actors }}</p>
		<p class="film-desc"><b>Режиссёр:</b> {{ content.randomData.data.genres }}</p> 

	</div>
</div>
<div class="other-cat">Кроме фильмов наш генератор выдаёт варианты из <a class="link-in-text">других категорий</a>, например, &laquo;<a href="#" class="link-in-text" onclick="quote.init()">Цитата</a>&raquo;</div>