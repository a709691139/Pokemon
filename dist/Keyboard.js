'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = function () {
	function Keyboard() {
		_classCallCheck(this, Keyboard);

		this.whichKeyBoard = 'people'; //键盘事件传递层 people  menu
		this.keyboardMode = 0; //按键模式
		this.onKeepKey = { //当前正在按的按键
			left: {
				keyCode: 65,
				time: 0,
				func: '',
				on: false,
				together: false,
				shortPressed: false,
				longPressDeltaTime: 0
			},
			right: {
				keyCode: 68,
				time: 0,
				func: '',
				on: false,
				together: false,
				shortPressed: false,
				longPressDeltaTime: 0
			},
			up: {
				keyCode: 87,
				time: 0,
				func: '',
				on: false,
				together: false,
				shortPressed: false,
				longPressDeltaTime: 0
			},
			down: {
				keyCode: 83,
				time: 0,
				func: '',
				on: false,
				shortPressed: false,
				longPressDeltaTime: 0
			},
			enter: {
				keyCode: 74,
				time: 0,
				func: '',
				on: false,
				together: false,
				shortPressed: false,
				longPressDeltaTime: 0
			},
			cancel: {
				keyCode: 75,
				time: 0,
				func: '',
				on: false,
				together: false,
				shortPressed: false,
				longPressDeltaTime: 0
			},
			start: {
				keyCode: 13,
				time: 0,
				func: '',
				on: false,
				together: false,
				shortPressed: false,
				longPressDeltaTime: 0
			}
		};
	}

	_createClass(Keyboard, [{
		key: 'init',
		value: function init() {
			var _that = this;
			var Time = 0;
			//keydown记录按下的键，keyup取消，
			$(document).keydown(function (event) {
				for (var i in _that.onKeepKey) {
					var val = _that.onKeepKey[i];
					if (val.keyCode == event.keyCode) {
						//console.log('按下',i, !val.on?'触发':'不触发',new Date - val.time, val.together);
						if (!val.on) {
							val.on = true;
							val.together = false;
							val.time = new Date();
							val.longPressDeltaTime = new Date();
							//console.log('new Time');
							break;
						}
					} else {
						//暂时停止其他的同按，抬起时就回复其他的同按
						if (val.on) {
							val.on = false;
							val.together = true;
							!val.together && (val.together = true);
						}
					}
				};
			});
			$(document).keyup(function (event) {
				for (var i in _that.onKeepKey) {
					var val = _that.onKeepKey[i];
					if (val.keyCode == event.keyCode) {
						//console.log('抬起',i);
						val.on = false;
						val.together = false;
						val.shortPressed = false;
						break;
					}
					if (val.together && !val.on) {
						val.together = false;
						val.on = true;
					}
				};
			});
		}
	}, {
		key: '_keyDown',
		value: function _keyDown(key, longPress) {
			//left,right..  true false
			switch (this.whichKeyBoard) {
				case 'people':
					player._onKey(key, longPress);
					break;
				case 'menu':
					menu._onKey(key, longPress);
					break;
			}
		}
	}, {
		key: '_changeToKeyUp',
		value: function _changeToKeyUp(key) {
			//强制某按键抬起, 某些按键只需要按下触发，不需要长按
			this.onKeepKey[key].on = false;
		}
	}, {
		key: '_loop_keyBoard',
		value: function _loop_keyBoard() {
			//判断按钮 执行相关方法

			for (var key in this.onKeepKey) {
				var val = this.onKeepKey[key];
				if (val.on) {
					if (this.keyboardMode == 0) {
						//模式一：　pressDeltaTime<200 ? 连续触发短按 : 连续触发长按
						var longPress = new Date() - val.time > 200;
						//console.log( i , longPress==0?'短按':'长按' , val.time, new Date - val.time );
						this._keyDown(key, longPress);
					} else {
						//模式二：　短按只触发一次，　长按间隔100ms触发一次
						var _longPress = false;
						var pressDeltaTime = new Date() - val.time;
						if (pressDeltaTime > 600) {
							//按下后，longPress也是100ms触发一次
							//console.log(val.longPressDeltaTime, new Date()-val.longPressDeltaTime );
							if (new Date() - val.longPressDeltaTime > 100) {
								_longPress = true;
								this._keyDown(key, _longPress);
								val.longPressDeltaTime = new Date();
								//console.log('long');
							}
						} else {
							//按下后，shortPress只触发一次
							if (!val.shortPressed) {
								val.shortPressed = true;
								this._keyDown(key, _longPress);
								//console.log('short')
							}
						}
					}
				}
			};
		}
	}]);

	return Keyboard;
}();