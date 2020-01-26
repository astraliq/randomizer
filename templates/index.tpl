<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<!-- <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css"> -->

	<link rel="icon" href="favicon.ico" type="image/x-icon">
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

	<link rel="stylesheet" href="../css/style.css" type="text/css">
	<!-- <link rel="stylesheet" href="../css/forms.css" type="text/css"> -->
	<title>{{ mainTitle }}</title>
</head>
<body>
	<article id="main">
		<header>
			<div id="part1">
				<h1 id="title">
						<div><h1>RAND<img src="../img/icon.png">MIZER</h1></div>
				</h1>
				<p>СЛУЧАЙНОСТИ НЕ СЛУЧАЙНЫ</p>
			</div>
			<div id="part2">
				<h2>Генератор случайных вариантов из различных категорий</h2>
				<ul id="list1">
					<li><p>Cлучайности из категорий :</p></li>
					<li class="a1"><a href="#"><p>Фильм</p></a></li>
					<li class="a1"><a href="#"><p>Подарок</p></a></li>
					<li class="a1"><a href="#"><p>Сходить вечером</p></a></li>
					<li class="a1"><a href="#"><p>Исторический факт</p></a></li>
					<li class="a1"><a href="#"><p>Еще</p></a></li>
				</ul>
			</div>
		</header>
		<article id="art1">
			<div id="part3">
				<ol id="list2">
					<h3 id="potitle">История случайностей</h3>
					<li><p>подарки</p></li>
					<p class="mini1">Половник Лебедь с подставкой</p>
					<li><p>исторический факт</p></li>
					<p class="mini1">Самой короткой в истории войной была война между Великобританией и ...</p>
					<li><p>задачки на логику</p></li>
					<p class="mini1">Как спрыгнуть с десятиметровой лестницы и не ушибиться</p>
					<li><p>кулинарный рецепт</p></li>
					<p class="mini1">Творожный десерт с клубникой «Милано»</p>
					<li><p>детская сказка</p></li>
					<p class="mini1">Сказка Соломинка, уголек и боб</p>
				</ol>
				<div id="main_rnd_block">
					<h3 id="main_rnd">
						Каждый человек был в ситуации, когда не знаешь, как поступить, какое решение принять, что подарить, какой фильм посмотреть, куда сходить вечером и т. <br><br>
						На поиск ответа тратится так много сил и нервов, что когда решение наконец–то принято, оно уже не радует <br><br>
						Все эти задачи решает сервис RANDOMIZER <br><br>
						Можешь попробовать случайный выбор из любой темы. Вдруг тебе повезет и найдешь то, чего раньше не знал?
					</h3>
					<button id="btn_rnd" onclick="getRndFilm()">РАНДОМНУТЬ</button>
				</div>
			</div>

		</article>
		<article id="art2">
			<p><h1 id="title1">ПРОСМАТРИВАЮТ СЕЙЧАС</h1></p>
			<ul id="biglist">
				<li class="citations"><a href="#">
					<h1 class="potitles">ЦИТАТЫ</h1>
					<p class="citatext"><strong><<</strong>До той секунды, пока не прозвучал первый пушечный залп, всякая война называется дипломатией <strong>>></strong></p></a>
				</li>
				<li class="pre"><a href="">
					<h1 class="potitles">ПОДАРКИ</h1>
					<img src="photos/картинка_Кружка.png" class="speimg">
					<div class="pititle">
						<p><strong>Кружка авторская</strong></p>
						<p class="moveup">«Год новый, а ты старый»</p>
					</div>
					</a>
				</li>
				<li class="book">
					<h1 class="potitles">ПРОИЗВЕДЕНИЕ ИСКУССТВА</h1>
					<img src="photos/картина_Крик.png" class="speimg">
					<div class="pititle">
						<p><strong>Крик, Эдвард Мунк, 1893г.</strong></p>
						<p class="moveup">
							Центральная фигура картины изображает фигуру человека, который обхватил руками лицо и широко раскрыл рот. Эта фигура очень примитивизирована, поэтому некоторые видят в ней некое бесполое существо, скелет, мумию или даже эмбриона. С помощью волнообразных линий художник изобразил звук крика, но непонятно, кричит ли это человек или же он в страхе и отчаянии от услышанного «крика  природы», который разностися повсюду.
					</div>
				</li>
			</ul>
		</article>
		{% include 'footer.tpl' %}
	</article>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous" async></script>
	<script type="text/javascript" defer src="js/jquery-3.4.1.js"></script>
	<script type="text/javascript" defer src="js/main.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous" async></script>
</body>
</html>


