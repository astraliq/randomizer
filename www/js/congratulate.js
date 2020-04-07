"use strict"


let findings = {
    id: 0,
    who: "",
    congratulate: "",
    number: 0,
    congrRnd: ""
};

const renderFirst = `
        <div class="main-block-data">
            <div class="main-block-data-primary" style="position: relative;">        
                <div class="main-block-data-text" style="min-height: 400px;"></div>
                <div class="modal_shadow off_block_off"></div>
                <div class="modal_congr off_block_off"> 
                    <div class="modal_text" style="width: 100%; height: 100%;"></div>
                </div>
                <div class="cross off_block_off">&#10006;</div>
            </div>     
        </div> 
        <style>
        .off_block_off {
            display: none;
        }
        .modal_shadow {
            position: fixed;
            font-family: Arial, Helvetica, sans-serif;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.6);           
            z-index: 0;            
        }
        .modal_congr {
            min-width: 730px;
            position: relative;
            margin: 10% auto;
            padding: 5px 20px 13px 20px;
            border-radius: 10px;
            background: #fff; 
            box-sizing: border-box;
            margin: 0 0 20px 0;         
            z-index: 15;
        }
        .cross{
            background: #606061;
            color: #FFFFFF;
            line-height: 25px;
            position: absolute;
            right: -12px;
            text-align: center;
            top: -10px;
            width: 24px;
            text-decoration: none;
            font-weight: bold;
            -webkit-border-radius: 12px;
            -moz-border-radius: 12px;
            border-radius: 12px;
            -moz-box-shadow: 1px 1px 3px #000;
            -webkit-box-shadow: 1px 1px 3px #000;
            box-shadow: 1px 1px 3px #000;
            cursor: pointer;             
            z-index: 15;
        }
        .cross:hover {
            background-color: #ebbd2f;
        }
        </style>   
        `;

const renderMenu = ` <div class="main-block-menu">
                        <div>Cлучайность из категории:<span class="cat-sel">Поздравление</span></div>
                        <div>
                            <span class="cat-settings" onclick="rendGo();" style="cursor: pointer;">Настроить фильтр</span>
                            <span class="next-random" onclick="firstRnd();" style="cursor: pointer;">Следующее поздравление</span>
                        </div>
                    </div>
`;

const renderGo = `
        <div class="main-block-data-primary" style="position: relative; z-index: 15;">
            <div class="congratulate_them">
                <div class="congratulate_him who" data-one="Для него">поздравить его</div>
                <div class="congratulate_her who" data-one="Для нее">поздравить её</div>
                <div class="congratulate_group who" data-one="Общее">поздравить их</div>
            </div>
            <div class="congratulete_select">
                <div class="congr_select_him off_block_off">
                    <div class="birthday_him off_color congr" data-two="День Рождения">с днем рождения</div>
                    <div class="jubilee_him off_color congr" data-two="Юбилей">с юбилеем</div>
                    <div class="new_year_him off_color congr" data-two="Новый Год">с новым годом</div>
                    <div class="february_23 off_color congr" data-two="День защитника отечества">с 23 февраля</div>
                    <div class="february_14_him off_color congr" data-two="День святого валентина">с 14 февраля</div>
                    <div class="wedding_day_him off_color congr" data-two="На свадьбу">с днем свадьбы</div>
                    <div class="another_him off_color congr" data-two="Прочее">прочее</div>
                </div>
                <div class="congr_select_her off_block_off">
                    <div class="birthday_her off_color congr" data-two="День Рождения">с днем рождения</div>
                    <div class="jubilee_her off_color congr" data-two="Юбилей">с юбилеем</div>
                    <div class="new_year_her off_color congr" data-two="Новый Год">с новым годом</div>
                    <div class="march_8 off_color congr" data-two="Международный женский день (8 марта)">с 8-м марта</div>
                    <div class="february_14_her off_color congr" data-two="День святого валентина">с 14 февраля</div>
                    <div class="wedding_day_her off_color congr" data-two="На свадьбу">с днем свадьбы</div>
                    <div class="another_her off_color congr" data-two="Прочее">прочее</div>
                </div>
                <div class="congr_select_group off_block_off">
                    <div class="birthday_group off_color congr" data-two="День Рождения">с днем рождения</div>
                    <div class="jubilee_group off_color congr" data-two="Юбилей">с юбилеем</div>
                    <div class="new_year_group off_color congr" data-two="Новый Год">с новым годом</div>
                    <div class="february_23_group off_color congr" data-two="День защитника отечества">с 23 февраля</div>
                    <div class="march_8_group off_color congr" data-two="Международный женский день (8 марта)">с 8-м марта</div>
                    <div class="wedding_daygroupr off_color congr" data-two="На свадьбу">с днем свадьбы</div>
                    <div class="another_group off_color congr" data-two="Прочее">прочее</div>
                </div>
                <button class="button-send btn_congr off_block_off" style="width: 150px; height: 50px; margin: 300px 0 0 100px;">Поздравление</button>
            </div>
            

            <style>
                .main-block-data-primary {                    
                    display: flex;                    
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: flex-start;
                }
                
                .congratulate_them {
                    width: 35%;
                    min-height: 400px;                                     
                }
                .congratulete_select {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: flex-start;
}
                .congr_select_him,
                .congr_select_her,
                .congr_select_group {
                    display: flex;
                    flex-direction: column;
                    flex-wrap: nowrap;
                    justify-content: flex-start;
                    width: 25%;
                }
                
                .main-block-data-text {
                    width: 75%;     
                    margin: 20px 0 0 70px;                                              
                }
                
                .who,
                .congr {
                    width: 200px;
                    height: 30px;
                    margin: 10px;
                    text-align: left;
                    /* border: 1px solid #000; */
                    padding: 5px;
                    box-sizing: border-box;
                    cursor: pointer;
                }
                
                .who:hover,
                .congr:hover {
                    text-shadow: 2px 2px 3px #333;
                }
                
                .who:active,
                .congr:active {
                    text-shadow: none;
                }
                
                .off_block_off {
                    display: none;
                }
                
                .off_color {
                    color: #ccc;
                }                
            </style>
        </div>       
`;

