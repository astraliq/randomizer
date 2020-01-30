<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>RANDOMIZER</title>
    <script src="js/main.js" defer></script>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <div class="container">
    	{% include 'header.tpl' %}
        
        <main>
        <section class="main-block">
<!--            <div class="main-block-free"></div>-->
            <div class="main-block-data">
                <p class="main-block-data-menu">Ваша случайность из категории:<span class="cat-sel">Фильм</span><span class="cat-settings">Настроить фильтр</span><span class="next-random" onclick="getRndFilm()">Следующая случайность</span></p>
                <div class="main-block-data-primary">
                    <div class="main-block-data-pic"><img src="img/films/motilek_2017.jpg" width="276" height="415"></div>
                    <div class="main-block-data-text">
                        <h1 class="film-title">«Мотылёк»</h1>
                        <p class="film-info">2017, триллер, драма, Чехия</p>
                        <p class="film-desc">Книга сбежавшего из колонии Анри Шарьера, хоть и основана на реальных событиях,
часто вызывала сомнения в правдивости. В 70-х по ней уже сняли фильм
со Стивом МакКуином и Дастином Хоффманом.
Новая версия объединила на экране звезд сериала «Сыны анархии» Томми Флэнагана
и Чарли Ханнэма и еще раз задала вопрос: что стоит человеку,
цинично уклонявшегося от правосудия, соврать на пару сотен страниц?</p>
                        <p class="film-desc"><b>В главных ролях:</b> Чарли Ханнэм, Рами Малек, Роланд Мюллер, Йоэль Басман,
Йорик ван Вагенинген, Майкл Сока, Кристофер Фэйрбэнк, Ив Хьюсон, Томми Флэнаган</p>
                        <p class="film-desc"><b>Режиссёр:</b> Михаэль Ноер</p>
                    </div>
                </div>
                <div class="other-cat">Кроме фильмов наш генератор выдаёт варианты из <a href="#" class="link-in-text">других категорий</a>, например, &laquo;<a href="#" class="link-in-text">Исторический факт</a>&raquo;</div>
            </div>
            </section>
            {% include 'see_now.tpl' %}
        </main>
        {% include 'footer.tpl' %}
        
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous" async></script>
	<script type="text/javascript" defer src="js/jquery-3.4.1.js"></script>
	<script type="text/javascript" defer src="js/main.js"></script>
    <script type="text/javascript" defer src="js/quote.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous" async></script>
</body>
</html>





