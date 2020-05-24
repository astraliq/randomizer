<section class="main-block main-color-3">
    <h1 class="hidden-title">Случайное слово на иностранном языке</h1>
    <h2 class="hidden-title">Рандомное слово на иностранном языке</h2>
    <div class="main-block-menu">
        <div>Cлучайность из категории:<span class="cat-sel">Интересное слово</span></div>
        <div>
            <span class="cat-settings" onclick="filterWords.init()">Настроить фильтр</span>
            <span class="next-random" onclick="filterWords._goRandomWords();" style="cursor: pointer;">Следующее слово</span>
        </div>
    </div>

    <div class="main-block-data">
        <div class="main-block-data-primary" style="position: relative;">
            <div class="main-block-data-text" style="width: 100%; min-height: 400px;">
                <h1>Слово: {{ content.randomData.word }}</h1>
                <h3>Язык: {{ content.randomData.language }}</h3>
                <p class="film-desc"><span style="font-size: 24px">Значение: </span> {{ content.randomData.meaning }}</p>
            </div>
            <div class="modal_shadow_words off_block_off"></div>
            <div class="modal_window_words off_block_off"> 
                <div class="modal_text_words" style="width: 100%; height: 100%;">
                    <div>
                        <div class="div-ul">
                            <p class="filtr-title">Языки</p>
                            <ul>
                                <li class="checkbox"><input type="checkbox" class="check_word" id="word-check0" value="0" data-language="все"><label for="word-check0">Все языки</label></li>
                                <li class="checkbox"><input type="checkbox" class="check_word" id="word-check1" value="1" data-language="шведский"><label for="word-check1">шведский</label></li>
                                <li class="checkbox"><input type="checkbox" class="check_word" id="word-check2" value="2" data-language="немецкий"><label for="word-check2">немецкий</label></li>
                                <li class="checkbox"><input type="checkbox" class="check_word" id="word-check3" value="3" data-language="французский"><label for="word-check3">французский</label></li>
                                <li class="checkbox"><input type="checkbox" class="check_word" id="word-check4" value="4" data-language="чешский"><label for="word-check4">чешский</label></li>
                                <li class="checkbox"><input type="checkbox" class="check_word" id="word-check5" value="5" data-language="испанский"><label for="word-check5">испанский</label></li>
                                <li class="checkbox"><input type="checkbox" class="check_word" id="word-check6" value="6" data-language="голландский"><label for="word-check6">голландский</label></li>
                                <li class="checkbox"><input type="checkbox" class="check_word" id="word-check7" value="7" data-language="финский"><label for="word-check7">финский</label></li>
                                <li class="checkbox"><input type="checkbox" class="check_word" id="word-check9" value="9" data-language="японский"><label for="word-check9">японский</label></li>
                                <li class="checkbox"><input type="checkbox" class="check_word" id="word-check10" value="10" data-language="китайский"><label for="word-check10">китайский</label></li>
                                <li class="checkbox"><input type="checkbox" class="check_word" id="word-check11" value="11" data-language="арабский"><label for="word-check11">арабский</label></li>
                            </ul>
                        </div>
                        <button class="button-send" onclick="filterWords._goRandomWords();">Узнать слово</button>
                    </div>
                </div>
            </div>
            <div class="cross_words off_block_off">&#10006;</div>
        </div>
    </div>
    {% include 'other_cat.tpl' %}
</section>