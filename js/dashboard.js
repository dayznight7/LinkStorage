const db = firebase.firestore();
const storage = firebase.storage();
//https://gist.github.com/Dohyunwoo/b8370f208619c7f44a2a13fb390e1514

/*
db.collection("data").doc()
firebase.auth().onAuthStateChanged((user)=>{
  if (user) {
    var uid = user.uid;
    console.log(uid);
    db.collection("data").doc(uid).get().then((doc)=>{

      console.log(doc.data());
      console.log(Object.keys(doc.data()));
      console.log(Object.values(doc.data()));
    });
  }
  else {
    location.replace("index.html");
  }
});
*/

storage.ref().child("image/" + "")
var storageRef = storage.ref();
var storagePath = storageRef.child(`${uid}/image/`+`001`);
var storageUpload = storagePath.put(file);
