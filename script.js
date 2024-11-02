var shortBreak = 300;
var longBreak = 900;
var pomodoro = 1500;
var timer = pomodoro;
var currentPhase = 0;
var numBreaks = 0;
var breakAmount = 3;
var timerInterval;

var startBtn = document.getElementById("start");
var pauseBtn = document.getElementById("pause");
var resetBtn = document.getElementById("reset");

function secondsToTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    if (s < 10) {
        s = "0" + s;
    }
    return m + ":" + s;
}

function start() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timer = pomodoro;
    currentPhase = 0;
    document.getElementById("count").innerHTML = secondsToTime(timer);
    document.getElementById("phase").innerHTML = "get to work!";
    document.getElementsByClassName("timer")[0].style.backgroundColor = "#ff4747";
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById("count").innerHTML = secondsToTime(timer);
        if (timer == 0) {
            if (currentPhase == 0) {
                if (numBreaks == breakAmount) {
                    currentPhase = 2;
                    timer = longBreak;
                    numBreaks = 0;
                } else {
                    currentPhase = 1;
                    timer = shortBreak;
                    numBreaks++;
                }
            } else if (currentPhase == 1) {
                currentPhase = 0;
                timer = pomodoro;
            } else if (currentPhase == 2) {
                currentPhase = 0;
                timer = pomodoro;
            }

            document.getElementById("phase").innerHTML = currentPhase == 0 ? "get to work!" : currentPhase == 1 ? "take a break!" : "nice, a long break!";
            var color = currentPhase == 0 ? "#ff4747" : currentPhase == 1 ? "#88e788" : "#47a9ff";
            document.getElementsByClassName("timer")[0].style.backgroundColor = currentPhase == 0 ? "#ff4747" : currentPhase == 1 ? "#88ff88" : "#47a9ff";
            for (let i = 0; i < 3; i++) {
                document.getElementsByClassName("playback")[i].style.backgroundColor = currentPhase == 0 ? "#ff4747" : currentPhase == 1 ? "#88e788" : "#90d5ff";
            }
            startBtn.removeEventListener("mouseenter", start);
            document.getElementById("count").innerHTML = secondsToTime(timer);
        }
    }, 1000);
}