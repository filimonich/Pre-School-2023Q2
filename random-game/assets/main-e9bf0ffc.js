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
const gameMain = document.querySelector(".is-game__main");
const modalOver = document.querySelector(".modal__over");
const modalTable = document.querySelector(".modal__table");
const showGame = () => {
  if (gameMain && modalOver) {
    gameMain.style.display = "block";
    modalOver.style.display = "none";
    modalTable.style.display = "none";
  }
};
const hideGame = () => {
  if (gameMain && modalOver) {
    gameMain.style.display = "none";
    modalOver.style.display = "block";
  }
};
const showResultTable = () => {
  if (gameMain && modalTable) {
    gameMain.style.display = "none";
    modalTable.style.display = "block";
  }
};
const hideResultTable = () => {
  if (gameMain && modalTable) {
    gameMain.style.display = "block";
    modalTable.style.display = "none";
  }
};
const modalTableRecordOpen = document.querySelectorAll(
  ".modal__restart, .header__record, .modal__scor"
);
modalTableRecordOpen.forEach((button) => {
  button.addEventListener("click", () => {
    showResultTable();
    if (modalOver.style.display === "block") {
      console.log("если конец игры, закрыть окно");
      modalOver.style.display = "none";
    }
  });
});
const continueButton = document.querySelectorAll(".modal__resume");
continueButton.forEach((continueButton2) => {
  continueButton2.addEventListener("click", () => {
    if (modalOver.style.display === "block" || modalTable.style.display === "block") {
      console.log("продолжить игру");
      showGame();
    }
  });
});
const allGameNumbers = document.querySelectorAll(".is-game__number");
const scoreElement = document.querySelector(".header__score-point");
let totalSum = 0;
const moveNumbersHorizontal = (direction) => {
  for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
    const rowNumbers = Array.from(allGameNumbers).slice(
      rowIndex * 4,
      (rowIndex + 1) * 4
    );
    if (direction === "right") {
      rowNumbers.reverse();
    }
    const nonZeroNumbers = rowNumbers.filter(
      (number) => number.textContent !== "0"
    );
    for (let colIndex = 0; colIndex < 4; colIndex++) {
      if (nonZeroNumbers[colIndex]) {
        rowNumbers[colIndex].textContent = nonZeroNumbers[colIndex].textContent;
      } else {
        rowNumbers[colIndex].textContent = "0";
      }
    }
    for (let colIndex = 0; colIndex < 3; colIndex++) {
      if (rowNumbers[colIndex].textContent === rowNumbers[colIndex + 1].textContent && rowNumbers[colIndex].textContent !== "0") {
        const sum = parseInt(rowNumbers[colIndex].textContent) * 2;
        console.log(
          `сложение: ${rowNumbers[colIndex].textContent} + ${rowNumbers[colIndex].textContent} = ${sum}`
        );
        totalSum += sum;
        rowNumbers[colIndex].textContent = (+sum).toString();
        rowNumbers[colIndex + 1].textContent = "0";
      }
    }
    const updatedNonZeroNumbers = rowNumbers.filter(
      (number) => number.textContent !== "0"
    );
    for (let colIndex = 0; colIndex < 4; colIndex++) {
      if (updatedNonZeroNumbers[colIndex]) {
        rowNumbers[colIndex].textContent = updatedNonZeroNumbers[colIndex].textContent;
      } else {
        rowNumbers[colIndex].textContent = "0";
      }
    }
  }
  printTotalSum();
};
const moveNumbersVertical = (direction) => {
  for (let colIndex = 0; colIndex < 4; colIndex++) {
    const columnNumbers = Array.from(allGameNumbers).filter(
      (_, index) => index % 4 === colIndex
    );
    if (direction === "down") {
      columnNumbers.reverse();
    }
    const nonZeroNumbers = columnNumbers.filter(
      (number) => number.textContent !== "0"
    );
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      if (nonZeroNumbers[rowIndex]) {
        columnNumbers[rowIndex].textContent = nonZeroNumbers[rowIndex].textContent;
      } else {
        columnNumbers[rowIndex].textContent = "0";
      }
    }
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      if (columnNumbers[rowIndex].textContent === columnNumbers[rowIndex + 1].textContent && columnNumbers[rowIndex].textContent !== "0") {
        const sum = parseInt(columnNumbers[rowIndex].textContent) * 2;
        console.log(
          `сложение: ${columnNumbers[rowIndex].textContent} + ${columnNumbers[rowIndex].textContent} = ${sum}`
        );
        totalSum += sum;
        columnNumbers[rowIndex].textContent = (+sum).toString();
        columnNumbers[rowIndex + 1].textContent = "0";
      }
    }
    const updatedNonZeroNumbers = columnNumbers.filter(
      (number) => number.textContent !== "0"
    );
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      if (updatedNonZeroNumbers[rowIndex]) {
        columnNumbers[rowIndex].textContent = updatedNonZeroNumbers[rowIndex].textContent;
      } else {
        columnNumbers[rowIndex].textContent = "0";
      }
    }
  }
  printTotalSum();
};
const handleKeydown = (e) => {
  if (window.getComputedStyle(modalOver).display === "block" || window.getComputedStyle(modalTable).display === "block") {
    console.log("модальное окно открыто, нажатие клавиш игнорируется");
    return;
  }
  const keyToDirectionMap = {
    ArrowLeft: "left",
    a: "left",
    ф: "left",
    ArrowRight: "right",
    d: "right",
    в: "right",
    ArrowUp: "up",
    w: "up",
    ц: "up",
    ArrowDown: "down",
    s: "down",
    ы: "down"
  };
  const checkGameOver = () => {
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      for (let colIndex = 0; colIndex < 4; colIndex++) {
        if (allGameNumbers[rowIndex * 4 + colIndex].textContent === "0") {
          return false;
        }
        if (rowIndex < 3 && allGameNumbers[rowIndex * 4 + colIndex].textContent === allGameNumbers[(rowIndex + 1) * 4 + colIndex].textContent) {
          return false;
        }
        if (colIndex < 3 && allGameNumbers[rowIndex * 4 + colIndex].textContent === allGameNumbers[rowIndex * 4 + (colIndex + 1)].textContent) {
          return false;
        }
      }
    }
    return true;
  };
  const direction = keyToDirectionMap[e.key];
  if (direction) {
    if (direction === "left" || direction === "right") {
      moveNumbersHorizontal(direction);
    } else if (direction === "up" || direction === "down") {
      moveNumbersVertical(direction);
    }
    addNewNumber();
    if (checkGameOver()) {
      console.log("Игра окончена!");
      modalTable.style.display = "none";
      hideGame();
    }
  }
};
document.addEventListener("keydown", handleKeydown);
const addNewNumber = () => {
  const emptyCells = Array.from(allGameNumbers).filter(
    (number) => number.textContent === "0"
  );
  if (emptyCells.length > 0) {
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = Math.random() < 0.5 ? "2" : "4";
  }
};
const printTotalSum = () => {
  console.log(`общая сумма былов: ${totalSum}`);
  scoreElement.textContent = totalSum;
};
console.log(`1: ${totalSum}`);
function resetTotalSum() {
  totalSum = 0;
}
const saveScore = () => {
  let currentScore = parseInt(
    document.querySelector(".header__score-point").innerText
  );
  let savedGames = JSON.parse(localStorage.getItem("games")) || [];
  if (currentScore > 0) {
    savedGames.push({ gameNumber: savedGames.length + 1, score: currentScore });
    savedGames.sort((a, b) => b.score - a.score);
    if (savedGames.length > 10) {
      savedGames = savedGames.slice(0, 10);
    }
  }
  localStorage.setItem("games", JSON.stringify(savedGames));
};
const displayScores = () => {
  let savedGames = JSON.parse(localStorage.getItem("games")) || [];
  let listElement = document.querySelector(".modal__items");
  listElement.innerHTML = "";
  for (let game of savedGames) {
    let listItem = document.createElement("li");
    listItem.className = "modal__item";
    let placeElement = document.createElement("p");
    placeElement.className = "modal__place";
    placeElement.innerText = "Номер игры: " + game.gameNumber;
    let scoreElement2 = document.createElement("p");
    scoreElement2.className = "modal__point";
    scoreElement2.innerText = "Ваш счёт: " + game.score;
    listItem.appendChild(placeElement);
    listItem.appendChild(scoreElement2);
    listElement.appendChild(listItem);
    let hrElement = document.createElement("hr");
    listElement.appendChild(hrElement);
  }
};
const updateRecordScore = () => {
  let savedGames = JSON.parse(localStorage.getItem("games")) || [];
  if (savedGames.length > 0) {
    let maxScore = Math.max(...savedGames.map((game) => game.score));
    let recordElement = document.querySelector(".header__record-point");
    recordElement.innerText = maxScore;
  }
};
displayScores();
updateRecordScore();
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
const restartButton = document.querySelectorAll(
  ".header__restart, .modal__restart"
);
restartButton.forEach((button) => {
  button.addEventListener("click", () => {
    saveScore();
    displayScores();
    updateRecordScore();
    resetTotalSum();
    scoreElement.textContent = 0;
    console.log(`рестарт, текущий счёт: ${totalSum}`);
    clearGameBoard();
    addRandomNumbers();
    if (modalOver.style.display === "block") {
      console.log("закрыть окно");
      showGame();
    }
    if (modalTable.style.display === "block") {
      console.log("закрыть таблицу");
      hideResultTable();
    }
  });
});
clearGameBoard();
addRandomNumbers();
document.addEventListener("DOMContentLoaded", (event) => {
  const itemElements = document.querySelectorAll(".is-game__item");
  const updateItemColor = (item) => {
    let number = parseInt(item.innerText);
    if (number <= 0) {
      item.style.backgroundColor = "#008040";
    } else if (number > 0 && number <= 2) {
      item.style.backgroundColor = "#a5c19f";
    } else if (number > 2 && number <= 4) {
      item.style.backgroundColor = "#0036f8";
    } else if (number > 4 && number <= 8) {
      item.style.backgroundColor = "#3418e3";
    } else if (number > 8 && number <= 16) {
      item.style.backgroundColor = "#5b5b00";
    } else if (number > 16 && number <= 32) {
      item.style.backgroundColor = "#e0cd6b";
    } else if (number > 32 && number <= 64) {
      item.style.backgroundColor = "#c27938";
    } else if (number > 64 && number <= 128) {
      item.style.backgroundColor = "#282137";
    } else if (number > 128 && number <= 256) {
      item.style.backgroundColor = "#7a2d6a";
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
