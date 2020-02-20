"use strict"

//-----------------------------------------------------------------------
//запуск модуля: onclick="words.init();" или по классу "words_main_lnk"
//-----------------------------------------------------------------------


const renderMenuWords = `<div class="main-block-menu">
                        <div>Cлучайность из категории:<span class="cat-sel">Интересное слово</span></div>
                        <div>
                            <span class="cat-settings" onclick="filterWords.init();" style="cursor: pointer;">Настроить фильтр</span>
                            <span class="next-random" onclick="filterWords._goRandomWords();" style="cursor: pointer;">Следующее слово</span>
                        </div>
                    </div>
`;

const modalWord = `
        <!--<div id="film-filter" class="modalDialog">-->
                <div>
                    <!--<a href="#close" title="Close" class="close" id="film-filter-close">X</a>-->
                    <div class="div-ul">
                        <p class="filtr-title">Языки</p>
                        <ul>
                            <li class="checkbox"><input type="checkbox" class="check_word" id="word-check0" value="0" data-language="все"><label for="word-check0">Все языки</label></li>
                            <li class="checkbox"><input type="checkbox" class="check_word" id="word-check1" value="1" data-language="шведский"><label for="word-check1">шведский</label></li>
                            <li class="checkbox"><input type="checkbox" class="check_word" id="word-check2" value="2" data-language="немецкий"><label for="word-check2">немецкий</label></li>
                            <li class="checkbox"><input type="checkbox" class="check_word" id="word-check3" value="3" data-language="французский"><label for="word-check3">французский</label></li>
                            <li class="checkbox"><input type="checkbox" class="check_word" id="word-check4" value="4" data-language="чешский"><label for="word-check4">чешский</label></li>
                            <li class="checkbox"><input type="checkbox" class="check_word" id="word-check5" value="5" data-language="испанский"><label for="word-check5">испанский</label></li>
                            <li class="checkbox"><input type="checkbox" class="check_word" id="word-check6" value="6" data-language="голландский"><label for="word-check6">голландский</label></li>
                            <li class="checkbox"><input type="checkbox" class="check_word" id="word-check7" value="7" data-language="финский"><label for="word-check7">финский</label></li>
                            <li class="checkbox"><input type="checkbox" class="check_word" id="word-check9" value="9" data-language="японский"><label for="word-check9">японский</label></li>
                            <li class="checkbox"><input type="checkbox" class="check_word" id="word-check10" value="10" data-language="китайский"><label for="word-check10">китайский</label></li>
                            <li class="checkbox"><input type="checkbox" class="check_word" id="word-check11" value="11" data-language="арабский"><label for="word-check11">арабский</label></li>
                        </ul>
                    </div>
                    <button class="button-send" onclick="filterWords._goRandomWords();">Узнать слово</button>
                </div>
           <!-- </div>-->
`;

const firstWord = `
    <div class="main-block-data">
        <div class="main-block-data-primary" style="position: relative;">        
            <div class="main-block-data-text" style="width: 100%; min-height: 400px;"></div>
            <div class="modal_shadow_words off_block_off"></div>
            <div class="modal_window_words off_block_off"> 
                <div class="modal_text_words" style="width: 100%; height: 100%;">${modalWord}</div>
            </div>
            <div class="cross_words off_block_off">&#10006;</div>
        </div>     
    </div> 
    `;



//первый запуск по классу и по функции onclick
let wordsLinkMain = document.querySelector('.words_main_lnk');
wordsLinkMain.addEventListener('click', function () {
    words.init();
});

//Изменим цвет фона для совего блока 1...7
function colorWords(color) {
    let colorMain = document.querySelector('.main-block');
    colorMain.classList.add(`main-color-${color}`);
    for (let i = 1; i < 8; i++) {
        if (i !== color) colorMain.classList.remove(`main-color-${i}`);
    };
};

