//游戏菜单， 按start呼出关闭菜单
class Menu {
    constructor(){
    	this.visible = false;
    	this.selectedIndex = 1;
    	this.buttons = [
    		{
    			name: '图鉴',
    			func: '',
    		},
    		{
    			name: '怪兽',
    			func: '',
    		},
    		{
    			name: '背包',
    			func: '',
    		},
    		{
    			name: '玩家',
    			func: '',
    		},
    		{
    			name: '记录',
    			func: '',
    		},
    		{
    			name: '设定',
    			func: '',
    		},
    		{
    			name: '关闭',
    			func: '',
    		},
    	];
    	this.images_border = {  //边框图片
	      current: '',  //当前图片obj
	      currentIndex:1,
	      array:[   //边框种类 0:{x:0,y:0}
	      ],
	    };
	    this.images_triangle = { //三角形浮标
	        current: '',  //当前图片obj
	        array:[{x:0,y:0},{x:11,y:0}],
	    };
    }
    init(){
    	this.buttons[3].name = player.name;
    	this.buttons[0].func = ()=>{};
    	for(let i=0;i<3;i++){
    		for(let j=0;j<10;j++){
    			this.images_border.array.push({x:j,y:i});
    		}
    	}
    	this.images_border.current = loadData.imageObj.others.border;
    	this.images_triangle.current = loadData.imageObj.others.triangle;
    }

    _onKey(key, keyTime){ //按键处理
    	console.log('menu',key, keyTime);
	    switch(key){
	      case 'up':
	      (this.selectedIndex-1<0) ? this.selectedIndex=this.buttons.length-1 : --this.selectedIndex;
	      break;
	      case 'down':
	      (this.selectedIndex+1>this.buttons.length-1) ? this.selectedIndex=0 : ++this.selectedIndex;
	      break;
	      case 'enter':
	      console.log('enter');
	      break;
	    }
	  }

    _draw(){ 
    	//绘画背景框、文字按钮、 选择浮标
    	let ctx = game.canvas.ctx.menu;
    	ctx.save();
    	ctx.translate(11*48, 48*0.5);
    	//白底
    	ctx.fillStyle="#fff";
		ctx.fillRect(0, 0, 3*48+16, 8*48-16);
		//边框线
		let borderType = this.images_border.array[this.images_border.currentIndex],
			borderX = borderType.x*30,
			borderY = borderType.y*30;
		let i = 0;
		for(let j=0;j<=9;j++){
			ctx.drawImage(this.images_border.current, 9*1+borderX, 9*0+borderY, 8, 8, 16*j, 16*i, 16, 16);
		}
		i = 22;
		for(let j=0;j<=9;j++){
			ctx.drawImage(this.images_border.current, 9*1+borderX, 9*2+borderY, 8, 8, 16*j, 16*i, 16, 16);
		}
		let j = 0;
		for(let i=0;i<=22;i++){
			ctx.drawImage(this.images_border.current, 9*0+borderX, 9*1+borderY, 8, 8, 16*j, 16*i, 16, 16);
		}
		j = 9;
		for(let i=0;i<=22;i++){
			ctx.drawImage(this.images_border.current, 9*2+borderX, 9*1+borderY, 8, 8, 16*j, 16*i, 16, 16);
		}
		//边框四角
		ctx.drawImage(this.images_border.current, 9*0+borderX, 9*0+borderY, 8, 8, 16*0, 16*0, 16, 16);
		ctx.drawImage(this.images_border.current, 9*2+borderX, 9*0+borderY, 8, 8, 16*9, 16*0, 16, 16);
		ctx.drawImage(this.images_border.current, 9*0+borderX, 9*2+borderY, 8, 8, 16*0, 16*22, 16, 16);
		ctx.drawImage(this.images_border.current, 9*2+borderX, 9*2+borderY, 8, 8, 16*9, 16*22, 16, 16);
		//文字按钮
		ctx.translate(36, 35);
		ctx.textBaseline="top"; 
		ctx.fillStyle='#000';
		ctx.font="22px bold Arial";
		for(let i in this.buttons){
			ctx.fillText(this.buttons[i].name, 0, i*44);
		}
		//浮标
		ctx.translate(-22, 0);
		ctx.drawImage(this.images_triangle.current, this.images_triangle.array[1].x, this.images_triangle.array[1].y, 8, 12, 0, 44*this.selectedIndex-2, 16, 24);

		ctx.restore();
    }
}