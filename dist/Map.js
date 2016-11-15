'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mapList = {
  'm_001': {
    name: '初始图',
    imgUrl: 'images/mapElements01.dib',
    widthNum: 4,
    heightNum: 4,
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
    },
    outScreenArray: [['tree_01', 'tree_02'], ['tree_03', 'tree_04']]
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
        imgUrl = _window$mapList$id.imgUrl,
        elements = _window$mapList$id.elements,
        outScreenArray = _window$mapList$id.outScreenArray;

    this.name = name;
    this.block = {
      width: 16 * 3,
      height: 16 * 3,
      nums: {
        x: widthNum,
        y: heightNum
      },
      elements: elements
    };
    this.images = {
      url: imgUrl,
      current: ''
    };
    this.array = {}; //地图每个方格 {id:xx,type:1}
    this.outScreenArray = outScreenArray;
  }

  _createClass(Map, [{
    key: 'init',
    value: function init() {
      this.images.current = loadData.imageObj.map[this.id];
      //地图外
      for (var i = -8; i < this.block.nums.y + 8; i++) {
        this.array[i] = {};
        for (var j = -8; j < this.block.nums.x + 8; j++) {
          // if(i>=0&&i<this.block.nums.y && j>=0&&j<this.block.nums.x){console.log(i,j);continue;}
          var rowX = Math.abs(i % 2).toString();
          var rowY = Math.abs(j % 2).toString();
          var elementName = this.outScreenArray[rowX][rowY];
          this.array[i][j] = {
            id: elementName,
            type: '1'
          };
        }
      }
      //console.log(this.array);
      //地图内
      for (var _i = 0; _i < this.block.nums.y; _i++) {
        for (var _j = 0; _j < this.block.nums.x; _j++) {
          this.array[_i][_j] = {
            id: 'green_ground_01',
            type: 'c'
          };
        }
      }
      console.log('地图对象array', this.array);
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
        //地图内	
        for (var i in this.array) {
          for (var j in this.array[i]) {
            // console.log(i,j);
            // console.log(array[i][j].id)
            var element = elements[array[i][j].id];
            canvas.drawImage(img, element.x, element.y, element.width, element.height, blockWidth * j, blockHeight * i, blockWidth, blockHeight);
          }
        }
      }
    }
  }]);

  return Map;
}();