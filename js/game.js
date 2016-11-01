window.onload=function(){
	//游戏尺寸调整
	$(window).resize(function() {
		//调整尺寸
		game.box.init();
	  	game.ctx.init(); 	
	});
	

	
};

var loadData = {
	num:0, //图片总数
	successNum:0, //成功加载数量
	imagesUrl:{
		person:{
			player:'images/playerGirl.png',
		},
		map:{}
	},
	imageObj:{
		person:{
			player:''
		},
		map:{}
	},
	loading(resolve, reject){
		let _that = this;
		_that.num = 0;
		_that.successNum = 0;
		let _success = ()=>{
			_that.imageObj[arrName][src] = this;
			_that.successNum++;
			console.log(_that.num +' , '+ _that.successNum);
			if(_that.num == _that.successNum){
				console.log('全部资源加载完毕');
				return true;
			}
		};
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
						console.log('全部资源加载完毕');
						resolve('全部资源加载完毕');
						return true;
					}
				}else{
					Img.onload = function(){
				        _that.imageObj[arrName][src] = Img;
						_that.successNum++;
						console.log(_that.num +' , '+ _that.successNum);
						if(_that.num == _that.successNum){
							console.log('全部资源加载完毕');
							return true;
						}
				    };	
				    Img.onerror=function(){
				    	console.log('加载出错 ', Img.src);
				    	reject('加载出错 ', Img.src);
				    	throw new Error('加载图片出错了');
				    }; 
				}
			}
		}
	},
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

loadData.init().then((msg)=>{
  console.log('加载成功');
}, (error)=>{
  console.error('出错了', error);
});

console.log('game');
var game = {
	state : { 
		ongoing : false, 
		winOrlose : false
	},
	control : true,  //游戏开始|暂停
	box:{
		element:document.getElementById("box"),
		originWidth:720,  //源宽高
		originHeight:420,
		width:0,  //当前宽高
		height:0,
		scaleX:1, //缩放比
		scaleY:1,
		init: function(){
			this.width = game.box.element.offsetWidth;
			this.height = this.width *7/12;
			this.scaleX = this.width / this.originWidth;
			this.scaleY = this.height / this.originHeight;
		}
	},
	ctx : {     //画布
		canvas1 : document.getElementById("canvas1"),
		ctx1 : document.getElementById("canvas1").getContext("2d"),
		init :function(){
			// this.canvas1.setAttribute("width",game.box.originWidth);
			// this.canvas1.setAttribute("height",game.box.originHeight);
			this.canvas1.style.transform = 'scale('+ game.box.scaleX +','+ game.box.scaleY +')';
		},
		clearCanavs :function(){
			this.ctx1.clearRect(0,0,game.box.originWidth, game.box.originHeight);
		}
	},
	time : {    //时间
		lastTime : 0,
		deltaTime : 0, //每帧间隔时间
	},
	keyBoard :{
		init:function(){
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
	},
	init : function(){
		//加载资源
		
		//键盘鼠标初始化
		game.keyBoard.init();

		//读取存储数据？ 关卡数据
		game.gameloop();
	},
	gameloop : function(){  //画面循环
		window.requestAnimFrame(game.gameloop); //跟随屏幕分辨率setInterval
		if(game.control){
			var now = new Date();
			game.time.deltaTime = now - game.time.lastTime;
			if(game.time.deltaTime > 40){
				game.time.deltaTime = 40;
			}
			game.time.lastTime = now;
			game.ctx.clearCanavs();

			//玩家player绘制
			player._draw();

		}
	},
	collision : function(){ //碰撞检测
		//检测敌军是否碰撞上 子弹和飞机 
		for(var i = 0; i<game.eSoldier.num; i++){
			if(game.eSoldier.alive[i]){
				//与子弹碰撞
				for(var j = 0; j<game.bullet.num; j++){
					if(game.bullet.alive[j]){
						if( rectangleCollision( game.eSoldier.x[i], game.eSoldier.y[i], game.eSoldier.width[i], game.eSoldier.height[i], game.bullet.x[j], game.bullet.y[j], game.bullet.width, game.bullet.height, 1 ) ){
							game.eSoldier.beAttacked(i);
							game.bullet.beAttacked(j);
						}
					}
				}
				//与飞机碰撞
				if( rectangleCollision( game.eSoldier.x[i], game.eSoldier.y[i], game.eSoldier.width[i], game.eSoldier.height[i], game.plane.x, game.plane.y, game.plane.width, game.plane.height, 10 ) && !game.plane.noBeAttarct && game.plane.alive){
					game.plane.beAttacked();
				}
			}
		}
		//检测boss是否碰撞上 子弹和飞机
		for(var i = 0; i<game.eBoss.num; i++){
			if(game.eBoss.alive[i]){
				//与子弹碰撞
				for(var j = 0; j<game.bullet.num; j++){
					if(game.bullet.alive[j]){
						if( rectangleCollision( game.eBoss.x[i], game.eBoss.y[i], game.eBoss.width[i], game.eBoss.height[i], game.bullet.x[j], game.bullet.y[j], game.bullet.width, game.bullet.height, 1 ) ){
							game.bullet.beAttacked(j);
							game.eBoss.beAttacked(i);
							
						}
					}
				}
				//与飞机碰撞
				if( rectangleCollision( game.eBoss.x[i], game.eBoss.y[i], game.eBoss.width[i], game.eBoss.height[i], game.plane.x, game.plane.y, game.plane.width, game.plane.height, 10 ) && !game.plane.noBeAttarct && game.plane.alive){
					game.plane.beAttacked();
				}
			}
		}
	},
};

var player = new Player('赵日天','男','23');
player._init();
setTimeout(function(){game.init();},2000)
// game.init();