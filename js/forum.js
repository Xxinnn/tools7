    

    
var START_QUIZ_TIME = 434;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        width : '760',
        height : '518',
        videoId : 'h8DCdxg3hXc',
        //  wmode: transparent  makes HTML goes on top of Flash
        //  fs: disable full screen
        playerVars: {'autoplay': 0, 'wmode': 'transparent', 'fs': 0, 'controls':1, 'rel':0, 'modestbranding':1, 'showinfo':0},
        events : {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
      }
    });
  }
        
  // 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}
    var done = false;
    var time;
         
         
        function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done ) {
             setTimeout(stopVideo, 1000);
             //time=player.getCurrentTime();
            done=true;
          }
            }
//function onPlayerStateChange(event) {
//     console.log(event);
//      switch (event.data) {
//        case window['YT'].PlayerState.PLAYING:
//          if (cleanTime() == 0) {
//            console.log('started ' + cleanTime());
//            onPlayerStart(event);
//          } else {
//            console.log('playing ' + cleanTime());
//          }
//          break;
//        case window['YT'].PlayerState.PAUSED:
//          if (player.getDuration() - player.getCurrentTime() != 0) {
//            console.log('paused' + ' @ ' + cleanTime());
//          }
//          break;
//        case window['YT'].PlayerState.ENDED:
//          console.log('ended ');
//          break;
//      }
//    }

//        function onPlayerStart(event) {
//          setInterval(() => checkStartQuiz(event), 1000); // check to start quiz every second
//        }

//function checkStartQuiz(event) {
//  if (cleanTime() >= START_QUIZ_TIME) {
//    stopVideo();
//  }
//}
////utility
//function cleanTime() {
//  return Math.round(player.getCurrentTime());
//}
//
function stopVideo() {
player.stopVideo();
$("#container").css("display","block");
}

//interface basic function below

window.onload = function () {
 $('#log_in').modal('toggle');
    }

$( "#add" ).click(function() {
  $( '#input' ).css('display','block');
});


