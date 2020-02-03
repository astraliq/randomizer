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

class FilmsFilter {
    constructor() {
		this.maxCountFilters = 28; // максимальное количество фильтров + 1
		this.idName = '#film-check';
		this.years = [];
        this.countries = [];
        this.categories = [];
		this.filters = {
			'ids': [],
			'value': [],
			'filterId': [],
		};
		this._setIds();
		this.setDefaultAll();
		this._setEventsToCheckboxes();
    }
	// записать в свойства фильтров data-id из верстки
	// data-id это id из базы
	_setIds() {
		for (let i = 0; i < this.maxCountFilters; i++) {
			this.filters.ids[i] = this.idName + i;
			this.filters.filterId[i] = $(this.idName + i).data('id');
		}
	}
	// установить начальное значения всех фильтров
	setDefaultAll() {
		this.setDefCategories();
		this.setDefYears();
		this.setDefCountries();
	}
	// установить начальное значения фильтров по категориям
	setDefCategories() {
		for (let i = 0; i < 12; i++) {
			this._checkFilter(i, false);
		}
		this._checkFilter(0, true);
		this.categories = [0];
	}
	// установить начальное значения фильтров по годам
	setDefYears() {
		for (let i = 12; i < 20; i++) {
			this._checkFilter(i, false);
		}
		this._checkFilter(12, true);
		this.years = [0];
	}
	// установить начальное значения фильтров по странам
	setDefCountries() {
		for (let i = 20; i < 28; i++) {
			this._checkFilter(i, false);
		}
		this._checkFilter(20, true);
		this.countries = [0];
	}

	// получить период лет в зависимости от data-id элемента
	getYearsPeriod(dataId) {
		let period;
		switch (dataId) {
			case 1:
				period = {
					min: 2015,
					max: 2020
				};
			break;
			case 2:
				period = {
					min: 2010,
					max: 2015
				};
			break;
			case 3:
				period = {
					min: 2000,
					max: 2010
				};
			break;
			case 4:
				period = {
					min: 1990,
					max: 2000
				};
			break;
			case 5:
				period = {
					min: 1980,
					max: 1990
				};
			break;
			case 6:
				period = {
					min: 1970,
					max: 1980
				};
			break;
			case 7:
				period = {
					min: 1900,
					max: 1970
				};
			break;
			default:
				period = {
					min: 1900,
					max: 2030
				};
		}
		return period;
	}
	// записать значения фильтров в свойства по видам с id номерами из базы
	setSelectedFilters() {
		this.years = [];
        this.countries = [];
        this.categories = [];
		let counter = 0;
		for (let i = 0; i < 12; i++) {
			if (this.getFilterValue(i)) {
				this.categories[counter] = this.filters.filterId[i];
				counter++;
			}
		}
		counter = 0;
		for (let i = 12; i < 20; i++) {
			if (this.getFilterValue(i)) {
				this.years[counter] = this.getYearsPeriod(this.filters.filterId[i]);
				counter++;
			}
		}
		counter = 0;
		for (let i = 20; i < 28; i++) {
			if (this.getFilterValue(i)) {
				this.countries[counter] = this.filters.filterId[i];
				counter++;
			}
		}
//		console.log(this.categories);
//		console.log(this.years);
//		console.log(this.countries);
	}
	
	// получить значение фильтра по id
	_checkFilter(id,value) {
		$(this.filters.ids[id]).prop('checked', value);
		this.filters.value[id] = value;
	}
	// получить значение фильтра по id
	getFilterValue(id) {
		return this.filters.value[id];
	}
	
