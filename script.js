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
let lastActive;

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
}

/*function hideFrame() {
    miniature.classList.add("hidden");
}*/

function rebuildList(list, direction = "up") {
    let transfer;
    if (direction === "up") {
        transfer = list.pop();
        list.unshift(transfer);
    } else {
        transfer = list.shift();
        list.push(transfer);
    }
    return list;
}

function scrollCheck() {
    const activeIdx = [...tasks].findIndex(task => {
        const taskCoords = task.parentElement.getBoundingClientRect();
        return (
            taskCoords.top - topOffset > topEdge &&
            taskCoords.bottom - topOffset < bottomEdge
        );
    });
   /* if (activeIdx === -1) {
        const taskCoords = lastActive.getBoundingClientRect();
        console.log(lastActive.innerText);
        tasksList.scrollTo({
            top: taskCoords.top - topOffset,
            behavior: "smooth"
        });
    } else {
        lastActive = tasks[activeIdx];
        console.log(activeIdx);
    }*/
   /* if (activeIdx !== -1) {
        const prevIdx = [...tasks].findIndex(task => task === lastActive);
        console.log(prevIdx, activeIdx);
        lastActive = tasks[activeIdx];
        const newList = rebuildList(
            [...tasksList.querySelectorAll(".list-item")],
            activeIdx - prevIdx < 0 ? "up" : "down"
        );
        console.log(newList);
        tasksList.innerHTML = newList.join("");
    }*/
    if (activeIdx !== -1)
    showFrame.call(tasks[activeIdx]);
}

function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        let context = this,
            args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

placeList(tasksList, data);

const activeBox = document.querySelector(".active-task-selector");
const tasks = document.querySelectorAll("a");
activeBox.setAttribute(
    "style",
    `width:${tasksList.scrollWidth}px; height:${tasks[0].parentElement
        .clientHeight * 1.5}px;
    top : ${tasksList.offsetHeight / 2 - activeBox.offsetHeight / 2}px`
);

tasksList.style.paddingRight =   tasksList.parentElement.scrollWidth - tasksList.clientWidth + "px";
lastActive = tasks[0];
const activeCoords = activeBox.getBoundingClientRect();
const topOffset = document.querySelector(".content").offsetTop;
const topEdge = (activeCoords.top - topOffset) | 0;
const bottomEdge = (activeCoords.bottom - topOffset) | 0;

tasksList.addEventListener("scroll", debounce(scrollCheck));

tasks.forEach(task => task.addEventListener("mouseenter", showFrame));
tasks.forEach(task => task.addEventListener("mouseleave", scrollCheck));
scrollCheck();
