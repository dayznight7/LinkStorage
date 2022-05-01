
const db = firebase.firestore();

$("#signupid").blur(function() {
  db.collection("login").where("id", "==", $("#signupid").val()).get().then((qs)=>{
    if (qs.docs.length == 0) {
      $("#signupid").css({
        "color": "green"
      });
    }
    else {
      $("#signupid").css({
        "color": "tomato"
      });
      swal({
        title: "Duplicate",
        text: "Already exists",
        icon: "error"
      });
    }
  });
});
$("#signupid").focus(function() {
  $("#signupid").css({
    "color": "black"
  });
});


function trySignup() {
  if ($("#signupid").val().length == 0 || $("#signupnn").val().length == 0) {
    swal({
      title: "Failed",
      text: "Please enter more than one letter",
      icon: "error"
    });
    return;
  }
  else {
    db.collection("login").where("id", "==", $("#signupid").val()).get().then((qs)=>{
      if (qs.docs.length != 0) {
        swal({
          title: "Failed",
          text: "Already exists",
          icon: "error"
        });
      }
      else {
        firebase.auth().createUserWithEmailAndPassword($("#signupid").val(), SHA256(pathToStr())).then((uc)=>{
          console.log(uc);
          console.log(uc.user);
          swal({
            title: "Success!",
            text: "",
            icon: "success"
          });
        });
      }
    });

  }
}


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
  return str;
}
