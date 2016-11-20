'use strict';

$(function () {
	var EditObj = {
		_init: function _init() {
			this.mapList._init();
			this.mapWidthHeightLength._init();
			this.radioType._init();
			this.mapMoveType._init();
		},
		_save: function _save() {},
		radioType: { //切换 地图、运动许可、事件、野生精灵、信息 编辑框
			check: '地图',
			elements: {},
			_init: function _init() {
				this.elements = $('.radioBox input[name=radioType]');
				this._change(this.check);
				this.elements.on('change', function () {
					EditObj.radioType._change($(this).val());
				});
			},
			_change: function _change(val) {
				console.log(val);
				this.check = val;
				switch (val) {
					case '地图':
						$('body').attr('class', 'mode_pic');
						break;
					case '运动许可':
						$('body').attr('class', 'mode_moveType');
						break;
					case '事件':
						break;
					case '野生精灵':
						break;
					case '地图信息':
						break;
				}
			}
		},
		mapBox: { //地图array框
			element: {},
			_init: function _init() {
				this.element = $('#mapBox .map');
				var selectedMapObj = EditObj.selectedMapObj;
				var block_element = {};
				this.element.html('');
				this.element.css({ width: selectedMapObj.widthNum * 48, height: selectedMapObj.heightNum * 48 });
				var $block = $('<div class=\'block\' style=\'background-image:url("' + selectedMapObj.imgUrl + '");background-repeat: no-repeat;background-size:' + selectedMapObj.elements_num_x * 48 + 'px ' + selectedMapObj.elements_num_y * 48 + 'px;\'></div>');
				var $block_child = $('<div></div>');
				for (var i = 0; i < selectedMapObj.heightNum; i++) {
					for (var j = 0; j < selectedMapObj.widthNum; j++) {
						block_element = selectedMapObj.elements[selectedMapObj.array[i][j].id];
						$block.css({
							left: j * 48 + 'px',
							top: i * 48 + 'px',
							'backgroundPosition': '-' + block_element.x * 48 + 'px ' + '-' + block_element.y * 48 + 'px'
						}).attr({ x: j, y: i, key: i + '_' + j });
						$block_child.text(selectedMapObj.array[i][j].type);

						this.element.append($block.clone(true).append($block_child.clone(true)));
					}
				}

				this.element.off('mousedown', EditObj.mapBox._mousedown).off('mousemove', EditObj.mapBox._mousemove);
				$(document).off('mouseup', this.element, EditObj.mapBox._mouseup);

				this.element.on('mousedown', EditObj.mapBox._mousedown);
				$(document).on('mouseup', this.element, EditObj.mapBox._mouseup);
			},
			_mousedown: function _mousedown(e) {
				var $parent = $(this).parent();
				var $body = $('body');
				var position = $parent.position();
				var clientX = e.clientX,
				    clientY = e.clientY;

				var x = parseInt((clientX + $parent.scrollLeft() + $body.scrollLeft() - position.left) / 48),
				    y = parseInt((clientY + $parent.scrollTop() + $body.scrollTop() - position.top) / 48);
				//console.log(x,y, ( clientX+$parent.scrollLeft() )/48,( clientY+$parent.scrollTop() )/48);
				EditObj.mapBox._click(x, y);
				$(this).on('mousemove', EditObj.mapBox._mousemove);
			},
			_mousemove: function _mousemove(e) {
				var $parent = $(this).parent();
				var $body = $('body');
				var position = $parent.position();
				var clientX = e.clientX,
				    clientY = e.clientY;

				var x = parseInt((clientX + $parent.scrollLeft() + $body.scrollLeft() - position.left) / 48),
				    y = parseInt((clientY + $parent.scrollTop() + $body.scrollTop() - position.top) / 48);
				//console.log(x,y, ( clientX+$parent.scrollLeft() )/48,( clientY+$parent.scrollTop() )/48);
				EditObj.mapBox._click(x, y);
			},
			_mouseup: function _mouseup() {
				EditObj.mapBox.element.off('mousemove');
			},
			_click: function _click(x, y) {

				//console.log(y,'列',x,'行',selectedId);
				//改变地图 图片块
				if (EditObj.radioType.check == '地图') {
					var selectedId = EditObj.mapElements.selectedId;
					var array = EditObj.selectedMapObj.array;
					if (array[y][x].id == selectedId) {
						return;
					}
					var i = selectedId.split("_")[0],
					    j = selectedId.split("_")[1];
					//console.log(i,j,EditObj.selectedMapObj.array);
					array[y][x].id = selectedId;
					this.element.find('div[key="' + y + '_' + x + '"]').css('backgroundPosition', '-' + j * 48 + 'px ' + '-' + i * 48 + 'px');
				} else if (EditObj.radioType.check == '运动许可') {
					var selectedType = EditObj.mapMoveType.selectedType;
					var _array = EditObj.selectedMapObj.array;
					if (_array[y][x].type == selectedType) {
						return;
					}
					_array[y][x].type = selectedType;
					this.element.find('div[key="' + y + '_' + x + '"]').find('div').text(selectedType);
				}
			}
		},

		selectedMapObj: { //选中的地图	
			name: '初始图',
			imgUrl: '',
			widthNum: 0,
			heightNum: 0,
			elements: {},
			elements_num_x: 0,
			elements_num_y: 0,
			outScreenArray: [],
			array: {}
		},
		mapList: { //地图列表
			obj: {}, //原地图列表
			element: {}, //选择框dom select 
			_init: function _init() {
				this.element = $('#mapList .selectMap');
				this.obj = window.mapList;
				this.element.html('');
				for (var x in this.obj) {
					var $option = '<option value=\'' + x + '\'>' + x + '</option>';
					this.element.append($option);
				}
				this._change(this.element.val());
				this.element.off('change');
				this.element.change(function () {
					EditObj.mapList._change($(this).val());
				});
			},
			_change: function _change(selectedName) {
				EditObj.selectedMapObj = jQuery.extend(true, {}, this.obj[selectedName]);
				EditObj.mapElements._init();
				EditObj.mapBox._init();
				EditObj.mapOutScreen._init();
			}
		},
		mapElements: { //地图 块图片
			element: {}, //img 
			selectedElement: {}, //div.block
			selectedId: {}, // 0_1
			_init: function _init() {
				this.element = $('#elements img');
				this.selectedElement = $('#elements .block');
				var selectedMapObj = EditObj.selectedMapObj;
				this.element.attr('src', selectedMapObj.imgUrl).css({ 'width': selectedMapObj.elements_num_x * 16 * 3, 'height': selectedMapObj.elements_num_y * 16 * 3 });
				this._click(0, 0);
				this.element.off('click');
				this.element.on('click', function (e) {
					var offsetX = e.offsetX,
					    offsetY = e.offsetY;

					var i = parseInt(offsetY / 48),
					    j = parseInt(offsetX / 48);
					console.log(i, j);
					EditObj.mapElements._click(i, j);
				});
			},
			_click: function _click(i, j) {
				this.selectedId = i + "_" + j;
				this.selectedElement.css({ left: j * 48 + 'px', top: i * 48 + 'px' });
			}
		},
		mapMoveType: { //地图 块类型	
			element: {},
			selectedType: '1',
			_init: function _init() {
				this.element = $('#selectMoveTypeBox select');
				this._change(this.element.val());
				this.element.off('change');
				this.element.change(function () {
					EditObj.mapMoveType._change($(this).val());
				});
			},
			_change: function _change(type) {
				this.selectedType = type;
			}
		},
		mapOutScreen: { //屏幕外的图片
			element: {},
			_init: function _init() {
				this.element = $('#outScreenArray');
				var selectedMapObj = EditObj.selectedMapObj;
				this.element.html('');
				var block_element = {};
				var $block = $('<div  style=\'background:url("' + selectedMapObj.imgUrl + '") no-repeat;background-size:' + selectedMapObj.elements_num_x * 48 + 'px ' + selectedMapObj.elements_num_y * 48 + 'px;\'></div>');
				for (var i = 0; i < 2; i++) {
					for (var j = 0; j < 2; j++) {
						block_element = selectedMapObj.elements[selectedMapObj.outScreenArray[i][j]];
						$block.css({
							left: j * 48 + 'px',
							top: i * 48 + 'px',
							'backgroundPosition': '-' + block_element.x * 48 + 'px ' + '-' + block_element.y * 48 + 'px'
						}).attr({ x: j, y: i, key: i + '_' + j });
						this.element.append($block.clone(true));
						//console.log(i+'_'+j,block_element);
					}
				}
				this.element.off('click');
				this.element.on('click', 'div', function () {
					EditObj.mapOutScreen._click($(this).attr('x'), $(this).attr('y'));
				});
			},
			_click: function _click(x, y) {
				var selectedId = EditObj.mapElements.selectedId;
				//console.log(y,'列',x,'行',selectedId);
				var i = selectedId.split("_")[0],
				    j = selectedId.split("_")[1];
				console.log(i, j, EditObj.selectedMapObj.outScreenArray);
				EditObj.selectedMapObj.outScreenArray[y][x] = selectedId;
				this.element.find('div[key="' + y + '_' + x + '"]').css('backgroundPosition', '-' + j * 48 + 'px ' + '-' + i * 48 + 'px');
			}
		},
		mapWidthHeightLength: { //地图内宽高，num长度
			elements: {
				widthNumsInput: {},
				heightNumsInput: {},
				button: {}
			},
			_init: function _init() {
				this.elements = {
					widthNumsInput: $('#mapLength .input_x'),
					heightNumsInput: $('#mapLength .input_y'),
					button: $('#mapLength button')
				};
				var selectedMapObj = EditObj.selectedMapObj;
				console.log(selectedMapObj);
				this.elements.widthNumsInput.val(selectedMapObj.widthNum);
				this.elements.heightNumsInput.val(selectedMapObj.heightNum);
				this.elements.button.off('click');
				this.elements.button.on('click', function () {
					var elements = EditObj.mapWidthHeightLength.elements;
					var selectedMapObj = EditObj.selectedMapObj;
					var num_x = parseInt(elements.widthNumsInput.val());
					var num_y = parseInt(elements.heightNumsInput.val());
					//先判断列
					if (num_y < selectedMapObj.heightNum) {
						for (var i = num_y; i < selectedMapObj.heightNum; i++) {
							delete selectedMapObj.array[i];
						}
					} else if (num_y > selectedMapObj.heightNum) {
						for (var _i = selectedMapObj.heightNum; _i < num_y; _i++) {
							selectedMapObj.array[_i] = {};
							for (var j = 0; j < selectedMapObj.widthNum; j++) {
								selectedMapObj.array[_i][j] = {
									"id": "0_0",
									"type": "1"
								};
							}
						}
					}
					//行
					if (num_x < selectedMapObj.widthNum) {
						for (var _i2 = 0; _i2 < num_y; _i2++) {
							for (var _j = num_x; _j < selectedMapObj.widthNum; _j++) {
								delete selectedMapObj.array[_i2][_j];
							}
						}
					} else if (num_x > selectedMapObj.widthNum) {
						for (var _i3 = 0; _i3 < num_y; _i3++) {
							for (var _j2 = selectedMapObj.widthNum; _j2 < num_x; _j2++) {
								selectedMapObj.array[_i3][_j2] = {
									"id": "0_0",
									"type": "1"
								};
							}
						}
					}
					selectedMapObj.widthNum = num_x;
					selectedMapObj.heightNum = num_y;
					EditObj.mapBox._init();
				});
			}
		}
	};
	EditObj._init();
	console.log(EditObj);
});