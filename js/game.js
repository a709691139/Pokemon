class Game {
	constructor() {
		this.state = { 
			ongoing : false, 
			winOrlose : false
		};
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
		this.onKeepKey = { //当前正在按的按键
			left:{
				keyCode: 37,
				time: 0,
				func: '',
				on: false,
				together: false,
			},
			right:{
				keyCode: 39,
				time: 0,
				func: '',
				on: false,
				together: false,
			},
			up:{
				keyCode: 38,
				time: 0,
				func: '',
				on: false,
				together: false,
			},
			down:{
				keyCode: 40,
				time: 0,
				func: '',
				on: false,
			},
			enter:{
				keyCode: 13,
				time: 0,
				func: '',
				on: false,
				together: false,
			},
		};
	}
	
	init(){
		//界面尺寸调整
		game.init_box();
		game.init_ctx(); 
		//加载资源
		
		//键盘鼠标初始化
		this.init_keyBoard();

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

	init_keyBoard(){
		this.onKeepKey.left.func = player._move().left;
		this.onKeepKey.right.func = player._move().right;
		this.onKeepKey.up.func = player._move().up;
		this.onKeepKey.down.func = player._move().down;
		this.onKeepKey.enter.func = player._join;
		let _that = this;
		let Time = 0;
		//keydown记录按下的键，keyup取消，
		$(document).keydown(function(event){ 
			for(let i in _that.onKeepKey){
				let val = _that.onKeepKey[i];
				if( val.keyCode == event.keyCode ){
					//console.log('按下',i, !val.on?'触发':'不触发',new Date - val.time, val.together);
					if( !val.on ){ 
						val.on = true; 
						val.together = false;
						val.time = new Date(); 
						//console.log('new Time');
						break;
					}
				}else{
					//暂时停止其他的同按，抬起时就回复其他的同按
					if( val.on ){
						val.on = false;
						val.together = true;
						!val.together && (val.together = true);
					}	
				}
			};
        });
		$(document).keyup(function(event){ 
			for(let i in _that.onKeepKey){
				let val = _that.onKeepKey[i];
				if( val.keyCode == event.keyCode ){
					//console.log('抬起',i);
					val.on = false;
					val.together = false;
					break;
				}
				if( val.together && !val.on){
					val.together = false;
					val.on = true;
				}
			};
        });
	}

	fn_loop_keyBoard(){
		//判断按钮 执行相关方法
		for(let i in this.onKeepKey){
			let val = this.onKeepKey[i];
			if( val.on ){
				let key = new Date - val.time > 200 ? 1 : 0;
				//console.log( i , key==0?'短按':'长按' , val.time, new Date - val.time );
				val.func(key);//0短按 1长按
			}
		};
	}

	clearCanavs(){
		for(let name in this.canvas.ctx){
			this.canvas.ctx[name].clearRect(0,0,game.box.originWidth, game.box.originHeight);
		}
	}

	gameloop(){  //画面循环
		let _that = this;
		window.requestAnimFrame(()=>{_that.gameloop()}); //跟随屏幕分辨率setInterval
		if(_that.control){
			var now = new Date();
			_that.time.deltaTime = now - _that.time.lastTime;
			if(_that.time.deltaTime > 40){
				_that.time.deltaTime = 40;
			}
			_that.time.lastTime = now;
			//清屏
			_that.clearCanavs();
			//按键
			_that.fn_loop_keyBoard();
			//绘制画面
			this.canvas.ctx.person.save();
			let x = player.position.x - (720-48)/2;
			let y = player.position.y - (420-48)/2;
			this.canvas.ctx.person.translate(-x,-y);
			//玩家player绘制
			player._draw();
			this.canvas.ctx.person.restore();

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
			map:{}
		};
		this.imageObj = {
			person:{
				player:''
			},
			map:{}
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
		player.init();
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

