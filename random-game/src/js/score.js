(async () => {
  for (let i = 1; i < 6; i++) {
    await new Promise(resolve => setTimeout(resolve, i * 2048));
    console.log('счёт');
  }
})();

// создаём переменную для хранения текущего счёта
let score = 0;

// функция для обновления счёта на странице
export const updateScore = () => {
  // находим элемент со счётом на странице
  const scoreElement = document.querySelector('.header__score-point');

  // обновляем значение счёта
  scoreElement.textContent = score.toString();
};

// функция для добавления очков к текущему счёту
const addToScore = points => {
  score += points;
  updateScore(); // обновляем счёт на странице
};

// функция для объединения чисел
export const mergeNumbers = rowNumbers => {
  for (let colIndex = 0; colIndex < 3; colIndex++) {
    const currentNumber = rowNumbers[colIndex].textContent;
    const nextNumber = rowNumbers[colIndex + 1].textContent;

    if (currentNumber === nextNumber && currentNumber !== '0') {
      const mergedValue = parseInt(currentNumber) * 2;
      rowNumbers[colIndex].textContent = mergedValue.toString();
      rowNumbers[colIndex + 1].textContent = '0';
      // добавляем очки к счёту при сложении чисел
      addToScore(mergedValue);
    }
  }
};
