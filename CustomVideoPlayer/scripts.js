const player = document.querySelector(".player");
const video = player.querySelector(".viewer");

const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipBtns = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const toggleFullScreenBtn = player.querySelector(".fullscreen");

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updatePlayBtn() {
    toggle.textContent = video.paused ? "►" : "❚ ❚";
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrubVideo(e) {
    console.log(e);
    debugger;
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        return document.exitFullscreen && document.exitFullscreen();
    }
}

video.addEventListener("click", togglePlay);
video.addEventListener("dblclick", toggleFullScreen);
toggle.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayBtn);
video.addEventListener("pause", updatePlayBtn);
video.addEventListener("timeupdate", handleProgress);
skipBtns.forEach(btn => btn.addEventListener("click", skip));
ranges.forEach(item => item.addEventListener("change", handleRangeUpdate));
ranges.forEach(item => item.addEventListener("mousemove", handleRangeUpdate));
let mouseDown = false;
progress.addEventListener("click", scrubVideo);
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));
progress.addEventListener("mousemove", e => mouseDown && scrubVideo(e));
toggleFullScreenBtn.addEventListener("click", toggleFullScreen);
