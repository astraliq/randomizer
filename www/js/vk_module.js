"use strict"

class VKAPI {
	constructor() {
		this.token;
		this.urlParams = this.getUrlParams(window.location.search);;
		this.urlHashParams;
		this.rndWin = new RandomWinner();
		this.eventHandler;
		this.input;
		this.regExp1 = /(^https?:\/\/)vk\.com\/((wall)|(.+\?w=wall))-?[0-9]+_[0-9]+/gi;
		this.regExp2 = /vk\.com\/((wall)|(.+\?w=wall))/gi;
		this.regExp3 = /(wall)|(group)/gi;
		VK.init({
			apiId: 7347408
		});
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

	init() {
		if (this.urlParams.path === 'index/vk') {
			this.input = document.querySelector('.vk_block-post');
			if (this.getUrlHashParams()) {
				let state = this.urlHashParams.state.split(',');
				console.log(state);
				if (state[1] === 'getReposts' && state[0] !== 'undefined') {
					let link;
					switch (state[2]) {
						case 'group':
							link = 'https://vk.com/group?w=wall';
							break;
						case 'wall':
							link = 'https://vk.com/wall';
							break;
						default:
							link = 'https://vk.com/';
					}
					this.input.value = link + state[0];
					this.getReposts();
				}
			}
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

	getAuth() {
		// проверка правильности ссылки
		let link = this.input.value;
		if (!this.checkVKWallHref(link)) {
			this.showErrAddress();
			return false;
		} else {
			$('.main-block-vk-err_msg').hide();
		}

		//		VK.Auth.revokeGrants(function () {
		//			console.log('сессия убита');
		//		});

		VK.Auth.login(function (response) {
			if (response.session) {
				/* Пользователь успешно авторизовался */
				console.log('огонь, авторизации прошла');
				vkMod.getReposts();
				if (response.settings) {
					/* Выбранные настройки доступа пользователя, если они были запрошены */
				}
			} else {
				/* Пользователь нажал кнопку Отмена в окне авторизации */
				console.log('авторизации нет');
			}
		});
	}

	async getReposts() {
		let link = this.input.value; // адрес введенный пользователем

		//		if (!this.getUrlHashParams()) {
		//			document.location.href = `https://oauth.vk.com/authorize?client_id=7347408&display=page&redirect_uri=http://127.0.0.rand/index.php?path=index/vk&scope=groups&response_type=token&v=5.103&state=${link.split(link.match(this.regExp2)[0])[1]},getReposts,${link.match(this.regExp3)[0]}`;
		//			return false;
		//		}

		this.rndWin.winnersIds = [];
		let ids = link.split(link.match(this.regExp2)[0])[1].split('_');
		//		console.log(ids);

		let progress = 0; // процент выполнения загрузки
		let offset = 0;
		let count = 1000;
		let totalCount = count;
		let err = 0;

		//		let getPostsHref = `https://api.vk.com/method/wall.getReposts?v=5.52&owner_id=${ids[0]}&post_id=${ids[1]}&access_token=${this.urlHashParams.access_token}`;
		//
		//		let getWallByIdHref = `https://api.vk.com/method/wall.getById?v=5.52&posts=${ids[0]}_${ids[1]}&access_token=${this.urlHashParams.access_token}`;
		//
		//		let getLikesHref;

		this.clearRenderBlock();
		this._renderProgress();

		console.log(ids);
		//		VK.Api.call('likes.getList', {
		//			type: 'post',
		//			owner_id: ids[0],
		//			item_id: ids[1],
		//			filter: 'like',
		//			extended: 0,
		//			offset: offset,
		//			count: count,
		//			v: "5.52"
		//		}, function (data) {
		//			if (data.response) {
		//				console.log(data);
		//			}
		//		});

		while (err === 0) {
			//			getLikesHref = `https://api.vk.com/method/likes.getList?v=5.52&type=post&owner_id=${ids[0]}&item_id=${ids[1]}&filter=likes&extended=0&offset=${offset}&count=${count}&access_token=${this.urlHashParams.access_token}`;

			await VK.Api.call('likes.getList', {
				type: 'post',
				owner_id: ids[0],
				item_id: ids[1],
				filter: 'like',
				extended: 0,
				offset: offset,
				count: count,
				v: "5.52"
			}, function (data) {
				if (data.response) {
					//					console.log(data);

					vkMod.rndWin.winnersIds = [...vkMod.rndWin.winnersIds, ...data.response.items];
					totalCount = data.response.count;
					progress = vkMod.rndWin.winnersIds.length * 100 / totalCount;
					progress = (progress > 100) ? 100 : progress;
					document.querySelector('.progress_block-procent').innerText = Math.round(progress) + '%';
					document.querySelector('.progress_block-line').style.width = Math.round(progress) + '%';
					err = (data.response.items.length == 0) ? 1 : 0;
				}
			});


			//			await this._getJson(getPostsHref, {})
			//				.then(data => {
			//					console.log(data);
			//
			//					this.rndWin.winnersIds = [...this.rndWin.winnersIds, ...data.response.items];
			//					totalCount = data.response.count;
			//					progress = this.rndWin.winnersIds.length * 100 / totalCount;
			//					progress = 100;
			//					progress = (progress > 100) ? 100 : progress;
			//					document.querySelector('.progress_block-procent').innerText = Math.round(progress) + '%';
			//					document.querySelector('.progress_block-line').style.width = Math.round(progress) + '%';
			//					err = (data.response.items.length == 0) ? 1 : 0;
			//					err = 1;
			//				})
			//				.catch(error => {
			//					totalCount = 0;
			//					err = 1;
			//					console.log(error);
			//				});

			//			console.log(this.rndWin.winnersIds);

			await new Promise((resolve, reject) => setTimeout(resolve, 333));
			offset = offset + count;

		}

		// удаляем дубликаты id из массива
		this.rndWin.winnersIds = Array.from(new Set(this.rndWin.winnersIds))
		this._render(this.rndWin.winnersIds, this.rndWin.winnersIds.length);


		let btnGetWin = document.getElementById('vk_get_winner');
		if (btnGetWin != null) {
			btnGetWin.removeEventListener('click', this.eventHandler);
		}
		document.getElementById('vk_get_winner').addEventListener('click', this.eventHandler = (e) => {
			this._initGetRndWinner()
		});

	}

	async _initGetRndWinner() {
		let winnerId, winner;
		winnerId = this.rndWin.getRandomWinner();
		winner = await this.getUserById(winnerId);
		this._renderWinner(winner)
	}

	async getUserById(id) {
		let user;
		let promise = new Promise(function (resolve, reject) {
			VK.Api.call('users.get', {
				type: 'post',
				user_ids: id,
				fields: 'bdate,city,country,has_photo,home_town,online,photo_100,photo_200_orig,sex,universities',
				v: "5.52"
			}, function (data) {
				resolve(data);
			})
		})
		
		await promise.then(data => {
			user = data.response[0];
		});
		return user;
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
					<p>Загружено ${count} участников. Повторяющиеся участники удалены.</p>
					<button class="button-vk" id="vk_get_winner">Выбрать случайного победителя</button>
				</div>
		`);
	}

	_renderWinner(winner) {
		$('.block-vk-current_winner').remove();
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
	}
};

class RandomWinner {
	constructor() {
		this.winnersIds = [];
		this.lastWinners = [];
	}

	getRandomWinner() {
		let rand = Math.floor(Math.random() * this.winnersIds.length);
		this.lastWinners.push(this.winnersIds[rand]);
		return this.winnersIds[rand];
	}

}





let btnGetReposts = document.getElementById('vk_get_participants');
let vkMod = new VKAPI();
vkMod.init();
if (btnGetReposts != null) {
	btnGetReposts.addEventListener('click', e => {
		vkMod.getAuth();
	});
}
