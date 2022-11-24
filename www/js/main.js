'use strict';
//if(typeof jQuery!=='undefined'){
//    console.log('jQuery Loaded');
//}
//else{
//    console.log('not loaded yet');
//};
//
let links = document.querySelectorAll('.footer-more-link');

class BrowseNow {
    constructor() {
        this.html = '';
        this.browseNowData = [];
    }

    _getCategoryHTML(catName) {
        let html, label;
        let limitText = 340;
        switch (catName) {
            case 'Фильм':
                this.browseNowData.filmData.main_img =
                    this.browseNowData.filmData.main_img === null
                        ? 'stub.jpg'
                        : this.browseNowData.filmData.main_img;
                label = `<label for="button-m" onclick="changeStatus('movie', 'moviedesc')" id="movie">Больше описания</label>
							<input type="checkbox" id="button-m">`;
                html = `
				<div class="see-now-main-data">
					<div class="see-now-cat">
						<a class="see-now-cat-link" href="/film">Фильм</a>
					</div>
					<div class="see-now-desc">
						<div class="see-now-img">
							<img class="see_now-film-pic" src="" width="100" alt="Фильм &laquo;${
                                this.browseNowData.filmData.title_ru
                            }&raquo;" title="${
                    this.browseNowData.filmData.title_ru
                }" data-c="m" data-i="${this.browseNowData.filmData.main_img}">
						</div>
						<div class="see-now-text">
							<p class="see-now-subtitle">${this.browseNowData.filmData.title_ru}
								<br>${this.browseNowData.filmData.year}, ${
                    this.browseNowData.filmData.country
                }, ${this.browseNowData.filmData.duration} мин.</p>
							<div class="see-now-wrapper">
							${this.browseNowData.filmData.description_ru.length > limitText ? label : ''}
							<label for="button-m" onclick="changeStatus('movie', 'moviedesc')" id="movie">Больше описания</label>
							<input type="checkbox" id="button-m">

						   <p class="movie-text" id="moviedesc">${
                               this.browseNowData.filmData.description_ru
                           }</p>
							</div>
						</div>
					</div>
				</div>
				`;
                break;
            case 'Цитата':
                this.browseNowData.quoteData.picture =
                    this.browseNowData.quoteData.picture === null
                        ? 'img/quoters/stub.jpg'
                        : this.browseNowData.quoteData.picture;
                this.browseNowData.quoteData.author =
                    this.browseNowData.quoteData.author === null
                        ? ''
                        : this.browseNowData.quoteData.author;
                this.browseNowData.quoteData.authorInfo =
                    this.browseNowData.quoteData.authorInfo === null
                        ? ''
                        : this.browseNowData.quoteData.authorInfo;
                html = `
				<div class="see-now-main-data">
					<div class="see-now-cat">
						<a class="see-now-cat-link" href="/quote">Цитата</a>
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
						<a class="see-now-cat-link" href="/word">Интересное слово</a>
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
							<input type="checkbox" id="button-cg">`;
                html = `
				<div class="see-now-main-data">
					<div class="see-now-cat"><a class="see-now-cat-link" href="/congratulate">Поздравление</a></div>
					<div class="data-desc">
						<div class="see-now-text">
							<p class="cong-cat">Тема: 
								<a href="#" class="cong-cat-link">${this.browseNowData.congrData.theme}</a>.
								<br>
								<a href="#" class="cong-cat-link">${this.browseNowData.congrData.who}</a>
							</p>
							<p class="congr-text" id="congr_text">${
                                this.browseNowData.congrData.congratulate
                            }</p>
							${this.browseNowData.congrData.congratulate.length > limitText ? label : ''}
						</div>
					</div>
				</div>
				`;
                break;
            case 'Подарок':
                html = `
				<div class="see-now-main-data">
					<div class="data-title">
						<a class="data-title-link" href="/gift">Подарки</a>
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
                if (data.result !== 'OK') {
                    console.log('ERROR_GET_DATA');
                }
            },
        });
    }

    getBrowseNowData(currentCategory) {
        let sendData = {
            apiMethod: 'getBrowseNowData',
            postData: {
                currentCat: currentCategory,
            },
        };
        this._getJson(`/index.php`, sendData).then((data) => {
            if (data.result === 'OK') {
                this.browseNowData = data.browseNowData;
                this.html = this._getCategoryHTML(data.browseFirst);
                this.html += this._getCategoryHTML(data.browseSecond);
                this.html += this._getCategoryHTML(data.browseThird);
                this.html += this._getCategoryHTML(data.browseFourth);
                this._render(this.html);
                newSrc.changeSrc(document.querySelector('.see_now-film-pic'));
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
                if (data.result !== 'OK') {
                    console.log('ERROR_GET_DATA');
                }
            },
        });
    }

    getOtherCatData(currentCat) {
        let sendData = {
            apiMethod: 'getOtherCatData',
            postData: {
                currentCat: currentCat,
            },
        };
        return this._getJson(`/index.php`, sendData).then((data) => {
            if (data.result === 'OK') {
                this.data.name = data.otherCatName;
                this.data.nameCase = data.case;
                this.data.function = data.function;
            } else {
            }
        });
    }

    render(data) {
        $('.other-cat').removeClass('vk-other_cat');
        $('.other-cat').empty();
        $('.other-cat').prepend(`
				Кроме ${data.nameCase} наш генератор выдаёт варианты из
				<a class="link-in-text">других категорий</a>,
				например, &laquo;<a class="link-in-text" href="/${data.function}">${data.name}</a>&raquo;
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
                if (data.result !== 'OK') {
                    console.log('ERROR_ADD_EMAIL');
                }
            },
        });
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
        let standartMsg =
            'Адрес электронной почты должен содержать символ "@". Проверьте правильность указанного адреса.';
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
            },
        };
        this._postJson(`/index.php`, sendData).then((data) => {
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
}
let mailing = new Mailing();
let mailingLink = document.querySelector('.button-send');
let mailingInput = document.querySelector('#email-mailing');
mailingLink.addEventListener('click', (e) => {
    e.preventDefault();
    mailing.sendEmail();
});
mailingInput.addEventListener('blur', (e) => {
    mailing.checkEmail();
});
document.querySelector('main').addEventListener('click', (e) => {
    mailing.hideErr();
});

function utf8_encode(str_data) {
    // Encodes an ISO-8859-1 string to UTF-8
    str_data = str_data.replace(/\r\n/g, '\n');
    var utftext = '';

    for (var n = 0; n < str_data.length; n++) {
        var c = str_data.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
}

function genCode(str) {
    let RotateLeft = function (lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    };

    let AddUnsigned = function (lX, lY) {
        let lX4, lY4, lX8, lY8, lResult;
        lX8 = lX & 0x80000000;
        lY8 = lY & 0x80000000;
        lX4 = lX & 0x40000000;
        lY4 = lY & 0x40000000;
        lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
        if (lX4 & lY4) {
            return lResult ^ 0x80000000 ^ lX8 ^ lY8;
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
            } else {
                return lResult ^ 0x40000000 ^ lX8 ^ lY8;
            }
        } else {
            return lResult ^ lX8 ^ lY8;
        }
    };

    let F = function (x, y, z) {
        return (x & y) | (~x & z);
    };
    let G = function (x, y, z) {
        return (x & z) | (y & ~z);
    };
    let H = function (x, y, z) {
        return x ^ y ^ z;
    };
    let I = function (x, y, z) {
        return y ^ (x | ~z);
    };

    let FF = function (a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    let GG = function (a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    let HH = function (a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    let II = function (a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    let ConvertToWordArray = function (str) {
        let lWordCount;
        let lMessageLength = str.length;
        let lNumberOfWords_temp1 = lMessageLength + 8;
        let lNumberOfWords_temp2 =
            (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        let lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        let lWordArray = Array(lNumberOfWords - 1);
        let lBytePosition = 0;
        let lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] =
                lWordArray[lWordCount] |
                (str.charCodeAt(lByteCount) << lBytePosition);
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] =
            lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    let WordToHex = function (lValue) {
        let WordToHexValue = '',
            WordToHexValue_temp = '',
            lByte,
            lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = '0' + lByte.toString(16);
            WordToHexValue =
                WordToHexValue +
                WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    let x = Array();
    let k, AA, BB, CC, DD, a, b, c, d;
    let S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22;
    let S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20;
    let S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23;
    let S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;

    str = utf8_encode(str);
    x = ConvertToWordArray(str);
    a = 0x67452301;
    b = 0xefcdab89;
    c = 0x98badcfe;
    d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070db);
        b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
        a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
        c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
        c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
        a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
        a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
        a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
        a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
        c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xf4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432aff97);
        c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
        b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
        c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
        d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
        c = II(c, d, a, b, x[k + 6], S43, 0xa3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
        a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
        d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
        b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }

    let temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

    return temp.toLowerCase();
}

let snLabels = {
    'art': 'artdesc',
    'congr': 'congr_text',
    'movie': 'moviedesc',
    'word': 'word_desc',
    'quote': 'quote_desc',
};

function changeStatus(typeModul, typeDesc) {
    let textMore = document.getElementById(typeModul);
    let descLength = document.getElementById(typeDesc).textContent.length;
    let className = document.getElementById(typeDesc);

    if (descLength < 350  && typeDesc !== 'congr_text') {
        textMore.innerHTML = 'Больше описания';
    } else {
        textMore.innerHTML = '';
        className.style.height = 'auto';
    }
    textMore.innerHTML = '';
}


function checkLengthSeeNowText(objectSN) {
    let textMore, desc;
    for (let prop in objectSN) {
        textMore = document.getElementById(prop);
        desc = document.getElementById(objectSN[prop]);
        if (desc === null || textMore === null) {
            continue;
        }
        if (objectSN[prop] === 'word_desc' && desc.textContent.length < 260) {
            textMore.innerHTML = '';
            continue;
        }
        if (objectSN[prop] === 'congr_text' && desc.textContent.length < 100) {
            textMore.innerHTML = '';
            continue;
        }
        if (desc.textContent.length < 340 && objectSN[prop] !== 'congr_text') {
            textMore.innerHTML = '';
        }
    }
}

checkLengthSeeNowText(snLabels);

class RandomizerError {
    constructor() {
        this.to1;
        this.to2;
    }

    showError(header, errText) {
        clearTimeout(this.to1);
        clearTimeout(this.to2);
        this.hideError();
        $('main').append(`
			<div class="end_stub_container fade-in-bck">
				<div class="end_stub">
					<h2 class="end_stub_head">${header}</h2>
					<p class="end_stub_head_text">${errText}</p>
				</div>
			</div>
		`);
        this.to1 = setTimeout(function () {
            $('.end_stub_container').removeClass('fade-in-bck');
            $('.end_stub_container').addClass('fade-out-bck');
            this.to2 = setTimeout(function () {
                $('.end_stub_container').remove();
            }, 1000);
        }, 3500);
    }

    hideError() {
        $('.end_stub_container').remove();
    }
}

let rndzError = new RandomizerError();

function addXMLRequestCallback(callback) {
    let oldSend;
    if (XMLHttpRequest.callbacks) {
        XMLHttpRequest.callbacks.push(callback);
    } else {
        XMLHttpRequest.callbacks = [callback];
        oldSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function (data) {
            let i;
            for (i = 0; i < XMLHttpRequest.callbacks.length; i++) {
                XMLHttpRequest.callbacks[i](this);
            }
            oldSend.apply(this, arguments);
        };
    }
}

class ReqLimit {
    constructor(limitTime) {
        // определитель возможности следующего запроса, 0 - запрос проходит, 1 - запрос блокируется.
        this.limit = 0;
        this.time = limitTime;
        this.to1;
        this.to2;
    }

    checkReqLimits() {
        if (this.limit === 1) {
            rndzError.showError(
                'Воу, воу полегче...',
                'Вы даже не успели прочитать.'
            );
            return false;
        } else {
            return true;
        }
    }

}

// создаем объект класса проверки литмита времени запросов с указанием времени таймайта
let reqLimit = new ReqLimit(500);

let to3;
addXMLRequestCallback(function (xhr) {
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                clearTimeout(to3);
                reqLimit.limit = 1;
                to3 = setTimeout(function () {
                    reqLimit.limit = 0;
                }, reqLimit.time);
            }
            if (xhr.status === 404) {
                rndzError.showError(
                    'Вы просмотрели все случайности из данной категории.',
                    'Попробуйте изменить фильтр или выбрать другую категорию случайностей.'
                );
            }
        }
    };
});

class ImageSrc {
    constructor() {
        this.images = document.querySelectorAll('img');
        this.code;
        this.codeGen();
    }

    codeGen() {
        this.code = genCode(links[3].dataset.c);
    }

    changeSrcAll() {
        for (let i = 0; i < this.images.length; i++) {
            if (this.images[i].src === document.location.href.split('#')[0]) {
                this.images[i].src =
                    'image.php?hash=' +
                    this.code +
                    'c&c=' +
                    this.images[i].dataset.c +
                    '&i=' +
                    this.images[i].dataset.i;
            }
        }
    }

    changeSrc(elem) {
        elem.src =
            'image.php?hash=' +
            this.code +
            'c&c=' +
            elem.dataset.c +
            '&i=' +
            elem.dataset.i;
    }
}

let newSrc = new ImageSrc();
newSrc.changeSrcAll();

let modalMore = document.getElementById('myModal');

let btn = document.getElementById('modal-btn');

btn.onclick = function () {
    modalMore.style.display = 'block';
};

window.onclick = function (event) {
    //	console.log(event);
    if (event.target == modalMore) {
        modalMore.style.display = 'none';
    }
};

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
//						<p class="film-desc"><b>Режиссёр:</b> ${film.director}</p>
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

