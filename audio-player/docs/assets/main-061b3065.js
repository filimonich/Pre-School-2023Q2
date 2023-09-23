(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
document.body.onload = () => {
  let delayTime = 10;
  setTimeout(() => {
    const preloder = document.querySelector(".preloder");
    preloder.classList.add("done");
  }, delayTime);
};
const image = new Image();
image.src = "images/img/Succession.png";
const imageElement = document.getElementById("myImage");
image.onload = () => {
  imageElement.src = image.src;
};
for (let i = 1; i < 6; i++) {
  setTimeout(() => {
    console.log("Hello");
  }, i * 2e3);
}
document.addEventListener("DOMContentLoaded", function() {
  let preload = document.querySelector(".preload");
  function removePreloadClass() {
    preload.classList.remove("preload");
  }
  setTimeout(() => {
    removePreloadClass();
  }, 100);
});
function addDynamicShadow() {
  const blocks = document.getElementsByClassName("dynamic-shadow");
  document.addEventListener("mousemove", function(e) {
    if (window.innerWidth <= 780) {
      return;
    }
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].style.boxShadow = (x - 0.5) * 40 + "px " + (y - 0.5) * 40 + "px 20px rgba(0, 104, 111,0.65)";
    }
  });
}
addDynamicShadow();
(() => {
  const audioPlayer = document.getElementById("myAudio");
  const playBtn = document.querySelector(".player__play-inner");
  const pauseBtn = document.querySelector(".player__stop-inner");
  const endTimeLabel = document.querySelector(".player__end");
  const currentTimeLabel = document.querySelector(".player__begin");
  const progressSlider = document.querySelector(".player__progress-input");
  let maxProgress = 1e4;
  playBtn.addEventListener("click", function() {
    audioPlayer.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";
  });
  pauseBtn.addEventListener("click", function() {
    audioPlayer.pause();
    playBtn.style.display = "inline";
    pauseBtn.style.display = "none";
  });
  audioPlayer.addEventListener("loadedmetadata", function() {
    let durationInSeconds = audioPlayer.duration;
    let minutes = Math.floor(durationInSeconds / 60);
    let seconds = Math.floor(durationInSeconds % 60);
    endTimeLabel.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  });
  audioPlayer.load();
  audioPlayer.addEventListener("timeupdate", function() {
    let currentTimeInSeconds = audioPlayer.currentTime;
    let minutes = Math.floor(currentTimeInSeconds / 60);
    let seconds = Math.floor(currentTimeInSeconds - minutes * 60);
    let minuteValue;
    let secondValue;
    let singleDigitThreshold = 10;
    if (minutes < singleDigitThreshold) {
      minuteValue = "0" + minutes;
    } else {
      minuteValue = minutes;
    }
    if (seconds < singleDigitThreshold) {
      secondValue = "0" + seconds;
    } else {
      secondValue = seconds;
    }
    currentTimeLabel.textContent = minuteValue + ":" + secondValue;
    progressSlider.value = audioPlayer.currentTime;
  });
  audioPlayer.addEventListener("timeupdate", function() {
    progressSlider.value = Math.round(
      audioPlayer.currentTime / audioPlayer.duration * maxProgress
      // maxProgress представляет максимальное значение прогресса (10000)
      // audioPlayer.currentTime - текущее время воспроизведения аудиофайла
      // audioPlayer.duration - длительность аудиофайла
    );
  });
  progressSlider.addEventListener("input", function() {
    audioPlayer.currentTime = progressSlider.value / maxProgress * audioPlayer.duration;
  });
  audioPlayer.addEventListener("loadedmetadata", function() {
    progressSlider.max = maxProgress;
  });
})();