let interestingWords = {
    id: 0,
    language: ['французский', 'немецкий', 'финский', 'испанский', 'голландский', 'чешский', 'шведский', 'луба, группа банту', 'китайский', 'арабский', 'японский', 'персидский', 'лингала, группа банту', 'язык острова Киривина, Новая Гвинея', 'идиш', 'язык майя Южной Мексики и Гондураса'],
    word: "",
    meaning: ""
};


class FiltrWords {
    constructor() {
    }
    //включение модального окна
    onModalWindow() {
        let modalWindow = document.querySelector('.modal_window_words');
        let modalShadow = document.querySelector('.modal_shadow_words');
        let modalCross = document.querySelector('.cross_words');

        modalWindow.classList.remove('off_block_off');
        modalShadow.classList.remove('off_block_off');
        modalCross.classList.remove('off_block_off');
    }

    // выключение модального окна по нажатию на крестик или тень
    _offCross() {
        let cross = document.querySelector('.cross_words');
        let modalWindow = document.querySelector('.modal_window_words');
        let modalShadow = document.querySelector('.modal_shadow_words');

        cross.addEventListener('click', function () {
            cross.classList.add('off_block_off');
            modalWindow.classList.add('off_block_off');
            modalShadow.classList.add('off_block_off');
        });

        modalShadow.addEventListener('click', function () {
            cross.classList.add('off_block_off');
            modalWindow.classList.add('off_block_off');
            modalShadow.classList.add('off_block_off');
        });
    }

    // отслеживаем нажатые чекбоксы и добавляем в массив выбранные языки
    _getFilterResult() {
        interestingWords.language = [];
        this._resetAllCheckbox();
        console.log(interestingWords.language);

        let filterResult = document.querySelectorAll('.check_word');
        filterResult.forEach(function (result) {
            result.addEventListener('click', function (event) {

                if (result.checked) {

                    interestingWords.language = [...interestingWords.language, event.srcElement.dataset.language];
                    console.log('добавлен - ' + event.srcElement.dataset.language);
                    console.log(interestingWords.language);

                } else {

                    let position = interestingWords.language.indexOf(event.srcElement.dataset.language);
                    let removedLanguage = interestingWords.language.splice(position, 1);
                    console.log("delete - " + removedLanguage);
                }
                if (interestingWords.language.includes('все')) {
                    filterWords._resetCheckbox(); //сброс всех чекбоксов
                }
            });
        });
    }

    //сбрасываем все чекбоксы
    _resetAllCheckbox() {
        let uncheck = document.querySelectorAll('.check_word');
        uncheck[0].checked = true;
        for (let i = 0; i < uncheck.length; i++) {
            uncheck[i].checked = false;
        };
    }

    // сбрасываем нажатые чекбоксы при выборе "Все языки"
    _resetCheckbox() {
        interestingWords.language = ['все'];
        let uncheck = document.querySelectorAll('.check_word');
        uncheck[0].checked = true;
        for (let i = 1; i < uncheck.length; i++) {
            uncheck[i].checked = false;
        };
        console.log(interestingWords.language);
    }

    //запуск рандомного значение с обнуленным массивом языков
    _goRandomWords() {
        //проверяем содержимое массива языков = ВСЕ или длина массива = 0
        if (interestingWords.language.includes('все') || interestingWords.language.length == 0) {
            interestingWords.language = ['французский', 'немецкий', 'финский', 'испанский', 'голландский', 'чешский', 'шведский', 'луба, группа банту', 'китайский', 'арабский', 'японский', 'персидский', 'лингала, группа банту', 'язык острова Киривина, Новая Гвинея', 'идиш', 'язык майя Южной Мексики и Гондураса'];
            console.log('new start');
        }
        console.log('old run');
        console.log(interestingWords.language);

        this.randomWords();
    }

