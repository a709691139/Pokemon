//游戏菜单， 按start呼出关闭菜单
class Menu {
    constructor(){
    	this.visible = false;
    	this.selectedIndex = 0;
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
    	this.images = {  //人物图片 ,以图片左上角为初始点，先考虑用（整图，需计算裁剪图）还是多图(直接切换图片src)
	      url: '',
	      current: '',  //当前图片obj
	      currentIndex:'',
	    };
    }
    init(){
    	this.buttons[3].name = player.name;
    	this.buttons[0].func = ()=>{};

    	this.images.current = loadData.imageObj.border.all;
    }
    _draw(){ 
    	//game.canvas.ctx.menu.drawImage();
    	//绘画背景框、文字按钮、 选择浮标
    }
}