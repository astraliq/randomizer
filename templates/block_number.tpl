<section class="main-block main-color-5">
    <h1 class="hidden-title">Случайное число</h1>
    <h2 class="hidden-title">Рандомное число</h2>
    <div class="main-block-menu">
        <div>
            Cлучайность из категории:<span class="cat-sel">Случайное число</span>
        </div>
    </div>

    <div class="main-block-data">
        <div class="main-block-data-primary">
            <div class="main-block-data-number_info">
                {% set info = '' %} 
                {% set number = '' %} 
                {% set tire = '' %}
                {%if content.randomData.info is not null %}           
                    {% set info = 'Справка:' %} 
                    {% set number = content.randomData.number %}
                    {% set tire = ' &#151; ' %}                                  
                {% endif %}
                <span class="spravka"> {{ info }} </span><br>
                <p class="data-info" id="fact"><span class="sel-numb">{{ number }}</span>{{ tire|raw }} {{ content.randomData.info }}</p>

                </div>
            <div class="random-data">
                <p class="main-number" id="answer">{{ content.randomData.number }}</p>
                <div class="random-form">
                    <div>
                        <div>
                            <input type="text" class="random-numb" placeholder="Число от" id="first" value="0">
                            <input type="text" class="random-numb" placeholder="Число до" id="second" value="100">
                        </div>
                        <div>
                            <input type="text" class="count-rand" placeholder="Кол–во случайных чисел" id="qty" value="1">
                        </div>
                        <button class="button-rand">RANDOMIZE!</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {% include 'other_cat.tpl' %}
</section>