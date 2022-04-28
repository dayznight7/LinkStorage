draw_mpl(3, 4, 60, 100, 100);
function draw_mpl(row, col, gap, rad, pad) {
  var w = rad*col+gap*(col-1);
  var h = rad*row+gap*(row-1);
  $("#mpl").empty();
  $("#mpl").css({
    "width": `${w}`,
    "height": `${h}`,
    "padding": `${pad}px`,
    "grid-template-columns": `repeat(${col}, 1fr)`,
    "grid-template-rolumns": `repeat(${row}, 1fr)`,
    "gap": `${gap}px`
  });
  for (var i=0; i<row*col; i++) {
    $("#mpl").append(`<div id='outcircle${i}' class='outcircle'><div id='incircle${i}' class='incircle'></div></div>`)
  }
  $("#myCanvas").attr("width", w+2*pad).attr("height", h+2*pad);
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var painting = false;

ctx.strokeStyle = "white";
ctx.lineWidth = 10;
ctx.lineCap = "round";
var dragging = false;

var arrDots = getDots(3, 4, 60, 100, 100);
var usedDots = [];
var startpointX;
var startpointY;
var pw;

function getDots(row, col, gap, rad, pad) {
  arr = [];
  for (var i=0; i < row; i++) {
    for (var j=0; j < col; j++) {
      var tmp = [];
      tmp[0] = pad + rad / 2 + (rad+gap) * j;
      tmp[1] = pad + rad / 2 + (rad+gap) * i;
      arr[i*col+j] = tmp; 
    }
  }
  return arr;
}

function isConnected(x, y, rad) {
  for (var i = 0; i < arrDots.length; i++) {
    if ((x-arrDots[i][0])**2 + (y-arrDots[i][1])**2 < rad**2 && usedDots.indexOf(arrDots[i]) == -1) {
      usedDots[usedDots.length] = arrDots[i];
      return true;
    }
  }
  return false;
}

function drawDrawn() {
  if (usedDots.length > 1) {
    for (var i = 0; i < usedDots.length - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(usedDots[i][0], usedDots[i][1]);
      ctx.lineTo(usedDots[i+1][0], usedDots[i+1][1]);
      ctx.stroke();
    }
  }
}

function pathToStr() {
  var ans = "";
  for (var i = 0; i < usedDots.length; i++) {
    ans += String(arrDots.indexOf(usedDots[i]));
  }
  return ans;
}

function onMouseUp(event) {
  if (dragging) {
    pw = pathToStr();
    console.log(pw);
  }
  stopPainting();
}
function onMouseDown(event) {
  arrDots = getDots(3, 4, 60, 100, 100);
  usedDots = [];
  const x = event.offsetX;
  const y = event.offsetY;
  if (isConnected(x, y, 50)) {
    drawDrawn();
    startpointX = usedDots[usedDots.length-1][0];
    startpointY = usedDots[usedDots.length-1][1];
    dragging = true;
  }
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
      
  if (dragging) {
    if (isConnected(x, y, 50)) {
      startpointX = usedDots[usedDots.length-1][0];
      startpointY = usedDots[usedDots.length-1][1];
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDrawn();
    ctx.beginPath();
    ctx.moveTo(startpointX, startpointY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function stopPainting(event) {
  if (dragging) {
    startpointX = usedDots[usedDots.length-1][0];
    startpointY = usedDots[usedDots.length-1][1];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDrawn();
  }
  dragging = false;
}


if (canvas) {
  // velog.io/@mokyoungg/JS-JS에서-Canvas-사용하기마우스로-그리기
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
}

