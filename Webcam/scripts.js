const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const filtersMap = {
    redEffect,
    rgbSplit,
    ghostEffect,
    greenScreen
};
function getVideo() {
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(err => console.error(err));
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        //take the pixels for filtering ;-)
        const filters = document.querySelectorAll(".filters input:checked");
        if (ctx.globalAlpha < 1) ctx.globalAlpha = 1;
        if (!filters.length) return;
        let pixels = ctx.getImageData(0, 0, width, height);
        filters.forEach(filter => (pixels = filtersMap[filter.name](pixels)));
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    //photo sound
    snap.currentTime = 0;
    snap.play();
    // image getting
    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "webcam_photo");
    link.innerHTML = `<img src = ${data} alt="photo form webcam"/>`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100; //red channel
        pixels.data[i + 1] = pixels.data[i + 1] - 80; //green channel
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue channel
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; //red channel
        pixels.data[i + 500] = pixels.data[i + 1]; //green channel
        pixels.data[i - 500] = pixels.data[i + 2]; //blue channel
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll(".rgb input").forEach(input => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (
            red >= levels.rmin &&
            green >= levels.gmin &&
            blue >= levels.bmin &&
            red <= levels.rmax &&
            green <= levels.gmax &&
            blue <= levels.bmax
        ) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}
function ghostEffect() {
    ctx.globalAlpha = 0.1;
    return arguments.length > 1 ? arguments : arguments[0];
}

if (window.location === window.parent.location) getVideo();
video.addEventListener("canplay", paintToCanvas);
