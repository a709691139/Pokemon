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
        direct:0,  // 0下  1右 2上 3左
      }
    };
  }

  _draw(){  //绘制画面   
  }

  _changeImgIndex(direction){
    let index = 3 * direction;
    if(this.images.currentIndex.direct != direction){ 
      console.log('切换方向');
      this.images.currentIndex.direct = direction;   
      this.images.currentIndex.img = index;
    }else{
      switch(direction){
        case 3:
        this.position.x -=10;
        break;
        case 1:
        this.position.x +=10;
        break;
        case 2:
        this.position.y -=10;
        break;
        case 0:
        this.position.y +=10;
        break;
      }
      this.images.currentIndex.img++;
      if(this.images.currentIndex.img >= index+3){
        this.images.currentIndex.img = index;
      }  
    }
    
  }
  _move(){  //人物移动
    let _that = this;

    return{
      left(){
        //_that.position.x -=10;
        _that._changeImgIndex(3);
      },
      right(){
       // _that.position.x +=10;
        _that._changeImgIndex(1);
      },
      top(){
        //_that.position.y -=10;
        _that._changeImgIndex(2);
      },
      bottom(){
        //_that.position.y +=10;
        _that._changeImgIndex(0);
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
      game.ctx.ctx1.drawImage(this.images.current, (20+14.5)*this.images.currentIndex.img, 26*this.images.currentIndex.arr, 24, 26, this.position.x, this.position.y, this.aspect.width, this.aspect.height);
      // for(let i=0;i<=12;i++){
      //   game.ctx.ctx1.drawImage(this.images.current, (20+14.5)*i, 26*0, 24, 26, this.position.x+this.aspect.width*i, this.position.y, this.aspect.width, this.aspect.height);
      //   game.ctx.ctx1.drawImage(this.images.current, (20+14.5)*i, 26*1, 24, 26, this.position.x+this.aspect.width*i, this.position.y+this.aspect.height*1, this.aspect.width, this.aspect.height);
      //   game.ctx.ctx1.drawImage(this.images.current, (20+14.5)*i, 26*2, 24, 26, this.position.x+this.aspect.width*i, this.position.y+this.aspect.height*2, this.aspect.width, this.aspect.height);
      // }
    }
    
  }
}