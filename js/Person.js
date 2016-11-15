class Person {
  constructor( name,sex ) {
    this.name = name;
    this.sex = sex;
    this.position = { //基本位置 
      x:0,
      y:0,
      x_index:1,
      y_index:2,
    };
    this.aspect = {  //人物宽高
      width:0,
      height:0,
    };
    this.images = {  //人物图片 ,以图片左上角为初始点，先考虑用（整图，需计算裁剪图）还是多图(直接切换图片src)
      url: '',
      walk: [], //走路 存src或位置
      run: [],  //奔跑
      cycle:[], //单车
      current: '',  //当前图片obj
      currentIndex:{
        arr:0, //0走路 1跑 2车
        img:0, //方向图 0-2下  3-5右 6-8上 9-11左
        direct:0,  // 0下  1右 2上 3左 面朝方向
        lastDirect:0, //上次方向
      }
    };
    this.isMoveing = false; //移动一步
    this.moveTime = 0;      //移动切换图片定时器
    this.movedStepDistant = 0; //移动一步已经走过的距离
    this.keyDownLength = 1; //按键的0短按：1长按
  }

  _draw(){  //绘制画面   
  }

  _changePosition(direct,speed=0,distant=0){
    speed = (speed==0)?distant:speed;
    switch(direct){
      case 3:
      this.position.x -= speed;
      break;
      case 1:
      this.position.x += speed;
      break;
      case 2:
      this.position.y -= speed;
      break;
      case 0:
      this.position.y += speed;
      break;
    }
  }

  _moveStep(){//移动一步
    if(!this.isMoveing){ return false; }

    let onceTime = 0;
    let direct =  this.images.currentIndex.direct;//当前方向
    let index = 3 * direct; //图片index
    let stepDistant = 0; //一步距离
    let speed = 0; //移动速度
    //console.log(this.keyDownLength, this.images.currentIndex.lastDirect,direct );
    if( this.keyDownLength==0 && this.images.currentIndex.lastDirect!=direct ){
      // 1、短按&方向不同   180ms完成  动画 1 2 0
      onceTime = 200;
      speed = 0;
      stepDistant = 0;
      //console.log('切换方向');
    }else{
      // 2、短按|长按: 走一步 走路动画,400ms内走完
      onceTime = 400;
      stepDistant = this.aspect.width;
      speed = (stepDistant/onceTime) * game.time.deltaTime;
      //console.log('走路');
      //位置index更新
      if(this.moveTime==0){
        let x_index = this.position.x_index,
            y_index = this.position.y_index;
        switch(direct){
          case 3:
          x_index--;
          break;
          case 1:
          x_index++;
          break;
          case 2:
          y_index--;
          break;
          case 0:
          y_index++;
          break;
        }
        
        //判断下一步的位置是否可以进入
        let nextArrayBlock = map.array[y_index][x_index];
        let nextBlock = map.block.elements[nextArrayBlock.id];
        nextArrayBlock.type && (nextBlock.type = nextArrayBlock.type);
        nextBlock.id = nextArrayBlock.id;
        //console.log('下一步位置',x_index,y_index,nextBlock);
        if( nextBlock.type==1 ){;
          this.isMoveing = false;
          return false;
        }else{
          this.position.x_index = x_index;
          this.position.y_index = y_index;
        }
      }

      
    }
    //移动
    this._changePosition(direct ,speed);
    this.movedStepDistant += speed; 
    
    this.moveTime += game.time.deltaTime;
    //切换图 
    //
    if(this.moveTime > onceTime){
      //会有时间误差的，没到达最远距离，下面直接瞬移过去
      this.moveTime = 0;
      //回归站立图
      this.images.currentIndex.img = index;
      this.isMoveing = false;
      //去到一步最大距离
      this._changePosition(direct ,0, (stepDistant - this.movedStepDistant));
      this.movedStepDistant = 0;
      //上次方向改变
      this.images.currentIndex.lastDirect = direct;
      this.keyDownLength = 1;
      //console.log('走完||切换  结束');
      return false;
    }

    let add = 0;
    
    if(speed == 0){
      if(this.moveTime < onceTime/2){
        add = 1;
      }else{
        add = 0;
      }
    }else{
      let imgIndex = Math.floor( this.moveTime / onceTime * 3 );
      switch(imgIndex){
        case 0:
        add = 1;
        break;
        case 2:
        add = 2;
        break;
      }
    }
    
    
    
    this.images.currentIndex.img = index + add;
    
    //console.log(this.images.currentIndex.img);

    //console.log(this.moveTime , this.position.y);
    //console.log(this.moveTime, this.images.currentIndex.img);
  }

  _keyDownChangeDirection(key,direct){//key 0短按，1长按
    if(!this.isMoveing){
      this.images.currentIndex.direct = direct;
      this.isMoveing = true;
      if(key==0){
        this.keyDownLength = 0;
      }
      //console.log( key==0?'短按':'长按' );
    }
  }

  _move(){  //人物移动
    //按着键盘200ms抬起就是 纯切换方向，继续就是向前一步
    let _that = this;
    return{
      left(key){ //key 0短按，1长按
        _that._keyDownChangeDirection(key,3);
      },
      right(key){
        _that._keyDownChangeDirection(key,1);
      },
      up(key){
        _that._keyDownChangeDirection(key,2);
      },
      down(key){
        _that._keyDownChangeDirection(key,0);
      }  
    }
  }

  _join(){ //点确定，交接交互功能，捡道具之类的

  }
}

class Player extends Person {
  constructor(name='未命名',sex='男',age=6) {
    super(name,sex);
    this.age = age;
    this.images.url = 'images/playerGirl.png';
    this.aspect = {  
      width:16*3,
      height:18*3,
      alignDeviation:{
        x:6,
        y:-6,
      }
    };
    this.position = { //基本位置 
      x:0,
      y:0,
      x_index:1,
      y_index:2,
    };
  }

  init(){
    this.images.current = loadData.imageObj.person.player;
    this.position.x = this.position.x_index*48;
    this.position.y = this.position.y_index*48;
    let {x:numsX, y:numsY} =  map.block.nums;
  }
  _draw(){  //绘制画面
    if(game){
      this._moveStep();
      game.canvas.ctx.person.drawImage(this.images.current, (20+15)*this.images.currentIndex.img, 26*this.images.currentIndex.arr, 24, 26, this.position.x+this.aspect.alignDeviation.x, this.position.y+this.aspect.alignDeviation.y, this.aspect.width, this.aspect.height);
    }
  }
}