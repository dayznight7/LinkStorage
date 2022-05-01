function pathToStr() {
  var tmp_str = "";
  for (var i=0; i < mpl_path.length; i++) {
    tmp_str += String(mpl_dots.indexOf(mpl_path[i]));
  }
  return tmp_str;
}

function mpl_mouseup(event) {
  if (mpl_dragging) {
    console.log(SHA256(pathToStr()));
  }
  mpl_stopPainting();
}


function mpl_run() {
  if (mpl_canvas) {
    // velog.io/@mokyoungg/JS-JS에서-Canvas-사용하기마우스로-그리기
    mpl_canvas.addEventListener("mousemove", mpl_mousemove);
    mpl_canvas.addEventListener("mousedown", mpl_mousedown);
    mpl_canvas.addEventListener("mouseup", mpl_mouseup);
    mpl_canvas.addEventListener("mouseleave", mpl_stopPainting);
  }
  mpl_ctx.strokeStyle = "rgb(80,80,80)";
  mpl_ctx.lineWidth = 5;
  mpl_ctx.lineCap = "round";
}


mpl_init(3, 3, 30, 25, 50);
mpl_run();


function newSessionID() {
  var str = "";
  for (var i=0; i<10; i++) {
    str += Math.floor(Math.random()*36).toString(36);
  }
  console.log(str);
}
newSessionID();
