let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let timerInterval;
let lapNumber = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function updateTime() {
    const currentTime = Date.now();
    const timeDifference = currentTime - startTime + elapsedTime;

    const minutes = Math.floor((timeDifference / 60000) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);
    const milliseconds = Math.floor((timeDifference % 1000) / 10);

    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

function startTimer() {
    if (!isRunning) {
        startTime = Date.now();
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
        startPauseButton.textContent = 'Pause';
    } else {
        elapsedTime += Date.now() - startTime;
        clearInterval(timerInterval);
        isRunning = false;
        startPauseButton.textContent = 'Start';
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    startPauseButton.textContent = 'Start';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';
    lapsContainer.innerHTML = '';
    lapNumber = 0;
}

function recordLap() {
    if (isRunning) {
        lapNumber += 1;
        const lapTime = `${lapNumber}. ${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
        const lapElement = document.createElement('li');
        lapElement.textContent = lapTime;
        lapsContainer.appendChild(lapElement);
    }
}

startPauseButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
