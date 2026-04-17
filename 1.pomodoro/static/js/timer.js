var timer;
var timeLeft = TOTAL_TIME;
var isRunning = false;
var completedCount = 0;
var focusMinutes = 0;

var display = document.getElementById('timer-display');
var startBtn = document.getElementById('start-btn');
var resetBtn = document.getElementById('reset-btn');
var statusLabel = document.getElementById('status-label');
var progressBar = document.getElementById('progress-bar');
var completeCountEl = document.getElementById('complete-count');
var focusTimeEl = document.getElementById('focus-time');

progressBar.style.strokeDasharray = CIRCUMFERENCE;

function updateDisplay() {
    display.textContent = formatTime(timeLeft);
    progressBar.style.strokeDashoffset = calcDashOffset(timeLeft, TOTAL_TIME);
    statusLabel.textContent = getStatusLabel(isRunning, timeLeft);
    startBtn.textContent = isRunning ? '一時停止' : '開始';
    if (completeCountEl) completeCountEl.textContent = completedCount;
    if (focusTimeEl) focusTimeEl.textContent = formatFocusTime(focusMinutes);
}

function tick() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        clearInterval(timer);
        isRunning = false;
        completedCount++;
        focusMinutes += Math.round(TOTAL_TIME / 60);
        updateDisplay();
    }
}

startBtn.addEventListener('click', function() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    } else {
        if (timeLeft > 0) {
            timer = setInterval(tick, 1000);
            isRunning = true;
        }
    }
    updateDisplay();
});

resetBtn.addEventListener('click', function() {
    clearInterval(timer);
    timeLeft = TOTAL_TIME;
    isRunning = false;
    updateDisplay();
});

updateDisplay();
