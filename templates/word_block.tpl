<section class="main-block main-color-3">
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
                <div class="modal_text_words" style="width: 100%; height: 100%;">${modalWord}</div>
            </div>
            <div class="cross_words off_block_off">&#10006;</div>
        </div>
    </div>

    {% include 'other_cat.tpl' %}
</section>