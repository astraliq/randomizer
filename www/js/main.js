"use strict"
//if(typeof jQuery!=='undefined'){
//    console.log('jQuery Loaded');
//}
//else{
//    console.log('not loaded yet');
//};
//
let filmsLink = document.querySelector('.data-title-link');
let mainFilmLink = document.querySelector('.film_main_lnk');
let nextRandom = document.querySelector('.next-random');
let categoryName = $('.cat-sel');

class Films {
    constructor() {
		this.film = [];
        this.filters = [1];
        this.alreadyViewedIds = [];
    }

//	_getJson(url, data) {
//		return fetch(url, {
//			method: 'POST',
//			headers: {
//				'Content-Type': 'application/json',
//			},
//			body: JSON.stringify(data)
//		})
//			.then ( result => result.json())
//			.catch( error => console.log('Ошибка запроса: ' + error.message + error))
//	}
	_getJson(url, data) {
		return $.post({
            url: '/index.php',
            data: data,
            success: function (data) {
                //data приходят те данные, который прислал на сервер
                data = JSON.parse(data);
                if (data.result !== "OK") {
                    console.log('ERROR_GET_QUOTE');
                }
            }
        })
	}

    _updateLinkFilm() {
        let nextRndBtn = document.querySelector('.next-random');
        nextRndBtn.addEventListener('click', e => { film.getRndFilm() });
    }

    _putAlreadyViewedIds(film) {
        this.alreadyViewedIds = [...this.alreadyViewedIds, film.id];
//        console.log(this.alreadyViewedIds);
    }

    getRndFilm() {
		let years = [1900,2020];  // минимальный и максимальный год
		let categories = [''];
		let sendData = {
			apiMethod: 'getRndFilm',
			postData: {
				years: {'min':years[0],'max':years[1]},
				categories: categories
			}
		};
		this._getJson(`/index.php`, sendData)
			.then(data => {
				data = JSON.parse(data);
				if (data.result === "OK") {
					let film = data.rnd;
					let film_cats = data.categories.map(function(elem) {
						return elem.categories;
					});
					film.main_img = film.main_img === null ? 'stub.jpg' : film.main_img;
					console.log(film);
					console.log(film_cats);
					this._render(film,film_cats);
					console.log('render');
					this._updateLinkFilm();
					this._putAlreadyViewedIds(film);
				} else {
					console.log('ERROR_GET_FILM');
				}
			});
    }
	
	_render(film,filmCategories) {	
		$('.main-block-data-menu').empty();
		$('.main-block-data-menu').prepend(`Ваша случайность из категории:<span class="cat-sel">Фильм</span>
		<span class="cat-settings">Настроить фильтр</span>
		<span class="next-random">Следующая случайность</span>
		`);
        $('.main-block-data-primary').empty();
        $('.main-block-data-primary').prepend(`
			<div class="main-block-data-pic"><img src="img/films/${film.main_img}" width="276" height="415" alt="${film.title_ru}" title="${film.title_ru}"></div>
			<div class="main-block-data-text">
				<h1 class="film-title">«${film.title_ru}»</h1>
				<p class="film-info">${film.year}, ${filmCategories.splice(0, 3).join(', ')}, ${film.country}, ${film.duration} мин.</p>
				<p class="film-desc">${film.description_ru}</p>
				<p class="film-desc"><b>В главных ролях:</b> ${film.actors}</p>
				<p class="film-desc"><b>Режиссёр:</b> ${film.genres}</p>

			</div>
        `);
		$('.cat-sel').text(`Фильм`);
    }
};
let film = new Films();
mainFilmLink.addEventListener('click', e => { film.getRndFilm() });

//if (categoryName.text() === 'Фильм') {
//	nextRandom.addEventListener('click', e => { film.getRndFilm() });
//};


























//Функция AJAX получения рандомного фильма
//function getRndFilm() {
//	let years = [2015,2020];  // минимальный и максимальный год
//	let rating = [5,''];  // минимальный и максимальный рейтинг
//	let categories = [''];
//	//Вызываем функцию jQuery AJAX с методом POST
//	//Передаем туда url где будет обрабатваться API
//	//И data которое будет помещена в $_POST
//	//success - вызывается при успешном ответе от сервера
//	$.post({
//		url: '/index.php',
//		data: {
//			apiMethod: 'getRndFilm',
//			postData: {
//				years: {'min':years[0],'max':years[1]},
//				categories: categories
//			}
//		},
//		success: function (data) {
//			//data приходят те данные, который прислал на сервер
//			
//			data = JSON.parse(data);
//			if (data.result === "OK") {
//				let film = data.rnd;
//				let film_cats = data.categories.map(function(elem) {
//					return elem.categories;
//				});
//				console.log(data);
//				$('.main-block-data-primary').empty();
//				$(".main-block-data-primary").prepend(`
//					<div class="main-block-data-pic"><img src="img/films/${film.main_img}" width="276" height="415"></div>
//                    <div class="main-block-data-text">
//						<h1 class="film-title">«${film.title_ru}»</h1>
//						<p class="film-info">${film.year}, ${film_cats.splice(0, 3).join(', ')}, ${film.country}</p>
//						<p class="film-desc">${film.description_ru}</p>
//						<p class="film-desc"><b>В главных ролях:</b> ${film.actors}</p>
//						<p class="film-desc"><b>Режиссёр:</b> ${film.genres}</p>
//						
//                    </div>
//				`);
//			} else {
//				console.log('ERROR_GET_FILM');
//			}
//		}
//	});
//}




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
