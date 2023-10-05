// Инициализация новой игры: очистите игровое поле и добавьте две случайные двойки.

// функция  для генерации случайного числа 2 или 4
const generateRandomNumber = () => {
  const randomNumber = Math.random() < 0.9 ? 2 : 4; // вероятность 90% для числа 2 и 10% - 4
  // console.log(randomNumber);
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

// назначаем обработчик события на кнопку рестарт
const restartButton = document.querySelector('.header__restart');
restartButton.addEventListener('click', () => {
  clearGameBoard(); // очистка поля
  addRandomNumbers(); // добавить два случайных числа
});

// инициализация новой игры при загрузки страницы
clearGameBoard();
addRandomNumbers();
