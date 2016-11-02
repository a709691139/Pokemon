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
      current: '', //当前图片obj
      currentIndex: {
        arr: 0, //0走路 1跑 2车
        img: 0, //方向图 0-2下  3-5右 6-8上 9-11左
        direct: 0 }
    };
    this.isMoveing = false; //移动一步
    this.moveTime = 0; //移动切换图片定时器
  }

  _createClass(Person, [{
    key: '_draw',
    value: function _draw() {//绘制画面   
    }
  }, {
    key: '_changeImgIndex',
    value: function _changeImgIndex(direction) {
      var index = 3 * direction;
      if (this.images.currentIndex.direct != direction) {
        console.log('切换方向');
        this.images.currentIndex.direct = direction;
        this.images.currentIndex.img = index;
      } else {
        //500ms移动一格
        this.moveTime += game.time.deltaTime;
        switch (direction) {
          case 3:
            this.position.x -= 5;
            break;
          case 1:
            this.position.x += 5;
            break;
          case 2:
            this.position.y -= 5;
            break;
          case 0:
            this.position.y += 5;
            break;
        }
        this.images.currentIndex.img++;
        if (this.images.currentIndex.img >= index + 3) {
          this.images.currentIndex.img = index;
        }
      }
    }
  }, {
    key: '_moveStep',
    value: function _moveStep() {
      //移动一步
      if (!this.isMoveing) {
        return false;
      }
      //走路动画,500ms内走完
      this.moveTime += game.time.deltaTime;

      //切换图
      var index = 3 * this.images.currentIndex.direct;
      if (this.moveTime > 600) {
        this.moveTime = 0;
        //回归站立图
        this.images.currentIndex.img = index;
        this.isMoveing = false;
        return false;
      }
      var add = 0;

      switch (Math.floor(this.moveTime / 100)) {
        case 0:
          add = 1;
          break;
          break;
        case 2:
          add = 2;
          break;
          break;
        case 4:
          add = 1;
          break;
        case 6:
          add = 2;
          break;
      }

      this.images.currentIndex.img = index + add;
      //移动
      var speed = this.aspect.width / 600 * game.time.deltaTime;
      switch (this.images.currentIndex.direct) {
        case 3:
          this.position.x -= speed;
          break;
        case 1:
          this.position.x += speed;
          break;
        case 2:
          this.position.y -= speed;
          break;
        case 0:
          this.position.y += speed;
          break;
      }

      //console.log(this.moveTime , this.position.y);
      //console.log(this.moveTime, this.images.currentIndex.img);
    }
  }, {
    key: '_move',
    value: function _move() {
      //人物移动
      //按着键盘200ms抬起就是 纯切换方向，继续就是向前一步
      var _that = this;
      _that.moveTime = 0;

      return {
        left: function left() {
          //_that.position.x -=10;
          //_that._changeImgIndex(3);
          _that.images.currentIndex.direct = 3;
          if (!_that.isMoveing) {
            _that.isMoveing = true;
          }
        },
        right: function right() {
          // _that.position.x +=10;
          // _that._changeImgIndex(1);
          _that.images.currentIndex.direct = 1;
          if (!_that.isMoveing) {
            _that.isMoveing = true;
            console.log('再走一步');
          }
        },
        top: function top() {
          //_that.position.y -=10;
          //_that._changeImgIndex(2);
          _that.images.currentIndex.direct = 2;
          if (!_that.isMoveing) {
            _that.isMoveing = true;
          }
        },
        bottom: function bottom() {
          //_that.position.y +=10;
          //_that._changeImgIndex(0);
          _that.images.currentIndex.direct = 0;
          if (!_that.isMoveing) {
            _that.isMoveing = true;
          }
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
      current: '',
      currentIndex: {
        arr: 0, //0走路 1跑 2车
        img: 0, //方向图 0-2下  3-5右 6-8上 9-11左
        direct: 0 }
    };
    _this.aspect = {
      width: 16 * 3,
      height: 18 * 3
    };
    _this.position = { //基本位置 
      x: 0,
      y: 0
    };
    return _this;
  }

  _createClass(Player, [{
    key: 'init',
    value: function init() {
      this.images.current = loadData.imageObj.person.player;

      // let _that = this;
      // let Img = new Image();
      // //console.log(ImgArray[x1][x2].src);
      // Img.src = this.images.url;
      // if(Img.complete){
      //   //_that.images.current = Img;

      //   _that._draw();
      // }else{
      //   Img.onload = function(){
      //     _that.images.current = this;
      //     //_that._draw();
      //   };
      // };  
    }
  }, {
    key: '_draw',
    value: function _draw() {
      //绘制画面
      if (game) {
        this._moveStep();
        game.ctx.ctx1.drawImage(this.images.current, (20 + 15) * this.images.currentIndex.img, 26 * this.images.currentIndex.arr, 24, 26, this.position.x, this.position.y, this.aspect.width, this.aspect.height);

        // for(let i=0;i<=12;i++){
        //   game.ctx.ctx1.drawImage(this.images.current, (20+14.5)*i, 26*0, 24, 26, this.position.x+this.aspect.width*i, this.position.y, this.aspect.width, this.aspect.height);
        //   game.ctx.ctx1.drawImage(this.images.current, (20+14.5)*i, 26*1, 24, 26, this.position.x+this.aspect.width*i, this.position.y+this.aspect.height*1, this.aspect.width, this.aspect.height);
        //   game.ctx.ctx1.drawImage(this.images.current, (20+14.5)*i, 26*2, 24, 26, this.position.x+this.aspect.width*i, this.position.y+this.aspect.height*2, this.aspect.width, this.aspect.height);
        // }
      }
    }
  }]);

  return Player;
}(Person);