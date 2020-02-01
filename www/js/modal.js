//function methodName() {
//	let aaa = document.querySelectorAll('a');
//
//	for (let i = 0; i < aaa.length; i++) {
//		aaa[i].addEventListener('click', () => console.log('OKKK'));
//	}
//
//}

function closeAllModal() {
	$('body').click(function (e) {
		$('#film-filter').fadeOut(500);
	});
}

//methodName();
$('.main-block-data-menu').on('click', '#film-filter-open',function (e) {
	console.log('obj');
	//	if ($('[id^=modal]:visible')) {
	//		$('[id^=modal]:visible').fadeOut(500);
	//	}
	//Отменяем поведение ссылки
	e.preventDefault();
	//Получаем тег A
	let id = $(this).attr('href');
	console.log(id);
	let modalWindow = $(id);
	//Получаем ширину и высоту окна
	let winH = $(window).height();
	let winW = $(window).width();
	//Устанавливаем всплывающее окно по центру
	modalWindow.css('top', winH / 2 - modalWindow.height() / 2);
	modalWindow.css('left', winW / 2 - modalWindow.width() / 2);
	//эффект перехода
//	$("#film-filter").css("display","block");
	modalWindow.fadeIn(500);

	$(document).mouseup(function (e) { // событие клика по веб-документу
		if (!modalWindow.is(e.target) && modalWindow.has(e.target).length === 0) { // если клик был не по нашему блоку и не по его дочерним элементам 
			modalWindow.fadeOut(500); // скрываем его
		}
	});

});

//если нажата кнопка закрытия окна
$('.main-block-data-menu').on('click', '#film-filter-close',function (e) {
	//Отменяем поведение ссылки
	e.preventDefault();
	$('#film-filter').fadeOut(500);
	
});
