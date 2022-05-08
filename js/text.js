

db.collection("data").doc()
firebase.auth().onAuthStateChanged((user)=>{
  if (user) {
    var uid = user.uid;
    console.log(uid);
    db.collection("data").doc(uid).get().then((doc)=>{

      console.log(doc.data());
      console.log(Object.keys(doc.data()));
      console.log(Object.values(doc.data()));
      /*
      var storageRef = storage.ref();
      var storagePath = storageRef.child(`${uid}/image/`+``);
      var storageUpload = storagePath.put(file);
      */
    });
  }
  else {
    location.replace("index.html");
  }
});