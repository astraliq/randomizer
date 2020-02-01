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
        nextRndBtn.addEventListener('click', e => { quote.getRndQuote() });
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
//                console.log(fakeAPI);
                this._render(fakeAPI);
                this._getNextQuote();
                this._putAlreadyViewedIds(fakeAPI);
            });
    }

    _render(quote) {
        $(".main-block-data-primary").empty();
        $(".main-block-data-primary").prepend(`
            <div class="main-block-data-primary">
        <div class="main-block-free">
        <p class="poet-pic"> ${quote.picture} </p>
        <p class="poet-desc"> ${quote.authorInfo} </p>
    </div>
    <div class="main-block-data">
        <p class="main-block-data-menu">Cлучайность из категории:<span class="cat-sel">Цитаты</span><span class="cat-settings">Настроить фильтр</span><span class="next-random">Следующая цитата</span></p>
        <div class="main-block-data-primary">
            <div class="main-block-data-text">
                <p class="quotes-desc"><span class="left-aquo">&laquo;</span> ${quote.text} </p>
                <p class="qoutes-title"> ${quote.author} </p>
            </div>
        </div>
        `);
        $(".cat-sel").text(`Цитаты`);
    }

}
let quote = new Quote();
quoteLink.addEventListener('click', e => { quote.init() });
quoteLinkMain.addEventListener('click', e => { quote.init() });