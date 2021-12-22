// DOM elements
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const submitBtn = document.getElementById('submit-input');
const startPauseBtn = document.getElementById('pause-restart-btn');
const resetBtn = document.getElementById('reset-btn');
const countdownDisplay = document.getElementById('countdown-display');
const nameInput = document.getElementById('name-input');

// VARIABLES
let countdownIntervalID;
let days, hours, minutes, seconds;
let running = false;

// FUNCTIONS
function initDisplay() {
    let today = new Date();
    dateInput.value = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    let hours = today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
    timeInput.value = `${hours}:${minutes}`;
}

function countdown() {
    running = true
    if(seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
        clearInterval(countdownIntervalID);
        running = false;
    } else {
        seconds = --seconds < 0 ? 59 : seconds;
        countdownDisplay.children[4].innerHTML = seconds < 10 ? "0" + seconds : seconds;
        if (seconds === 59 && minutes !== 0) {
            minutes = --minutes < 0 && hours !== 0 ? 59 : minutes;
            countdownDisplay.children[3].innerHTML = minutes < 10 ? "0" + minutes : minutes;
        }
        if (minutes === 59 && hours !== 0) {
            hours = --hours < 0 && days !== 0 ? 23 : hours;
            countdownDisplay.children[2].innerHTML = hours < 10 ? "0" + hours : hours;
        }
        if (hours === 23 && days !== 0) {
            days = --days;
            countdownDisplay.children[1].innerHTML = days < 10 ? "0" + days : days;
        }
    }
}

// LISTERNERS
submitBtn.addEventListener('click', ev => {
    ev.preventDefault();
    let date = dateInput.value;
    let time = timeInput.value;
    let name = (nameInput.value).toUpperCase();

    let targetDate = Date.parse(date+"T"+time);
    let start = Date.now();
    let remain = (targetDate - start) / 1000; // 1 sec = 1000 ms

    days = Math.floor(remain / 86400); // 1 j = 24 h = 1440 min = 86400 sec
    hours = Math.floor((remain % 86400) / 3600); // 1 h = 60 min = 3600 sec
    minutes = Math.floor(((remain % 86400) % 3600) / 60);  // 1 min = 60 sec
    seconds = Math.floor(((remain % 86400) % 3600) % 60);

    countdownDisplay.children[0].innerHTML = `COUNTDOWN TO ${name}`
    countdownDisplay.children[1].innerHTML = days < 10 ? "0" + days : days;
    countdownDisplay.children[2].innerHTML = hours < 10 ? "0" + hours : hours;
    countdownDisplay.children[3].innerHTML = minutes < 10 ? "0" + minutes : minutes;
    countdownDisplay.children[4].innerHTML = seconds < 10 ? "O" + seconds : seconds;

    countdownIntervalID = setInterval(countdown, 1000);

    countdownDisplay.classList.remove("hidden");
})

startPauseBtn.addEventListener('click', ev => {
    ev.preventDefault();
    if (running) {
        clearInterval(countdownIntervalID);
        running = false;
        startPauseBtn.innerHTML = "START";
    } else {
        countdownIntervalID = setInterval(countdown, 1000);
        startPauseBtn.innerHTML = "PAUSE";
    }
})

resetBtn.addEventListener('click', ev => {
    ev.preventDefault();
    clearInterval(countdownIntervalID);
    running = false;
    startPauseBtn.innerHTML = "START";
    countdownDisplay.classList.add("hidden");
    initDisplay();
})

// MAIN
initDisplay()

// TODO warning of incorrect date
// TODO warning of overflow date ( > 99 days)
// TODO add an alert when the event is reached
// TODO responsive design

