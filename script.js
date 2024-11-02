var shortBreak = 300;
var longBreak = 900;
var pomodoro = 1500;
var timer = pomodoro;
var currentPhase = 0;
var numBreaks = 0;
var breakAmount = 3;

function secondsToTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    if (s < 10) {
        s = "0" + s;
    }
    return m + ":" + s;
}

function start() {
    timer = pomodoro;
    currentPhase = 0;
    document.getElementById("count").innerHTML = secondsToTime(timer);
    document.getElementById("phase").innerHTML = "get to work!";
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
            document.getElementById("count").innerHTML = secondsToTime(timer);
        }
    }, 1000);
}