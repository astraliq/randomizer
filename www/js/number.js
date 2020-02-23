"use strict"

let numberMainLink = document.querySelector('.number_main_lnk');
let nextNumber = document.querySelector('.button-rand');

class Numbers {
    constructor() {
		this.min;
        this.max;
		this.qty;
		this.otherCat = new OtherCategory();
    }

	_getJson(url, data) {
		return $.post({
            url: url,
            data: data,
            success: function (data) {
                //data приходят те данные, который прислал на сервер
            }
        })
	}
	getRandomInt() {
		// При каждом вызове функции сначала очистим массив
		let answer = [];

		// Сколько чисел надо вывести.
		// + перед значение приводит к числу
		this.qty = +document.getElementById('qty').value;

		// Получили минимальное и максимальные значения
		this.min = parseInt(document.getElementById('first').value);
		this.max = parseInt(document.getElementById('second').value);

		// Проходим по циклу от 1 до qty раз
		for(let i = 1; i <= this.qty; i++) {
		  // На каждой итерации добавляем новое ччисло в массив
		  answer.push(Math.floor(Math.random() * (this.max - this.min + 1)) + this.min);
		}
		document.getElementById('answer').style.fontSize = '150px'
		if (answer.length > 4 && answer.length < 7) {
			document.getElementById('answer').style.fontSize = '100px'
		} else if (answer.length >= 7 && answer.length < 30) {
			document.getElementById('answer').style.fontSize = '50px'
		} else if (answer.length >= 30) {
			document.getElementById('answer').style.fontSize = '25px'
		}
		
		// Добавляем значение массива в innerHTML
		// Фишка в том, что массив тут неявно преобразуется в строку
		// А строку массивы преобразуются просым перечислением значений через запятую
		document.getElementById('answer').innerHTML = answer.join(" ");
		let sendData = {
			apiMethod: 'getNumberInfo',
			postData: {
				number: answer[0],
			}
		};
		this._getJson(`/index.php`, sendData)
			.then(data => {
				if (data.result === 'OK') {
					this._renderNumber(answer[0], data.info.info);
					this.otherCat.render(data.otherCat);
				} else {
					$('.main-block-data-number_info').empty();
				}
			});
    }
	
	_renderNumber(number, info) {	
		$('.main-block-data-number_info').empty();
		$('.main-block-data-number_info').prepend(`
			<span class="spravka">Справка:</span><br>
            <p class="data-info" id="fact"><span class="sel-numb">${number}</span> &#151; ${info}</p>
		`);
		if (info.length > 250) {
			document.querySelector('.data-info').style.fontSize = '15px';
			document.querySelector('.sel-numb').style.fontSize = '20px';
		}
    }
	
	render() {	
		document.querySelector('.main-block').className = 'main-block main-color-5';
		$('.main-block-menu').empty();
		$('.main-block-menu').prepend(`
			<div>
				Cлучайность из категории:<span class="cat-sel">Случайное число</span>
			</div>
		`);
		$('.main-block-data').empty();
		$('.main-block-data').prepend(`
                 <div class="main-block-data-primary">
					<div class="main-block-data-number_info">
						<span class="spravka"></span><br>
						<p class="data-info" id="fact"><span class="sel-numb"></span></p>
					</div>
					<div class="random-data">
						<p class="main-number" id="answer"></p>
						<div class="random-form">
							<div>
								<div>
									<input type="text" class="random-numb" placeholder="Число от" id="first" value="0">
									<input type="text" class="random-numb" placeholder="Число до" id="second" value="100">
								</div>
								<div>
									<input type="text" class="count-rand" placeholder="Кол–во случайных чисел"  id="qty" value="1">
								</div>
								<button class="button-rand">RANDOMIZE!</button>
							</div>
						</div>
					</div>
				</div>
		`);
		this.otherCat.render({name: 'Фильм', function: 'film.getRndFilm()', nameCase: 'случайных чисел'});
		document.querySelector('.button-rand').addEventListener('click', e => { number.getRandomInt() });
    }
};
let number = new Numbers();
numberMainLink.addEventListener('click', e => { 
	number.render();
	number.getRandomInt();
});
if (nextNumber !== null) {
	nextNumber.addEventListener('click', e => { number.getRandomInt() });
}




