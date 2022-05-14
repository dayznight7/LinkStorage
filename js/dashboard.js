const db = firebase.firestore();
const storage = firebase.storage();
//https://gist.github.com/Dohyunwoo/b8370f208619c7f44a2a13fb390e1514


function viewMore(idx) {
  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
      var uid = user.uid;
      db.collection("data").doc(uid).get().then((doc)=>{
        location.replace(doc.data().link[idx] + ".html");
      });
    }
  });
}


for (var i=0; i < 1; i++) {
  var tmp = `<i onclick="viewMore(${i})" class="fa-solid fa-circle-chevron-down"></i>`;
  $(`#dashbox${i}`).append(tmp);
}


firebase.auth().onAuthStateChanged((user)=>{
  if (user) {
    var uid = user.uid;
    console.log(uid);
    db.collection("data").doc(uid).get().then((doc)=>{


      /*
      console.log(doc.data());
      console.log(Object.keys(doc.data()));
      console.log(Object.values(doc.data()));
      */
    });
  }
  else {
    location.replace("index.html");
  }
});

