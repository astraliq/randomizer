"use strict"

class VKFilter {
	constructor() {
		this.filterInput = document.querySelectorAll('.vk_radio_input');
		this.repostFirstInput = document.getElementById('vk-repost_first');
		this.subscribeInput = document.getElementById('vk-subscribe');
		this.countInput = document.getElementById('vk-winner_count');
		this.countryInput = document.getElementById('vk-winner_country');
		this.method;
		this.filter = {
			repostFirst: 0,
			subscribe: 0
		};
		this.country;
		this.count;
		this.getFilterValues();
	}

	init() {
		this.filterInput.forEach((el) => {
			el.addEventListener('click', e => {
				this.getFilterValues()
			});
		})
		this.repostFirstInput.addEventListener('click', e => {
			this.getFilterValues()
		});
		this.subscribeInput.addEventListener('click', e => {
			this.getFilterValues()
		});
		this.countInput.addEventListener('click', e => {
			this.getFilterValues()
		});
		this.countryInput.addEventListener('click', e => {
			this.getFilterValues()
		});
	}

	getFilterValues() {
		// способ определение победителя
		this.filterInput.forEach((el) => {
			if (el.checked) {
				this.method = el.dataset.type;
			}
		});
		console.log(this.method);
		// настройки фильтра
		this.filter.repostFirst = (this.repostFirstInput.checked) ? 1 : 0;
		this.filter.subscribe = (this.subscribeInput.checked) ? 1 : 0;
		console.log(this.filter);

		// количество участников и город победителя
		this.count = this.countInput.value;
		this.country = this.countryInput.value;
		console.log('this.count:', this.count);
		console.log('this.country:', this.country);
	}

}



class VKAPI {
	constructor() {
		this.token;
		this.urlParams = this.getUrlParams(window.location.search);;
		this.urlHashParams;
		this.rndWin = new RandomWinner();
		this.eventHandler;
		this.likeUsers = [];
		this.repostUsers = [];
		this.input;
		this.regExp1 = /(^https?:\/\/)vk\.com\/((wall)|(.+\?w=wall))-?[0-9]+_[0-9]+/gi;
		this.regExp2 = /vk\.com\/((wall)|(.+\?w=wall))/gi;
		this.regExp3 = /(wall)|(group)/gi;
		VK.init({
			apiId: 7347408
		});
		this.vkFilter = new VKFilter();
		this.vkFilter.init();
	}

	_getJson(url, data) {
		return $.get({
			url: url,
			data: data,
			dataType: 'jsonp',
			success: function (data) {

			}
		})
	}

	_postJson(url, data) {
		return $.post({
			url: url,
			data: data,
			dataType: 'jsonp',
			success: function (data) {

			}
		})
	}

	getUrlParams(url) {
		let urlParams = url
			.replace('?', '')
			.split('&')
			.reduce(
				function (p, e) {
					var a = e.split('=');
					p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
					return p;
				}, {}
			);
		return urlParams;
	}

	getUrlHashParams() {
		if (window.location.hash !== '') {
			this.urlHashParams = window.location.hash
				.slice(1)
				.replace('?', '')
				.split('&')
				.reduce(
					function (p, e) {
						var a = e.split('=');
						p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
						return p;
					}, {}
				);
			return true;
		} else {
			return false;
		}
	}

	showErrAddress(errorMsg) {
		let standartMsg = 'Ссылка должна быть вида https://vk.com/wall-34877171_395385 или https://vk.com/group?w=wall-34877171_395385';
		let msg = errorMsg ? errorMsg : standartMsg;
		$('.main-block-vk-err_text').text(msg);
		$('.main-block-vk-err_msg').show();

	}

	checkVKWallHref(href) {
		// проверка на соответствие адресам:
		// https://vk.com/group?w=wall-34877171_395385
		// https://vk.com/wall-34877171_395385
		if (!href.match(this.regExp1)) {
			return false;
		}
		return true;
	}

	init() {
		this.input = document.querySelector('.vk_block-post');
		// проверка правильности ссылки
		let link = this.input.value;
		if (!this.checkVKWallHref(link)) {
			this.showErrAddress();
			return false;
		} else {
			$('.main-block-vk-err_msg').hide();
		}

		//		VK.Auth.logout(function () {
		//			console.log('сессия VK убита');
		//		});
		let sendData = {
			apiMethod: 'vkAuthSet',
			postData: {
				vkAuth: 1,
			}
		};
		VK.Auth.getLoginStatus(function (response) {
			console.log(response);
			if (response.session && response.status === 'connected') {
				vkMod.startGettingWinner();
			} else {
				VK.Auth.login(function (response) {
					if (response.session) {
						/* Пользователь успешно авторизовался */
						console.log('огонь, авторизация прошла');
						vkMod._getJson(`/index.php`, sendData)
							.then(data => {
								if (data.result === "OK") {
									console.log('vk auth in session');
								}
							})
						vkMod.startGettingWinner();
					} else {
						/* Пользователь нажал кнопку Отмена в окне авторизации */
						console.log('авторизации нет');
					}
				});
			}
		});

	}

