'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//游戏菜单， 按start呼出关闭菜单
var Menu = function () {
	function Menu() {
		_classCallCheck(this, Menu);

		this.visible = false;
		this.selectedIndex = 1;
		this.buttons = [{
			name: '图鉴',
			func: ''
		}, {
			name: '怪兽',
			func: ''
		}, {
			name: '背包',
			func: ''
		}, {
			name: '玩家',
			func: ''
		}, {
			name: '记录',
			func: ''
		}, {
			name: '设定',
			func: ''
		}, {
			name: '关闭',
			func: ''
		}];
		this.images_border = { //边框图片
			current: '', //当前图片obj
			currentIndex: 1,
			array: [//边框种类 0:{x:0,y:0}
			]
		};
		this.images_triangle = { //三角形浮标
			current: '', //当前图片obj
			array: [{ x: 0, y: 0 }, { x: 11, y: 0 }]
		};
	}

	_createClass(Menu, [{
		key: 'init',
		value: function init() {
			this.buttons[3].name = player.name;
			this.buttons[0].func = function () {};
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 10; j++) {
					this.images_border.array.push({ x: j, y: i });
				}
			}
			this.images_border.current = loadData.imageObj.others.border;
			this.images_triangle.current = loadData.imageObj.others.triangle;
		}
	}, {
		key: '_onKey',
		value: function _onKey(key, keyTime) {
			//按键处理
			console.log('menu', key, keyTime);
			switch (key) {
				case 'up':
					this.selectedIndex - 1 < 0 ? this.selectedIndex = this.buttons.length - 1 : --this.selectedIndex;
					break;
				case 'down':
					this.selectedIndex + 1 > this.buttons.length - 1 ? this.selectedIndex = 0 : ++this.selectedIndex;
					break;
				case 'enter':
					console.log('enter');
					break;
			}
		}
	}, {
		key: '_draw',
		value: function _draw() {
			//绘画背景框、文字按钮、 选择浮标
			var ctx = game.canvas.ctx.menu;
			ctx.save();
			ctx.translate(11 * 48, 48 * 0.5);
			//白底
			ctx.fillStyle = "#fff";
			ctx.fillRect(0, 0, 3 * 48 + 16, 8 * 48 - 16);
			//边框线
			var borderType = this.images_border.array[this.images_border.currentIndex],
			    borderX = borderType.x * 30,
			    borderY = borderType.y * 30;
			var i = 0;
			for (var _j = 0; _j <= 9; _j++) {
				ctx.drawImage(this.images_border.current, 9 * 1 + borderX, 9 * 0 + borderY, 8, 8, 16 * _j, 16 * i, 16, 16);
			}
			i = 22;
			for (var _j2 = 0; _j2 <= 9; _j2++) {
				ctx.drawImage(this.images_border.current, 9 * 1 + borderX, 9 * 2 + borderY, 8, 8, 16 * _j2, 16 * i, 16, 16);
			}
			var j = 0;
			for (var _i = 0; _i <= 22; _i++) {
				ctx.drawImage(this.images_border.current, 9 * 0 + borderX, 9 * 1 + borderY, 8, 8, 16 * j, 16 * _i, 16, 16);
			}
			j = 9;
			for (var _i2 = 0; _i2 <= 22; _i2++) {
				ctx.drawImage(this.images_border.current, 9 * 2 + borderX, 9 * 1 + borderY, 8, 8, 16 * j, 16 * _i2, 16, 16);
			}
			//边框四角
			ctx.drawImage(this.images_border.current, 9 * 0 + borderX, 9 * 0 + borderY, 8, 8, 16 * 0, 16 * 0, 16, 16);
			ctx.drawImage(this.images_border.current, 9 * 2 + borderX, 9 * 0 + borderY, 8, 8, 16 * 9, 16 * 0, 16, 16);
			ctx.drawImage(this.images_border.current, 9 * 0 + borderX, 9 * 2 + borderY, 8, 8, 16 * 0, 16 * 22, 16, 16);
			ctx.drawImage(this.images_border.current, 9 * 2 + borderX, 9 * 2 + borderY, 8, 8, 16 * 9, 16 * 22, 16, 16);
			//文字按钮
			ctx.translate(36, 35);
			ctx.textBaseline = "top";
			ctx.fillStyle = '#000';
			ctx.font = "22px bold Arial";
			for (var _i3 in this.buttons) {
				ctx.fillText(this.buttons[_i3].name, 0, _i3 * 44);
			}
			//浮标
			ctx.translate(-22, 0);
			ctx.drawImage(this.images_triangle.current, this.images_triangle.array[1].x, this.images_triangle.array[1].y, 8, 12, 0, 44 * this.selectedIndex - 2, 16, 24);

			ctx.restore();
		}
	}]);

	return Menu;
}();