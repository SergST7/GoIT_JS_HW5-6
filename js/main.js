/**
 * Created by SergST on 25.08.2016.
 */

var timerBox = document.getElementById('timer-box');
var splitBox = document.getElementById('split-box');

var timer = {

  startTime: 0,          //время начала отсчета
  timeDifferensMs: 0,    //разница ms между началом отсчета и текущим временем
  timerId: 0,            //ид для отмены интервала
  status: 0,              //0-пауза или стоп, 1 - работает
  pauseValue: 0,          //храним значения таймера в момент паузы

  start: function () {
    if (startButton.value == 'Start') {
      timer.status = 1;
      startButton.value = 'Pause';
      timer.startTime = new Date();
      timer.findTime();
      timer.timerId = setInterval(timer.findTime, 31);
    }
    else {
      timer.stop();
      startButton.value = 'Start';
    }
  },

  findTime: function() {
    var deltaTime = new Date();
    timer.timeDifferensMs = deltaTime.getTime() - timer.startTime.getTime() + timer.pauseValue;
    timerBox.innerHTML = timer.getTimeFormat(timer.timeDifferensMs);
  },

  getTimeFormat: function (t) {     //преобразует число мс в строку чч:мм:сс:мс
    var ms = t % 1000;
    t -= ms;
    t = Math.floor(t / 1000);
    var sec = t % 60;
    t -= sec;
    t = Math.floor(t / 60);
    var min = t % 60;
    t -= min;
    t = Math.floor(t / 60);
    var h = t % 60;
    if (ms < 10)  ms = '00' + ms;
    else if (ms < 100)  ms = '0' + ms;
    if (sec < 10)  sec = '0' + sec;
    if (min < 10)  min = '0' + min;
    if (min < 10)  h = '0' + h;

    return h + ':' + min + ':' + sec + '.<span>' + ms + '</span>';
  },

  getSplit: function () {
    if (timer.status) {
      splitBox.innerHTML += '<p> Split: ' + timer.getTimeFormat(timer.timeDifferensMs) + '</p>';
    }
  },

  stop: function () {
    clearInterval(timer.timerId);
    if (timer.status) {
      splitBox.innerHTML += '<p> Stop: ' + timer.getTimeFormat(timer.timeDifferensMs) + '</p>';
    }
    timer.pauseValue = this.timeDifferensMs;
    timer.status = 0;
  },

  reset: function () {
    clearInterval(timer.timerId);
    timerBox.innerHTML = '00:00:00.<span>000</span>';
    splitBox.innerHTML = '';
    timer.status = 0;
    timer.timeDifferensMs = 0;
    timer.pauseValue = 0;
    startButton.value = 'Start';
  }
};

var startButton = document.getElementById('start-btn');
startButton.addEventListener('click', timer.start);

var stopButton = document.getElementById('reset-btn');
stopButton.addEventListener('click', timer.reset);

var splitButton = document.getElementById('split-btn');
splitButton.addEventListener('click', timer.getSplit);

timer.reset();