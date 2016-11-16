$(function(){
	let EditObj = {
		mapList:{ //地图列表
			elements:{
				selectMap:'',
			},
			init:function(){
				this.elements[selectMap] = $('#mapList .selectMap');
			}
		},
		
	};
	//加载地图列表
	let $mapList_select = $('#mapList .selectMap');
	for(let x in mapList){
		let $option = `<option value='${x}'>${x}</option>`;
		$mapList_select.append($option);
	}



	//加载地图元素s
	let $elements = $('#elements'),
		$elements_img = $elements.find('img');

	//选中的地图
	let selectMapName = $mapList_select.val();
		selectMap = mapList[selectMapName];  
	$elements_img.attr('src',selectMap.imgUrl)
		.css({'width':selectMap.elements_num_x*16*3, 'height':selectMap.elements_num_y*16*3});
	// for(let i=0; i < selectMap.elements_num_x; i++){
	// 	for(let j=0; j < selectMap.elements_num_y; j++){
			
	// 	}	
	// }

	$mapList_select.change(function(){
		console.log($(this).val());
		selectMapName = $(this).val();
		selectMap = mapList[selectMapName];

		$elements_img.attr('src',selectMap.imgUrl).css({width:selectMap.elements_num_x*16*3+'px',height:selectMap.elements_num_y*16*3+'px'});
	});
});