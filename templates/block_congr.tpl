	<section class="main-block main-color-2">
            <h1 class="hidden-title">Случайное поздравление</h1>
            <h2 class="hidden-title">Рандомное поздравление</h2>
            <div class="main-block-menu">
                <div>Cлучайность из категории:<span class="cat-sel">{{ content.categoryTitle }}</span></div>
                <div>
                    <span class="cat-settings" onclick="rendGo()">Настроить фильтр</span>
                    <span class="next-random" onclick="congratulate.runProgr()">Следующее поздравление</span>
                </div>
            </div>

            <div class="main-block-data">
                <div class="main-block-data-primary congratulate-block-data-primary">
                    <div class="main-block-data-text">
                        <!-- <p class="main-data-title">
							<span class="left-aquo">«{{ content.randomData.data.title_ru }}»</span>
						</p> -->
                        <p class="film-desc congratulate-text">{{ content.randomData.congratulate|raw }}</p>
                    </div>
                </div>
            </div>

        {% include 'other_cat.tpl' %}
    </section>
