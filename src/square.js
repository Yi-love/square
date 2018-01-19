/**
 * [Square 移动色块游戏原型]
 * Yi-love 2018-01-18
 * @param {[type]} options [description]
 */
function Square(options){
  this.h = options.h || 0;
  this.w = options.w || 0;
  this.defVal = 'defVal' in options ? options.defVal : -1;
  this.matrix = [];
  this.data = options.data || [];
  
  return options.matrix ? this.init().analysisMatrix(options.matrix).padding() : this.init().padding();
}
/**
 * [analysisMatrix 解析矩阵]
 * @param  {[type]} matrix [n*m矩阵]
 * @return {[type]}        [description]
 */
Square.prototype.analysisMatrix = function(matrix) {
  for ( var i = 0 ; i < this.h ; i++ ){
    for ( var j = 0 ; j < this.w ; j++ ){
      if ( matrix[i][j] !== this.defVal ){
        var index = this.find(matrix[i][j]);
        if ( index < 0 ){
          index = this.data.length;
          this.data[index] = {};
          //起始坐标
          this.data[index].px = 'px' in this.data[index] ? this.data[index].px : i;
          this.data[index].py = 'py' in this.data[index] ? this.data[index].py : j;
          //值
          this.data[index].value = matrix[i][j];
        }
        //形状大小
        this.data[index].w = Math.max(j - this.data[index].py + 1 , 0 , this.data[index].w || 0);
        this.data[index].h = Math.max(i - this.data[index].px + 1 , 0 , this.data[index].h || 0);
      }
    }
  }
  return this;
};
/**
 * [init 用默认值初始化]
 * @param  {[type]} matrix [description]
 * @return {[type]}        [description]
 */
Square.prototype.init = function(matrix) {
  this.matrix = [];
  for (var i = 0; i < this.h ; i++) {
    var mxArr = [];
    for (var j = 0; j < this.w ; j++) {
      mxArr.push(matrix && matrix[i] && matrix[i][j] !== void 0 ? matrix[i][j] : this.defVal);
    }
    this.matrix.push([].concat(mxArr));
  }
  return this;
};
/**
 * [setMatrixValue 填充色块进来]
 * @param  {[type]} px    [起始位置：x]
 * @param  {[type]} py    [起始位置：y]
 * @param  {[type]} h     [高]
 * @param  {[type]} w     [宽]
 * @param  {[type]} value [值]
 * @return {[type]}       [description]
 */
Square.prototype.setMatrixValue = function(px , py , h , w , value) {
  for( var i = px ; i < px + h ; i++ ){
    for ( var j = py ; j < py + w ; j++ ){
      this.matrix[i][j] = value;
    }
  }
  return this;
};
/**
 * [padding 填充]
 * @return {[type]} [description]
 */
Square.prototype.padding = function() {
  for ( var i = 0 ; i < this.data.length ; i++ ){
    this.data[i].value = 'value' in this.data[i] ? this.data[i].value : i;
    this.setMatrixValue(this.data[i].px , this.data[i].py , this.data[i].h , this.data[i].w , this.data[i].value);
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
 * [isCanMove 是否能移动]
 * @param  {[type]}  px [坐标x]
 * @param  {[type]}  py [坐标y]
 * @param  {[type]}  h  [高]
 * @param  {[type]}  w  [宽]
 * @return {Boolean}    [description]
 */
Square.prototype.isCanMove = function(px , py , h , w) {
  for ( var i = px ; i < px + h ; i++ ){
    for ( var j = py ; j < py + w ; j++ ){
      if (this.matrix[i][j] !== this.defVal){
        return false;
      }
    }
  }
  return true;
};
/**
 * [exchangeRow 调整行]
 * @param  {[type]} index [description]
 * @param  {[type]} step  [description]
 * @return {[type]}       [description]
 */
Square.prototype.exchangeRow = function(index , step) {
  var shape = this.data[index];

  var px = shape.px + (step === 1 ? shape.h : step);
  px = Math.max(Math.min(px , this.h - 1) , 0);

  if (!this.isCanMove(px , shape.py , 1 , shape.w)){
    return false;
  }
  var dx = Math.max(Math.min(shape.px + (step === 1 ? 0 : shape.h + step) , this.h - 1) , 0);
  this.setMatrixValue(px , shape.py , 1 , shape.w , shape.value);
  this.setMatrixValue(dx , shape.py , 1 , shape.w , this.defVal);

  this.data[index].px = shape.px + step;
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

  var py = shape.py + (step === 1 ? shape.w : step);
  py = Math.max(Math.min(py , this.w - 1) , 0);

  if (!this.isCanMove(shape.px , py , shape.h , 1) ){
    return false;
  }
  var dy = Math.max(Math.min(shape.py + (step === 1 ? 0 : shape.w + step) , this.w - 1) , 0);
  this.setMatrixValue(shape.px , py , shape.h , 1 , shape.value);
  this.setMatrixValue(shape.px , dy , shape.h , 1 , this.defVal);

  this.data[index].py = shape.py + step;
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
  for (var i = 0; i < this.h; i++) {
    var str = '';
    for (var j = 0; j < this.w ; j++) {
      str += this.matrix[i][j] + ' ';
    }
    console.log(str +' =>' + i);
  }
};

module.exports = Square;