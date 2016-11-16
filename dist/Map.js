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
        x: 1,
        y: 0
      },
      'tree_01': {
        name: '树块左上',
        x: 6,
        y: 3
      },
      'tree_02': {
        name: '树块右上',
        x: 7,
        y: 3
      },
      'tree_03': {
        name: '树块左下',
        x: 6,
        y: 4
      },
      'tree_04': {
        name: '树块右下',
        x: 7,
        y: 4
      }
    },
    elements_num_x: 8,
    elements_num_y: 128,
    outScreenArray: [['tree_01', 'tree_02'], ['tree_03', 'tree_04']],
    array: { "0": { "0": { "id": "green_ground_01", "type": "c" }, "1": { "id": "green_ground_01", "type": "c" }, "2": { "id": "green_ground_01", "type": "c" }, "3": { "id": "green_ground_01", "type": "c" } }, "1": { "0": { "id": "green_ground_01", "type": "c" }, "1": { "id": "green_ground_01", "type": "c" }, "2": { "id": "green_ground_01", "type": "c" }, "3": { "id": "green_ground_01", "type": "c" } }, "2": { "0": { "id": "green_ground_01", "type": "c" }, "1": { "id": "green_ground_01", "type": "c" }, "2": { "id": "green_ground_01", "type": "c" }, "3": { "id": "green_ground_01", "type": "c" } }, "3": { "0": { "id": "green_ground_01", "type": "c" }, "1": { "id": "green_ground_01", "type": "c" }, "2": { "id": "green_ground_01", "type": "c" }, "3": { "id": "green_ground_01", "type": "c" } } }
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
        outScreenArray = _window$mapList$id.outScreenArray,
        array = _window$mapList$id.array;

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
    this.array = array; //地图每个方格 {id:xx,type:1}
    this.outScreenArray = outScreenArray;
  }

  _createClass(Map, [{
    key: 'init',
    value: function init() {
      this.images.current = loadData.imageObj.map[this.id];
      var array = {};
      //地图外
      for (var i = -8; i < this.block.nums.y + 8; i++) {
        array[i] = {};
        for (var j = -8; j < this.block.nums.x + 8; j++) {
          // if(i>=0&&i<this.block.nums.y && j>=0&&j<this.block.nums.x){console.log(i,j);continue;}
          var rowX = Math.abs(i % 2).toString();
          var rowY = Math.abs(j % 2).toString();
          var elementName = this.outScreenArray[rowX][rowY];
          array[i][j] = {
            id: elementName,
            type: '1'
          };
        }
      }
      //console.log(this.array);
      //地图内
      for (var _i in this.array) {
        for (var _j in this.array[_i]) {
          array[_i][_j] = this.array[_i][_j];
        }
      }
      this.array = array;
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
            canvas.drawImage(img, element.x * 16, element.y * 16, 16, 16, blockWidth * j, blockHeight * i, blockWidth, blockHeight);
          }
        }
      }
    }
  }]);

  return Map;
}();