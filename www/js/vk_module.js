"use strict"

class VKFilter {
	constructor() {
		this.filterInput = document.querySelectorAll('.vk_radio_input');
		this.repostFirstInput = document.getElementById('vk-repost_first');
		this.subscribeInput = document.getElementById('vk-subscribe');
		this.countInput = document.getElementById('vk-winner_count');
		this.countryInput = document.getElementById('vk-winner_country');
		this.repeatWinnersInput = document.getElementById('vk-repeat_winners');
		this.method;
		this.filter = {
			repostFirst: 0,
			subscribe: 0
		};
		this.country;
		this.count;
		this.repeatWinnersOff = true;
	}

	init() {
		this.filterInput.forEach((el) => {
			el.addEventListener('click', e => {
				this.getFilterValues();
			});
		})
		//		this.repostFirstInput.addEventListener('click', e => {
		//			this.getFilterValues();
		//		});
		this.subscribeInput.addEventListener('click', e => {
			this.getFilterValues();
		});
		this.countInput.addEventListener('click', e => {
			this.getFilterValues();
		});
		this.countryInput.addEventListener('click', e => {
			this.getFilterValues();
		});
	}

	getFilterValues() {
		// способ определение победителя
		this.filterInput.forEach((el) => {
			if (el.checked) {
				this.method = el.dataset.type;
			}
		});
		// настройки фильтра
		//		this.filter.repostFirst = (this.repostFirstInput.checked) ? 1 : 0;
		this.filter.subscribe = (this.subscribeInput.checked) ? 1 : 0;

		// количество участников и город победителя
		this.count = this.countInput.value;
		this.country = this.countryInput.value;
		this.repeatWinnersOff = (this.repeatWinnersInput.checked) ? true : false;
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
		this.membersCount;
		this.regExp1 = /(^https?:\/\/)vk\.com\/((wall)|(.+\?w=wall))-?[0-9]+_[0-9]+/gi;
		this.regExp2 = /vk\.com\/((wall)|(.+\?w=wall))/gi;
		this.regExp3 = /(wall)|(group)/gi;
		VK.init({
			apiId: 7347408
		});
		this.vkFilter = new VKFilter();
//		this.vkFilter.init();
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

//				VK.Auth.logout(function () {
//					console.log('сессия VK убита');
//				});
		let sendData = {
			apiMethod: 'vkAuthSet',
			postData: {
				vkAuth: 1,
			}
		};
		VK.Auth.getLoginStatus(function (response) {
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
		this.vkFilter.getFilterValues(); // получаем значения в фильтре

		let link = this.input.value; // адрес введенный пользователем

		this.likeUsers = [];
		this.repostUsers = [];
		this.rndWin.winnersIds = [];
		let ids = link.split(link.match(this.regExp2)[0])[1].split('_');

		if (this.vkFilter.filter.subscribe === 1) {
			if (ids[0] > 0) {
				rndzError.showError('Ошибка', 'Ссылка неверна или пост был сделан не в группе или сообществе. <br>Невозможно выполнить фильтр по подписке на сообщество.');
				return;
			}
		}

		let progress = 0; // процент выполнения загрузки
		let offset = 0;
		let count = 1000;
		let totalCount = count;
		// счетчики этапов для шкалы прогресса
		let stages = 1;
		let stage = 0;

		let err;

		this.clearRenderBlock();
		this._renderProgressBar();

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
			stages++;
		}
		if (this.vkFilter.filter.subscribe === 1) {
			stages++;
		}
		if (this.vkFilter.country !== '') {
			stages++;
		}


		// filter: likes    ->   учитывает только лайки
		// filter: copies   ->   учитывает только репосты

		if (type === 2 || type === 3) {
			stage++;
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
					v: "5.81"
				}, function (data) {
					if (data.response) {
						vkMod.repostUsers = [...vkMod.repostUsers, ...data.response.items];
						totalCount = data.response.count;
						progress = (vkMod.repostUsers.length / totalCount) * 100 * (1 / stages) + ((stage - 1) / stages) * 100;
						vkMod._setProgress(progress);
						err = (data.response.items.length == 0) ? 1 : 0;
					}
				});

				await new Promise((resolve, reject) => setTimeout(resolve, 333));
				offset = offset + count;

			}
			if (this.repostUsers.length === 0) {
				rndzError.showError('Ошибка','Не удалось загрузить участников, возможно у вас нет доступа к репостам записи.');
				return;
			}
			if (type === 2) {
				this.rndWin.winnersIds = this.repostUsers;
			}
		}

		if (type === 1 || type === 3) {
			stage++;
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
					v: "5.81"
				}, function (data) {
					if (data.response) {
						vkMod.likeUsers = [...vkMod.likeUsers, ...data.response.items];
						totalCount = data.response.count;
						progress = (vkMod.likeUsers.length / totalCount) * 100 * (1 / stages) + ((stage - 1) / stages) * 100;
						vkMod._setProgress(progress);
						err = (data.response.items.length === 0) ? 1 : 0;
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
			stage++;
			this.rndWin.winnersIds = [];
			this.repostUsers.forEach((el) => {
				if (this.likeUsers.includes(el, 0)) {
					this.rndWin.winnersIds.push(el);
				}
			})
			progress = stage / stages;
			this._renderProgressBar(progress);
		}

		if (this.vkFilter.country !== '') {
			stage++;
			let offsetCount = Math.ceil(this.rndWin.winnersIds.length / 1000);
			let offsetStep = 1000;
			let tempArr = [];
			for (let i = 0; i < offsetCount; i++) {
				let newUsersGet = await this.getUsersByIds(this.rndWin.winnersIds.slice(i * 1000, i * 1000 + offsetStep));
				if (i === 0) {
					tempArr = [...newUsersGet];
				} else {
					tempArr = [...tempArr, ...newUsersGet];
				}
				progress = ((i + 1) / offsetCount) * 100 * (1 / stages) + ((stage - 1) / stages) * 100;
				this._setProgress(progress);
				await new Promise((resolve, reject) => setTimeout(resolve, 333));
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
			filterArr.forEach((el) => {
				this.rndWin.winnersIds.push(el.id);
			})

		}

		if (this.vkFilter.filter.subscribe === 1) {
			stage++;
			let offsetCount = Math.ceil(this.rndWin.winnersIds.length / 500);
			let offsetStep = 500;
			let tempArr = [];
			for (let i = 0; i < offsetCount; i++) {
				let newUsersGet = await this.getSubscribedUsers(this.rndWin.winnersIds.slice(i * 500, i * 500 + offsetStep), ids[0]);
				if (i === 0) {
					tempArr = [...newUsersGet];
				} else {
					tempArr = [...tempArr, ...newUsersGet];
				}
				progress = ((i + 1) / offsetCount) * 100 * (1 / stages) + ((stage - 1) / stages) * 100;
				this._setProgress(progress);
				await new Promise((resolve, reject) => setTimeout(resolve, 333));
			}
			this.rndWin.winnersIds = [];
			this.rndWin.winnersIds = tempArr;
		}
		
		// завершаем прогресс ста процентами
		vkMod._setProgress(100);
		
		// удаляем дубликаты id из массива
		this.rndWin.winnersIds = Array.from(new Set(this.rndWin.winnersIds));

		this._render(this.rndWin.winnersIds, this.rndWin.winnersIds.length);

		this.membersCount = this.rndWin.winnersIds.length;

		this.rndWin.remainingWinnersArr = this.rndWin.winnersIds.slice();

		//		console.log('this.rndWin.winnersIds:', this.rndWin.winnersIds);

		let btnGetWin = document.getElementById('vk_get_winner');
		if (btnGetWin != null) {
			btnGetWin.removeEventListener('click', this.eventHandler);
		}
		document.getElementById('vk_get_winner').addEventListener('click', this.eventHandler = (e) => {
			this.vkFilter.getFilterValues();
			this._initGetRndWinner(this.vkFilter.count);
		});

	}

	_setProgress(progress) {
		progress = (progress > 100) ? 100 : progress;
		document.querySelector('.progress_block-procent').innerText = Math.round(progress) + '%';
		document.querySelector('.progress_block-line').style.width = Math.round(progress) + '%';
	}

	async _initGetRndWinner(winnerCount) {
		this.vkFilter.getFilterValues();
		if (winnerCount > this.membersCount) {
			rndzError.showError('Ошибка', 'Количество победителей не может быть больше участников.');
			return;
		}
		if (winnerCount > this.rndWin.remainingWinnersArr.length && this.vkFilter.repeatWinnersOff) {
			rndzError.showError('Ошибка', 'Указанное количество победителей больше оставшихся участников. <br>Попробуйте уменьшить количество участников или еще раз провести розыгрышь (необходимо загрузить список участников снова).');
			return;
		}

		let winnerIds, winners;
		winnerIds = this.rndWin.getRandomWinner(winnerCount, this.vkFilter.repeatWinnersOff);
		winners = await this.getUsersByIds(winnerIds);
		if (!this.vkFilter.repeatWinnersOff) {
			let winnersRepeats = [];
			winnerIds.forEach((id) => {
				let sameElement = winners.find((winner) => {
					return id === winner.id
				});
				if (sameElement != 'undefined') {
					winnersRepeats.push(sameElement);
				}
			});
			winners = winnersRepeats;
		}
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
				v: "5.81"
			}, function (data) {
				resolve(data);
			})
		})

		await promise.then(data => {
			users = data.response;
		});
		return users;
	}

	async getSubscribedUsers(ids, groupId) {
		if (groupId < 0) {
			groupId = Math.abs(groupId);
		}
		let users = [];
		let user_ids = Array.isArray(ids) ? ids.join(',') : ids;
		let responsArr = [];
		let promise = new Promise(function (resolve, reject) {
			VK.Api.call('groups.isMember', {
				group_id: groupId,
				user_ids: user_ids,
				extended: 0,
				v: "5.81"
			}, function (data) {
				resolve(data);
			})
		})

		await promise.then(data => {
			responsArr = data.response;;
		});
		responsArr.forEach((el) => {
			if (el.member === 1) {
				users.push(el.user_id);
			}
		})
		return users;
	}

	async checkGroupExist(groupId) {
		if (groupId < 0) {
			groupId = Math.abs(groupId);
		}
		let resData;
		let result;
		let promise = new Promise(function (resolve, reject) {
			VK.Api.call('groups.getById', {
				group_id: groupId,
				fields: 'name,screen_name,members_count,type',
				v: "5.81"
			}, function (data) {
				resolve(data);
			})
		})

		await promise.then(data => {
			console.log('data:', data);
			resData = data;
		});

		return result;
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

	_renderProgressBar() {
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
		$('.vk_winners_title').remove();
		$('.block-vk-get_winner_block').append(`
					<h2 class="vk_winners_title">Победители:</h2>
		`);
		let counter = winners.length;
		winners.forEach((winner) => {
			let country = winner.country ? winner.country.title : ' -';
			let city = winner.city ? winner.city.title : ' -';
			let home_town = winner.home_town ? winner.home_town : ' -';
			let birthDate = winner.bdate ? winner.bdate : ' -';

			$('.block-vk-get_winner_block').append(`
					<div class="block-vk-current_winner">
					<span class="vk-current_winner-counter_before">${counter}</span>
						<div id="page_info_wrap" class="page_info_wrap">
							<a href="https://vk.com/id${winner.id}" class="winner-link" target="_blank">
								<div class="page_top">
									<h1 class="page_name">${winner.first_name} ${winner.last_name}</h1>
								</div>
							</a>
							<a href="https://vk.com/id${winner.id}" class="winner-link" target="_blank">
								<img class="winner-ava" src="${winner.photo_100}" width="100" alt="${winner.first_name} ${winner.last_name}" title="${winner.first_name} ${winner.last_name}">
							</a>
							<div class="profile_info profile_info_short" id="profile_short">
								<div class="clear_fix profile_info_row ">
									<p><b>Страна:</b> ${country}</p>
									<p><b>Город:</b> ${city}</p>
									<p><b>Дата рождения:</b> ${birthDate}</p>
									<p><b>Пол:</b> ${(winner.sex == 1 ? 'женский' : 'мужской')}</p>
									<p><b>Родной город:</b> ${home_town}</p>
								</div>
							</div>
						</div>
					</div>
			`);
			counter--;
		})

	}
};

class RandomWinner {
	constructor() {
		this.winnersIds = [];
		this.remainingWinnersArr = [];
		this.lastWinners = [];
	}

	getRandomWinner(count, repeatOff) {
		let tempArr = repeatOff ? this.remainingWinnersArr : this.winnersIds;

		let randArr = [];
		for (let i = 0; i < count; i++) {
			let rand = Math.floor(Math.random() * tempArr.length);
			randArr[i] = tempArr[rand];
			if (repeatOff) {
				tempArr.splice(rand, 1);
			}
		}
		this.lastWinners = this.lastWinners.concat(randArr);

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
