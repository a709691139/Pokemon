'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//游戏菜单， 按start呼出关闭菜单
var Menu = function () {
    function Menu() {
        _classCallCheck(this, Menu);

        this.visible = false;
        this.selectedIndex = 0;
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
        this.images = { //人物图片 ,以图片左上角为初始点，先考虑用（整图，需计算裁剪图）还是多图(直接切换图片src)
            url: '',
            current: '', //当前图片obj
            currentIndex: ''
        };
    }

    _createClass(Menu, [{
        key: 'init',
        value: function init() {
            this.buttons[3].name = player.name;
            this.buttons[0].func = function () {};

            this.images.current = loadData.imageObj.border.all;
        }
    }, {
        key: '_draw',
        value: function _draw() {
            //game.canvas.ctx.menu.drawImage();
            //绘画背景框、文字按钮、 选择浮标
        }
    }]);

    return Menu;
}();