var mapList ={
	'm_001': {
		name: '初始图',
		imgUrl:'images/mapElements01.dib',
		widthNum:4,
		heightNum:4,
		elements:{
  			'green_ground_01':{
  				name:'草地1',
  				x:16.5,
  				y:0,
  				height:15.5,
  				width:15,
  				type:'c',
  			},
  			'tree_01':{
				name:'树块左上',
				x:6*16,
  				y:3*16,
  				height:16,
  				width:16,
  				type:'1',
			},
			'tree_02':{
				name:'树块右上',
				x:7*16,
  				y:3*16,
  				height:16,
  				width:16,
  				type:'1',
			},
			'tree_03':{
				name:'树块左下',
				x:6*16,
  				y:4*16,
  				height:16,
  				width:16,
  				type:'1',
			},
			'tree_04':{
				name:'树块右下',
				x:7*16,
  				y:4*16,
  				height:16,
  				width:16,
  				type:'1',
			},
  		},
  		outScreenArray: [ 
	  		['tree_01','tree_02'],
	  		['tree_03','tree_04']
	  	],
	},
};

class Map {
  constructor( id ) {
  	this.id = id;
  	let {name, widthNum=1, heightNum=1, imgUrl, elements, outScreenArray} = window.mapList[id];
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
  	this.array = {}; //地图每个方格 {id:xx,type:1}
  	this.outScreenArray = outScreenArray;
  }

  init(){
    this.images.current = loadData.imageObj.map[this.id];
    //地图外
 	for(let i=-8;i<this.block.nums.y+8; i++){
 		this.array[i] = {};
    	for(let j=-8; j<this.block.nums.x+8; j++){
    		// if(i>=0&&i<this.block.nums.y && j>=0&&j<this.block.nums.x){console.log(i,j);continue;}
    		let rowX = Math.abs(i%2).toString();
        	let rowY = Math.abs(j%2).toString();
        	let elementName = this.outScreenArray[rowX][rowY];
    		this.array[i][j] = {
    			id: elementName,
    			type:'1',
    		};
    	}
    }
    //console.log(this.array);
    //地图内
    for(let i=0; i<this.block.nums.y; i++){
    	for(let j=0; j<this.block.nums.x; j++){
    		this.array[i][j] = {
    			id: 'green_ground_01',
    			type:'c',
    		};
    	}
    }
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
  	    		canvas.drawImage(img, element.x, element.y, element.width, element.height, blockWidth*j, blockHeight*i, blockWidth, blockHeight);
  	    	}
  	    }
    }
  }

}