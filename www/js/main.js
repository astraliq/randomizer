"use strict"


//Функция AJAX получения рандомного фильма
function getRndFilm() {
	let years = [2015,2020];  // минимальный и максимальный год
	let rating = [5,''];  // минимальный и максимальный рейтинг
	let categories = [''];
	//Вызываем функцию jQuery AJAX с методом POST
	//Передаем туда url где будет обрабатваться API
	//И data которое будет помещена в $_POST
	//success - вызывается при успешном ответе от сервера
	$.post({
		url: '/index.php',
		data: {
			apiMethod: 'getRndFilm',
			postData: {
				years: {'min':years[0],'max':years[1]},
				rating: {'min':rating[0],'max':rating[1]},
				categories: categories
			}
		},
		success: function (data) {
			//data приходят те данные, который прислал на сервер
			
			data = JSON.parse(data);
			if (data.result === "OK") {
				let film = data.film;
				console.log(data.film);
				$('.main-block-data-primary').empty();
				$(".main-block-data-primary").prepend(`
					<div class="main-block-data-pic"><img src="img/films/${film.main_img}" width="276" height="415"></div>
                    <div class="main-block-data-text">
						<h1 class="film-title">«${film.title_ru}»</h1>
						<p class="film-info">${film.year}, ${film.main_category}, ${film.country}</p>
						<p class="film-desc">${film.description_ru}</p>
                    </div>
				`);
			} else {
				console.log('ERROR_GET_FILM');;
			}
		}
	});
}




//Функция AJAX авторизации
function login() {
	//Получаем input'ы логина и пароля
	const $login_input = $('[name="login"]');
	const $password_input = $('[name="password"]');

	//Получаем значение login и password
	const login = $login_input.val();
	const password = $password_input.val();

	//Инициализируем поле для сообщений
	const message_field = $('.message');

	//Вызываем функцию jQuery AJAX с методом POST
	//Передаем туда url где будет обрабатваться API
	//И data которое будет помещена в $_POST
	//success - вызывается при успешном ответе от сервера
	$.post({
		url: '/index.php',
		data: {
			apiMethod: 'login',
			postData: {
				login: login,
				password: password
			}
		},
		success: function (data) {
			//data приходят те данные, который прислал на сервер


			//Вариант с json
			// if(data.error) {
			// 	$message_field.text(data.error_text);
			// } else {
			// 	location.reload();
			// }

			//Вариан без json
			if (data.result === 'OK') {
				if (data.referrer === '/index.php?path=user/createorder') {
					return location.href = '/index.php?path=user/createorder';
				}
				document.location.reload(true);
			} else {
				message_field.text(data['error_text']);
			}
		}
	});
}


function registration() {
	//Получаем input'ы логина и пароля
	const $login_input = $('[name="login"]');
	const $password_input = $('[name="password"]');
	const $password_repeat_input = $('[name="password_repeat"]');
	//Получаем значение login и password
	const login = $login_input.val();
	const password = $password_input.val();
	const password_repeat = $password_repeat_input.val();
	//Инициализируем поле для сообщений
	const message_field = $('.message');

	//Вызываем функцию jQuery AJAX с методом POST
	//Передаем туда url где будет обрабатваться API
	//И data которое будет помещена в $_POST
	//success - вызывается при успешном ответе от сервера
	$.post({
		url: '/index.php',
		data: {
			apiMethod: 'reg',
			postData: {
				login: login,
				password: password,
				password_repeat: password_repeat
			}
		},
		success: function (data) {
			//data приходят те данные, который прислал на сервер
			//Вариант с json
			// if(data.error) {
			// 	$message_field.text(data.error_text);
			// } else {
			// 	location.reload();
			// }

			//Вариан без json
			if (data === 'OK') {
				message_field.text('');
				document.location.reload(true);
			} else {
				message_field.text(data['error_text']);
			}
		}
	});
}
