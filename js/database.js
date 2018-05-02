// Set the configuration for your app
  // TODO: Replace with your project's config object
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDGlbfnVseoeU2hw77xU_udNYjKdLxKnTI",
    authDomain: "tools-7c26a.firebaseapp.com",
    databaseURL: "https://tools-7c26a.firebaseio.com",
    projectId: "tools-7c26a",
    storageBucket: "tools-7c26a.appspot.com",
    messagingSenderId: "179638034102"
  };
  firebase.initializeApp(config);

var firestore = firebase.firestore();

const docRef = firestore.doc("users/nameData");
const outputHeader = document.querySelector("#userOutput");
const inputText = document.querySelector("#userName");
const saveName = document.querySelector("#saveName");

saveName.addEventListener("click", function() {
    const nameToSave = inputText.value;
    console.log("I'm " + nameToSave);
    docRef.set({
        UserName: nameToSave
    }).then(function() {
        console.log("saved!")
    })
})

//db.collection("users").add({
//    first: "Ada",
//    last: "Lovelace",
//    born: 1815
//})
//.then(function(docRef) {
//    console.log("Document written with ID: ", docRef.id);
//})
//.catch(function(error) {
//    console.error("Error adding document: ", error);
//});
