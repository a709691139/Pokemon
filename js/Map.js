var mapList ={
	'm_001': {
		name: '初始图',
		imgUrl:'images/mapElements01.dib',
		widthNum:4,
		heightNum:4,
	},
};

class Map {
  constructor( id ) {
  	this.id = id;
  	let {name, widthNum=1, heightNum=1, imgUrl} = window.mapList[id];
  	this.name = name;
  	this.block = {
  		width: 16*3,
  		height: 16*3,
  		nums : {
  			x : widthNum,
  			y : heightNum,
  		},
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
  		}
  	};
  	this.images = {
  		url: imgUrl,
  		current: '',
  	};
  	this.array = [];
  	this.outScreenArray = [
  		['tree_01','tree_02'],
  		['tree_03','tree_04']
  	];
  }

  init(){
    this.images.current = loadData.imageObj.map[this.id];
    for(let i=0; i<this.block.nums.y; i++){
    	this.array[i] = [];
    	for(let j=0; j<this.block.nums.x; j++){
    		this.array[i][j] = {
    			id: 'green_ground_01',
    			type:'c',
    		};
    	}
    }
    console.log(this.array);
  }

  _draw(){  //绘制画面   
  	if(game){
  	    let img = this.images.current,
  	    	{ width:blockWidth, height: blockHeight, elements } = this.block,
  	    	array = this.array,
  	    	canvas = game.canvas.ctx.background;
  	    //地图外的自动覆盖 2*2方格覆盖，如大树，
  	    //上 
  	    for(let i=-8; i<=-1;i++ ){
  	        for(let j = -8; j<= 8 + this.block.nums.x +8 -1; j++){
  	        	let rowX = Math.abs(i%2);
  	        	let rowY = Math.abs(j%2);
  	        	let element = elements[this.outScreenArray[rowX][rowY]];
  	        	// console.log(rowX,rowY);
  	        	canvas.drawImage(img, element.x, element.y, 16, 16, blockWidth*j, blockHeight*i, blockWidth, blockHeight);
  	        }
  	    }
  	    //下 
  	    for(let i=this.block.nums.y; i<=this.block.nums.y+8;i++  ){
  	        for(let j = -8; j<= 8 + this.block.nums.x +8-1; j++){
  	        	let rowX = Math.abs(i%2);
  	        	let rowY = Math.abs(j%2);
  	        	let element = elements[this.outScreenArray[rowX][rowY]];
  	        	// console.log(rowX,rowY);
  	        	canvas.drawImage(img, element.x, element.y, 16, 16, blockWidth*j, blockHeight*i, blockWidth, blockHeight);
  	        }
  	    }
  	    //左
  	    // 
  	    for( let i=0; i<=this.block.nums.y-1;i++ ){
  	        for(  let j = -8; j<= -1; j++){
  	        	let rowX = Math.abs(i%2);
  	        	let rowY = Math.abs(j%2);
  	        	let element = elements[this.outScreenArray[rowX][rowY]];
  	        	// console.log(rowX,rowY);
  	        	canvas.drawImage(img, element.x, element.y, 16, 16, blockWidth*j, blockHeight*i, blockWidth, blockHeight);
  	        }
  	    }
  	    //右 
  	    for(let i=0 ;i<=this.block.nums.y-1;i++  ){
  	        for(let j = this.block.nums.x -1; j<= 8 + this.block.nums.x +8 -1; j++){
  	        	let rowX = Math.abs(i%2);
  	        	let rowY = Math.abs(j%2);
  	        	let element = elements[this.outScreenArray[rowX][rowY]];
  	        	// console.log(rowX,rowY);
  	        	canvas.drawImage(img, element.x, element.y, 16, 16, blockWidth*j, blockHeight*i, blockWidth, blockHeight);
  	        }
  	    }
  	    //地图内	
  	    for(let i=0; i<this.block.nums.y; i++){
  	    	for(let j=0; j<this.block.nums.x; j++){
  	    		let element = elements[array[i][j].id];
  	    		canvas.drawImage(img, element.x, element.y, element.width, element.height, blockWidth*j, blockHeight*i, blockWidth, blockHeight);
  	    	}
  	    }
    }
  }

}