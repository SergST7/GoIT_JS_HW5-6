/**
 * Created by SergST on 25.08.2016.
 */
var startButton = document.getElementById('start-btn');
startButton.addEventListener('click', start);

var stopButton = document.getElementById('stop-btn');
stopButton.addEventListener('click', stop);

var startTime, timerId;

var timerBox = document.getElementById('timer-box');

function start(){
 startTime = new Date();
  findTime();
  timerId = setInterval(findTime, 31);
}

function findTime(){
  var deltaTime = new Date();
  var timeDifferensMs =  deltaTime.getTime() - startTime.getTime();
  var ms = timeDifferensMs%1000;
  var timeDifferensSec = Math.floor((timeDifferensMs - ms)/1000);
  if (ms < 10) {ms = '00' + ms}
  else if (ms < 100) {ms = '0' + ms}
 var sec = timeDifferensSec%60;
  var timeDifferensMin = Math.floor((timeDifferensSec - sec)/60);
  if (sec < 10) {sec = '0' + sec}
  var min = timeDifferensMin%60;
  if (min < 10) {min = '0' + min}
  timerBox.innerHTML = min + ' : ' + sec + ' : ' + ms;
 // console.log(timerBox);

}


function stop(){
  clearInterval(timerId);
}