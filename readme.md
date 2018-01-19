## Square 
移动方块小游戏-源码版


### npm install

```js
var Square = require('square');

// options one
var options = {
  h: 5,   //高
  w: 4,  //长
  data: [{ //数据
    px: 0,//坐标
    py: 0,
    h:1, //高
    w:1,//宽
    value: 0,//保存的唯一值。默认为 index
  },{
    px: 0,
    py: 1,
    w:2,
    h:1,
    value: 1
  },{
    px: 0, 
    py: 3,
    h: 1,
    w: 1, 
    value: 2 
  },{
    px: 1,
    py: 0,
    w:1,
    h:2,
    value: 3
  },{
    px: 1,
    py: 1,
    w:2,
    h:2,
    value: 4
  },{
    px: 1,
    py: 3,
    w:1,
    h: 2,
    value: 5
  },{
    px: 3,
    py: 0,
    w: 1,
    h: 2,
    value: 6
  },{
    px: 3,
    py: 1,
    w: 1,
    h: 1,
    value: 7
  },{
    px: 3,
    py: 2,
    w:1,
    h:1,
    value: 8
  },{
    px: 3,
    py: 3,
    w: 1,
    h: 2,
    value: 9
  }]
};

// options two
var options = {
  w: 4,
  h: 5,
  matrix: [ [0 , 1 , 1 , 2],
            [3 , 4 , 4 , 5],
            [3 , 4 , 4 , 5],
            [6 , 7 , 8 , 9],
            [6 ,-1 ,-1 , 9]]
};

var square = new Square(options);

```

## use

![test](./test.jpg)