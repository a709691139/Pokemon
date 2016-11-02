class Game {
	constructor() {
		this.state = { 
			ongoing : false, 
			winOrlose : false
		};
		this.control = true;  //游戏开始|暂停
		this.box = {
			element:document.getElementById("box"),
			originWidth:720,  //源宽高
			originHeight:420,
			width:0,  //当前宽高
			height:0,
			scaleX:1, //缩放比
			scaleY:1,
		};
		this.ctx = {     //画布
			canvas1 : document.getElementById("canvas1"),
			ctx1 : document.getElementById("canvas1").getContext("2d"),
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
		
		//键盘鼠标初始化
		this.init_keyBoard();

		//读取存储数据？ 关卡数据
		this.gameloop();
	}

	init_box(){
		this.box.width = this.box.element.offsetWidth;
		this.box.height = this.box.width *7/12;
		this.box.scaleX = this.box.width / this.box.originWidth;
		this.box.scaleY = this.box.height / this.box.originHeight;
	}

	init_ctx(){
		this.ctx.canvas1.style.transform = 'scale('+ game.box.scaleX +','+ game.box.scaleY +')';
	}

	init_keyBoard(){
		$(document).keydown(function(event){ 
          if(event.keyCode == 37){ 
            //左
            player._move().left();
          }else if (event.keyCode == 39){ 
            //右
            player._move().right();
          } 
          else if (event.keyCode == 38){ 
            //上
            player._move().top();
          } 
          else if (event.keyCode == 40){ 
            //下
            player._move().bottom();
          } 
          else if (event.keyCode == 13){ 
            //确定
            player._move()._join();
          } 
        });
	}

	clearCanavs(){
		this.ctx.ctx1.clearRect(0,0,game.box.originWidth, game.box.originHeight);
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
			_that.clearCanavs();

			//玩家player绘制
			player._draw();

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