	async startGettingWinner() {
		let link = this.input.value; // адрес введенный пользователем

		this.rndWin.winnersIds = [];
		let ids = link.split(link.match(this.regExp2)[0])[1].split('_');

		let progress = 0; // процент выполнения загрузки
		let offset = 0;
		let count = 1000;
		let totalCount = count;

		let err;

		this.clearRenderBlock();
		this._renderProgress();

		let stage = 1;

		let type = 0;
		switch (this.vkFilter.method) {
			case 'like':
				type = 1;
				break;
			case 'repost':
				type = 2;
				break;
			case 'repost&like':
				type = 3;
				break;
			default:
				type = 1;
		}

		if (this.vkFilter.filter.repostFirst === 1) {
			stage++;
		}
		if (this.vkFilter.filter.subscribe === 1) {
			stage++;
		}
		if (this.vkFilter.country !== '') {
			stage++;
		}


		// filter: likes    ->   учитывает только лайки
		// filter: copies   ->   учитывает только репосты

		if (type === 2 || type === 3) {
			err = 0;
			offset = 0;
			count = 1000;
			while (err === 0) {
				await VK.Api.call('likes.getList', {
					type: 'post',
					owner_id: ids[0],
					item_id: ids[1],
					filter: 'copies',
					friends_only: 0,
					extended: 0,
					offset: offset,
					count: count,
					v: "5.52"
				}, function (data) {
					if (data.response) {
						console.log(data);

						vkMod.repostUsers = [...vkMod.repostUsers, ...data.response.items];
						totalCount = data.response.count;
						progress = vkMod.repostUsers.length * 100 / totalCount;
						progress = (progress > 100) ? 100 : progress;
						document.querySelector('.progress_block-procent').innerText = Math.round(progress) + '%';
						document.querySelector('.progress_block-line').style.width = Math.round(progress) + '%';
						err = (data.response.items.length == 0) ? 1 : 0;
					}
				});

				await new Promise((resolve, reject) => setTimeout(resolve, 333));
				offset = offset + count;

			}
			if (type === 2) {
				this.rndWin.winnersIds = this.repostUsers;
			}
		}

		if (type === 1 || type === 3) {
			err = 0;
			offset = 0;
			count = 1000;
			while (err === 0) {
				await VK.Api.call('likes.getList', {
					type: 'post',
					owner_id: ids[0],
					item_id: ids[1],
					filter: 'likes',
					friends_only: 0,
					extended: 0,
					offset: offset,
					count: count,
					v: "5.52"
				}, function (data) {
					if (data.response) {
						console.log(data);

						vkMod.likeUsers = [...vkMod.likeUsers, ...data.response.items];
						totalCount = data.response.count;
						progress = vkMod.likeUsers.length * 100 / totalCount;
						progress = (progress > 100) ? 100 : progress;
						document.querySelector('.progress_block-procent').innerText = Math.round(progress) + '%';
						document.querySelector('.progress_block-line').style.width = Math.round(progress) + '%';
						err = (data.response.items.length == 0) ? 1 : 0;
					}
				});

				await new Promise((resolve, reject) => setTimeout(resolve, 333));
				offset = offset + count;

			}
			if (type === 1) {
				this.rndWin.winnersIds = this.likeUsers;
			}
		}

		if (type === 3) {
			this.repostUsers.forEach((el) => {
				if (this.likeUsers.includes(el, 0)) {
					this.rndWin.winnersIds.push(el);
				}
			})
		}

		if (this.vkFilter.country !== '') {
			let offsetCount = Math.ceil(this.rndWin.winnersIds.length / 1000);
			let offsetStep = 1000;
			let tempArr = [];
			for (let i = 0; i < offsetCount; i++) {
				await new Promise((resolve, reject) => setTimeout(resolve, 333));
				let newUsersGet = await this.getUsersByIds(this.rndWin.winnersIds.slice(i * 1000, i * 1000 + offsetStep));
				if (i === 0) {
					tempArr = [...newUsersGet];
				} else {
					tempArr = [...tempArr, ...newUsersGet];
				}
			}
			let filterArr = tempArr.filter((el) => {
				let city = el.city ? el.city.title : '';
				return city.toLowerCase() === this.vkFilter.country.toLowerCase();
			});
			
			if (filterArr.length === 0) {
				rndzError.showError('Ошибка', 'Участники с указанным городом отсутствуют.');
				return;
			}
			
			this.rndWin.winnersIds = [];
			filterArr.forEach( (el) => {
				this.rndWin.winnersIds.push(el.id);
			})
		}
		
		
		// удаляем дубликаты id из массива
		this.rndWin.winnersIds = Array.from(new Set(this.rndWin.winnersIds));
		this._render(this.rndWin.winnersIds, this.rndWin.winnersIds.length);
		console.log('this.rndWin.winnersIds:', this.rndWin.winnersIds);

		if (this.vkFilter.country !== '') {
			// запрос данных пользователей
		}

		let btnGetWin = document.getElementById('vk_get_winner');
		if (btnGetWin != null) {
			btnGetWin.removeEventListener('click', this.eventHandler);
		}
		document.getElementById('vk_get_winner').addEventListener('click', this.eventHandler = (e) => {
			this._initGetRndWinner(this.vkFilter.count);
		});

	}

