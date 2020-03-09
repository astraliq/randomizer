    <section class="main-block main-color-7">

            <div class="main-block-menu">
                <div class="cat-title">Определение победителя вконтакте по лайкам и репостам</div>
                <div><span class="cat-settings" id="vk-settings">Настроить randomizer</span></div>
            </div>

            <div class="main-block-data">
                <div class="main-block-data-primary">
                    <div class="main-block-vk">
                        <a class="vk_block-get_token" href="https://oauth.vk.com/authorize?client_id=7347408&display=page&redirect_uri=http://127.0.0.rand/index.php?path=index/vk&scope=wall,groups&response_type=token&v=5.103&state=1.0">Открыть доступ к ВК</a> 
                        <input type="text" name="vk_post" class="vk_block-post" placeholder="Ссылка на пост вконтакте" title="https://vk.com/wall-34877171_395385 или https://vk.com/group?w=wall-34877171_395385">
                        <button class="button-vk" id="vk_get_participants">Загрузить список участников</button>
                    </div>
                    <div class="block-vk-get_winner_block">

                    </div>
                </div>
            </div>

        {% include 'other_cat.tpl' %}
    </section>
