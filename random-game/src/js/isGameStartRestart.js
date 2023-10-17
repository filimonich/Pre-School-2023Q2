import {
  showGame,
  modalOver,
  modalTable,
  hideResultTable,
} from './onOffModal.js';
import {
  scoreElement,
  totalSum, // удалить, это для проверки
  resetTotalSum,
} from './movementWhenPressed.js';
import { saveScore, displayScores, updateRecordScore } from './score.js';

// инициализация новой игры: очистить игровое поле и добавлени две случайные двойки.

// функция  для генерации случайного числа 2 или 4
const generateRandomNumber = () => {
  const randomNumber = Math.random() < 0.9 ? 2 : 4; // вероятность 90% для числа 2 и 10% - 4
  return randomNumber;
};

// очистить поле
const clearGameBoard = () => {
  const gameItemsNumber = document.querySelectorAll('.is-game__number');
  gameItemsNumber.forEach(item => {
    item.textContent = '0';
  });
};

// добовление двух случайных чисел на поле игры
const addRandomNumbers = () => {
  const gameItemsNumber = document.querySelectorAll('.is-game__number');
  const availableItems = [];

  // проверяем пустые ячейки
  gameItemsNumber.forEach((item, index) => {
    if (item.textContent === '0') {
      availableItems.push(index);
    }
  });

  // выбираем две случайные пустые ячейки
  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    const chosenIndex = availableItems.splice(randomIndex, 1)[0]; // удалить выбранный массив из массива доступных индексов
    // установить случайное число (2 || 4) в выбранные ячейки
    gameItemsNumber[chosenIndex].textContent = generateRandomNumber();
  }
};

// рестарт
const restartButton = document.querySelectorAll(
  '.header__restart, .modal__restart'
);
restartButton.forEach(button => {
  button.addEventListener('click', () => {
    saveScore(); // сохранение счета в localstorage
    displayScores(); // обновление таблицы результатов
    updateRecordScore(); // отображение рекордного результата

    resetTotalSum(); // обнуление totalSum
    scoreElement.textContent = 0; // обнуление счета на экране

    clearGameBoard(); // очистка поля
    addRandomNumbers(); // добавить два случайных числа
    if (modalOver.style.display === 'block') {
      showGame();
    }
    if (modalTable.style.display === 'block') {
      hideResultTable();
    }
  });
});

// инициализация новой игры при загрузки страницы
clearGameBoard();
addRandomNumbers();
