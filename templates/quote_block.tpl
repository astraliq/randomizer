<p class="main-block-data-menu">Ваша случайность из категории:<span class="cat-sel">{{ content.categoryTitle }}</span><span class="cat-settings">Настроить фильтр</span><span class="next-random" onclick="quote.init()">Следующая цитата</span></p>
<div class="main-block-data-primary">
    <div class="main-block-free">
    	<img src="{{content.randomData.picture}}" width="276" height="415" class="poet-pic">
        <p class="poet-desc"> {{content.randomData.authorInfo}} </p>
    </div>
    <div class="main-block-data-text">
        <p class="quotes-desc"><span class="left-aquo">&laquo;</span>{{content.randomData.text}}
        	<span class="right-aquo">&raquo;</span>
        </p>
        <p class="qoutes-title">
			{%if content.randomData.author == '' %}           
				{{content.randomData.author}}     
			{% endif %} 
     	</p>
     </div>
</div> 
<div class="other-cat">Кроме цитат наш генератор выдаёт варианты из <a class="link-in-text">других категорий</a>, например, &laquo;<a href="#" class="link-in-text" onclick="film.getRndFilm()">Фильм</a>&raquo;</div>