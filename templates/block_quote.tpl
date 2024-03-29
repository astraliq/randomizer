<section class="main-block main-color-4">
    <h1 class="hidden-title">Случайная цитата из фильма</h1>
    <h2 class="hidden-title">Рандомная цитата великих людей</h2>
    <div class="main-block-menu">
        <div>
            Cлучайность из категории:<span class="cat-sel">{{ content.categoryTitle }}</span>
        </div>
        <div>
            <span class="cat-settings" id="quote_filter_open">Настроить фильтр</span>
            <span class="next-random" onclick="quote.init()">Следующая цитата</span>
        </div>
    </div>
    <div class="main-block-data">
        <div class="main-block-data-primary">
            <div class="main-block-data-pic" width="276">
                {% set img = 'img/quoters/person-error.png' %} 
                {%if content.randomData.picture is not null %}           
                    {% set img = '' %}                                   
                {% endif %}
                    <img class="quote-pic" src="{{img}}" alt="{{content.randomData.author}}" title="{{content.randomData.author}}" width="276" data-c="q" data-i="{{content.randomData.picture}}">
            </div>
            <div class="main-block-data-text">
                <p class="main-data-title main-data-title-quote">{{content.randomData.text|raw}}</p>
                <p class="qoutes-title">
                    {%if content.randomData.author is not null %}           
                        {{content.randomData.author}}     
                    {% endif %} 
                </p>
                <p class="poet-desc">{{content.randomData.authorInfo}}</p>
            </div>
        </div>
    </div>
    {% include 'other_cat.tpl' %}
</section>