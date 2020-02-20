"use strict"
//if(typeof jQuery!=='undefined'){
//    console.log('jQuery Loaded');
//}
//else{
//    console.log('not loaded yet');
//};
//


class BrowseNow {
    constructor() {
		this.html = '';
		this.browseNowData = [];
    }
	
	_getCategoryHTML(catName) {
		let html, label;
		let limitText = 350;
		switch (catName) {
			case 'Фильм':
				this.browseNowData.filmData.main_img = this.browseNowData.filmData.main_img === null ? 'stub.jpg' : this.browseNowData.filmData.main_img;
				label = `<label for="button-m" onclick="changeStatus('movie', 'moviedesc')" id="movie">Больше описания</label>
							<input type="checkbox" id="button-m">`
				html = `
				<div class="see-now-main-data">
					<div class="see-now-cat">
						<a class="see-now-cat-link" onclick="film.getRndFilm()">Фильм</a>
					</div>
					<div class="see-now-desc">
						<div class="see-now-img">
							<img src="img/films/${this.browseNowData.filmData.main_img}" width="100" alt="Фильм &laquo;${ this.browseNowData.filmData.title_ru }&raquo;" title="${ this.browseNowData.filmData.title_ru }">
						</div>
						<div class="see-now-text">
							<p class="see-now-subtitle">${ this.browseNowData.filmData.title_ru }
								<br>${ this.browseNowData.filmData.year }, ${ this.browseNowData.filmData.country }, ${ this.browseNowData.filmData.duration } мин.</p>
							<div class="see-now-wrapper">
							${ this.browseNowData.filmData.description_ru.length > limitText ? label : ''}
							<label for="button-m" onclick="changeStatus('movie', 'moviedesc')" id="movie">Больше описания</label>
							<input type="checkbox" id="button-m">

						   <p class="movie-text" id="moviedesc">${ this.browseNowData.filmData.description_ru }</p>
							</div>
						</div>
					</div>
				</div>
				`;
			break;
			case 'Цитата':
				this.browseNowData.quoteData.picture = this.browseNowData.quoteData.picture === null ? 'img/quoters/stub.jpg' : this.browseNowData.quoteData.picture;
				this.browseNowData.quoteData.author = (this.browseNowData.quoteData.author === null) ? "" : this.browseNowData.quoteData.author;
				this.browseNowData.quoteData.authorInfo = (this.browseNowData.quoteData.authorInfo === null) ? "" : this.browseNowData.quoteData.authorInfo;
				html = `
				<div class="see-now-main-data">
					<div class="see-now-cat">
						<a class="see-now-cat-link" onclick="quote.init()">Цитата</a>
					</div>
					<p class="data-text"><span class="quote-left-aquo">&laquo;${this.browseNowData.quoteData.text}&raquo;</span></p>
					<p class="quote-person">${this.browseNowData.quoteData.author}</p>
				</div>
				`;
			break;
			case 'Произведение искусства':
				html = `
				<div class="see-now-main-data">
					<div class="see-now-cat">
						<a href="#" class="see-now-cat-link">Произведение искусства</a>
					</div>
					<div class="see-now-desc">
						<div class="see-now-img">
							<img src="img/arts/img_art_001.png" width="100">
						</div>
						<div class="see-now-text">
							<p class="see-now-subtitle">Крик, Эдвард Мунк, 1893г.</p>
							<div class="see-now-wrapper">
								<label for="button-a" onclick="changeStatus('art', 'artdesc')" id="art">Больше описания</label>
								<input type="checkbox" id="button-a">
								<p class="art-text" id="artdesc">
									Центральная фигура картины изображает фигуру человека, который обхватил руками лицо и широко раскрыл рот.
									Эта фигура очень примитивизирована, поэтому некоторые видят в ней некое бесполое существо, скелет, мумию или даже эмбриона.
									С помощью волнообразных линий художник изобразил звук крика, но непонятно, кричит ли это человек или же он в страхе и отчаянии от услышанного «крика природы», который разносится повсюду.
								</p>
							</div>
						</div>
					</div>
				</div>`;
			break;
			case 'Интересное слово':
				html = `
				<div class="see-now-main-data">
					<div class="see-now-cat">
						<a class="see-now-cat-link" onclick="words.init();">Интересное слово</a>
					</div>
					<div class="data-desc-1">
						<h1>Слово: ${this.browseNowData.wordData.word}</h1>
						<h3>Язык: ${this.browseNowData.wordData.language}</h3>
						<p class="art-text"><span style="font-size: 24px">Значение: </span> ${this.browseNowData.wordData.meaning}</p>
					</div>
				</div>
				`;
			break;
			case 'Поздравление':
				label = `<label for="button-cg" onclick="changeStatus('congr', 'congr_text')" id="congr">Больше описания</label>
							<input type="checkbox" id="button-cg">`
				html = `
				<div class="see-now-main-data">
					<div class="see-now-cat"><a class="see-now-cat-link" onclick="congratulate.runProgr()">Поздравление</a></div>
					<div class="data-desc">
						<div class="see-now-text">
							<p class="cong-cat">Тема: 
								<a href="#" class="cong-cat-link">${this.browseNowData.congrData.theme}</a>.
								<br>
								<a href="#" class="cong-cat-link">${this.browseNowData.congrData.who}</a>
							</p>
							<p class="congr-text" id="congr_text">${this.browseNowData.congrData.congratulate}</p>
							${ this.browseNowData.congrData.congratulate.length > limitText ? label : ''}
						</div>
					</div>
				</div>
				`;
			break;
			case 'Подарок':
				html = `
				<div class="see-now-main-data">
					<div class="data-title">
						<a class="data-title-link">Подарки</a>
					</div>
					<div class="data-desc-2">
						<div class="see-now-img">
							<img src="img/other/img_krugka.png" width="100" height="100">
						</div>
						<div class="see-now-text">
							<p class="present-title">Кружка авторская &laquo;Год новый,<br>а ты старый&raquo;</p>
							<p class="present-price">1 999 ₽</p>
							<p><a class="present-link">Подробнее</a></p>
						</div>
					</div>
				</div>`;
			break;
			default:
				html = ``;
		}
		return html;
	}
	
