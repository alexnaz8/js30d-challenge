let coundown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
    clearInterval(coundown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayEndTime(then);
    displayTimeLeft(seconds);
    coundown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(coundown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = (seconds / 60) | 0;
    const remainedSeconds = seconds % 60;
    const display = `${minutes}:${
        remainedSeconds < 10 ? "0" : ""
    }${remainedSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hours}:${
        minutes < 10 ? "0" : ""
    }${minutes}`;
}

function startTimer() {
    const seconds = +this.dataset.time;
    timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const mins = +this.minutes.value;
    debugger;
    if (Number.isNaN(mins)) return;
    timer(mins * 60);
    this.reset();
});
