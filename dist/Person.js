'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function () {
  function Person(name, sex) {
    _classCallCheck(this, Person);

    this.name = name;
    this.sex = sex;
    this.position = { //基本位置 
      x: 0,
      y: 0
    };
    this.aspect = { //人物宽高
      width: 0,
      height: 0
    };
    this.images = { //人物图片 ,以图片左上角为初始点，先考虑用（整图，需计算裁剪图）还是多图(直接切换图片src)
      url: '',
      walk: [], //走路 存src或位置
      run: [], //奔跑
      cycle: [], //单车
      current: '' };
  }

  _createClass(Person, [{
    key: '_sayName',
    value: function _sayName() {
      console.log(this.name);
    }
  }, {
    key: '_draw',
    value: function _draw() {
      //绘制画面
      game.ctx.ctx1.drawImage(this.images.current, this.position.x, this.position.y, 403, 78, 0, 0, this.aspect.width, this.aspect.height);
    }
  }, {
    key: '_move',
    value: function _move() {
      //人物移动
      var _that = this;
      return {
        left: function left() {
          // _that._sayName();
          console.log('l');
        },
        right: function right() {
          console.log('r');
        },
        top: function top() {
          console.log('t');
        },
        bottom: function bottom() {
          console.log('b');
        }
      };
    }
  }, {
    key: '_join',
    value: function _join() {//点确定，交接交互功能，捡道具之类的

    }
  }]);

  return Person;
}();

var Player = function (_Person) {
  _inherits(Player, _Person);

  function Player() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '未命名';
    var sex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '男';
    var age = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;

    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, name, sex));

    _this.age = age;
    _this.images = {
      url: 'images/playerGirl.png',
      walk: [],
      run: [],
      cycle: [],
      current: ''
    };
    _this.aspect = {
      width: 50,
      height: 50
    };
    _this.position = { //基本位置 
      x: 0,
      y: 0
    };
    return _this;
  }

  _createClass(Player, [{
    key: '_init',
    value: function _init() {
      var _that = this;
      var Img = new Image();
      //console.log(ImgArray[x1][x2].src);
      Img.src = this.images.url;
      if (Img.complete) {
        _that.images.current = Img;

        _that._draw();
      } else {
        Img.onload = function () {
          _that.images.current = this;
          _that._draw();
        };
      };
    }
  }, {
    key: '_sayAge',
    value: function _sayAge() {
      console.log(this.age);
    }
  }]);

  return Player;
}(Person);