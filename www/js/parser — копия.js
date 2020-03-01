"use strict"
let urlParams = window.location.search
    .replace('?','')
    .split('&')
    .reduce(
        function(p,e){
            var a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    );


function getJson(url, data) {
	return $.post({
		url: url,
		data: data,
		success: function (data) {
			//data приходят те данные, который прислал на сервер
			if (data.result !== "OK") {
				console.log('ERROR_ADD_DATA');
			}
		}
	})
}

function updatePage(id) {
	location.href = 'http://randomizer/index.php?path=kino&id=' + id;
}

function updatePage2(id) {
	location.href = 'http://randomizer/index.php?path=kino/poiskid&id=' + id;
}


function updatePage3(id,num) {
	let elem = document.querySelectorAll('.cla a')[num]
	if (elem.className.substr(0, 1) !== 'c') {
		return;
	}
	let href = elem.getAttribute('href').split('/')[4];
	
	location.href = 'http://randomizer/index.php?path=parse/pozdravok&id=' + id + '&href=' + href + '&num=' + num;
}
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let startUpd = delay(updatePage, 100);
let startUpd2 = delay(updatePage2, 2000);
let startUpd3 = delay(updatePage3, 3000);

function addFilm(sendData, urlParams, check) {
	let nextID = urlParams.id;
	getJson(`/index.php`, sendData)
	.then(data => {
		if (data.result === "OK") {
			console.log('result OK');
			startUpd(data.nextId);
		} else {
			console.log('ERROR_ADD_FILM');
		}
	});
}

function addFilmID(sendData) {
	let nextID = urlParams.id;
	getJson(`/index.php`, sendData)
	.then(data => {
		if (data.result === "OK") {
			console.log('result OK');
			nextID++;
			startUpd2(nextID);
		} else {
			console.log('ERROR_ADD_ID');
		}
	});
}
document.querySelector('.cla');
function addCongr(sendData) {
	let nextID = urlParams.id;
	let num = urlParams.num;
	
	getJson(`/index.php`, sendData)
	.then(data => {
		if (data.result === "OK") {
			console.log('result OK');
			nextID++;
			startUpd3(nextID,num);
		} else {
			num++;
			console.log('ERROR_ADD_ID');
			startUpd3(1,num);
		}
	});
}

if (urlParams.path === 'parse/pozdravok') {
	
	let congrs = [];
	let congrsElems = document.querySelectorAll('.sfst');
	let type = document.querySelector('.curpg').innerText;
	
	for (let i = 0; i < congrsElems.length; i++) {
		congrs[i] = congrsElems[i].innerHTML;
	}
	
	let sendData = {
		apiMethod: 'addParserDataPozdravok',
		postData: {
			congrs: congrs,
			type: type
		}
	};
	console.log(urlParams);
	console.log(sendData);
	addCongr(sendData);
}
if (urlParams.path === 'parse') {
	
	let film = {};
	film.id = urlParams.id;
	film.title_ru = $('.moviename-title-wrapper').text();
	film.title_en = $('.alternativeHeadline').text();
	film.year = $('.info tr:first-child .type ~ td div a:first-child').text();
	
	film.countries = $('.info tr:nth-child(2) .type ~ td div').text();
	film.countries = film.countries.replace(/\s{2,}/g, '');
	film.countries = film.countries.split(',');
	film.country_id = [];
	
	film.genres = $('.info tr:nth-child(4) .type ~ td a').text();
	
	film.categories = $('[itemprop="genre"]').text();
	film.categories = film.categories.replace(/\s{1,}/g, '');
	film.categories = film.categories.split(',');
	film.category_id = [];
	
	film.duration = $('.time').text();
	film.duration = film.duration.split(' ')[0];
	film.duration = (film.duration === '') ? 0 : film.duration;
	
	film.description_ru = $('.film-synopsys').text();
	film.rating = $('.rating_ball').text();
	film.rating = (film.rating === '') ? 0 : film.rating;
	
	film.actorsStr = $("#actorList ul a").map(function(index, element){
		return $(element).text();
		}).get();
	
	let counter = 0;
	for (let i = 1; i < film.actorsStr.length; i++) {
		if (film.actorsStr[i] === '...') {
			counter = i
			break;
		}
	}
	film.actors = film.actorsStr.slice(0,counter);
	film.actors = film.actors.join(', ');
	
	film.imgSrc = $('.popupBigImage img').attr('src');
	if (film.imgSrc !== undefined) {
		film.main_img = film.imgSrc.slice(44,100);
	} 
	
	let check = true;
	if ((film.main_img === undefined || film.description_ru === '') && film.title_ru !== '' || (film.description_ru === '' && film.title_ru === '')
	   || film.year.length > 4 || film.actors === '' || film.genres === '' || film.categories[0] === '') {
		check = false;
	}
	console.log(check);
	console.log(film);
	let sendData = {
		apiMethod: 'addParserData',
		postData: {
			film: film,
		}
	};
	
	addFilm(sendData, urlParams, check);
	// 'https://www.kinopoisk.ru/film/299/'
}

if (urlParams.path === 'parse/poiskid') {
	let film = {};
	film.id = [];
	
	film.id = $(".name a").map(function(index, element){
		return $(element).attr('href');
		}).get();
	film.id = film.id.map(function(el){
			return el.slice(14, el.length - 1);
		})
	
	
	console.log(film.id);

	let sendData = {
		apiMethod: 'addFilmsIds',
		postData: {
			film: film,
		}
	};
	
	addFilmID(sendData);
}