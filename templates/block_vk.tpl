    <section class="main-block main-color-7 vk_block">
            <div class="main-block-menu">
                <h1 style="display: none;">Розыгрыш вконтакте</h1>
                <div class="cat-title">Определение победителя вконтакте по лайкам и репостам</div>
            </div>
            <div class="main-block-data main-block-data-vk">
                <div class="main-block-data-primary">
                    <div class="main-block-vk">
                        <!-- <a class="vk_block-get_token" href="https://oauth.vk.com/authorize?client_id=7347408&display=page&redirect_uri=http://127.0.0.rand/index.php?path=index/vk&scope=wall,groups&response_type=token&v=5.103&state=1.0">Открыть доступ к ВК</a>  -->
                        <input type="text" name="vk_post" class="vk_block-post" placeholder="Ссылка на пост вконтакте, например: https://vk.com/wall-189874242_5" title="https://vk.com/wall-34877171_395385 или https://vk.com/group?w=wall-34877171_395385">
                        <button class="button-vk" id="vk_get_participants">Загрузить список участников</button>
                        <div class="main-block-vk-err_msg">
                            <p class="main-block-vk-err_text">Ссылка должна быть вида https://vk.com/wall-34877171_395385 или https://vk.com/group?w=wall-34877171_395385</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="vk-filter">
                <div>
                    <div class="div-ul">
                        <p class="filtr-title filter-title-vk">Способ определения победителя</p>
                            <input type="radio" name="vk-radio_set" class="vk_radio_input" id="vk-set_like" data-type="like" checked>
                            <label for="vk-set_like">По лайкам</label>
                            <input type="radio" name="vk-radio_set" class="vk_radio_input" id="vk-set_repost" data-type="repost">
                            <label for="vk-set_repost">По репостам</label>
                            <input type="radio" name="vk-radio_set" class="vk_radio_input" id="vk-set_repost_like" data-type="repost&like">
                            <label for="vk-set_repost_like">По репостам с учетом лайков</label>
                    </div>
                    <div class="div-ul">
                        <p class="filtr-title filter-title-vk">Фильтр</p>
                            <ul>
                                <li class="checkbox checkbox-vk">
                                    <input type="checkbox" class="vk-filter_data" id="vk-repeat_winners" checked="checked">
                                    <label for="vk-repeat_winners">Исключать повторный выбор победителей.</label>
                                </li>
                                <li class="checkbox checkbox-vk">
                                    <input type="checkbox" class="vk-filter_data" id="vk-subscribe" value="4">
                                    <label for="vk-subscribe">Участник должен быть подписан на сообщество</label>
                                </li>
                               <!--  <li class="checkbox checkbox-vk">
                                    <input type="checkbox" class="vk-filter_data" id="vk-repost_first" value="0">
                                    <label for="vk-repost_first">Репост должен быть закреплен (на первом месте) на стене участника</label>
                                </li> -->
                            </ul>
                    </div>
                    <div class="div-ul">
                        <p class="filtr-title filter-title-vk">Дополнительные настройки</p>
                        <input type="number" class="vk-filter_data" id="vk-winner_count" value="1" min="1" max="20">
                        <label for="vk-winner_count">Количество победителей</label>
                        <br>
                        <input type="text" class="vk-filter_data" id="vk-winner_country" placeholder="Не имеет значения">
                        <label for="vk-winner_country">Город победителя</label>
                        
                    </div>
                </div>
            </div>
            <div class="block-vk-get_winner_block">

            </div>
        {% include 'other_cat.tpl' %}
    </section>
