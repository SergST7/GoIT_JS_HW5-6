/**
 * Created by SergST on 25.08.2016.
 */
var startButton = document.getElementById('start-btn');
startButton.addEventListener('click', start);

var stopButton = document.getElementById('reset-btn');
stopButton.addEventListener('click', reset);

var splitButton = document.getElementById('split-btn');
splitButton.addEventListener('click', getSplit);

var startTime, timerId;

var timerBox = document.getElementById('timer-box');
var splitBox = document.getElementById('split-box');

var timerStatus = 0; //0-пауза или стоп, 1 - работает
var timeDifferensMs;
var timerPauseValue = 0;

function start(){
  if (startButton.value == 'start'){
    timerStatus = 1;
    startButton.value = 'pause';
    startTime = new Date();
    findTime();
    timerId = setInterval(findTime, 31);
  }
  else {
    stop();
    startButton.value = 'start';
  }
}

function findTime(){
  var deltaTime = new Date();
  timeDifferensMs =  deltaTime.getTime() - startTime.getTime() + timerPauseValue;
  timerBox.innerHTML = getTimeFormat(timeDifferensMs);
}

function getTimeFormat(t){ //преобразует число мс в строку чч:мм:сс:мс
  var ms = t%1000;
  t -= ms;
  t = Math.floor(t/1000);
  var sec = t%60;
  t -= sec;
  t = Math.floor(t/60);
  var min = t%60;
  t -= min;
  t = Math.floor(t/60);
  var h = t%60;
  if (ms < 10) {ms = '00' + ms} 
  else if (ms < 100) {ms = '0' + ms}
  if (sec < 10) {sec = '0' + sec}
  if (min < 10) {min = '0' + min}
  if (min < 10) {h = '0' + h}
  return h + ' : ' + min + ' : ' + sec + ' : ' + ms;
}

function getSplit(){
  if (timerStatus){
    splitBox.innerHTML += '<p> Split: ' + getTimeFormat(timeDifferensMs) + '</p>';
  }
}

function stop(){
  clearInterval(timerId);
  if (timerStatus){
    splitBox.innerHTML += '<p> Stop: ' + getTimeFormat(timeDifferensMs) + '</p>';
  }
  timerPauseValue = timeDifferensMs;
  timerStatus = 0;
}

function reset(){
  clearInterval(timerId);
  timerBox.innerHTML = '00 : 00 : 00 : 000';
  splitBox.innerHTML = '';
  timerStatus  = 0;
  timeDifferensMs = 0;
  timerPauseValue = 0;
  startButton.value = 'start';
}