	_getJson(url, data) {
		return $.post({
            url: url,
            data: data,
            success: function (data) {
                //data приходят те данные, который прислал на сервер
                data = JSON.parse(data);
                if (data.result !== "OK") {
                    console.log('ERROR_GET_DATA');
                }
            }
        })
	}
	
	getBrowseNowData(currentCategory) {
		let sendData = {
			apiMethod: 'getBrowseNowData',
			postData: {
				currentCat: currentCategory,
			}
		};
		this._getJson(`/index.php`, sendData)
			.then(data => {
				data = JSON.parse(data);
				if (data.result === "OK") {
					this.browseNowData = data.browseNowData;
					this.html = this._getCategoryHTML(data.browseFirst);
					this.html += this._getCategoryHTML(data.browseSecond);
					this.html += this._getCategoryHTML(data.browseThird);
					this.html += this._getCategoryHTML(data.browseFourth);
					this._render(this.html);
				} else {
					console.log('ERROR_GET_BROWSEDATA');
				}
			});
    }
	
	_render(browseNowHTML) {	
		$('.see-now-main').empty();
		$('.see-now-main').prepend(browseNowHTML);
    }
}

class OtherCategory {
	constructor() {
		this.data;
	}
	
	_getJson(url, data) {
		return $.post({
            url: url,
            data: data,
            success: function (data) {
                //data приходят те данные, который прислал на сервер
                data = JSON.parse(data);
                if (data.result !== "OK") {
                    console.log('ERROR_GET_DATA');
                }
            }
        })
	}
	
