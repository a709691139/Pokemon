window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 100);
		};
})();
//碰撞检测
function rectangleCollision(x1, y1, w1, h1, x2, y2, w2, h2, overlap) {
	A1 = x1 + overlap;
	B1 = x1 + w1 - overlap;
	C1 = y1 + overlap;
	D1 = y1 + h1 - overlap;

	A2 = x2 + overlap;
	B2 = x2 + w2 - overlap;
	C2 = y2 + overlap;
	D2 = y2 + h2 - overlap;

	if (A1 < B2 && B1 > A2 && C1 < D2 && D1 > C2) {
		return true;
	}
	else{
		return false;
	} 
}
//限制物体 在盒子里面
//box width height
//obj x y width height
//偏差值重叠 overlap
function inTheBox(boW, bowH, oX, oY, oW, oH){
	oW *= 0.5;
	oH *= 0.5;
	if(oX < -oW){//左
		oX = -oW;
	}
	else if(oX > boW - oW){//右
		oX = boW - oW ;
	}
	if(oY < -oH){//上
		oY = -oH;
	}
	else if(oY > bowH - oH){//下
		oY = bowH - oH;
	}
	return {"x" : oX,"y" : oY};
}

/*判断是否为电脑*/
function IsPC()  
{  
   var userAgentInfo = navigator.userAgent;  
   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
   var flag = true;  
   for (var v = 0; v < Agents.length; v++) {  
       if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
   }  
   return flag;  
}     




function calLength2(x1, y1, x2, y2) {  //计算两点距离
	return  Math.pow( Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) , 1/2);
}


function randomColor() {
	var col = [0, 1, 2];
	col[0] = Math.random() * 100 + 155;
	col[0] = col[0].toFixed();
	col[1] = Math.random() * 100 + 155;
	col[1] = col[1].toFixed();
	col[2] = Math.random() * 100 + 155;
	col[2] = col[2].toFixed();
	var num = Math.floor(Math.random() * 3);
	col[num] = 0;
	return "rgba(" + col[0] + "," + col[1] + "," + col[2] + ",";
}


function lerpAngle(a, b, t) {
	var d = b - a;
	if (d > Math.PI) d = d - 2 * Math.PI;
	if (d < -Math.PI) d = d + 2 * Math.PI;
	return a + d * t;
}

function lerpDistance(aim, cur, ratio) {
	var delta = cur - aim;
	return aim + delta * ratio;
}

function inOboundary(arrX, arrY, l, r, t, b) { //在l r t b范围内的检测
	return arrX > l && arrX < r && arrY > t && arrY < b;
}

function rgbColor(r, g, b) {
	r = Math.round(r * 256);
	g = Math.round(g * 256);
	b = Math.round(b * 256);
	return "rgba(" + r + "," + g + "," + b + ",1)";
}

function rgbNum(r, g, b) {
	r = Math.round(r * 256);
	g = Math.round(g * 256);
	b = Math.round(b * 256);
	return "rgba(" + r + "," + g + "," + b;
}

function rnd(m) {
	var n = m || 1;
	return Math.random() * n;
}

function rateRandom(m, n) {
	var sum = 0;
	for (var i = 1; i < (n - m); i++) {
		sum += i;

	}

	var ran = Math.random() * sum;

	for (var i = 1; i < (n - m); i++) {
		ran -= i;
		if (ran < 0) {
			return i - 1 + m;
		}
	}
}

function distance(x1, y1, x2, y2, l) {
	var x = Math.abs(x1 - x2);
	var y = Math.abs(y1 - y2);
	if (x < l && y < l) {
		return true;
	}
	return false;
}



function dis2(x, y, x0, y0) {
	var dx = x - x0;
	var dy = y - y0;
	return dx * dx + dy * dy;
}

function rndi2(m, n) {
	var a = Math.random() * (n - m) + m;
	return Math.floor(a);
}