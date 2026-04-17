let timer;
let timeLeft = 25 * 60;
let isRunning = false;

const display = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

function updateDisplay() {
    const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const sec = String(timeLeft % 60).padStart(2, '0');
    display.textContent = `${min}:${sec}`;
}

function tick() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        clearInterval(timer);
        isRunning = false;
        alert('ポモドーロ終了！休憩しましょう。');
    }
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        timer = setInterval(tick, 1000);
        isRunning = true;
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = 25 * 60;
    isRunning = false;
    updateDisplay();
});

updateDisplay();
