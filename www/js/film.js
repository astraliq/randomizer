"use strict"

let mainFilmLink = document.querySelector('.film_main_lnk');
let nextRandom = document.querySelector('.next-random');
let categoryName = $('.cat-sel');

class FilmsFilter {
    constructor() {
		this.maxCountFilters = 50; // максимальное количество фильтров + 1
		this.idName = '#film-check';
		this.years = [];
        this.countries = [];
        this.categories = [];
        this.rating = [];
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
		this.setDefRating();
	}
	// установить начальное значения фильтров по категориям
	setDefCategories() {
		for (let i = 0; i < 19; i++) {
			this._checkFilter(i, false);
		}
		this._checkFilter(0, true);
		this.categories = [0];
	}
	// установить начальное значения фильтров по годам
	setDefYears() {
		for (let i = 20; i < 29; i++) {
			this._checkFilter(i, false);
		}
		this._checkFilter(20, true);
		this.years = [0];
	}
	// установить начальное значения фильтров по странам
	setDefCountries() {
		for (let i = 30; i < 39; i++) {
			this._checkFilter(i, false);
		}
		this._checkFilter(30, true);
		this.countries = [0];
	}
	// выключить фильтр по рейнтингу
	setDefRating() {
		for (let i = 40; i < 49; i++) {
			this._checkFilter(i, false);
		}
		this.rating = [];
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
			case 8:
				period = {
					min: 2020,
					max: 2022
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

	// получить интервал рейтинга в зависимости от data-id элемента
	getRatingInt(dataId) {
		let interval;
		switch (dataId) {
			case 0:
				interval = {
					min: 0,
					max: 5
				};
			break;
			case 1:
				interval = {
					min: 5,
					max: 6
				};
			break;
			case 2:
				interval = {
					min: 6,
					max: 7
				};
			break;
			case 3:
				interval = {
					min: 7,
					max: 8
				};
			break;
			case 4:
				interval = {
					min: 8,
					max: 9
				};
			break;
			case 5:
				interval = {
					min: 9,
					max: 10
				};
			break;
			default:
				interval = {
					min: 0,
					max: 10
				};
		}
		return interval;
	}
	// записать значения фильтров в свойства по видам с id номерами из базы
	setSelectedFilters() {
		this.years = [];
        this.countries = [];
        this.categories = [];
        this.rating = [];
		let counter = 0;
		for (let i = 0; i < 19; i++) {
			if (this.getFilterValue(i)) {
				this.categories[counter] = this.filters.filterId[i];
				counter++;
			}
		}
		counter = 0;
		for (let i = 20; i < 29; i++) {
			if (this.getFilterValue(i)) {
				this.years[counter] = this.getYearsPeriod(this.filters.filterId[i]);
				counter++;
			}
		}
		counter = 0;
		for (let i = 30; i < 39; i++) {
			if (this.getFilterValue(i)) {
				this.countries[counter] = this.filters.filterId[i];
				counter++;
			}
		}
		counter = 0;
		for (let i = 40; i < 50; i++) {
			if (this.getFilterValue(i)) {
				this.rating[counter] = this.getRatingInt(this.filters.filterId[i]);
				counter++;
			}
		}
//		console.log(this.categories);
//		console.log(this.years);
//		console.log(this.countries);
// 		console.log(this.rating);
	}
	
	// установить значение фильтра по id
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
	// установка фильтров и запись значений в свойства
	_updateCheckboxes(event) {
		let re = /film-check/gi;
		let idNum = event.target.id.replace(re, '');
		if (this.getFilterValue(idNum)) {
			this._checkFilter(idNum, false);
		} else {
			this._checkFilter(idNum, true);
		}
		this._clearIfSelectedBy(0, 19, idNum);
		this._clearIfSelectedBy(20, 29, idNum);
		this._clearIfSelectedBy(30, 39, idNum);
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
		
		// закрытие окна при клике вне окна
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
        $('.main-block-menu').on('click', '#film-filter-open',(e) => { this.openFilmFilter(e) });
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
		this.browseNow = new BrowseNow();
		this.otherCat = new OtherCategory();
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
                if (data.result !== "OK") {
                    console.log('ERROR_GET_DATA_');
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
        this.rating = this.filter.rating;

		let sendData = {
			apiMethod: 'getRndFilm',
			postData: {
				years: this.years,
				categories: this.categories,
				countries: this.countries,
				rating: this.rating
			}
		};
		
		if (!reqLimit.checkReqLimits()) {
			return;
		}
		
		this._getJson(`/index.php`, sendData)
			.then(data => {
				if (data.result === "OK") {
					this.film = data.rnd;
					let film_cats = data.categories.map(function(elem) {
						return elem.categories;
					});
					this.film.main_img = this.film.main_img === null ? 'film-error.png' : this.film.main_img;
					this.film.actors = this.film.actors ? this.film.actors : 'нет данных';
					this.film.director = this.film.director ? this.film.director : 'нет данных';
					this.film.rating = this.film.rating > 0 ? this.film.rating : 'нет данных';
					this.film.info = [this.film.year,...film_cats.splice(0, 4),this.film.country,this.film.duration];
					this._render(this.film);
					this.otherCat.render(data.otherCat);
					this._updateLinkFilm();
					this._putAlreadyViewedIds(film);
					this.filter.updateLinkFilmFilterOpen();
//					this.browseNow.getBrowseNowData('Фильм');
				} else {
					console.log('ERROR_GET_FILM');
				}
			})
			.catch(error => {
//			console.log(this.film);
				if (document.querySelector('.cat-sel').innerText !== 'Фильм') {
					this._render(this.film);
					this._updateLinkFilm();
					this.filter.updateLinkFilmFilterOpen();
				}
			  });
    }
	
	_render(film) {
		// console.log('запуск');
		document.querySelector('.main-block').className = 'main-block main-color-1';
		$('.main-block-menu').empty();
		$('.main-block-menu').prepend(`
                <div>Cлучайность из категории:<span class="cat-sel">Фильм</span></div>
                <div>
                    <span class="cat-settings" id="film-filter-open">Настроить фильтр</span>
                    <span class="next-random">Следующий фильм</span>
                </div>
		`);
		$('.main-block-data').empty();
		$('.main-block-data').prepend(`
                <div class="main-block-data-primary">
                    <div class="main-block-data-pic">
                        <img class="film-pic" src="" width="276" height="380" alt="Фильм &laquo;${film.title_ru}&raquo;" title="${film.title_ru}" data-c="m" data-i="${film.main_img}">
                    </div>
                    <div class="main-block-data-text">
                        <p class="main-data-title">
							<span class="left-aquo">«${film.title_ru}»</span>
						</p>
                        <p class="film-info">${film.info.join(', ')} мин.</p>
						<p class="film-desc"><b>Рейтинг Кинопоиска:</b> ${film.rating}</p>
                        <p class="film-desc">${film.description_ru}</p>
                        <p class="film-desc"><b>В главных ролях:</b> ${film.actors}</p>
                        <p class="film-desc"><b>Режиссёр:</b> ${film.director}</p>
                    </div>
                </div>
		`);
		newSrc.changeSrc(document.querySelector('.film-pic'));
		
//		if (film.rating > 0) {
//				document.querySelector('.main-block-data-pic').innerHTML += `
//					<img class="film-rating_block" src="img/rate_block.png" width="100" alt="rating" title="${film.rating}">
//					<span class="film-rating">${film.rating}</span>`;
//			}
//		let filmImg = document.querySelector('.film-pic');
//		filmImg.onload = function() {
//			if (film.rating > 0) {
//				document.querySelector('.main-block-data-pic').innerHTML += `
//					<img class="film-rating_block" src="img/rate_block.png" width="100" alt="rating" title="${film.rating}">
//					<span class="film-rating">${film.rating}</span>`;
//			}
//		}
		
    }
};
let film = new Films();
//mainFilmLink.addEventListener('click', e => { film.getRndFilm() });