    //рандомное значение по фильтру языков
    randomWords() {
        let i;

        do {
            i = words.rndWords();
            if (interestingWords.language.includes(words.data[i].language)) {
                interestingWords.id = words.data[i].id
                // interestingWords.language = words.data[i].language;
                interestingWords.word = words.data[i].word;
                interestingWords.meaning = words.data[i].meaning;
                this._renderTextWordFilter(words.data[i].word, words.data[i].language, words.data[i].meaning);
            }
            // if (interestingWords.language.includes('все')) words.init();
        } while (!interestingWords.language.includes(words.data[i].language));
        this._offModalAll();

    }

    //выключение модального окна
    _offModalAll() {
        let modalWindow = document.querySelector('.modal_window_words');
        let modalShadow = document.querySelector('.modal_shadow_words');
        let modalCross = document.querySelector('.cross_words');
        modalWindow.classList.add('off_block_off');
        modalShadow.classList.add('off_block_off');
        modalCross.classList.add('off_block_off');
    }

    //рендер слов по фильтру
    _renderTextWordFilter(word, language, meaning) {
        let position = document.querySelector('.main-block-data-text');
        let meaningWord = `
                        <h1>Слово: ${word}</h1>
                        <h3>Язык: ${language}</h3>
                        <p class="film-desc"><span style="font-size: 24px">Значение: </span> ${meaning}</p>
                        `;
        position.innerHTML = meaningWord;
    }

    init() {
        this.onModalWindow();
        this._getFilterResult();
        this._offCross();
    }
}


class Words {
    constructor() {
        this.data = [];
        this.alreadyViewedIds = [];//массив повторов
    }

    //грузим модуль Первая загрузка
    runProgrWords() {
        colorWords(3);//выбираем цвет фона = 3
        let mainSection = document.querySelector('.main-block');//вставляем блок целиком с подблоками 
        mainSection.innerHTML = `${renderMenuWords} ${firstWord} 
    <div class="other-cat">
        Кроме интересных слов наш генератор выдаёт варианты из
        <a href="#" class="link-in-text">других категорий</a>,
        например, &laquo;<a href="#" class="link-in-text" onclick="film.getRndFilm()">Фильм</a>&raquo;
    </div>
    `;
    }

    //рендер слов
    renderTextWord() {
        let position = document.querySelector('.main-block-data-text');
        let meaningWord = `
                        <h1>Слово: ${interestingWords.word}</h1>
                        <h3>Язык: ${interestingWords.language}</h3>
                        <p class="film-desc"><span style="font-size: 24px">Значение: </span> ${interestingWords.meaning}</p>
                        `;
        position.innerHTML = meaningWord;
    }

    _getJson(url, data) {
		return $.post({
            url: url,
            data: data,
            success: function (data) {
                //data приходят те данные, который прислал на сервер
                data = JSON.parse(data);
                if (data.result !== "OK") {
                    console.log('ERROR_GET_DATA_');
                }
            }
        })
	}

    //получаем случайное значение
    rndWords() {
        return Math.floor(Math.random() * words.data.length);
    }

    //по случайному ID выбираем слово
    choiceOfWords() {
        interestingWords.id = this.rndWords();
        console.log(interestingWords.id);
        for (let i = 0; i < words.data.length; i++) {
            if (interestingWords.id == this.data[i].id) {
                // interestingWords.language = this.data[i].language;
                interestingWords.word = this.data[i].word;
                interestingWords.meaning = this.data[i].meaning;
                filterWords._renderTextWordFilter(this.data[i].word, this.data[i].language, this.data[i].meaning);
            }
        };
    }

    init() {
		
		let sendData = {
			apiMethod: 'getRndWord',
			postData: {
				language: this.years,
			}
		};
		
        this.runProgrWords();
		this._getJson(`/index.php`, sendData)
			.then(data => {
				data = JSON.parse(data);
				if (data.result === "OK") {
					
					filterWords._renderTextWordFilter(data.rnd.word, data.rnd.language, data.rnd.meaning);
					this.otherCat.render(data.otherCat);
					this.browseNow.getBrowseNowData('Интересное слово');
				} else {
					console.log('ERROR_GET_FILM');
				}
			});
    }

}//конец класса

let words = new Words();
let filterWords = new FiltrWords();