// //грузим модуль в дивы
// let congratulateLink = document.querySelector('.data-title-link');


//let congratulateLinkMain = document.querySelector('.congratulate_main_lnk');
//congratulateLinkMain.addEventListener('click', function () {
//    congratulate.runProgr();
//});

// runProgr(congratulateLinkMain);

//грузим модуль Первая загрузка со случайным поздравлением
// function runProgr() {
//     let mainSection = document.querySelector('.main-block');//вставляем блок целиком с подблоками   
//     // event.addEventListener('click', function () {
//     mainSection.innerHTML = `${renderMenu} ${renderFirst} 
//         <div class="other-cat">
//         Кроме фильмов наш генератор выдаёт варианты из
//         <a href="#" class="link-in-text">других категорий</a>,
//         например, &laquo;
//         <a href="#" class="link-in-text" onclick="film.getRndFilm()">Фильмы</a>&raquo;
//     </div>
//         `;

//     //Изменим цвет фона для совего блока
//     let colorMain = document.querySelector('.main-block');
//     colorMain.classList.add('main-color-2');
//     colorMain.classList.remove('main-color-1');
//     colorMain.classList.remove('main-color-3');
//     colorMain.classList.remove('main-color-4');
//     colorMain.classList.remove('main-color-5');
//     colorMain.classList.remove('main-color-6');
//     colorMain.classList.remove('main-color-7');

//     // setTimeout(firstRnd, 500);//время задержки, что бы успел выполниться callback у запроса 
//     firstRnd();

//     // });
// };

//грузим модуль с фильтром выбора поздравлений
function rendGo() {
    let modalShadow = document.querySelector('.modal_shadow');
    let modalBlock = document.querySelector('.modal_congr');
    let modalCross = document.querySelector('.cross');
    modalCross.classList.remove('off_block_off');
    modalShadow.classList.remove('off_block_off');
    modalBlock.classList.remove('off_block_off');
    let mainBlock = document.querySelector('.modal_text');//было - .main-block-data    
    let mainBlockMenu = document.querySelector('.main-block-menu');//место вставки строки
    mainBlock.innerHTML = renderGo;
    mainBlockMenu.innerHTML = `<div>Cлучайность из категории:<span class="cat-sel">Поздравление</span></div>
                                <div>
                                    <span class="cat-settings" onclick="rendGo();" style="cursor: pointer;">Настроить фильтр</span>
                                    <span class="next-random" onclick="firstRnd();" style="cursor: pointer;">Следующее поздравление</span>
                                </div>
    `;
    congratulate.btnCross(); // отключение по кресту
    congratulate.btnShadow(); // отключение по тени
    congratulate.init();
    findings.congrRnd = "";
    congratulate.renderText(findings.congrRnd);
};

