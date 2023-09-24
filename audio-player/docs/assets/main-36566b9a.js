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
  const nextButton = document.querySelector(".player__right");
  const prevButton = document.querySelector(".player__left");
  const volumeSlider = document.querySelector(".player__volume-input");
  const muteButton = document.querySelector(".player__volume-btn");
  const imageElement2 = document.querySelector(".player__img");
  const wrapperElement = document.querySelector(".wrapper");
  const trackToImage = {
    Succession: ["Succession", "Succession-80"],
    "If I Had a Heart": ["vikings", "vikings-17"]
    // добавьте сюда другие треки по мере необходимости
  };
  const tracks = [
    "audio/Succession - Nicholas Britell.mp3",
    "audio/If I Had a Heart - Fever Ray Vikings.mp3"
  ];
  let maxProgress = 1e4;
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
    if (!isNaN(audioPlayer.duration)) {
      console.log(progressSlider.value);
      progressSlider.value = Math.round(
        audioPlayer.currentTime / audioPlayer.duration * maxProgress
        // maxProgress представляет максимальное значение прогресса (10000)
        // audioPlayer.currentTime - текущее время воспроизведения аудиофайла
        // audioPlayer.duration - длительность аудиофайла
      );
      console.log(progressSlider.value);
    }
  });
  progressSlider.addEventListener("input", function() {
    audioPlayer.currentTime = progressSlider.value / maxProgress * audioPlayer.duration;
  });
  audioPlayer.addEventListener("loadedmetadata", function() {
    progressSlider.max = maxProgress;
  });
  volumeSlider.addEventListener("input", function() {
    audioPlayer.volume = volumeSlider.value / 100;
  });
  let lastVolume = 1;
  muteButton.addEventListener("click", function() {
    if (audioPlayer.volume !== 0) {
      lastVolume = audioPlayer.volume;
      audioPlayer.volume = 0;
      volumeSlider.value = 0;
      muteButton.style.backgroundPosition = "0 28px";
    } else {
      audioPlayer.volume = lastVolume;
      volumeSlider.value = lastVolume * 100;
      if (volumeSlider.value > 50) {
        muteButton.style.backgroundPosition = "0 0";
      } else {
        muteButton.style.backgroundPosition = "0 56px";
      }
    }
  });
  volumeSlider.addEventListener("input", function() {
    if (volumeSlider.value === "0") {
      muteButton.style.backgroundPosition = "0 28px";
    } else if (volumeSlider.value > 50) {
      muteButton.style.backgroundPosition = "0 0";
    } else {
      muteButton.style.backgroundPosition = "0 56px";
    }
  });
  let currentTrackIndex = 0;
  function playTrack() {
    audioPlayer.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";
  }
  function pauseTrack() {
    audioPlayer.pause();
    playBtn.style.display = "inline";
    pauseBtn.style.display = "none";
  }
  function nextTrack() {
    currentTrackIndex++;
    if (currentTrackIndex >= tracks.length) {
      currentTrackIndex = 0;
    }
    audioPlayer.src = tracks[currentTrackIndex];
    playTrack();
  }
  function prevTrack() {
    currentTrackIndex--;
    if (currentTrackIndex < 0) {
      currentTrackIndex = tracks.length - 1;
    }
    audioPlayer.src = tracks[currentTrackIndex];
    playTrack();
  }
  nextButton.addEventListener("click", nextTrack);
  prevButton.addEventListener("click", prevTrack);
  playBtn.addEventListener("click", playTrack);
  pauseBtn.addEventListener("click", pauseTrack);
  const trackNameElement = document.querySelector(".player__track-name");
  const executorElement = document.querySelector(".player__executor");
  let audioUrl, fileName, trackName, executor, imageNames;
  function updateVariables() {
    audioUrl = audioPlayer.src;
    fileName = audioUrl.substring(audioUrl.lastIndexOf("/") + 1);
    fileName = fileName.replace(".mp3", "");
    fileName = decodeURIComponent(fileName);
    [trackName, executor] = fileName.split(" - ");
    imageNames = trackToImage[trackName];
    if (!imageNames) {
      imageNames = [trackName.replace(/ /g, "_"), trackName.replace(/ /g, "_")];
    }
  }
  function updateText() {
    if (trackNameElement.textContent === trackName && executorElement.textContent === executor || !trackName || !executor) {
      return;
    }
    trackNameElement.textContent = trackName;
    executorElement.textContent = executor;
  }
  function updateImages() {
    if (imageElement2.src.includes(imageNames[0])) {
      return;
    }
    imageElement2.src = "images/img/" + imageNames[0] + ".png";
    wrapperElement.style.setProperty(
      "--bg-url",
      'url("../images/img/' + imageNames[1] + '.png")'
    );
  }
  audioPlayer.addEventListener("play", function() {
    updateVariables();
    updateText();
    updateImages();
  });
  audioPlayer.addEventListener("ended", function() {
    playBtn.style.display = "inline";
    pauseBtn.style.display = "none";
  });
})();
