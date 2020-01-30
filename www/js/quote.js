"use strict"

let mainBlock = document.querySelector('#main_rnd_block');
let quoteLink = document.querySelector('.data-title-link');
let quoteLinkMain = document.querySelector('.quote_main');
let fakeAPI = {
    id: 0,
    text: "",
    autor: "",
    categories: "",
    type: ""
};


class Quote {
    constructor() {
        this.filters = [1];
        this.alreadyViewedIds = [];
    }
	
	
	
    getRndQuote() {
        // console.log('dd');
        // this._render(fakeAPI);
        // this._putAlreadyViewedIds(fakeAPI);
        // this._getNextQuote();
        // fetch(url)
        //     .then(
        //         function (response) {
        //             if (response.status !== 200) {
        //                 console.log('Looks like there was a problem. Status Code: ' +
        //                     response.status);
        //                 return;
        //             }

        //             // Examine the text in the response  
        //             response.json().then(function (data) {
        //                 console.log(data);
        //             });
        //         }
        //     )
        //     .catch(function (err) {
        //         console.log('Fetch Error :-S', err);
        //     });


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
                if (data.result === "OK") {
                    

                } else {
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
        console.log(this.alreadyViewedIds);
    }

    init() {
		this.getRndQuote()
			.then(data => {
				data = JSON.parse(data);
				fakeAPI.id = data.rnd.id;
				fakeAPI.text = data.rnd.text;
				fakeAPI.author = data.rnd.author;
				fakeAPI.catgegories = data.rnd.categories;
				console.log(fakeAPI);
				this._render(fakeAPI);
				this._getNextQuote();
//				this._putAlreadyViewedIds(quote);
			});
    }
	
	_render(quote) {	
        $(".main-block-data-primary").empty();
//        $(".category").empty();
        $(".main-block-data-primary").prepend(`

            <h1 class='quote_txt'> ${quote.text} </h1>
            <span>${quote.author}</span>
            <p class='quote_categories'> ${quote.categories} </p>
        </div>
        `);
		$(".cat-sel").text(`Цитаты`);
        
    }
	//                <div class="main-block-data-primary">
//                <p class="main-block-data-menu">Ваша случайность из категории: <span class="category"></span>
//                <span class="cat-settings">Настроить фильтр</span><span class="next-random">Следующая случайность</span>
//                </p>
//        <div id="rnd_quote">
}
let quote = new Quote();
quoteLink.addEventListener('click', e => { quote.init() });
quoteLinkMain.addEventListener('click', e => { quote.init() });