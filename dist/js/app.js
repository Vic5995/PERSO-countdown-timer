// DOM elements
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const submitBtn = document.getElementById('submit-input');
const startPauseBtn = document.getElementById('pause-restart-btn');
const resetBtn = document.getElementById('reset-btn');
const countdownDisplayer = document.getElementById('countdown-display');
const countdownDisplayItems = document.querySelectorAll('.countdown-item');
const countdownDisplayName = document.getElementById('name-display')
const nameInput = document.getElementById('name-input');

// VARIABLES
let countdownIntervalID;
let days, hours, minutes, seconds;
let remain;
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
    console.log(remain)
    if(remain <= 1) {
        clearInterval(countdownIntervalID);
        running = false;
        alert(`It's time for ${name}`);
    } else {
        remain -= 1;
        displayCountdown();
    }
}

function displayCountdown() {
    days = Math.floor(remain / 86400); // 1 j = 24 h = 1440 min = 86400 sec
    hours = Math.floor((remain % 86400) / 3600); // 1 h = 60 min = 3600 sec
    minutes = Math.floor(((remain % 86400) % 3600) / 60);  // 1 min = 60 sec
    seconds = Math.floor(((remain % 86400) % 3600) % 60);

    countdownDisplayItems[0].innerHTML = days < 10 ? "0" + days : days;
    countdownDisplayItems[1].innerHTML = hours < 10 ? "0" + hours : hours;
    countdownDisplayItems[2].innerHTML = minutes < 10 ? "0" + minutes : minutes;
    countdownDisplayItems[3].innerHTML = seconds < 10 ? "0" + seconds : seconds;
}

function checkDateTimeInput(date, time) {
    let targetDate = Date.parse(date+"T"+time);
    return targetDate > Date.now();
}

// LISTERNERS
submitBtn.addEventListener('click', ev => {
    ev.preventDefault();
    let date = dateInput.value;
    let time = timeInput.value;
    let name = (nameInput.value).toUpperCase();

    if (checkDateTimeInput(date, time)) {
        let targetDate = Date.parse(date+"T"+time);
        let start = Date.now();
        remain = (targetDate - start) / 1000; // 1 sec = 1000 ms

        countdownDisplayName.innerHTML = name === "" ? "" : `COUNTDOWN TO ${name}`;
        displayCountdown();
        running = true;
        countdownIntervalID = setInterval(countdown, 1000);

        countdownDisplayer.classList.remove("hidden");
    } else {
        alert("Wrong date and time input");
        initDisplay();
    }
})

startPauseBtn.addEventListener('click', ev => {
    ev.preventDefault();
    if (running) {
        clearInterval(countdownIntervalID);
        running = false;
        startPauseBtn.innerHTML = "START";
    } else {
        countdownIntervalID = setInterval(countdown, 1000);
        running = true;
        startPauseBtn.innerHTML = "PAUSE";
    }
})

resetBtn.addEventListener('click', ev => {
    ev.preventDefault();
    clearInterval(countdownIntervalID);
    running = false;
    startPauseBtn.innerHTML = "PAUSE";
    countdownDisplayer.classList.add("hidden");
    initDisplay();
})

// MAIN
initDisplay()