//первое случайное поздравление и также вывод "следующее поздравление"
function firstRnd() {
    let firstNumber = Math.floor(Math.random() * 92);
    //    console.log(firstNumber);
    findings.id = firstNumber;

    let sendData = {
        apiMethod: 'getRndCongratulate',
        postData: {
            who: findings.who,
            theme: findings.congratulate
        }
    };
    // запрос случайного поздравления по id номеру
    congratulate._getRndCongratulate(`/index.php`, sendData)
        .then(data => {
            findings.id = data.rnd.id;
            findings.congrRnd = data.rnd.congratulate;
            congratulate.renderText(findings.congrRnd);
        });

    //    console.log(findings);
}

class Congratulate {
    constructor() {
        this.data = [];
        this.alreadyViewedIds = [];//массив повторов
    }
    //грузим модуль Первая загрузка со случайным поздравлением
    runProgr() {
        let mainSection = document.querySelector('.main-block');//вставляем блок целиком с подблоками   
        // event.addEventListener('click', function () {
        mainSection.innerHTML = `${renderMenu} ${renderFirst} 
        <div class="other-cat">
        Кроме поздравлений наш генератор выдаёт варианты из
        <a href="#" class="link-in-text">других категорий</a>,
        например, &laquo;
        <a href="#" class="link-in-text" href="/film">Фильм</a>&raquo;
    </div>
        `;

        //Изменим цвет фона для совего блока
        let colorMain = document.querySelector('.main-block');
        colorMain.classList.add('main-color-2');
        colorMain.classList.remove('main-color-1');
        colorMain.classList.remove('main-color-3');
        colorMain.classList.remove('main-color-4');
        colorMain.classList.remove('main-color-5');
        colorMain.classList.remove('main-color-6');
        colorMain.classList.remove('main-color-7');

        // setTimeout(firstRnd, 500);//время задержки, что бы успел выполниться callback у запроса 
        firstRnd();
        // });
    }

    //слушаем нажатие - выбор пола, затемняем не активные кнопки
    congratulateSomeone() {
        let who = document.querySelectorAll('.who');

        who.forEach(function (whoBtn) {
            whoBtn.addEventListener('click', function (event) {

                let whoWas = event.srcElement.dataset.one;
                findings.who = whoWas;
                console.log(whoWas);

                let himBtn = document.querySelector('.congratulate_him');
                let herBtn = document.querySelector('.congratulate_her');
                let groupBtn = document.querySelector('.congratulate_group');
                let himBlock = document.querySelector('.congr_select_him');
                let herBlock = document.querySelector('.congr_select_her');
                let groupBlock = document.querySelector('.congr_select_group');

                //отключаем в html не активные кнопки, включаем выбранный блок
                if (findings.who === 'Для него') {
                    himBtn.classList.remove('off_color');
                    herBtn.classList.add('off_color');
                    groupBtn.classList.add('off_color');
                    himBlock.classList.remove('off_block_off');
                    herBlock.classList.add('off_block_off');
                    groupBlock.classList.add('off_block_off');
                } else if (findings.who === 'Для нее') {
                    herBtn.classList.remove('off_color');
                    himBtn.classList.add('off_color');
                    groupBtn.classList.add('off_color');
                    herBlock.classList.remove('off_block_off');
                    himBlock.classList.add('off_block_off');
                    groupBlock.classList.add('off_block_off');
                } else if (findings.who === 'Общее') {
                    groupBtn.classList.remove('off_color');
                    himBtn.classList.add('off_color');
                    herBtn.classList.add('off_color');
                    groupBlock.classList.remove('off_block_off');
                    himBlock.classList.add('off_block_off');
                    herBlock.classList.add('off_block_off');
                }
            });
        });
    }

