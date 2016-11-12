'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mapList = {
  'm_001': {
    name: '初始图',
    imgUrl: 'images/mapElements01.dib',
    widthNum: 4,
    heightNum: 4
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
          name: '草地1',
          x: 16.5,
          y: 0,
          height: 15.5,
          width: 15,
          type: 'c'
        },
        'tree_01': {
          name: '树块左上',
          x: 6 * 16,
          y: 3 * 16,
          height: 16,
          width: 16,
          type: '1'
        },
        'tree_02': {
          name: '树块右上',
          x: 7 * 16,
          y: 3 * 16,
          height: 16,
          width: 16,
          type: '1'
        },
        'tree_03': {
          name: '树块左下',
          x: 6 * 16,
          y: 4 * 16,
          height: 16,
          width: 16,
          type: '1'
        },
        'tree_04': {
          name: '树块右下',
          x: 7 * 16,
          y: 4 * 16,
          height: 16,
          width: 16,
          type: '1'
        }
      }
    };
    this.images = {
      url: imgUrl,
      current: ''
    };
    this.array = [];
    this.outScreenArray = [['tree_01', 'tree_02'], ['tree_03', 'tree_04']];
  }

  _createClass(Map, [{
    key: 'init',
    value: function init() {
      this.images.current = loadData.imageObj.map[this.id];
      for (var i = 0; i < this.block.nums.y; i++) {
        this.array[i] = [];
        for (var j = 0; j < this.block.nums.x; j++) {
          this.array[i][j] = {
            id: 'green_ground_01',
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
        //地图外的自动覆盖 2*2方格覆盖，如大树，
        //上 
        for (var i = -8; i <= -1; i++) {
          for (var j = -8; j <= 8 + this.block.nums.x + 8 - 1; j++) {
            var rowX = Math.abs(i % 2);
            var rowY = Math.abs(j % 2);
            var element = elements[this.outScreenArray[rowX][rowY]];
            // console.log(rowX,rowY);
            canvas.drawImage(img, element.x, element.y, 16, 16, blockWidth * j, blockHeight * i, blockWidth, blockHeight);
          }
        }
        //下 
        for (var _i = this.block.nums.y; _i <= this.block.nums.y + 8; _i++) {
          for (var _j = -8; _j <= 8 + this.block.nums.x + 8 - 1; _j++) {
            var _rowX = Math.abs(_i % 2);
            var _rowY = Math.abs(_j % 2);
            var _element = elements[this.outScreenArray[_rowX][_rowY]];
            // console.log(rowX,rowY);
            canvas.drawImage(img, _element.x, _element.y, 16, 16, blockWidth * _j, blockHeight * _i, blockWidth, blockHeight);
          }
        }
        //左
        // 
        for (var _i2 = 0; _i2 <= this.block.nums.y - 1; _i2++) {
          for (var _j2 = -8; _j2 <= -1; _j2++) {
            var _rowX2 = Math.abs(_i2 % 2);
            var _rowY2 = Math.abs(_j2 % 2);
            var _element2 = elements[this.outScreenArray[_rowX2][_rowY2]];
            // console.log(rowX,rowY);
            canvas.drawImage(img, _element2.x, _element2.y, 16, 16, blockWidth * _j2, blockHeight * _i2, blockWidth, blockHeight);
          }
        }
        //右 
        for (var _i3 = 0; _i3 <= this.block.nums.y - 1; _i3++) {
          for (var _j3 = this.block.nums.x - 1; _j3 <= 8 + this.block.nums.x + 8 - 1; _j3++) {
            var _rowX3 = Math.abs(_i3 % 2);
            var _rowY3 = Math.abs(_j3 % 2);
            var _element3 = elements[this.outScreenArray[_rowX3][_rowY3]];
            // console.log(rowX,rowY);
            canvas.drawImage(img, _element3.x, _element3.y, 16, 16, blockWidth * _j3, blockHeight * _i3, blockWidth, blockHeight);
          }
        }
        //地图内	
        for (var _i4 = 0; _i4 < this.block.nums.y; _i4++) {
          for (var _j4 = 0; _j4 < this.block.nums.x; _j4++) {
            var _element4 = elements[array[_i4][_j4].id];
            canvas.drawImage(img, _element4.x, _element4.y, _element4.width, _element4.height, blockWidth * _j4, blockHeight * _i4, blockWidth, blockHeight);
          }
        }
      }
    }
  }]);

  return Map;
}();