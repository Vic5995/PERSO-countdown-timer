const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const submitBtn = document.getElementById('submit-input');

const countdownDisplay = document.getElementById('countdown-display');

submitBtn.addEventListener('click', ev => {
    ev.preventDefault();
    let date = dateInput.value;
    let time = timeInput.value;

    let targetDate = Date.parse(date+"T"+time);
    let start = Date.now();
    let remain = (targetDate - start) / 1000;

    let days = Math.floor(remain / 86400);
    let hours = Math.floor((remain % 86400) / 3600);
    let minutes = Math.floor(((remain % 86400) % 3600) / 60);
    let seconds = Math.floor(((remain % 86400) % 3600) % 60);

    countdownDisplay.children[0].innerHTML = days;
    countdownDisplay.children[1].innerHTML = hours;
    countdownDisplay.children[2].innerHTML = minutes;
    countdownDisplay.children[3].innerHTML = seconds;

    countdownDisplay.classList.remove("hidden");
})

// 1 sec = 1000 ms
// 1 min = 60 sec
// 1 h = 60 min = 3600 sec
// 1 j = 24 h = 1440 min = 86400 sec