	getOtherCatData(currentCat) {
		let sendData = {
			apiMethod: 'getOtherCatData',
			postData: {
				currentCat: currentCat,
			}
		};
		return this._getJson(`/index.php`, sendData)
			.then(data => {
				data = JSON.parse(data);
				if (data.result === "OK") {
					this.data.name = data.otherCatName;
					this.data.nameCase = data.case;
					this.data.function = data.function;
				} else {
					
				}
			});
    }
	
	render(data) {
		$('.other-cat').empty();
		$('.other-cat').prepend(`
				Кроме ${data.nameCase} наш генератор выдаёт варианты из
				<a class="link-in-text">других категорий</a>,
				например, &laquo;<a class="link-in-text" onclick="${data.function}">${data.name}</a>&raquo;
		`);
	}
	
}


class Mailing {
    constructor() {
		this.emailAdd;
		this.emailInput = document.querySelector('#email-mailing');
    }

	_postJson(url, data) {
		return $.post({
            url: url,
            data: data,
            success: function (data) {
                data = JSON.parse(data);
                if (data.result !== "OK") {
                    console.log('ERROR_ADD_EMAIL');
                }
            }
        })
	}
	
	changeStyleErr() {
		this.emailInput.style.border = '1px solid red';
		this.emailInput.style.backgroundColor = '#E0B3B3';
	}
	
	changeStyleDefault() {
		this.emailInput.style.border = '1px solid #a1a1a1';
		this.emailInput.style.backgroundColor = '#a1a1a1';
	}
	
	clearInput() {
		this.emailInput.value = '';
	}
	
	showErr(errorMsg) {
		let standartMsg = 'Адрес электронной почты должен содержать символ "@". Проверьте правильность указанного адреса.';
		let msg = errorMsg ? errorMsg : standartMsg;
		$('.mail_check_msg').text(msg);
		$('.mail_check_err').show();
		
	}
	
	hideErr() {
		$('.mail_check_err').hide();
	}
	
	checkEmail() {
		let email = this.emailInput.value;
		let check = email.match(/.+@./i);
		if (check === null) {
			this.changeStyleErr();
			if (email !== '') {
				this.showErr();
			}
			return false;
		} else {
			this.changeStyleDefault();
			this.hideErr();
		}
		return email;
	}
	
	getEmailFromForm() {
		let email = this.emailInput.value;
		let check = email.match(/.+@./i);
		if (check === null) {
			this.changeStyleErr();
			this.showErr();
			return false;
		}
		return email;
	}
	
	showOK() {
		$('.container').append(`
			<div class="done slide-in-bottom">
				 <img src="img/done_mark.png" width="150">
				 <span>Отправлено письмо с подтверждением.</span>
			</div>
		`);
		setTimeout(() => {
			$('.done').removeClass('slide-in-bottom');
			$('.done').addClass('slide-out-top');
		}, 5000);
	}
	
    sendEmail() {
		let email = this.getEmailFromForm();
		if (!email) {
			return false;
		}
			
		this.emailAdd = email;
		
		let sendData = {
			apiMethod: 'addEmailToMailing',
			postData: {
				email: this.emailAdd,
			}
		};
		this._postJson(`/index.php`, sendData)
			.then(data => {
				data = JSON.parse(data);
				if (data.result === 'OK' && data.sendConfirm === 'OK') {
					this.changeStyleDefault();
					this.clearInput();
					this.hideErr();
					this.showOK();
					console.log('Email add to mailing!');
				} else if (data.sendConfirm === 'error') {
					console.log('Не удалось отправить письмо с подтверждением');
				} else {
					this.changeStyleErr();
					if (data.error_text === 'Email already exist in mailing.') {
						this.showErr('Данный адрес уже участвует в рассылке.');
					} else {
						this.showErr();
					}
					
					console.log('ERROR_ADD_EMAIL');
				}
			});
    }
};
let mailing = new Mailing();
let mailingLink = document.querySelector('.button-send');
let mailingInput = document.querySelector('#email-mailing');
mailingLink.addEventListener('click', e => { 
	e.preventDefault();
	mailing.sendEmail();
});
mailingInput.addEventListener('blur', e => { 
	mailing.checkEmail();
});
document.querySelector('main').addEventListener('click', e => { 
	mailing.hideErr();
});


