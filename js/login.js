function pathToStr() {
  var tmp_str = "";
  for (var i=0; i < mpl_path.length; i++) {
    tmp_str += String(mpl_dots.indexOf(mpl_path[i]));
  }
  return tmp_str;
}

function mpl_mouseup(event) {
  if (mpl_dragging) {
    swal({
      title: "Loading",
      text: "please wait for a second",
      icon: "img/purpleloading.gif",
      buttons: {},
      closeOnClickOutside: false,
    });
    tryLogin($("#loginid").val(), SHA256(pathToStr()));
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


const db = firebase.firestore();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

function newSessionID() {
  var str = "";
  for (var i=0; i<10; i++) {
    str += Math.floor(Math.random()*36).toString(36);
  }
  return str;
}


function tryLogin(str1, str2) {
  if (str1.length == 0) {
    swal({
      title: "Failed",
      text: "Please enter more than one letter",
      icon: "error"
    });
    return;
  }
  else {

    db.collection("login").where("id", "==", str1).get().then((qs)=>{
      if (qs.docs.length == 0) {
        swal({
          title: "Failed",
          text: "Account info does not match",
          icon: "error"
        });
      }
      else {

        firebase.auth().signInWithEmailAndPassword(qs.docs[0].data().email, str2).then((uc)=>{
          swal({
            title: "Success!",
            text: "",
            icon: "success"
          }).then(function() { location.replace("dashboard.html"); });
        }).catch((error)=>{
          swal({
            title: "Failed",
            text: "Account info does not match",
            icon: "error"
          });
        });
      }
    });

    
  }
}

