"use strict"


let findings = {
    id: 0,
    who: "",
    congratulate: "",
    number: 0,
    congrRnd: ""
};

const renderFirst = `
        <div class="main-block-data-primary"></div>
        <div class="congratulate_text" style="min-height: 400px;"></div>            
        `;
const renderMenu = ` <div class="main-block-menu">
                        <div>Cлучайность из категории:<span class="cat-sel">Поздравления</span></div>
                        <div>
                            <span class="cat-settings" onclick="rendGo();" style="cursor: pointer;">Настроить фильтр</span>
                            <span class="next-random" onclick="firstRnd();" style="cursor: pointer;">Следующее поздравление</span>
                        </div>
                    </div>
`;

const renderGo = `
        <div class="main-block-data-primary">
            <div class="congratulate_them">
                <div class="congratulate_him who" data-one="Для него">поздравить его</div>
                <div class="congratulate_her who" data-one="Для нее">поздравить её</div>
                <div class="congratulate_group who" data-one="Общее">поздравить их</div>
            </div>
            <div class="congratulete_select">
                <div class="congr_select_him off_block_off">
                    <div class="birthday_him congr" data-two="День Рождения">с днем рождения</div>
                    <div class="jubilee_him congr" data-two="Юбилей">с юбилеем</div>
                    <div class="new_year_him congr" data-two="Новый год">с новым годом</div>
                    <div class="february_23 congr" data-two="День защитника отечества">с 23 февраля</div>
                    <div class="february_14_him congr" data-two="День святого валентина">с 14 февраля</div>
                    <div class="wedding_day_him congr" data-two="На свадьбу">с днем свадьбы</div>
                    <div class="another_him congr" data-two="Прочее">прочее</div>
                </div>
                <div class="congr_select_her off_block_off">
                    <div class="birthday_her congr" data-two="День Рождения">с днем рождения</div>
                    <div class="jubilee_her congr" data-two="Юбилей">с юбилеем</div>
                    <div class="new_year_her congr" data-two="Новый год">с новым годом</div>
                    <div class="march_8 congr" data-two="Международный женский день (8 марта)">с 8-м марта</div>
                    <div class="february_14_her congr" data-two="День святого валентина">с 14 февраля</div>
                    <div class="wedding_day_her congr" data-two="На свадьбу">с днем свадьбы</div>
                    <div class="another_her congr" data-two="Прочее">прочее</div>
                </div>
                <div class="congr_select_group off_block_off">
                    <div class="birthday_group congr" data-two="День Рождения">с днем рождения</div>
                    <div class="jubilee_group congr" data-two="Юбилей">с юбилеем</div>
                    <div class="new_year_group congr" data-two="Новый год">с новым годом</div>
                    <div class="february_23_group congr" data-two="День защитника отечества">с 23 февраля</div>
                    <div class="march_8_group congr" data-two="Международный женский день (8 марта)">с 8-м марта</div>
                    <div class="wedding_daygroupr congr" data-two="На свадьбу">с днем свадьбы</div>
                    <div class="another_group congr" data-two="Прочее">прочее</div>
                </div>
            </div>
            <div class="congratulate_text"></div>

            <style>
                .main-block-data-primary {                    
                    display: flex;                    
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: flex-start;
                }
                
                .congratulate_them {
                    width: 40%;
                    min-height: 400px;                    
                }

                .congr_select_him,
                .congr_select_her,
                .congr_select_group {
                    display: flex;
                    flex-direction: column;
                    flex-wrap: nowrap;
                    justify-content: flex-start;
                    width: 100%;
                }
                
                .comgratulate_text {
                    width: 45%;                                                   
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

//Изменим цвет фона для совего блока
let colorMain = document.querySelector('.main-block');
colorMain.classList.add('main-color-2');

//грузим модуль в дивы
let congratulateLink = document.querySelector('.data-title-link');
let congratulateLinkMain = document.querySelector('.congratulate_main_lnk');

runProgr(congratulateLinkMain);
runProgr(congratulateLinkMain);

//грузим модуль Первая загрузка со случайным поздравлением
function runProgr(event) {
    let mainBlock = document.querySelector('.main-block-data');//место вставки
    let mainBlockMenu = document.querySelector('.main-block-menu');//место вставки строки
    event.addEventListener('click', function () {
        mainBlock.innerHTML = renderFirst;
        mainBlockMenu.innerHTML = renderMenu;
        // congratulate.init();
        setTimeout(firstRnd, 500);//время задержки, что бы успел выполниться callback у запроса fetch
    });
};

//грузим модуль с фильтром выбора поздравлений
function rendGo() {
    let mainBlock = document.querySelector('.main-block-data');
    let mainBlockMenu = document.querySelector('.main-block-menu');//место вставки строки
    mainBlock.innerHTML = renderGo;
    mainBlockMenu.innerHTML = renderMenu;
    congratulate.init();
    findings.congrRnd = "";
    congratulate.renderText(findings.congrRnd);
};

//первое случайное поздравление и также вывод "следующая случайность"
function firstRnd() {
    let firstNumber = Math.floor(Math.random() * 92);
    console.log(firstNumber);
    findings.id = firstNumber;

    let sendData = {
        apiMethod: 'getRndCongratulate',
        postData: {
            who: findings.who,
            theme: findings.congratulate
        }
    };
    congratulate._getRndCongratulate(`/index.php`, sendData)
        .then(data => {
            data = JSON.parse(data);
            findings.id = data.rnd.id;
            findings.congrRnd = data.rnd.congratulate;
            console.log(findings);
            congratulate.renderText(findings.congrRnd);
        });

    console.log(findings);
    // congratulate.renderText(firstText);
}

class Congratulate {
    constructor() {
        this.data = [];
        this.alreadyViewedIds = [];
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

                findings.congratulate = ev.srcElement.dataset.two; //определяем значение класса data-two

                // let j = 0;
                // do {

                let sendData = {
                    apiMethod: 'getRndCongratulate',
                    postData: {
                        who: [findings.who],
                        theme: [findings.congratulate]
                    }
                };
                congratulate._getRndCongratulate(`/index.php`, sendData)
                    .then(data => {
                        data = JSON.parse(data);

                        if (data.result === "OK") {

                            congratulate.data = data.rnd;
                            console.log(congratulate.data);

                            setTimeout(function () {

                                if (findings.who === congratulate.data.who && findings.congratulate === congratulate.data.theme) {
                                    findings.congrRnd = congratulate.data.congratulate;

                                    congratulate.renderText(congratulate.data.congratulate);
                                }
                            }, 500);
                        } else {
                            console.log('ERROR');
                        }
                    });
                //     j++;
                // } while (j < 192);
            });
        });
    }

    //рендер поздравления
    renderText(congratulateText) {
        let position = document.querySelector('.congratulate_text');
        position.innerHTML = congratulateText;
    }

    //Функция AJAX получение рандомного 
    _getRndCongratulate(url, jdata) {
        return $.post({
            url: url,
            data: jdata,
            success: function (data) {
                data = JSON.parse(data);
                if (data.result !== "OK") {
                    console.log("ERROR_GET_CONGRATULATE");
                }
            }
        })
    }


    init() {
        this.congratulateSomeone();
        this.subjectCongratulations();

        // let sendData = {
        //     apiMethod: 'getRndCongratulate',
        //     postData: {
        //         who: [findings.who],
        //         theme: [findings.congratulate]
        //     }
        // };
        // this._getRndCongratulate(`/index.php`, sendData)
        //     .then(data => {
        //         data = JSON.parse(data);
        //         findings.id = data.rnd.id;
        //         findings.who = data.rnd.who;
        //         findings.congratulate = data.rnd.theme;
        //         findings.congrRnd = data.rnd.congratulate;
        //         console.log(findings);
        //     });

    }
}

let congratulate = new Congratulate();