function changeStatus(typeModul, typeDesc) {
    let textMore = document.getElementById(typeModul);
    let descLength = document.getElementById(typeDesc).textContent.length;
    let className = document.getElementById(typeDesc);    

    if (descLength > 350) {textMore.innerHTML = 'Больше описания';}

    else {
        textMore.innerHTML = '';
        className.style.height = 'auto';
    }
    
    textMore.innerHTML = '';

};

let snLabels = {
	'art': 'artdesc',
	'congr': 'congr_text',
	'movie': 'moviedesc'
};

function checkLengthSeeNowText (objectSN) {
	let textMore,desc;
	for (let prop in objectSN) {
	  	textMore = document.getElementById(prop);
		desc = document.getElementById(objectSN[prop]);
		if (desc === null || textMore === null) {
			continue;
		}
		if (desc.textContent.length < 350) {
			textMore.innerHTML = '';
		}
	}
}

checkLengthSeeNowText(snLabels);


//let listenCall;
//listenCall('send', function () {
//
//    // запрос получил ответ
//    if (this.readyState == 4) {
//
//        console.log('Запрос успешно перехвачен!');
//        
//    }
//
//}, xmlHttpRequest);







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
//function login() {
//	//Получаем input'ы логина и пароля
//	const $login_input = $('[name="login"]');
//	const $password_input = $('[name="password"]');
//
//	//Получаем значение login и password
//	const login = $login_input.val();
//	const password = $password_input.val();
//
//	//Инициализируем поле для сообщений
//	const message_field = $('.message');
//
//	//Вызываем функцию jQuery AJAX с методом POST
//	//Передаем туда url где будет обрабатваться API
//	//И data которое будет помещена в $_POST
//	//success - вызывается при успешном ответе от сервера
//	$.post({
//		url: '/index.php',
//		data: {
//			apiMethod: 'login',
//			postData: {
//				login: login,
//				password: password
//			}
//		},
//		success: function (data) {
//			//data приходят те данные, который прислал на сервер
//
//
//			//Вариант с json
//			// if(data.error) {
//			// 	$message_field.text(data.error_text);
//			// } else {
//			// 	location.reload();
//			// }
//
//			//Вариан без json
//			if (data.result === 'OK') {
//				if (data.referrer === '/index.php?path=user/createorder') {
//					return location.href = '/index.php?path=user/createorder';
//				}
//				document.location.reload(true);
//			} else {
//				message_field.text(data['error_text']);
//			}
//		}
//	});
//}


//function registration() {
//	//Получаем input'ы логина и пароля
//	const $login_input = $('[name="login"]');
//	const $password_input = $('[name="password"]');
//	const $password_repeat_input = $('[name="password_repeat"]');
//	//Получаем значение login и password
//	const login = $login_input.val();
//	const password = $password_input.val();
//	const password_repeat = $password_repeat_input.val();
//	//Инициализируем поле для сообщений
//	const message_field = $('.message');
//
//	//Вызываем функцию jQuery AJAX с методом POST
//	//Передаем туда url где будет обрабатваться API
//	//И data которое будет помещена в $_POST
//	//success - вызывается при успешном ответе от сервера
//	$.post({
//		url: '/index.php',
//		data: {
//			apiMethod: 'reg',
//			postData: {
//				login: login,
//				password: password,
//				password_repeat: password_repeat
//			}
//		},
//		success: function (data) {
//			//data приходят те данные, который прислал на сервер
//			//Вариант с json
//			// if(data.error) {
//			// 	$message_field.text(data.error_text);
//			// } else {
//			// 	location.reload();
//			// }
//
//			//Вариан без json
//			if (data === 'OK') {
//				message_field.text('');
//				document.location.reload(true);
//			} else {
//				message_field.text(data['error_text']);
//			}
//		}
//	});
//}
