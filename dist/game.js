"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game() {
		_classCallCheck(this, Game);

		this.state = {
			ongoing: false,
			winOrlose: false
		};
		this.control = true; //游戏开始|暂停
		this.box = {
			element: document.getElementById("box"),
			originWidth: 720, //源宽高
			originHeight: 420,
			width: 0, //当前宽高
			height: 0,
			scaleX: 1, //缩放比
			scaleY: 1
		};
		this.ctx = { //画布
			canvas1: document.getElementById("canvas1"),
			ctx1: document.getElementById("canvas1").getContext("2d")
		};
		this.time = { //时间
			lastTime: 0,
			deltaTime: 0 };
	}

	_createClass(Game, [{
		key: "init",
		value: function init() {
			//加载资源

			//键盘鼠标初始化
			this.init_keyBoard();

			//读取存储数据？ 关卡数据
			this.gameloop();
		}
	}, {
		key: "init_box",
		value: function init_box() {
			this.box.width = this.box.element.offsetWidth;
			this.box.height = this.box.width * 7 / 12;
			this.box.scaleX = this.box.width / this.box.originWidth;
			this.box.scaleY = this.box.height / this.box.originHeight;
		}
	}, {
		key: "init_ctx",
		value: function init_ctx() {
			this.ctx.canvas1.style.transform = 'scale(' + game.box.scaleX + ',' + game.box.scaleY + ')';
		}
	}, {
		key: "init_keyBoard",
		value: function init_keyBoard() {
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
	}, {
		key: "clearCanavs",
		value: function clearCanavs() {
			this.ctx.ctx1.clearRect(0, 0, game.box.originWidth, game.box.originHeight);
		}
	}, {
		key: "gameloop",
		value: function gameloop() {
			//画面循环
			var _that = this;
			window.requestAnimFrame(function () {
				_that.gameloop();
			}); //跟随屏幕分辨率setInterval
			if (_that.control) {
				var now = new Date();
				_that.time.deltaTime = now - _that.time.lastTime;
				if (_that.time.deltaTime > 40) {
					_that.time.deltaTime = 40;
				}
				_that.time.lastTime = now;
				_that.clearCanavs();

				//玩家player绘制
				player._draw();
			}
		}
	}]);

	return Game;
}();

window.onload = function () {
	//游戏尺寸调整
	$(window).resize(function () {
		//调整尺寸
		game.box.init();
		game.ctx.init();
	});

	function startGame() {
		var game = new Game();
		window.game = game;
		var player = new Player('赵日天', '男', '23');
		window.player = player;
		player.init();
		game.init();
	}

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

					if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
				}
			};

			for (var _arrName in _that.imagesUrl) {
				var _ret = _loop(_arrName);

				if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
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

						if ((typeof _ret4 === "undefined" ? "undefined" : _typeof(_ret4)) === "object") return _ret4.v;
					}
				};

				for (var _arrName2 in _that.imagesUrl) {
					var _ret3 = _loop3(_arrName2);

					if ((typeof _ret3 === "undefined" ? "undefined" : _typeof(_ret3)) === "object") return _ret3.v;
				}
			});
		}
	};
	window.loadData = loadData;
	loadData.init().then(function (msg) {
		console.log(msg);
		console.log('start game');
		startGame();
	}, function (error) {
		console.error(error);
	});
};