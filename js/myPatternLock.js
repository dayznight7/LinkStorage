
var mpl_row;
var mpl_col;
var mpl_gap;
var mpl_rad;
var mpl_pad;
var mpl_dragging = false;
var mpl_dots = [];
var mpl_path = [];
var mpl_startX;
var mpl_startY;
const mpl_canvas = document.getElementById("mplCanvas");
const mpl_ctx = mpl_canvas.getContext("2d");


function mpl_init(row, col, gap, rad, pad) {
  mpl_row = row;
  mpl_col = col;
  mpl_gap = gap;
  mpl_rad = rad;
  mpl_pad = pad;

  var tmp_w = 2*rad*col + gap*(col-1);
  var tmp_h = 2*rad*row + gap*(row-1);
  $("#mpl").empty();
  $("#mpl").css({
    "width": `${tmp_w}`,
    "height": `${tmp_h}`,
    "padding": `${mpl_pad}px`,
    "grid-template-columns": `repeat(${mpl_col}, 1fr)`,
    "grid-template-rolumns": `repeat(${mpl_row}, 1fr)`,
    "gap": `${gap}px`
  });
  for (var i=0; i<mpl_row*mpl_col; i++) {
    $("#mpl").append(`<div id='outcircle${i}' class='outcircle'><div id='incircle${i}' class='incircle'></div></div>`);
  }
  $("#mplCanvas").attr("width", tmp_w+2*pad).attr("height", tmp_h+2*pad);
}


function mpl_getDots() {
  var tmp_arr = [];
  for (var i=0; i < mpl_row; i++) {
    for (var j=0; j < mpl_col; j++) {
      var tmp_xy = [];
      tmp_xy[0] = mpl_pad + mpl_rad + (2*mpl_rad + mpl_gap) * j;
      tmp_xy[1] = mpl_pad + mpl_rad + (2*mpl_rad + mpl_gap) * i;
      tmp_arr[i*mpl_col+j] = tmp_xy;
    }
  }
  return tmp_arr;
}


function mpl_isConnected(x, y) {
  for (var i=0; i < mpl_dots.length; i++) {
    if ((x-mpl_dots[i][0])**2 + (y-mpl_dots[i][1])**2 < (mpl_rad)**2 && mpl_path.indexOf(mpl_dots[i]) == -1) {
      mpl_path[mpl_path.length] = mpl_dots[i];
      return true;
    }
  }
  return false;
}


function mpl_drawPath() {
  if (mpl_path.length > 1) {
    for (var i=0; i < mpl_path.length-1; i++) {
      mpl_ctx.beginPath();
      mpl_ctx.moveTo(mpl_path[i][0], mpl_path[i][1]);
      mpl_ctx.lineTo(mpl_path[i+1][0], mpl_path[i+1][1]);
      mpl_ctx.stroke();
    }
  }
}

function mpl_mousedown(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  mpl_dots = mpl_getDots();
  mpl_path = [];
  if (mpl_isConnected(x, y)) {
    mpl_drawPath();
    mpl_startX = mpl_path[mpl_path.length-1][0];
    mpl_startY = mpl_path[mpl_path.length-1][1];
    mpl_dragging = true;
  }
}


function mpl_mousemove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
      
  if (mpl_dragging) {
    if (mpl_isConnected(x, y)) {
      mpl_startX = mpl_path[mpl_path.length-1][0];
      mpl_startY = mpl_path[mpl_path.length-1][1];
    }
    mpl_ctx.clearRect(0, 0, mpl_canvas.width, mpl_canvas.height);
    mpl_drawPath();
    mpl_ctx.beginPath();
    mpl_ctx.moveTo(mpl_startX, mpl_startY);
    mpl_ctx.lineTo(x, y);
    mpl_ctx.stroke();
  }
}


function mpl_stopPainting(event) {
  if (mpl_dragging) {
    mpl_startX = mpl_path[mpl_path.length-1][0];
    mpl_startY = mpl_path[mpl_path.length-1][1];
    mpl_ctx.clearRect(0, 0, mpl_canvas.width, mpl_canvas.height);
    mpl_drawPath();
  }
  mpl_dragging = false;
}

