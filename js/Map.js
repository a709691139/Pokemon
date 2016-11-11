var mapList ={
	'm_001': {
		name: '初始图',
		imgUrl:'images/mapElements01.dib',
		widthNum:60,
		heightNum:60,
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
  				x:16.5,
  				y:0,
  				height:15.5,
  				width:15,
  				type:'c',
  			}
  		}
  	};
  	this.images = {
  		url: imgUrl,
  		current: '',
  	};
  	this.array = [];
  }

  init(){
    this.images.current = loadData.imageObj.map[this.id];
    for(let i=0; i<this.block.nums.y; i++){
    	this.array[i] = [];
    	for(let j=0; j<this.block.nums.x; j++){
    		this.array[i][j] = {
    			id:'g_1',
    			name: 'green_ground_01',
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

  	    for(let i=0; i<this.block.nums.y; i++){
  	    	for(let j=0; j<this.block.nums.x; j++){
  	    		let element = elements[array[i][j].name];
  	    		canvas.drawImage(img, element.x, element.y, element.width, element.height, blockWidth*j, blockHeight*i, blockWidth, blockHeight);
  	    	}
  	    }
    }
  }

}