	async _initGetRndWinner(winnerCount) {
		if (winnerCount > this.rndWin.winnersIds.length) {
			rndzError.showError('Ошибка', 'Количество победителей не может быть больше участников.');
			return;
		}
		
		let winnerIds, winners;
		winnerIds = this.rndWin.getRandomWinner(winnerCount, 0);
		winners = await this.getUsersByIds(winnerIds);
		this._renderWinner(winners);
	}

	async getUsersByIds(ids) {
		let users;
		let user_ids = Array.isArray(ids) ? ids.join(',') : ids;
		let promise = new Promise(function (resolve, reject) {
			VK.Api.call('users.get', {
				type: 'post',
				user_ids: user_ids,
				fields: 'bdate,city,country,has_photo,home_town,online,photo_100,photo_200_orig,sex,universities',
				v: "5.52"
			}, function (data) {
				resolve(data);
			})
		})

		await promise.then(data => {
			users = data.response;
		});
		return users;
	}

	changeBlockStyle() {
		document.querySelector('.other-cat').style.color = '#ffffff';
		let linksOtherCat = document.querySelectorAll('.link-in-text');
		linksOtherCat.forEach(el => el.style.color = '#ffffff');
	}

	clearRenderBlock() {
		$('.block-vk-get_winner_block').empty();
		$('.block-vk-repost_list').remove();
	}

	_renderProgress() {
		$('.progress_block').remove();
		$('.main-block-vk').append(`
                <div class="progress_block">
					<div class="progress_block-line">
						<p class="progress_block-procent"></p>
					</div>
				</div>
		`);
	}

	_render(data, count, factCount) {
		$('.block-vk-repost_list').remove();
		$('.main-block-vk').append(`
                <div class="block-vk-repost_list">
					<p>Загружено ${count} участников.</p>
					<button class="button-vk" id="vk_get_winner">Выбрать случайного победителя</button>
				</div>
		`);
	}

	_renderWinner(winners) {
		$('.block-vk-current_winner').remove();
		winners.forEach((winner) => {
			let country = winner.country ? winner.country.title : ' -';
			let city = winner.city ? winner.city.title : ' -';
			let home_town = winner.home_town ? winner.home_town : ' -';
			let birthDate = winner.bdate ? winner.bdate : ' -';

			$('.block-vk-get_winner_block').append(`
					<div class="block-vk-current_winner">
						<h2>Победитель:</h2>
							<div id="page_info_wrap" class="page_info_wrap ">
							<a href="https://vk.com/id${winner.id}" class="winner-link" target="_blank">
								<div class="page_top">
									<h1 class="page_name">${winner.first_name} ${winner.last_name}</h1>
								</div>
								<img class="winner-ava" src="${winner.photo_100}" width="100" alt="${winner.first_name} ${winner.last_name}" title="${winner.first_name} ${winner.last_name}">
							</a>
							<div class="profile_info profile_info_short" id="profile_short">
								<div class="clear_fix profile_info_row ">
									<div class="label fl_l">Страна: ${country}</div>
									<div class="label fl_l">Город: ${city}</div>
								</div>
								<div class="clear_fix profile_info_row ">
									<div class="label fl_l">Дата рождения: ${birthDate}</div>
									<div class="label fl_l">Пол: ${(winner.sex == 1 ? 'женский' : 'мужской')}</div>
								</div>
							</div>
							<div class="profile_info profile_info_full" id="profile_full">
								<div class="profile_info_block clear_fix">
									<div class="profile_info">
										<div class="clear_fix profile_info_row ">
											<div class="label fl_l">Родной город: ${home_town}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
			`);
		})
		
	}
};

class RandomWinner {
	constructor() {
		this.winnersIds = [];
		this.lastWinners = [];
	}

	getRandomWinner(count, repeat) {
		let tempArr = this.winnersIds.slice();
		let randArr = [];
		for (let i = 0; i < count; i++) {
			let rand = Math.floor(Math.random() * tempArr.length);
			randArr[i] = tempArr[rand];
			if (repeat === 0) {
				tempArr.splice(rand, 1);
			}
		}	
		this.lastWinners = [...this.lastWinners, ...randArr];
		return randArr;
	}

}





let btnGetReposts = document.getElementById('vk_get_participants');
let vkMod = new VKAPI();

if (btnGetReposts != null) {
	btnGetReposts.addEventListener('click', e => {
		vkMod.init();
	});
}
