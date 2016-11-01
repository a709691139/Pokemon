'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

window.onload = function () {
	//游戏尺寸调整
	$(window).resize(function () {
		//调整尺寸
		game.box.init();
		game.ctx.init();
	});
};

var loadData = {
	num: 0, //图片总数
	successNum: 0, //成功加载数量
	imagesUrl: {
		person: {
			player: 'images/playerGirl.png'
		},
		map: {}
	},
	imageObj: {
		person: {
			player: ''
		},
		map: {}
	},
	loading: function loading(resolve, reject) {
		var _this = this;

		var _that = this;
		_that.num = 0;
		_that.successNum = 0;
		var _success = function _success() {
			_that.imageObj[arrName][src] = _this;
			_that.successNum++;
			console.log(_that.num + ' , ' + _that.successNum);
			if (_that.num == _that.successNum) {
				console.log('全部资源加载完毕');
				return true;
			}
		};

		var _loop = function _loop(_arrName) {
			var _loop2 = function _loop2(_src) {
				_that.num++;
				var Img = new Image();
				Img.src = _that.imagesUrl[_arrName][_src];
				console.log(_that.imagesUrl[_arrName][_src]);
				if (Img.complete) {
					_that.imageObj[_arrName][_src] = Img;
					_that.successNum++;
					console.log(_that.num + ' , ' + _that.successNum);
					if (_that.num == _that.successNum) {
						console.log('全部资源加载完毕');
						resolve('全部资源加载完毕');
						return {
							v: {
								v: true
							}
						};
					}
				} else {
					Img.onload = function () {
						_that.imageObj[_arrName][_src] = Img;
						_that.successNum++;
						console.log(_that.num + ' , ' + _that.successNum);
						if (_that.num == _that.successNum) {
							console.log('全部资源加载完毕');
							return true;
						}
					};
					Img.onerror = function () {
						console.log('加载出错 ', Img.src);
						reject('加载出错 ', Img.src);
						throw new Error('加载图片出错了');
					};
				}
			};

			for (var _src in _that.imagesUrl[_arrName]) {
				var _ret2 = _loop2(_src);

				if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
			}
		};

		for (var _arrName in _that.imagesUrl) {
			var _ret = _loop(_arrName);

			if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
		}
	},
	init: function init() {
		var _this2 = this;

		return new Promise(function (resolve, reject) {
			var _that = _this2;
			_that.num = 0;
			_that.successNum = 0;

			var _loop3 = function _loop3(_arrName2) {
				var _loop4 = function _loop4(_src2) {
					_that.num++;
					var Img = new Image();
					Img.src = _that.imagesUrl[_arrName2][_src2];
					console.log(_that.imagesUrl[_arrName2][_src2]);
					if (Img.complete) {
						_that.imageObj[_arrName2][_src2] = Img;
						_that.successNum++;
						console.log(_that.num + ' , ' + _that.successNum);
						if (_that.num == _that.successNum) {
							resolve('全部资源加载完毕');
							return {
								v: {
									v: true
								}
							};
						}
					} else {
						Img.onload = function () {
							_that.imageObj[_arrName2][_src2] = Img;
							_that.successNum++;
							console.log(_that.num + ' , ' + _that.successNum);
							if (_that.num == _that.successNum) {
								resolve('全部资源加载完毕');
								return true;
							}
						};
						Img.onerror = function () {
							reject('加载出错 ' + Img.src);
						};
					}
				};

				for (var _src2 in _that.imagesUrl[_arrName2]) {
					var _ret4 = _loop4(_src2);

					if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
				}
			};

			for (var _arrName2 in _that.imagesUrl) {
				var _ret3 = _loop3(_arrName2);

				if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
			}
		});
	}
};

loadData.init().then(function (msg) {
	console.log('加载成功');
}, function (error) {
	console.error('出错了', error);
});

