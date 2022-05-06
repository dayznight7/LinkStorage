const db = firebase.firestore();

firebase.auth().onAuthStateChanged((user)=>{
  if (user) {
    var uid = user.uid;
    console.log(uid);
    console.log(user);
  }
  else {
    console.log("log out")
  }
});

//https://gist.github.com/Dohyunwoo/b8370f208619c7f44a2a13fb390e1514

swal({
  title: "Failed",
  text: "Account info does not match",
  icon: "https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"
}).then(function() {

  swal({
  title: "Failed",
  text: "Account info does not match",
  icon: "success"
});
});