	// создание события по логике установки фильтров
	_setEventsToCheckboxes() {
		for (let i = 0; i < this.maxCountFilters; i++) {
			$(this.filters.ids[i]).on('click', (e) => { this._updateCheckboxes(e) });
		};
	}
	/* обновление выбранных фильтров в зависимости от условий
	если выбирается любой фильтр, то остальные удаляются и наоборот
		elementId - начальный id группы
		endElem - последний id группы + 1
		currentId - текущий выбранный id
	*/
	_clearIfSelectedBy(elementId, endElem, currentId) {
		if (currentId == elementId) {
			if (this.getFilterValue(elementId)) {
				for (let i = elementId + 1; i < endElem; i++) {
					this._checkFilter(i,false);
				}
			} else {
				for (let i = elementId + 1; i < endElem; i++) {
					this._checkFilter(i,this.filters.value[i]);
				}
			}
		} else if (currentId < endElem && currentId >= elementId) {
			this._checkFilter(elementId, false);
		}
	}
	// установка фильтров и запись занчений в свойства
	_updateCheckboxes(event) {
		let re = /film-check/gi;
		let idNum = event.target.id.replace(re, '');
		if (this.getFilterValue(idNum)) {
			this._checkFilter(idNum, false);
		} else {
			this._checkFilter(idNum, true);
		}
		this._clearIfSelectedBy(0, 12, idNum);
		this._clearIfSelectedBy(12, 20, idNum);
		this._clearIfSelectedBy(20, 28, idNum);
//		console.log(idNum);
//		console.log(this.filters);
	}
	// открыть окно по событию
	openFilmFilter(e) {
		//Отменяем поведение ссылки
		e.preventDefault();
		let modalWindow = $('#film-filter');
		//Получаем ширину и высоту окна
		let winH = $(window).height();
		let winW = $(window).width();
		//Устанавливаем всплывающее окно по центру
		modalWindow.css('top', winH / 2 - modalWindow.height() / 2);
		modalWindow.css('left', winW / 2 - modalWindow.width() / 2);
		//эффект перехода
		modalWindow.fadeIn(1);

		$(document).mouseup(function (e) { // событие клика по веб-документу
			if (!modalWindow.is(e.target) && modalWindow.has(e.target).length === 0) { // если клик был не по нашему блоку и не по его дочерним элементам 
				modalWindow.fadeOut(1); // скрываем его
			}
		});
	}
	// закрыть окно
	closeFilmFilter() {
		if ($('#film-filter').is(':visible')) {
			$('#film-filter').fadeOut(1);
		}
	}
	// обновление события открытия окна
	updateLinkFilmFilterOpen() {
        $('.main-block-data-menu').on('click', '#film-filter-open',(e) => { this.openFilmFilter(e) });
    }
	// обновление события закрытия окна на крестик
	updateLinkFilmFilterClose() {
        //если нажата кнопка закрытия окна
		$('#film-filter-close').on('click',function (e) {
			//Отменяем поведение ссылки
			e.preventDefault();
			$('#film-filter').fadeOut(1);
		});
    }
	
}

class Films {
    constructor() {
		this.film = [];
        this.alreadyViewedIds = [];
		this.filter = new FilmsFilter();
		this.filter.updateLinkFilmFilterOpen();
		this.filter.updateLinkFilmFilterClose();
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
            url: url,
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
	
	setFilters() {
		this.filter.setSelectedFilters();
		this.filter.closeFilmFilter();
		
		this.getRndFilm();
	}
	
    getRndFilm() {
		this.years = this.filter.years;
        this.countries = this.filter.countries;
        this.categories = this.filter.categories;
		
		let sendData = {
			apiMethod: 'getRndFilm',
			postData: {
				years: this.years,
				categories: this.categories,
				countries: this.countries
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
					this._render(film,film_cats);
					this._updateLinkFilm();
					this._putAlreadyViewedIds(film);
					this.filter.updateLinkFilmFilterOpen();
				} else {
					console.log('ERROR_GET_FILM');
				}
			});
    }
	
	_render(film,filmCategories) {	
		$('.main-block-data-menu').empty();
		$('.main-block-data-menu').prepend(`Ваша случайность из категории:<span class="cat-sel">Фильм</span>
		<a href="#openModal" id="film-filter-open">
			<span class="cat-settings">Настроить фильтр</span>
		</a>
		<span class="next-random">Следующий фильм</span>
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
		$('.other-cat').empty();
		$('.other-cat').prepend(`
			<div class="other-cat">Кроме фильмов наш генератор выдаёт варианты из <a class="link-in-text">других категорий</a>, например, &laquo;<a href="#" class="link-in-text" onclick="quote.init()">Цитата</a>&raquo;</div>
        `);
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
