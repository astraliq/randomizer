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


function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

// let startUpd = delay(updatePage, 100);
// let startUpd2 = delay(updatePage2, 2000);
// let startUpd3 = delay(updatePage3, 3000);

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

let btnStartPasrse = document.querySelector('.st_parse');
btnStartPasrse.addEventListener('click', e => { getFilmsByApi() });


function getFilmsByApi() {
	let token = 'ZQQ8GMN-TN54SGK-NB3MKEC-ZKB8V06';
	let sendData = {
		'token': token,
		'field': 'year',
		'search': '2020-2022',
		'sortField': 'year',
		'sortType': 1,
	}
	let nextID = urlParams.id;
	getJson(`https://api.kinopoisk.dev/movie`, sendData)
		.then(data => {
			if (data) {
				console.log(data);
				console.log('result OK');
			} else {
				console.log('ERROR_RESPONSE_API');
			}
		});
}