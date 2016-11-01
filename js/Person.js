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
      current: '',  //当前图片
    };
  }

  _sayName() {
    console.log(this.name);
  }

  _draw(){  //绘制画面
    game.ctx.ctx1.drawImage(this.images.current, this.position.x, this.position.y, 403, 78, 0, 0, this.aspect.width, this.aspect.height);
  }

  _move(){  //人物移动
    let _that = this;
    return{
      left(){
        // _that._sayName();
        console.log('l');
      },
      right(){
        console.log('r');
      },
      top(){
        console.log('t');
      },
      bottom(){
        console.log('b');
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
    };
    this.aspect = {  
      width:50,
      height:50,
    };
    this.position = { //基本位置 
      x:0,
      y:0,
    };
  }

  _init(){
    let _that = this;
    let Img = new Image();
    //console.log(ImgArray[x1][x2].src);
    Img.src = this.images.url;
    if(Img.complete){
      _that.images.current = Img;

      _that._draw();
    }else{
      Img.onload = function(){
        _that.images.current = this;
        _that._draw();
      };
    };  
  }



  _sayAge(){
    console.log(this.age);
  }
}