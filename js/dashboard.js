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