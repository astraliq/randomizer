"use strict"

let mainBlock = document.querySelector('#main_rnd_block');
//let quoteLink = document.querySelector('.data-title-link');
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
    constructor(filterQuote) {
        this.filterQuote = filterQuote;
        this.alreadyViewedIds = [];
        this.filterQuote.updateLinkQuoteFilterOpen();
        this.filterQuote.updateLinkQuoteFilterClose();
    }

    getRndQuote() {
        this.categories = this.filterQuote.filters.categories;
        this.authors = this.filterQuote.filters.authors;

        return $.post({
            url: '/index.php',
            data: {
                apiMethod: 'getRndQuote',
                postData: {
                    authors: this.authors,
                    categories: this.categories,
                    alreadyViewedIds: this.alreadyViewedIds
                }
            },
            success: function (data) {
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
    }

    //срабатявает при нажатии кнопки (показать цитату) 
    setFilters() {
        //идет по коллекции чекбоксов и если они чекнуты пушит из дата атрибута айди
        this.setSelectedFilters();
        //закрывает окно с фильрами
        this.filterQuote.closeQuoteFilter();
        //по идее должен отправять на сервер новый запрос но уже с фильтрами и рендерить на их основании новую цитату

        this.init();

        for (let i = 0; i < this.filterQuote.quotecheckboxCat.length; i++) {
            if (this.filterQuote.quotecheckboxCat[i].checked == true) {
                this.filterQuote.quotecheckboxCat[i].checked = false
            }
        }

        for (let i = 0; i < this.filterQuote.quotecheckboxAutor.length; i++) {
            if (this.filterQuote.quotecheckboxAutor[i].checked == true) {
                this.filterQuote.quotecheckboxAutor[i].checked = false
            }
        }
    }

    //идет по коллекции чекбоксов и если они чекнуты пушит из дата атрибута айди
    setSelectedFilters() {
        //идет по коллекции чекбоксов по категориям
        for (let i = 0; i < this.filterQuote.quotecheckboxCat.length; i++) {
            if (this.filterQuote.quotecheckboxCat[i].checked == true) {
                this.filterQuote.filters.categories = [...this.filterQuote.filters.categories, this.filterQuote.quotecheckboxCat[i].dataset.id]
            }
        }

        //идет по коллекции чекбоксов по авторам
        for (let i = 0; i < this.filterQuote.quotecheckboxAutor.length; i++) {
            if (this.filterQuote.quotecheckboxAutor[i].checked == true) {
                this.filterQuote.filters.authors = [...this.filterQuote.filters.authors, this.filterQuote.quotecheckboxAutor[i].dataset.id]

            }
        }

        console.log(this.filterQuote.filters);
        //эта функция формирует объект из фильтров
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
                this._render(fakeAPI);
                this._getNextQuote();
                this._putAlreadyViewedIds(fakeAPI);
            });

        // //после отправки на сервер сформированный массив с фильтрами его нужно отчистить

        for (let key in this.filterQuote.filters) {
            this.filterQuote.filters[key] = []
        }
        console.log(this.filterQuote.filters);
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
				<span class="cat-settings quote_filter_open">Настроить фильтр</span>
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

        let quote_filter_open = document.querySelector('.quote_filter_open');

        this.filterQuote.setFilersCallBack(quote_filter_open);

    }

}

class FilterQuote {
    constructor() {
        this.filters = {
            'authors': [],
            'categories': []
        };
        this.quotecheckboxAutor = document.querySelectorAll('.quotecheckboxAutor');
        this.quotecheckboxCat = document.querySelectorAll('.quotecheckboxCat');

    }

    setFilersCallBack(quote_filter_open) {
        let modalDialogQuot = document.querySelector('.modalDialogQuot');

        quote_filter_open.addEventListener('click', () => {
            modalDialogQuot.style.display = 'block';

        })

    }

    openQuoteFilter(e) {
        //Отменяем поведение ссылки
        e.preventDefault();
        let modalWindow = $('#quote-filter');
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

    updateLinkQuoteFilterOpen() {
        $('.main-block-menu').on('click', '#quote-filter-close', (e) => { this.openQuoteFilter(e) });
    }
    // обновление события закрытия окна на крестик
    updateLinkQuoteFilterClose() {
        //если нажата кнопка закрытия окна
        $('#quote-filter-close').on('click', function (e) {
            //Отменяем поведение ссылки
            e.preventDefault();
            $('#quote-filter').fadeOut(1);
        });
    }

    closeQuoteFilter() {
        if ($('#quote-filter').is(':visible')) {
            $('#quote-filter').fadeOut(1);
        }
    }

}


let filterQuote = new FilterQuote();
let quote = new Quote(filterQuote);
//quoteLink.addEventListener('click', e => { quote.init() });
quoteLinkMain.addEventListener('click', e => { quote.init() });
