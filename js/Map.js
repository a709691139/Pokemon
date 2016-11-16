var mapList ={
  'm_001': {
    name: '初始图',
    imgUrl:'images/mapElements01.dib',
    widthNum:4,
    heightNum:4,
    elements:{
      'green_ground_01':{
        name:'草地1',
        x:1,
        y:0,
      },
      'tree_01':{
        name:'树块左上',
        x:6,
        y:3,
      },
      'tree_02':{
        name:'树块右上',
        x:7,
        y:3,
      },
      'tree_03':{
        name:'树块左下',
        x:6,
        y:4,
      },
      'tree_04':{
        name:'树块右下',
        x:7,
        y:4,
      },
    },
    elements_num_x:8,
    elements_num_y:128,
    outScreenArray: [ 
      ['tree_01','tree_02'],
      ['tree_03','tree_04']
    ],
    array:{"0":{"0":{"id":"green_ground_01","type":"c"},"1":{"id":"green_ground_01","type":"c"},"2":{"id":"green_ground_01","type":"c"},"3":{"id":"green_ground_01","type":"c"}},"1":{"0":{"id":"green_ground_01","type":"c"},"1":{"id":"green_ground_01","type":"c"},"2":{"id":"green_ground_01","type":"c"},"3":{"id":"green_ground_01","type":"c"}},"2":{"0":{"id":"green_ground_01","type":"c"},"1":{"id":"green_ground_01","type":"c"},"2":{"id":"green_ground_01","type":"c"},"3":{"id":"green_ground_01","type":"c"}},"3":{"0":{"id":"green_ground_01","type":"c"},"1":{"id":"green_ground_01","type":"c"},"2":{"id":"green_ground_01","type":"c"},"3":{"id":"green_ground_01","type":"c"}}},
  },
};


class Map {
  constructor( id ) {
  	this.id = id;
  	let {name, widthNum=1, heightNum=1, imgUrl, elements, outScreenArray,array} = window.mapList[id];
  	this.name = name;
  	this.block = {
  		width: 16*3,
  		height: 16*3,
  		nums : {
  			x : widthNum,
  			y : heightNum,
  		},
  		elements: elements
  	};
  	this.images = {
  		url: imgUrl,
  		current: '',
  	};
  	this.array = array; //地图每个方格 {id:xx,type:1}
  	this.outScreenArray = outScreenArray;
  }

  init(){
    this.images.current = loadData.imageObj.map[this.id];
    let array={};
    //地图外
   	for(let i=-8;i<this.block.nums.y+8; i++){
   		array[i] = {};
      	for(let j=-8; j<this.block.nums.x+8; j++){
      		// if(i>=0&&i<this.block.nums.y && j>=0&&j<this.block.nums.x){console.log(i,j);continue;}
      		let rowX = Math.abs(i%2).toString();
        	let rowY = Math.abs(j%2).toString();
        	let elementName = this.outScreenArray[rowX][rowY];
      		array[i][j] = {
      			id: elementName,
      			type:'1',
      		};
      	}
      }
    //console.log(this.array);
    //地图内
    for(let i in this.array){
    	for(let j in this.array[i]){
    		array[i][j] = this.array[i][j];
    	}
    }
    this.array = array;
    console.log('地图对象array',this.array);
  }

  _draw(){  //绘制画面   
  	if(game){
  	    let img = this.images.current,
  	    	{ width:blockWidth, height: blockHeight, elements } = this.block,
  	    	array = this.array,
  	    	canvas = game.canvas.ctx.background;
  	    //地图外的自动覆盖 2*2方格覆盖，如大树，
  	    //地图内	
  	    for(let i in this.array){
  	    	for(let j in this.array[i]){
  	    		// console.log(i,j);
  	    		// console.log(array[i][j].id)
  	    		let element = elements[array[i][j].id];
  	    		canvas.drawImage(img, element.x*16, element.y*16, 16, 16, blockWidth*j, blockHeight*i, blockWidth, blockHeight);
  	    	}
  	    }
    }
  }

}