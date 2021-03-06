

const db = firebase.firestore();


function copyitem(idx) {
  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
      var uid = user.uid;
      db.collection("data").doc(uid).get().then((doc)=>{
        const t = document.createElement("textarea");
        document.body.appendChild(t);
        t.value = doc.data().text[idx];
        t.select();
        document.execCommand("copy");
        document.body.removeChild(t);
      });
    }
  });

}

function deleteitem(idx) {
  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
      var uid = user.uid;
      db.collection("data").doc(uid).get().then((doc)=>{
        var arr_text = doc.data().text;
        arr_text.splice(idx,1);
        db.collection("data").doc(uid).update({ text: arr_text });
      });

      swal({
        title: "Success!",
        text: "",
        icon: "success"
      }).then(function() { location.reload(); });

    }
  });
}

function additem() {
  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
      var uid = user.uid;
      db.collection("data").doc(uid).get().then((doc)=>{
        var arr_text = doc.data().text;
        arr_text[arr_text.length] = $("textarea#addtextarea").val().replace(/(\n|\r\n)/g, "<br>");
        db.collection("data").doc(uid).update({ text: arr_text });
      });

      swal({
        title: "Success!",
        text: "",
        icon: "success"
      }).then(function() { location.reload(); });

    }
  });
}

var tmp = `
<textarea id="addtextarea" spellcheck="false"></textarea>
<i onclick="additem()" class="fa-solid fa-floppy-disk"></i>
`
$("#addtext").append(tmp);


firebase.auth().onAuthStateChanged((user)=>{
  if (user) {
    var uid = user.uid;
    console.log(uid);
    db.collection("data").doc(uid).get().then((doc)=>{

      for (var i=0; i < doc.data().text.length; i++) {
        var tmp = `
        <div id="textitem" class="textitem">
          <div>${doc.data().text[i]}</div>
          <i onclick="copyitem(${i})" class="fa-solid fa-copy"></i>
          <i onclick="deleteitem(${i})" class="fa-solid fa-trash"></i>
        </div>`;
        $("#textlist").append(tmp);
      }

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