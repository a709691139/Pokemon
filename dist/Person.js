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
      y: 0,
      x_index: 1,
      y_index: 2
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
        direct: 0, // 0下  1右 2上 3左 面朝方向
        lastDirect: 0 }
    };
    this.isMoveing = false; //移动一步
    this.moveTime = 0; //移动切换图片定时器
    this.movedStepDistant = 0; //移动一步已经走过的距离
    this.keyDownLength = 1; //按键的0短按：1长按
  }

  _createClass(Person, [{
    key: '_draw',
    value: function _draw() {//绘制画面   
    }
  }, {
    key: '_onKey',
    value: function _onKey(key, keyTime) {
      //按键处理
      switch (key) {
        case 'left':
          this._keyDownChangeDirection(keyTime, 3);
          break;
        case 'right':
          this._keyDownChangeDirection(keyTime, 1);
          break;
        case 'up':
          this._keyDownChangeDirection(keyTime, 2);
          break;
        case 'down':
          this._keyDownChangeDirection(keyTime, 0);
          break;
      }
    }
  }, {
    key: '_changePosition',
    value: function _changePosition(direct) {
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var distant = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      speed = speed == 0 ? distant : speed;
      switch (direct) {
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
    }
  }, {
    key: '_moveStep',
    value: function _moveStep() {
      //移动一步
      if (!this.isMoveing) {
        return false;
      }

      var onceTime = 0;
      var direct = this.images.currentIndex.direct; //当前方向
      var index = 3 * direct; //图片index
      var stepDistant = 0; //一步距离
      var speed = 0; //移动速度
      //console.log(this.keyDownLength, this.images.currentIndex.lastDirect,direct );
      if (this.keyDownLength == 0 && this.images.currentIndex.lastDirect != direct) {
        // 1、短按&方向不同   180ms完成  动画 1 2 0
        onceTime = 200;
        speed = 0;
        stepDistant = 0;
        //console.log('切换方向');
      } else {
        // 2、短按|长按: 走一步 走路动画,400ms内走完
        onceTime = 400;
        stepDistant = this.aspect.width;
        speed = stepDistant / onceTime * game.time.deltaTime;
        //console.log('走路');
        //位置index更新
        if (this.moveTime == 0) {
          var x_index = this.position.x_index,
              y_index = this.position.y_index;
          switch (direct) {
            case 3:
              x_index--;
              break;
            case 1:
              x_index++;
              break;
            case 2:
              y_index--;
              break;
            case 0:
              y_index++;
              break;
          }

          //判断下一步的位置是否可以进入
          var nextArrayBlock = map.array[y_index][x_index];
          var nextBlock = map.block.elements[nextArrayBlock.id];
          nextArrayBlock.type && (nextBlock.type = nextArrayBlock.type);
          nextBlock.id = nextArrayBlock.id;
          //console.log('下一步位置',x_index,y_index,nextBlock);
          if (nextBlock.type == 1) {
            ;
            this.isMoveing = false;
            return false;
          } else {
            this.position.x_index = x_index;
            this.position.y_index = y_index;
          }
        }
      }
      //移动
      this._changePosition(direct, speed);
      this.movedStepDistant += speed;

      this.moveTime += game.time.deltaTime;
      //切换图 
      //
      if (this.moveTime > onceTime) {
        //会有时间误差的，没到达最远距离，下面直接瞬移过去
        this.moveTime = 0;
        //回归站立图
        this.images.currentIndex.img = index;
        this.isMoveing = false;
        //去到一步最大距离
        this._changePosition(direct, 0, stepDistant - this.movedStepDistant);
        this.movedStepDistant = 0;
        //上次方向改变
        this.images.currentIndex.lastDirect = direct;
        this.keyDownLength = 1;
        //console.log('走完||切换  结束');
        return false;
      }

      var add = 0;

      if (speed == 0) {
        if (this.moveTime < onceTime / 2) {
          add = 1;
        } else {
          add = 0;
        }
      } else {
        var imgIndex = Math.floor(this.moveTime / onceTime * 3);
        switch (imgIndex) {
          case 0:
            add = 1;
            break;
          case 2:
            add = 2;
            break;
        }
      }

      this.images.currentIndex.img = index + add;

      //console.log(this.images.currentIndex.img);

      //console.log(this.moveTime , this.position.y);
      //console.log(this.moveTime, this.images.currentIndex.img);
    }
  }, {
    key: '_keyDownChangeDirection',
    value: function _keyDownChangeDirection(key, direct) {
      //key 0短按，1长按
      if (!this.isMoveing) {
        this.images.currentIndex.direct = direct;
        this.isMoveing = true;
        if (key == 0) {
          this.keyDownLength = 0;
        }
        //console.log( key==0?'短按':'长按' );
      }
    }
  }, {
    key: '_move',
    value: function _move() {
      //人物移动
      //按着键盘200ms抬起就是 纯切换方向，继续就是向前一步
      var _that = this;
      return {
        left: function left(key) {
          //key 0短按，1长按
          _that._keyDownChangeDirection(key, 3);
        },
        right: function right(key) {
          _that._keyDownChangeDirection(key, 1);
        },
        up: function up(key) {
          _that._keyDownChangeDirection(key, 2);
        },
        down: function down(key) {
          _that._keyDownChangeDirection(key, 0);
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
    _this.images.url = 'images/playerGirl.png';
    _this.aspect = {
      width: 16 * 3,
      height: 18 * 3,
      alignDeviation: {
        x: 6,
        y: -6
      }
    };
    _this.position = { //基本位置 
      x: 0,
      y: 0,
      x_index: 1,
      y_index: 2
    };
    return _this;
  }

  _createClass(Player, [{
    key: 'init',
    value: function init() {
      this.images.current = loadData.imageObj.person.player;
      this.position.x = this.position.x_index * 48;
      this.position.y = this.position.y_index * 48;
      var _map$block$nums = map.block.nums,
          numsX = _map$block$nums.x,
          numsY = _map$block$nums.y;
    }
  }, {
    key: '_draw',
    value: function _draw() {
      //绘制画面
      if (game) {
        this._moveStep();
        game.canvas.ctx.person.drawImage(this.images.current, (20 + 15) * this.images.currentIndex.img, 26 * this.images.currentIndex.arr, 24, 26, this.position.x + this.aspect.alignDeviation.x, this.position.y + this.aspect.alignDeviation.y, this.aspect.width, this.aspect.height);
      }
    }
  }]);

  return Player;
}(Person);