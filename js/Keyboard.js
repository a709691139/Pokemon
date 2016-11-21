class Keyboard {
    constructor() {
	  	this.onKeepKey = { //当前正在按的按键
			left:{
				keyCode: 65,
				time: 0,
				func: '',
				on: false,
				together: false,
			},
			right:{
				keyCode: 68,
				time: 0,
				func: '',
				on: false,
				together: false,
			},
			up:{
				keyCode: 87,
				time: 0,
				func: '',
				on: false,
				together: false,
			},
			down:{
				keyCode: 83,
				time: 0,
				func: '',
				on: false,
			},
			enter:{
				keyCode: 74,
				time: 0,
				func: '',
				on: false,
				together: false,
			},
			start:{
				keyCode: 13,
				time: 0,
				func: '',
				on: false,
				together: false,
			},
		};
    }
    init(){
		this.onKeepKey.left.func = player._move().left;
		this.onKeepKey.right.func = player._move().right;
		this.onKeepKey.up.func = player._move().up;
		this.onKeepKey.down.func = player._move().down;
		this.onKeepKey.enter.func = player._join;
		this.onKeepKey.start.func = (key)=>{key==0&&console.log('start')};
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

	_loop_keyBoard(){
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
}  
