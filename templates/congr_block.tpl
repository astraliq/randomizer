	<section class="main-block main-color-2">

            <div class="main-block-menu">
                <div>Cлучайность из категории:<span class="cat-sel">{{ content.categoryTitle }}</span></div>
                <div>
                    <span class="cat-settings" id="film-filter-open">Настроить фильтр</span>
                    <span class="next-random" onclick="congratulate.runProgr()">Следующее поздравление</span>
                </div>
            </div>

            <div class="main-block-data">
                <div class="main-block-data-primary">
                    <div class="main-block-data-text">
                        <!-- <p class="main-data-title">
							<span class="left-aquo">«{{ content.randomData.data.title_ru }}»</span>
						</p> -->
                        <p class="film-desc">{{ content.randomData.congratulate }}</p>
                    </div>
                </div>
            </div>

        {% include 'other_cat.tpl' %}
    </section>
