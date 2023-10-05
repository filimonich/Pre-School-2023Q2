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
for (let i = 1; i < 6; i++) {
  setTimeout(() => {
    console.log("Hello");
  }, i * 2e3);
}
const generateRandomNumber = () => {
  const randomNumber = Math.random() < 0.9 ? 2 : 4;
  return randomNumber;
};
const clearGameBoard = () => {
  const gameItemsNumber = document.querySelectorAll(".is-game__number");
  gameItemsNumber.forEach((item) => {
    item.textContent = "0";
  });
};
const addRandomNumbers = () => {
  const gameItemsNumber = document.querySelectorAll(".is-game__number");
  const availableItems = [];
  gameItemsNumber.forEach((item, index) => {
    if (item.textContent === "0") {
      availableItems.push(index);
    }
  });
  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    const chosenIndex = availableItems.splice(randomIndex, 1)[0];
    gameItemsNumber[chosenIndex].textContent = generateRandomNumber();
  }
};
const restartButton = document.querySelector(".header__restart");
restartButton.addEventListener("click", () => {
  clearGameBoard();
  addRandomNumbers();
});
clearGameBoard();
addRandomNumbers();
document.addEventListener("DOMContentLoaded", () => {
  const preload = document.querySelector(".preload");
  const removePreloadClass = () => {
    preload.classList.remove("preload");
  };
  setTimeout(() => {
    removePreloadClass();
  }, 100);
});
const addDynamicShadow = () => {
  const blocks = document.getElementsByClassName("dynamic-shadow");
  document.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 780) {
      return;
    }
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].style.boxShadow = (x - 0.5) * 40 + "px " + (y - 0.5) * 40 + "px 20px rgba(0, 104, 111,0.65)";
    }
  });
};
addDynamicShadow();
