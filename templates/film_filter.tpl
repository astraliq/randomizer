<div id="film-filter" class="modalDialog">
    <div>
        <a href="#close" title="Close" class="close" id="film-filter-close">X</a>
        <div class="div-ul">
            <p class="filtr-title">Жанры</p>
                <ul>
                    <li class="checkbox"><input type="checkbox" id="film-check0" value="0" data-id="0"><label for="film-check0">Любой жанр</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check1" value="1" data-id="23"><label for="film-check1">Биография</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check2" value="2" data-id="1"><label for="film-check2">Боевик</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check3" value="3" data-id="16"><label for="film-check3">Детектив</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check4" value="4" data-id="6"><label for="film-check4">Комедия</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check5" value="5" data-id="9"><label for="film-check5">Триллер</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check6" value="6" data-id="19"><label for="film-check6">Ужасы</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check7" value="7" data-id="18"><label for="film-check7">Фантастика</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check8" value="8" data-id="15"><label for="film-check8">Мультфильм</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check9" value="9" data-id="4"><label for="film-check9">Драма</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check10" value="10" data-id="20"><label for="film-check10">Аниме</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check11" value="11" data-id="22"><label for="film-check11">Приключения</label></li>
                </ul>
        </div>
        <div class="div-ul">
            <p class="filtr-title">Год создания</p>
                <ul>
                    <li class="checkbox"><input type="checkbox" id="film-check12" value="0" data-id="0"><label for="film-check12">Любой год</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check13" value="1" data-id="1"><label for="film-check13">2015 &#151; 2020</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check14" value="2" data-id="2"><label for="film-check14">2010 &#151; 2015</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check15" value="3" data-id="3"><label for="film-check15">2000 &#151; 2010</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check16" value="4" data-id="4"><label for="film-check16">1990 &#151; 2000</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check17" value="5" data-id="5"><label for="film-check17">1980 &#151; 1990</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check18" value="6" data-id="6"><label for="film-check18">1970 &#151; 1980</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check19" value="7" data-id="7"><label for="film-check19">До 1970</label></li>
                </ul>
        </div>
        <div class="div-ul">
            <p class="filtr-title">Страна производства</p>
                <ul>
                    <li class="checkbox"><input type="checkbox" id="film-check20" value="0" data-id="0"><label for="film-check20">Любая страна</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check21" value="1" data-id="3"><label for="film-check21">США</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check22" value="2" data-id="1"><label for="film-check22">Россия</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check23" value="3" data-id="5"><label for="film-check23">Франция</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check24" value="4" data-id="24"><label for="film-check24">Великобритания</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check25" value="5" data-id="31"><label for="film-check25">Италия</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check26" value="6" data-id="26"><label for="film-check26">Япония</label></li>
                    <li class="checkbox"><input type="checkbox" id="film-check27" value="7" data-id="23"><label for="film-check27">СССР</label></li>
                </ul>
        </div>
        <button class="button-send" onclick="film.setFilters()">Найти фильм</button>
    </div>
</div>