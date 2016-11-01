"use strict";

/*战斗界面 start*/
var game = {
	state: {
		ongoing: false,
		winOrlose: false
	},
	control: false, //游戏开始|暂停
	box: {
		element: document.getElementById("box"),
		originWidth: 720, //源宽高
		originHeight: 420,
		width: 0, //当前宽高
		height: 0,
		scaleX: 1, //缩放比
		scaleY: 1,
		init: function init() {
			this.width = game.box.element.offsetWidth;
			this.height = this.width * 7 / 12;
			this.scaleX = this.width / this.originWidth;
			this.scaleY = this.height / this.originHeight;
		}
	},
	ctx: { //画布
		canvas1: document.getElementById("canvas1"),
		ctx1: document.getElementById("canvas1").getContext("2d"),
		init: function init() {
			// this.canvas1.setAttribute("width",game.box.originWidth);
			// this.canvas1.setAttribute("height",game.box.originHeight);
			this.canvas1.style.transform = 'scale(' + game.box.scaleX + ',' + game.box.scaleY + ')';
		},
		clearCanavs: function clearCanavs() {
			this.ctx1.clearRect(0, 0, game.box.originWidth, game.box.originHeight);
		}
	},
	time: { //时间
		lastTime: 0,
		deltaTime: 0 },
	init: function init() {
		//键盘鼠标初始化
		//读取存储数据？ 关卡数据

		game.gameloop();
	},
	gameloop: function gameloop() {
		//画面循环
		window.requestAnimFrame(game.gameloop); //跟随屏幕分辨率setInterval
		if (game.control) {
			var now = new Date();
			game.time.deltaTime = now - game.time.lastTime;
			if (game.time.deltaTime > 40) {
				game.time.deltaTime = 40;
			}
			game.time.lastTime = now;
			game.ctx.clearCanavs();

			//game.background.draw();
		}
	},
	collision: function collision() {
		//碰撞检测
		//检测敌军是否碰撞上 子弹和飞机 
		for (var i = 0; i < game.eSoldier.num; i++) {
			if (game.eSoldier.alive[i]) {
				//与子弹碰撞
				for (var j = 0; j < game.bullet.num; j++) {
					if (game.bullet.alive[j]) {
						if (rectangleCollision(game.eSoldier.x[i], game.eSoldier.y[i], game.eSoldier.width[i], game.eSoldier.height[i], game.bullet.x[j], game.bullet.y[j], game.bullet.width, game.bullet.height, 1)) {
							game.eSoldier.beAttacked(i);
							game.bullet.beAttacked(j);
						}
					}
				}
				//与飞机碰撞
				if (rectangleCollision(game.eSoldier.x[i], game.eSoldier.y[i], game.eSoldier.width[i], game.eSoldier.height[i], game.plane.x, game.plane.y, game.plane.width, game.plane.height, 10) && !game.plane.noBeAttarct && game.plane.alive) {
					game.plane.beAttacked();
				}
			}
		}
		//检测boss是否碰撞上 子弹和飞机
		for (var i = 0; i < game.eBoss.num; i++) {
			if (game.eBoss.alive[i]) {
				//与子弹碰撞
				for (var j = 0; j < game.bullet.num; j++) {
					if (game.bullet.alive[j]) {
						if (rectangleCollision(game.eBoss.x[i], game.eBoss.y[i], game.eBoss.width[i], game.eBoss.height[i], game.bullet.x[j], game.bullet.y[j], game.bullet.width, game.bullet.height, 1)) {
							game.bullet.beAttacked(j);
							game.eBoss.beAttacked(i);
						}
					}
				}
				//与飞机碰撞
				if (rectangleCollision(game.eBoss.x[i], game.eBoss.y[i], game.eBoss.width[i], game.eBoss.height[i], game.plane.x, game.plane.y, game.plane.width, game.plane.height, 10) && !game.plane.noBeAttarct && game.plane.alive) {
					game.plane.beAttacked();
				}
			}
		}
	}
};
/*战斗界面 end*/