console.log('game');
var game = {
	state: {
		ongoing: false,
		winOrlose: false
	},
	control: true, //游戏开始|暂停
	box: {
		element: document.getElementById("box"),
		originWidth: 720, //源宽高
		originHeight: 420,
		width: 0, //当前宽高
		height: 0,
		scaleX: 1, //缩放比
		scaleY: 1,
		init: function init() {
			this.width = game.box.element.offsetWidth;
			this.height = this.width * 7 / 12;
			this.scaleX = this.width / this.originWidth;
			this.scaleY = this.height / this.originHeight;
		}
	},
	ctx: { //画布
		canvas1: document.getElementById("canvas1"),
		ctx1: document.getElementById("canvas1").getContext("2d"),
		init: function init() {
			// this.canvas1.setAttribute("width",game.box.originWidth);
			// this.canvas1.setAttribute("height",game.box.originHeight);
			this.canvas1.style.transform = 'scale(' + game.box.scaleX + ',' + game.box.scaleY + ')';
		},
		clearCanavs: function clearCanavs() {
			this.ctx1.clearRect(0, 0, game.box.originWidth, game.box.originHeight);
		}
	},
	time: { //时间
		lastTime: 0,
		deltaTime: 0 },
	keyBoard: {
		init: function init() {
			$(document).keydown(function (event) {
				if (event.keyCode == 37) {
					//左
					player._move().left();
				} else if (event.keyCode == 39) {
					//右
					player._move().right();
				} else if (event.keyCode == 38) {
					//上
					player._move().top();
				} else if (event.keyCode == 40) {
					//下
					player._move().bottom();
				} else if (event.keyCode == 13) {
					//确定
					player._move()._join();
				}
			});
		}
	},
	init: function init() {
		//加载资源

		//键盘鼠标初始化
		game.keyBoard.init();

		//读取存储数据？ 关卡数据
		game.gameloop();
	},
	gameloop: function gameloop() {
		//画面循环
		window.requestAnimFrame(game.gameloop); //跟随屏幕分辨率setInterval
		if (game.control) {
			var now = new Date();
			game.time.deltaTime = now - game.time.lastTime;
			if (game.time.deltaTime > 40) {
				game.time.deltaTime = 40;
			}
			game.time.lastTime = now;
			game.ctx.clearCanavs();

			//玩家player绘制
			player._draw();
		}
	},
	collision: function collision() {
		//碰撞检测
		//检测敌军是否碰撞上 子弹和飞机 
		for (var i = 0; i < game.eSoldier.num; i++) {
			if (game.eSoldier.alive[i]) {
				//与子弹碰撞
				for (var j = 0; j < game.bullet.num; j++) {
					if (game.bullet.alive[j]) {
						if (rectangleCollision(game.eSoldier.x[i], game.eSoldier.y[i], game.eSoldier.width[i], game.eSoldier.height[i], game.bullet.x[j], game.bullet.y[j], game.bullet.width, game.bullet.height, 1)) {
							game.eSoldier.beAttacked(i);
							game.bullet.beAttacked(j);
						}
					}
				}
				//与飞机碰撞
				if (rectangleCollision(game.eSoldier.x[i], game.eSoldier.y[i], game.eSoldier.width[i], game.eSoldier.height[i], game.plane.x, game.plane.y, game.plane.width, game.plane.height, 10) && !game.plane.noBeAttarct && game.plane.alive) {
					game.plane.beAttacked();
				}
			}
		}
		//检测boss是否碰撞上 子弹和飞机
		for (var i = 0; i < game.eBoss.num; i++) {
			if (game.eBoss.alive[i]) {
				//与子弹碰撞
				for (var j = 0; j < game.bullet.num; j++) {
					if (game.bullet.alive[j]) {
						if (rectangleCollision(game.eBoss.x[i], game.eBoss.y[i], game.eBoss.width[i], game.eBoss.height[i], game.bullet.x[j], game.bullet.y[j], game.bullet.width, game.bullet.height, 1)) {
							game.bullet.beAttacked(j);
							game.eBoss.beAttacked(i);
						}
					}
				}
				//与飞机碰撞
				if (rectangleCollision(game.eBoss.x[i], game.eBoss.y[i], game.eBoss.width[i], game.eBoss.height[i], game.plane.x, game.plane.y, game.plane.width, game.plane.height, 10) && !game.plane.noBeAttarct && game.plane.alive) {
					game.plane.beAttacked();
				}
			}
		}
	}
};

var player = new Player('赵日天', '男', '23');
player._init();
setTimeout(function () {
	game.init();
}, 2000);
// game.init();