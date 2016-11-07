class Person {
  constructor( name,sex ) {
    this.name = name;
    this.sex = sex;
    this.position = { //基本位置 
      x:0,
      y:0
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
      }
    };
    this.isMoveing = false; //移动一步
    this.moveTime = 0;      //移动切换图片定时器
    this.movedStepDistant = 0; //移动一步走过的距离
  }

  _draw(){  //绘制画面   
  }

  _changePosition(direct,speed,distant){
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
    //走路动画,300ms内走完
    let onceTime = 400;
    this.moveTime += game.time.deltaTime;
    let stepDistant = this.aspect.width; //一步距离
    //移动
    let speed = (stepDistant/onceTime) * game.time.deltaTime;
    this._changePosition(this.images.currentIndex.direct ,speed);
    this.movedStepDistant += speed;

    //切换图
    
    let index = 3 * this.images.currentIndex.direct;
    if(this.moveTime > onceTime){
      //会有时间误差的，没到达最远距离，下面直接瞬移过去
      this.moveTime = 0;
      //回归站立图
      this.images.currentIndex.img = index;
      this.isMoveing = false;
      //去到一步最大距离
      this._changePosition(this.images.currentIndex.direct ,0, (stepDistant - this.movedStepDistant));
      this.movedStepDistant = 0;
      return false;
    }
    let add = 0;
    
    
    let imgIndex = Math.floor( this.moveTime / onceTime * 3 );
    switch(imgIndex){
      case 0:
      add = 1;
      break;
      case 2:
      add = 2;
      break;
    }
    //console.log(imgIndex,add);
    
    this.images.currentIndex.img = index + add;
    

    //console.log(this.moveTime , this.position.y);
    //console.log(this.moveTime, this.images.currentIndex.img);
  }

  _move(){  //人物移动
    //按着键盘200ms抬起就是 纯切换方向，继续就是向前一步
    let _that = this;
    return{
      left(key){ //key 0短按，1长按
        //_that.position.x -=10;
        //_that._changeImgIndex(3);
        if(!_that.isMoveing){
          console.log();
          _that.images.currentIndex.direct = 3;
          _that.isMoveing = true;
        }
      },
      right(){
       // _that.position.x +=10;
       // _that._changeImgIndex(1);
       
        if(!_that.isMoveing){
          _that.images.currentIndex.direct = 1;
          _that.isMoveing = true;

        }
      },
      up(){
        //_that.position.y -=10;
        //_that._changeImgIndex(2);
        
        if(!_that.isMoveing){
          _that.images.currentIndex.direct = 2;
          _that.isMoveing = true;
        }
      },
      down(){
        //_that.position.y +=10;
        //_that._changeImgIndex(0);
        
        if(!_that.isMoveing){
          _that.images.currentIndex.direct = 0;
          _that.isMoveing = true;
        }
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
    this.images = {
      url: 'images/playerGirl.png',
      walk: [],
      run: [], 
      cycle:[], 
      current: '',
      currentIndex:{
        arr:0, //0走路 1跑 2车
        img:0, //方向图 0-2下  3-5右 6-8上 9-11左
        direct:0,  // 0下  1右 2上 3左
      }
    };
    this.aspect = {  
      width:16*3,
      height:18*3,
    };
    this.position = { //基本位置 
      x:0,
      y:0,
    };
  }

  init(){
    this.images.current = loadData.imageObj.person.player;


    // let _that = this;
    // let Img = new Image();
    // //console.log(ImgArray[x1][x2].src);
    // Img.src = this.images.url;
    // if(Img.complete){
    //   //_that.images.current = Img;

    //   _that._draw();
    // }else{
    //   Img.onload = function(){
    //     _that.images.current = this;
    //     //_that._draw();
    //   };
    // };  
  }
  _draw(){  //绘制画面
    if(game){
      this._moveStep();
      game.ctx.ctx1.drawImage(this.images.current, (20+15)*this.images.currentIndex.img, 26*this.images.currentIndex.arr, 24, 26, this.position.x, this.position.y, this.aspect.width, this.aspect.height);

      // for(let i=0;i<=12;i++){
      //   game.ctx.ctx1.drawImage(this.images.current, (20+14.5)*i, 26*0, 24, 26, this.position.x+this.aspect.width*i, this.position.y, this.aspect.width, this.aspect.height);
      //   game.ctx.ctx1.drawImage(this.images.current, (20+14.5)*i, 26*1, 24, 26, this.position.x+this.aspect.width*i, this.position.y+this.aspect.height*1, this.aspect.width, this.aspect.height);
      //   game.ctx.ctx1.drawImage(this.images.current, (20+14.5)*i, 26*2, 24, 26, this.position.x+this.aspect.width*i, this.position.y+this.aspect.height*2, this.aspect.width, this.aspect.height);
      // }
    }
    
  }
}