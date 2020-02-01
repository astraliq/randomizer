<p class="main-block-data-menu">Ваша случайность из категории:<span class="cat-sel">{{ content.categoryTitle }}</span><span class="cat-settings">Настроить фильтр</span><span class="next-random" onclick="film.getRndFilm()">Следующая случайность</span></p>
<div class="main-block-data-primary">
                	
	<div class="main-block-data-pic">
		{% set img = 'stub.jpg' %} 
		{%if content.randomData.main_img != '' %}           
	        {% set img = content.randomData.main_img %}                                   
	    {% endif %} 
		<img src="img/films/{{img}}" width="276" height="415">
	</div>
	<div class="main-block-data-text">

		<h1 class="film-title">«{{ content.randomData.title_ru }}»</h1>
		<p class="film-info">{{ content.randomData.year }}, , {{ content.randomData.country }}, {{ content.randomData.duration }} мин.</p>
		<p class="film-desc">{{ content.randomData.description_ru }}</p>
		<p class="film-desc"><b>В главных ролях:</b> {{ content.randomData.actors }}</p>
		<p class="film-desc"><b>Режиссёр:</b> {{ content.randomData.genres }}</p> 

	</div>
</div>