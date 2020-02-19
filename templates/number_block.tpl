<section class="main-block main-color-5">
    <div class="main-block-menu">
        <div>
            Cлучайность из категории:<span class="cat-sel">Генератор случайных чисел</span>
        </div>
    </div>

    <div class="main-block-data">
        <div class="main-block-data-primary">
            <div class="main-block-data-number_info">
                <span class="spravka"></span><br>
                <p class="data-info" id="fact"><span class="sel-numb"></span></p>
                </div>
            <div class="random-data">
                <p class="main-number" id="answer"></p>
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