    //слушаем нажатие выбора темы поздравления
    subjectCongratulations() {
        let congr = document.querySelectorAll('.congr');

        congr.forEach(function (congrBtn) {
            congrBtn.addEventListener('click', function (ev) {
                //определяем значение класса data-two
                findings.congratulate = ev.srcElement.dataset.two;
                congrBtn.classList.remove('off_color'); //меняем цвет у выбранного поздравления   
                console.log(findings.congratulate);
                congratulate.deleteSubject();
                congratulate.onBtnCongr();
                congratulate.goBtnCongr();

            });
        });
    }
    // отключаем неактивный выбор поздравления
    deleteSubject() {
        let subject = document.querySelectorAll('.congr');
        subject.forEach(function (subj) {
            if (findings.congratulate !== subj.dataset.two) {
                subj.classList.add('off_color');
            }
        });
    }

    //отключение окна при нажатии на крест
    btnCross() {
        let cross = document.querySelector('.cross');
        let modalBlock = document.querySelector('.modal_congr');
        let modalShadow = document.querySelector('.modal_shadow');

        cross.addEventListener("click", function () {
            cross.classList.add('off_block_off');
            modalBlock.classList.add('off_block_off');
            modalShadow.classList.add('off_block_off');
            // firstRnd();
            findings = {};
        });
    }

    //отключение окна при нажатии на тень
    btnShadow() {
        let cross = document.querySelector('.cross');
        let modalBlock = document.querySelector('.modal_congr');
        let modalShadow = document.querySelector('.modal_shadow');

        modalShadow.addEventListener("click", function () {
            cross.classList.add('off_block_off');
            modalBlock.classList.add('off_block_off');
            modalShadow.classList.add('off_block_off');
            // firstRnd();
            findings = {};
        });
    }

    //включаем кнопку поздравлений
    onBtnCongr() {
        let btn = document.querySelector('.btn_congr');
        btn.classList.remove('off_block_off');
    }

    //обрабатываем нажатие на кнопку - Поздравление
    goBtnCongr() {
        let btn = document.querySelector('.btn_congr');
        let modalBlock = document.querySelector('.modal_congr');
        let modalShadow = document.querySelector('.modal_shadow');
        let modalCross = document.querySelector('.cross');

        btn.addEventListener('click', function () {
            modalBlock.classList.add('off_block_off');
            modalShadow.classList.add('off_block_off');
            modalCross.classList.add('off_block_off');
            congratulate.getCongr();
        });
    }

    //получаем рандомное значение с сервера по результатам запроса
    getCongr() {
        let sendData = {
            apiMethod: 'getRndCongratulate',
            postData: {
                who: findings.who,
                theme: findings.congratulate,
                alreadyViewedIds: congratulate.alreadyViewedIds
            }
        };

        //запрос по критерию отбора (who, theme) 
        congratulate._getRndCongratulate(`/index.php`, sendData)
            .then(data => {
                if (data.result === "OK") {
                    congratulate.data = data.rnd;
                    console.log(congratulate.data);

                    if (findings.who === congratulate.data.who && findings.congratulate === congratulate.data.theme) {

                        findings.congrRnd = congratulate.data.congratulate;

                        congratulate.renderText(findings.congrRnd);
                        congratulate.alreadyViewedIds = [...congratulate.alreadyViewedIds, congratulate.data.id];

                        console.log(congratulate.alreadyViewedIds);
                    }
                } else {
                    console.log('ERROR');
                }
            });

        //сбрасываем массив поторов, если он раве 4 или более 
        if (congratulate.alreadyViewedIds.length >= 4) {
            congratulate.alreadyViewedIds = [];
        }
    }

    //рендер поздравления
    renderText(congratulateText) {
        let position = document.querySelector('.main-block-data-text');
        congratulateText = `<p class="film-desc">${congratulateText}</p>`;
        position.innerHTML = congratulateText;
    }

    //Функция AJAX получение рандомного поздравления
    _getRndCongratulate(url, jdata) {
        return $.post({
            url: url,
            data: jdata,
            success: function (data) {
                if (data.result !== "OK") {
                    console.log("ERROR_GET_CONGRATULATE");
                }
            }
        })
    }


    init() {
        this.congratulateSomeone();
        this.subjectCongratulations();
    }
}

let congratulate = new Congratulate();



