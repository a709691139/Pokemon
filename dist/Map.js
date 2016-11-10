'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mapList = {
  'm_001': {
    name: '初始图',
    imgUrl: 'images/mapElements01.dib',
    widthNum: 60,
    heightNum: 60
  }
};

var Map = function () {
  function Map(id) {
    _classCallCheck(this, Map);

    this.id = id;
    var _window$mapList$id = window.mapList[id],
        name = _window$mapList$id.name,
        _window$mapList$id$wi = _window$mapList$id.widthNum,
        widthNum = _window$mapList$id$wi === undefined ? 1 : _window$mapList$id$wi,
        _window$mapList$id$he = _window$mapList$id.heightNum,
        heightNum = _window$mapList$id$he === undefined ? 1 : _window$mapList$id$he,
        imgUrl = _window$mapList$id.imgUrl;

    this.name = name;
    this.block = {
      width: 16 * 3,
      height: 16 * 3,
      nums: {
        x: widthNum,
        y: heightNum
      },
      elements: {
        'green_ground_01': {
          x: 16.5,
          y: 0,
          height: 15.5,
          width: 15,
          type: 'c'
        }
      }
    };
    this.images = {
      url: imgUrl,
      current: ''
    };
    this.array = [];
  }

  _createClass(Map, [{
    key: 'init',
    value: function init() {
      this.images.current = loadData.imageObj.map[this.id];
      for (var i = 0; i < this.block.nums.y; i++) {
        this.array[i] = [];
        for (var j = 0; j < this.block.nums.x; j++) {
          this.array[i][j] = {
            id: 'g_1',
            name: 'green_ground_01',
            type: 'c'
          };
        }
      }
      console.log(this.array);
    }
  }, {
    key: '_draw',
    value: function _draw() {
      //绘制画面   
      if (game) {
        var img = this.images.current,
            _block = this.block,
            blockWidth = _block.width,
            blockHeight = _block.height,
            elements = _block.elements,
            array = this.array,
            canvas = game.canvas.ctx.background;


        for (var i = 0; i < this.block.nums.y; i++) {
          for (var j = 0; j < this.block.nums.x; j++) {
            var element = elements[array[i][j].name];
            canvas.drawImage(img, element.x, element.y, element.width, element.height, blockWidth * j, blockHeight * i, blockWidth, blockHeight);
          }
        }
      }
    }
  }]);

  return Map;
}();