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

//const docRef = firestore.doc("sample/users");

var curUser = "";

$('#saveName').click(function(){
     curUser = document.getElementById("userName").value;
})

var curTime;
var NumPosts = 0;
var NumResponses = 0;
var curResponsePost;


function getCurrentTime() {
  var time = new Date();
  var m = time.getMonth() + 1;
  curTime = time.getFullYear() + "-" + m + "-"
    + time.getDate() + " " + time.getHours() + ":"
    + time.getMinutes();
}
                      


    function showResponseModal(id) {
      curResponsePost = id.substring(0, id.length - 1);
      console.log(curResponsePost);

      firestore.collection("samples").doc(curResponsePost).collection("responses")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
              NumResponses++;
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
        $("#typeResponse").css("display","block");

    }

    function sendQuestion() {
      if (curUser == "") {
        $('#log_in').modal('toggle');
      }
      else {
        getCurrentTime();
        const curQuestion = $("#typeQ").val();
        const keyword = $( "#keyword_select option:selected" ).text();

          const post = firestore.collection("samples").doc("post" + NumPosts);
        post.set({
          post: "post" + NumPosts,
          time: curTime,
          user: curUser,
          content: curQuestion,
          keyword: keyword,
        }).then(function () {
          console.log("success");
            location.reload();
        }).catch(function (error) {
          console.log("error");
        });
      }
    }

    function sendResponse() {

      getCurrentTime();

      const response = firestore.collection("samples").doc(curResponsePost).collection("responses").doc("response" + NumResponses);
      console.log(response);
      const curResponse = $("#typeA").val();
      console.log("content = " + curResponse);
      console.log("time = " + curTime);
      console.log("user = " + curUser);


      response.set({
        response: "post" + NumResponses,
        time: curTime,
        user: curUser,
        content: curResponse,
      }).then(function () {
        console.log("success");
        location.reload();
      }).catch(function (error) {
        console.log("error");
      });
    }

    firestore.collection("samples")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            NumPosts++;
          console.log(doc.id, " => ", doc.data());
          showPost(doc.data().post, doc.data().content, doc.data().time, doc.data().user, doc.data().keyword);
         var tempNumResponses = 0; firestore.collection("samples").doc(doc.data().post).collection("responses")
            .get()
            .then(function (querySnapshot_r) {
              querySnapshot_r.forEach(function (doc_r) {
                console.log(doc_r.id, " => ", doc_r.data());
                showResponse(doc.data().post + "r", doc_r.data().content, doc_r.data().time, doc_r.data().user);
              });
            })
            .catch(function (error) {
              console.log("Error", error);
            });
        });
      })
      .catch(function (error) {
        console.log("Error", error);
      });

function showPost(id, content, time, user, keyword) {
    $("#question_pool").append("<li id=question><div id=name><p>" + content + "</p></div>"+"<div class=row workspaces><div id=keyword class=col-xs-3>" + keyword + "</div>"+"<div id=date class=col-xs-3>" + time + "</div>"+"<div id=user class=col-xs-3>last posted by " + user + "</div></li><ul id=" + id + "r></ul>"+"<button type=button id="+ id + "a href=javascript:void(0); onclick=showResponseModal(this.id)>Answer question</button></div>");
}

function showResponse(ulid, content, time, user) {
    $("#"+ulid).append("<li id=response><p>" + content + "</p><div class=row workspaces><div id=user class=col-xs-3>Answered by " + user + "</div><div id=date class=col-xs-3>" + time + "</div></div></li>");
}


