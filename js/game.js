class Game {
	constructor() {
		this.state = { 
			ongoing : false, 
			winOrlose : false
		};
		this.whichKeyBoard = 'menu'; //键盘事件传递层 people  menu
		this.control = true;  //游戏开始|暂停
		this.box = {
			element: '',
			originWidth:720,  //源宽高
			originHeight:420,
			width:0,  //当前宽高
			height:0,
			scaleX:1, //缩放比
			scaleY:1,
		};
		this.canvas = {     //画布
			elements : {
				person:'',
				background:'',
				menu:''
			},
			ctx : {},
		};
		this.time = {    //时间
			lastTime : 0,
			deltaTime : 0, //每帧间隔时间
		};
		
	}
	
	init(){
		//界面尺寸调整
		game.init_box();
		game.init_ctx(); 
		//加载资源

		//读取存储数据？ 关卡数据
		this.gameloop();
	}

	init_box(){
		this.box.element = document.getElementById("box");
		this.box.width = this.box.element.offsetWidth;
		this.box.height = this.box.width *7/12;
		this.box.scaleX = this.box.width / this.box.originWidth;
		this.box.scaleY = this.box.height / this.box.originHeight;
	}

	init_ctx(){
		this.canvas.elements = {
			person: document.getElementById("canvas_person"),
			background: document.getElementById("canvas_map"),
			menu: document.getElementById("canvas_menu"),
		};
		for(let name in this.canvas.elements){
			this.canvas.ctx[name] = this.canvas.elements[name].getContext("2d");
			this.canvas.elements[name].style.transform = 'scale('+ game.box.scaleX +','+ game.box.scaleY +')';
		}
	}

	

	clearCanavs(){
		for(let name in this.canvas.ctx){
			this.canvas.ctx[name].clearRect(0,0,game.box.originWidth, game.box.originHeight);
		}
	}

	gameloop(){  //画面循环
		let _that = this;
		window.requestAnimFrame(()=>{_that.gameloop()}); //跟随屏幕分辨率setInterval
		//按键
		keyboard._loop_keyBoard();
		if(_that.control){

			//清屏
			_that.clearCanavs();
			
			//绘制画面
			this.canvas.ctx.person.save();
			this.canvas.ctx.background.save();
			let x = player.position.x - (720-48)/2;
			let y = player.position.y - (420-48)/2;
			this.canvas.ctx.person.translate(-x,-y);
			this.canvas.ctx.background.translate(-x,-y);
			//地图绘制
			map._draw();
			//玩家player绘制
			player._draw();
			//菜单绘制
			menu._draw();
			this.canvas.ctx.person.restore();
			this.canvas.ctx.background.restore();

			var now = new Date();
			_that.time.deltaTime = now - _that.time.lastTime;
			if(_that.time.deltaTime > 40){
				_that.time.deltaTime = 40;
			}
			_that.time.lastTime = now;
		}
	}
}


class LoadData {
	constructor() {
		this.num = 0; //图片总数
		this.successNum = 0; //成功加载数量
		this.imagesUrl = {
			person:{
				player:'images/playerGirl.png',
			},
			map:{
				'm_001':'images/mapElements01.dib',
			},
			others:{
				'border':'images/menuframes.png',
				'triangle':'images/triangle.png',
			},
		};
		this.imageObj = {
			person:{
				player:''
			},
			map:{},
			others:{},
		};
	}
	
	init(){
		return new Promise((resolve, reject) => {
		    let _that = this;
			_that.num = 0;
			_that.successNum = 0;
			for(let arrName in _that.imagesUrl){
				for(let src in _that.imagesUrl[arrName]){
					_that.num++;
					let Img = new Image();
					Img.src = _that.imagesUrl[arrName][src];
					console.log(_that.imagesUrl[arrName][src]);
					if(Img.complete){
						_that.imageObj[arrName][src] = Img;
						_that.successNum++;
						console.log(_that.num +' , '+ _that.successNum);
						if(_that.num == _that.successNum){
							resolve('全部资源加载完毕');
							return true;
						}
					}else{
						Img.onload = function(){
					        _that.imageObj[arrName][src] = Img;
							_that.successNum++;
							console.log(_that.num +' , '+ _that.successNum);
							if(_that.num == _that.successNum){
								resolve('全部资源加载完毕');
								return true;
							}
					    };	
					    Img.onerror=function(){
					    	reject('加载出错 '+ Img.src);
					    }; 
					}
				}
			}
		});
	}
}

window.onload=function(){
	//游戏尺寸调整
	$(window).resize(function() {
		//调整尺寸
		if(game){
			game.init_box();
		  	game.init_ctx(); 		
		}
	});

	function startGame(){
		var game = new Game();
		window.game = game;
		var player = new Player('赵日天','男','23');
		window.player = player;
		var map = new Map('m_001');
		window.map = map;
		var menu = new Menu();
		window.menu = menu;
		var keyboard = new Keyboard();
		window.keyboard = keyboard;

		player.init();
		map.init();
		menu.init();
		keyboard.init();
		game.init();
	}	

	var loadData = new LoadData();
	window.loadData = loadData;
	loadData.init().then((msg)=>{
	  console.log(msg);
	  console.log('start game');
	  startGame();
	}, (error)=>{
	  console.error(error);
	});

	

};

