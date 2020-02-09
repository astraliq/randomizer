"use strict"

function getJson(url, data) {
	return $.post({
		url: url,
		data: data,
		success: function (data) {
			//data приходят те данные, который прислал на сервер
			data = JSON.parse(data);
			if (data.result !== "OK") {
				console.log('ERROR_ADD_DATA');
			}
		}
	})
}

function updatePage(id) {
	location.href = 'http://randomizer/index.php?path=kino&id=' + id;
}

function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let startUpd = delay(updatePage, 10000);

function addFilm(sendData) {
	this._getJson(`/index.php`, sendData)
	.then(data => {
		data = JSON.parse(data);
		if (data.result === "OK") {
			let nextID = params.id;
			nextID++;
			startUpd(nextID);
		} else {
			console.log('ERROR_ADD_FILM');
		}
	});
}

if (document.location.search.slice(0,10) === '?path=kino') {
	let params = window.location.search
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
//	console.log(params);
	
	let film = {};
	
	film.title_ru = $('.moviename-title-wrapper').text();
	film.title_en = $('.alternativeHeadline').text();
	film.year = $('.info tr:first-child .type ~ td div a').text();
	
	film.countries = $('.info tr:nth-child(2) .type ~ td div').text();
	film.countries = film.countries.replace(/\s{2,}/g, '');
	film.countries = film.countries.split(',');
	
	film.genres = $('.info tr:nth-child(4) .type ~ td a').text();
	
	film.categories = $('[itemprop="genre"]').text();
	film.categories = film.categories.replace(/\s{2,}/g, '');
	film.categories = film.categories.split(',');
	
	film.duration = $('.time').text();
	film.duration = film.duration.slice(0,3);
	
	film.description_ru = $('.film-synopsys').text();
	film.rating = $('.rating_ball').text();
	
	film.actorsStr = $('#actorList ul').text();
	film.actorsStr = film.actorsStr.split(' ');
	film.actors = [];
	let counter = 0;
	for (let i = 1; i < film.actorsStr.length; i++) {
		if (i % 2 == 1) {
			film.actors[counter] = '';
			film.actors[counter] += film.actorsStr[i] + ' ';
		}
		if (i % 2 == 0 ) {
			film.actors[counter] += film.actorsStr[i];
			counter++;
		}
	}
	
	
	console.log(film);
	let sendData = {
		apiMethod: 'addParserData',
		postData: {
			film: film,
		}
	};
	
//	addFilm(sendData);
	// 'https://www.kinopoisk.ru/film/299/'
}

