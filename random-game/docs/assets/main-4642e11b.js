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
for (let i = 1; i < 6; i++) {
  setTimeout(() => {
    console.log("Hello");
  }, i * 2048);
}
document.addEventListener("DOMContentLoaded", (event) => {
  const itemElements = document.querySelectorAll(".is-game__item");
  const updateItemColor = (item) => {
    let number = parseInt(item.innerText);
    if (number <= 0) {
      item.style.backgroundColor = "#046351ff";
    } else if (number > 0 && number <= 2) {
      item.style.backgroundColor = "#405ce8";
    } else if (number > 2 && number <= 4) {
      item.style.backgroundColor = "#3418e3";
    } else if (number > 4 && number <= 8) {
      item.style.backgroundColor = "#282137";
    } else if (number > 8 && number <= 16) {
      item.style.backgroundColor = "#ad8d10";
    } else if (number > 16 && number <= 32) {
      item.style.backgroundColor = "#e0cd6b";
    } else if (number > 32 && number <= 64) {
      item.style.backgroundColor = "#c27938";
    } else if (number > 64 && number <= 128) {
      item.style.backgroundColor = "#7a2d6a";
    } else if (number > 128 && number <= 256) {
      item.style.backgroundColor = "#0036f8";
    } else if (number > 256 && number <= 512) {
      item.style.backgroundColor = "#6c19b6";
    } else if (number > 512 && number <= 1024) {
      item.style.backgroundColor = "#912425";
    } else if (number > 1024 && number <= 2048) {
      item.style.backgroundColor = "#af0022";
    }
  };
  itemElements.forEach(updateItemColor);
  const domChangeObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        itemElements.forEach(updateItemColor);
      }
    }
  });
  domChangeObserver.observe(document.body, { childList: true, subtree: true });
});
for (let i = 1; i < 6; i++) {
  setTimeout(() => {
    console.log("Hello");
  }, i * 2048);
}
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
