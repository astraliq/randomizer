"use strict"

let mainBlock = document.querySelector('#main_rnd_block');
let quoteLink = document.querySelector('.data-title-link');
let quoteLinkMain = document.querySelector('.quote_main_lnk');
let fakeAPI = {
    id: 0,
    text: "",
    author: "",
    authorInfo: "",
    categories: "",
    picture: ""
};


class Quote {
    constructor() {
        this.filters = [];
        this.alreadyViewedIds = [];
		this.browseNow = new BrowseNow();
		this.otherCat = new OtherCategory();
    }



    getRndQuote() {  
        return $.post({
            url: '/index.php',
            data: {
                apiMethod: 'getRndQuote',
                postData: {
                    filters: this.filters,
                    alreadyViewedIds: this.alreadyViewedIds
                }
            },
            success: function (data) {
                //data приходят те данные, который прислал на сервер
                data = JSON.parse(data);
                if (data.result !== "OK") {
                    console.log('ERROR_GET_QUOTE');
                }
            }
        })
    }

    _getNextQuote() {
        let nextRndBtn = document.querySelector('.next-random');
        nextRndBtn.addEventListener('click', e => { quote.init() });
    }

    _putAlreadyViewedIds(quote) {
        this.alreadyViewedIds = [...this.alreadyViewedIds, quote.id];
//        console.log(this.alreadyViewedIds);
    }

    init() {
        this.getRndQuote()
            .then(data => {
                data = JSON.parse(data);
                fakeAPI.id = data.rnd.id;
                fakeAPI.text = data.rnd.text;
                fakeAPI.author = data.rnd.author;
                fakeAPI.authorInfo = data.rnd.authorInfo;
                fakeAPI.catgegories = data.rnd.categories;
                fakeAPI.picture = data.rnd.picture;
				fakeAPI.picture = fakeAPI.picture === null ? 'img/quoters/stub.jpg' : fakeAPI.picture;
				fakeAPI.author = (fakeAPI.author === null) ? "" : fakeAPI.author;
				fakeAPI.authorInfo = (fakeAPI.authorInfo === null) ? "" : fakeAPI.authorInfo;
//                console.log(fakeAPI);
                this._render(fakeAPI);
				this.otherCat.render(data.otherCat);
                this._getNextQuote();
                this._putAlreadyViewedIds(fakeAPI);
				this.browseNow.getBrowseNowData('Цитата');
            });
    }

    _render(quote) {
		document.querySelector('.main-block').className = 'main-block main-color-4';
        $(".main-block").empty();
        $(".main-block").prepend(`
		<div class="main-block-menu">
			<div>
				Cлучайность из категории:<span class="cat-sel">Цитата</span>
			</div>
			<div>
				<span class="cat-settings">Настроить фильтр</span>
				<span class="next-random">Следующая цитата</span>
			</div>
		</div>
		<div class="main-block-data">
			<div class="main-block-data-primary">
				<div class="main-block-data-pic">
						<img src="${quote.picture}" width="276" alt="${quote.author}" title="${quote.author}">
				</div>
				<div class="main-block-data-text">
					<p class="main-data-title"><span class="left-aquo">&laquo;${quote.text}&raquo;</span></p>
					<p class="qoutes-title">${quote.author}</p>
					<p class="poet-desc">${quote.authorInfo}</p>
				</div>
			</div>
		</div>
		<div class="other-cat">Кроме цитат наш генератор выдаёт варианты из <a href="#" class="link-in-text">других категорий</a>, например, &laquo;<a href="#" class="link-in-text" onclick="film.getRndFilm()">Фильмы</a>&raquo;
		</div>
        `);
    }

}
let quote = new Quote();
quoteLink.addEventListener('click', e => { quote.init() });
quoteLinkMain.addEventListener('click', e => { quote.init() });