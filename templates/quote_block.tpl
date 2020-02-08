<!-- <p class="main-block-data-menu">Ваша случайность из категории:<span class="cat-sel">{{ content.categoryTitle }}</span><span class="cat-settings">Настроить фильтр</span>
    <span class="next-random" onclick="quote.init()">Следующая цитата</span></p>
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
<div class="other-cat">Кроме цитат наш генератор выдаёт варианты из <a class="link-in-text">других категорий</a>, например, &laquo;<a href="#" class="link-in-text" onclick="film.getRndFilm()">Фильм</a>&raquo;</div> -->


<section class="main-block main-color-4">
    <div class="main-block-menu">
        <div>
            Cлучайность из категории:<span class="cat-sel">{{ content.categoryTitle }}</span>
        </div>
        <div>
            <span class="cat-settings">Настроить фильтр</span>
            <span class="next-random" onclick="quote.init()">Следующая цитата</span>
        </div>
    </div>
    <div class="main-block-data">
        <div class="main-block-data-primary">
            <div class="main-block-data-pic">
                {% set img = 'img/quoters/stub.jpg' %} 
                {%if content.randomData.picture is not null %}           
                    {% set img = content.randomData.picture %}                                   
                {% endif %}
                    <img src="{{img}}" width="276" >
            </div>
            <div class="main-block-data-text">
                <p class="main-data-title"><span class="left-aquo">&laquo;{{content.randomData.text}}&raquo;</span></p>
                <p class="qoutes-title">
                    {%if content.randomData.author is not null %}           
                        {{content.randomData.author}}     
                    {% endif %} 
                </p>
                <p class="poet-desc">{{content.randomData.authorInfo}}</p>
            </div>
        </div>
    </div>
    <div class="other-cat">Кроме цитат наш генератор выдаёт варианты из <a href="#" class="link-in-text">других категорий</a>, например, &laquo;<a href="#" class="link-in-text" onclick="film.getRndFilm()">Фильмы</a>&raquo;
    </div>
</section>