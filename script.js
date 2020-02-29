const data = [
    { href: "./DrumKit/index.html", text: "Let the music play" },
    { href: "./JustClock/index.html", text: "Time is unstoppable" },
    {
        href: "./CSSVars/index.html",
        text: "Let's play with styles"
    },
    { href: "./FlexGallery/index.html", text: "Nice Flex Gallery" },
    { href: "./Type/index.html", text: "Find the City" },
    { href: "./CanvasFun/index.html", text: "Canvas Fun" },
    {
        href: "./CheckwShift/index.html",
        text: "Hold Shift to range select"
    },
    {
        href: "./CustomVideoPlayer/index.html",
        text: "Custom HTML Video Player"
    },
    { href: "./KeySequence/index.html", text: " Key Sequence" },
    { href: "./SlideOnScroll/index.html", text: "Slide On Scroll" },
    {
        href: "./LocalStorage/index.html",
        text: "Local Storage usage"
    },
    {
        href: "./MouseMoveShadow/index.html",
        text: "Mouse Move Shadow"
    },
    {
        href: "./SortWithoutArticles/index.html",
        text: "Sort Without Articles"
    },
    {
        href: "./TallyStringTimesWReduce/index.html",
        text: "Total Video Time (just reduce practice)"
    },
    { href: "./Webcam/index.html", text: "WebCam Fun" },
    {
        href: "./SpeechDetection/index.html",
        text: "Speech Detection Fun"
    },
    { href: "./Geolocation/index.html", text: "Geolocation" },
    {
        href: "./LinkFollowHighlighter/index.html",
        text: "A nice link highlighting"
    },
    {
        href: "./SpeechSynthesis/index.html",
        text: "Speech Synthesis"
    },
    { href: "./StickyNav/index.html", text: "Sticky Nav" },
    { href: "./StripeNav/index.html", text: "Stripe Nav" },
    {
        href: "./ClickAndDrag/index.html",
        text: "Press mouse button and drag"
    },
    {
        href: "./VideoSpeedController/index.html",
        text: "Video Speed Controller"
    },
    {
        href: "./CountdownTimer/index.html",
        text: "Countdown Timer"
    },
    { href: "./WhackAMole/index.html", text: "Whack A Mole Game" }
];
const miniature = document.querySelector(".boxMini");
const tasksList = document.querySelector(".tasks-list");

function placeList(conteiner, listData) {
    conteiner.innerHTML = listData
        .map(
            item => `<div class="list-item">
            <a href=${item.href}>
                <span class="task-box-text">
                    ${item.text}
                </span>
            </a>
        </div>`
        )
        .join("");
}

function showFrame() {
    miniature.classList.remove("hidden");
    miniature.innerHTML = `<iframe src="${this.href}" scrolling="no">
                        <p>Your browser does not support iframes.</p>
                    </iframe>`;
    if (document.body.offsetWidth < 830) {
        const iframe = miniature.children[0];
        const sizes = {
            width: window.getComputedStyle(iframe).width.replace(/[a-z]/g, ""),
            height: window.getComputedStyle(iframe).height.replace(/[a-z]/g, "")
        };
        const propor = {
            w: tasksList.offsetWidth / sizes.width,
            h: tasksList.offsetHeight / sizes.height
        };
        iframe.setAttribute(
            "style",
            `transform:scale(${propor.w},${propor.h})`
        );
    }
}

function hideFrame() {
    miniature.classList.add("hidden");
}

placeList(tasksList, data);
const tasks = document.querySelectorAll("a");
tasks.forEach(task => task.addEventListener("mouseenter", showFrame));
tasks.forEach(task => task.addEventListener("mouseleave", hideFrame));
