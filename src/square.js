/**
 * [Square 移动色块游戏原型]
 * Yi-love 2018-01-18
 * @param {[type]} options [description]
 */
function Square(options){
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.defVal = 'defVal' in options ? options.defVal : -1;
  this.matrix = [];
  this.shapes = options.shapes;
  this.data = options.data;
  return this.init(options.matrix).renderSquare();
}
/**
 * [init 用默认值初始化]
 * @param  {[type]} matrix [description]
 * @return {[type]}        [description]
 */
Square.prototype.init = function(matrix) {
  this.matrix = [];
  for (var i = 0; i < this.x ; i++) {
    var mxArr = [];
    for (var j = 0; j < this.y ; j++) {
      mxArr.push(matrix && matrix[i] && matrix[i][j] !== void 0 ? matrix[i][j] : this.defVal);
    }
    this.matrix.push([].concat(mxArr));
  }
  return this;
};
/**
 * [renderShape 填充色块进来]
 * @param  {[type]} px    [起始位置：x]
 * @param  {[type]} py    [起始位置：y]
 * @param  {[type]} x     [lenx]
 * @param  {[type]} y     [leny]
 * @param  {[type]} value [值]
 * @return {[type]}       [description]
 */
Square.prototype.renderShape = function(px , py , x , y , value) {
  for( var i = px ; i < px + x ; i++ ){
    for ( var j = py ; j < py + y ; j++ ){
      this.matrix[i][j] = value;
    }
  }
  return this;
};
/**
 * [renderSquare 填充]
 * @return {[type]} [description]
 */
Square.prototype.renderSquare = function() {
  for ( var i = 0 ; i < this.data.length ; i++ ){
    this.data[i].value = 'value' in this.data[i] ? this.data[i].value : i;
    this.renderShape(this.data[i].x , this.data[i].y , this.shapes[this.data[i].shape].x , this.shapes[this.data[i].shape].y , this.data[i].value);
  }
  return this;
};
/**
 * [find 根据值查询index]
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
Square.prototype.find = function(val) {
  for ( var i = 0 ; i < this.data.length ; i++ ){
    if ( this.data[i].value === val ){
      return i;
    }
  }
  return -1;
};
/**
 * [exchangeRow 调整行]
 * @param  {[type]} index [description]
 * @param  {[type]} step  [description]
 * @return {[type]}       [description]
 */
Square.prototype.exchangeRow = function(index , step) {
  var shape = this.data[index];
  var len = this.shapes[shape.shape];

  var px = shape.x + (step === 1 ? len.x : step);
  px = Math.max(Math.min(px , this.x - 1) , 0);
  for ( var i = shape.y ; i < shape.y + len.y ; i++ ){
    if (this.matrix[px][i] !== this.defVal ){
      return false;
    }
  }
  for ( var i = shape.y ; i < shape.y + len.y ; i++ ){
    this.matrix[px][i] = shape.value;
    this.matrix[Math.max(Math.min(shape.x + (step === 1 ? 0 : len.x + step) , this.x - 1) , 0)][i] = this.defVal;
  }
  this.data[index].x = shape.x + step;
  return true;
};
/**
 * [exchangeCol 调整列]
 * @param  {[type]} index [description]
 * @param  {[type]} step  [description]
 * @return {[type]}       [description]
 */
Square.prototype.exchangeCol = function(index , step) {
  var shape = this.data[index];
  var len = this.shapes[shape.shape];

  var py = shape.y + (step === 1 ? len.y : step);

  py = Math.max(Math.min(py , this.y - 1) , 0);
  for ( var i = shape.x ; i < shape.x + len.x ; i++ ){
    if (this.matrix[i][py] !== this.defVal ){
      return false;
    }
  }
  for ( var i = shape.x ; i < shape.x + len.x ; i++ ){
    this.matrix[i][py] = shape.value;
    this.matrix[i][Math.max(Math.min(shape.y + (step === 1 ? 0 : len.y + step) , this.y - 1) , 0)] = this.defVal;  
  }
  this.data[index].y = shape.y + step;
  return true;
};
/**
 * [move 移动色块]
 * @param  {[type]} val [值]
 * @param  {[type]} dir [方向]
 * @return {[type]}     [description]
 */
Square.prototype.move = function(val , dir) {
  //获取方块信息
  var index = this.find(val);
  if ( index < 0 ) {
    return false;
  }
  if ( dir === 1 ){ //向右
   return this.exchangeCol(index , 1);
  }else if ( dir === 2 ){ //向下
    return this.exchangeRow(index , 1);
  }else if ( dir === 3 ){//向左
    return this.exchangeCol(index , -1);
  }else if ( dir === 4 ){//向上
    return this.exchangeRow(index , -1);
  }
  return false;
};
/**
 * [print 打印辅助]
 * @return {[type]} [description]
 */
Square.prototype.print = function(){
  for (var i = 0; i < this.x; i++) {
    var str = '';
    for (var j = 0; j < this.y ; j++) {
      str += this.matrix[i][j] + ' ';
    }
    console.log(str +' =>' + i);
  }
};

module.exports = Square;