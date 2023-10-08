import { showGame, hideGame } from './onOffModal.js';

const allGameNumbers = document.querySelectorAll('.is-game__number');

// перемещения чисел влево или вправо
const moveNumbersHorizontal = direction => {
  // проходимся по каждой строке
  for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
    // выбираем числа текущей строки
    const rowNumbers = Array.from(allGameNumbers).slice(
      rowIndex * 4,
      (rowIndex + 1) * 4
    );

    // если направление вправо, переворачиваем строку
    if (direction === 'right') {
      rowNumbers.reverse();
    }

    // фильтруем только ненулевые элементы и сохраняем порядок
    const nonZeroNumbers = rowNumbers.filter(
      number => number.textContent !== '0'
    );

    // заполняем пустые ячейки
    for (let colIndex = 0; colIndex < 4; colIndex++) {
      if (nonZeroNumbers[colIndex]) {
        rowNumbers[colIndex].textContent = nonZeroNumbers[colIndex].textContent;
      } else {
        rowNumbers[colIndex].textContent = '0';
      }
    }

    // объединяем одинаковые числа
    for (let colIndex = 0; colIndex < 3; colIndex++) {
      if (
        rowNumbers[colIndex].textContent ===
          rowNumbers[colIndex + 1].textContent &&
        rowNumbers[colIndex].textContent !== '0'
      ) {
        rowNumbers[colIndex].textContent = (
          parseInt(rowNumbers[colIndex].textContent) * 2
        ).toString();
        rowNumbers[colIndex + 1].textContent = '0';
      }
    }

    // повторно заполняем пустые ячейки после объединения
    const updatedNonZeroNumbers = rowNumbers.filter(
      number => number.textContent !== '0'
    );
    for (let colIndex = 0; colIndex < 4; colIndex++) {
      if (updatedNonZeroNumbers[colIndex]) {
        rowNumbers[colIndex].textContent =
          updatedNonZeroNumbers[colIndex].textContent;
      } else {
        rowNumbers[colIndex].textContent = '0';
      }
    }
  }
};

// перемещения чисел вверх или вниз
const moveNumbersVertical = direction => {
  // проходимся по каждому столбцу
  for (let colIndex = 0; colIndex < 4; colIndex++) {
    // выбираем числа текущего столбца
    const columnNumbers = Array.from(allGameNumbers).filter(
      (_, index) => index % 4 === colIndex
    );

    // если направление вниз, переворачиваем столбец
    if (direction === 'down') {
      columnNumbers.reverse();
    }

    // фильтруем только ненулевые элементы и сохраняем порядок
    const nonZeroNumbers = columnNumbers.filter(
      number => number.textContent !== '0'
    );

    // заполняем пустые ячейки
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      if (nonZeroNumbers[rowIndex]) {
        columnNumbers[rowIndex].textContent =
          nonZeroNumbers[rowIndex].textContent;
      } else {
        columnNumbers[rowIndex].textContent = '0';
      }
    }

    // объединяем одинаковые числа
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      if (
        columnNumbers[rowIndex].textContent ===
          columnNumbers[rowIndex + 1].textContent &&
        columnNumbers[rowIndex].textContent !== '0'
      ) {
        columnNumbers[rowIndex].textContent = (
          parseInt(columnNumbers[rowIndex].textContent) * 2
        ).toString();
        columnNumbers[rowIndex + 1].textContent = '0';
      }
    }

    // повторно заполняем пустые ячейки после объединения
    const updatedNonZeroNumbers = columnNumbers.filter(
      number => number.textContent !== '0'
    );
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      if (updatedNonZeroNumbers[rowIndex]) {
        columnNumbers[rowIndex].textContent =
          updatedNonZeroNumbers[rowIndex].textContent;
      } else {
        columnNumbers[rowIndex].textContent = '0';
      }
    }
  }
};

// обработчик события для нажатия клавиш
document.addEventListener('keydown', e => {
  // console.log('keydown');
  // console.log('Клавиша нажата:', e.key);
  // карта соответствия клавиш и направлений
  const keyToDirectionMap = {
    ArrowLeft: 'left',
    a: 'left',
    ф: 'left',
    ArrowRight: 'right',
    d: 'right',
    в: 'right',
    ArrowUp: 'up',
    w: 'up',
    ц: 'up',
    ArrowDown: 'down',
    s: 'down',
    ы: 'down',
  };

  // конец игры если нет места для новых блоков
  const checkGameOver = () => {
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      for (let colIndex = 0; colIndex < 4; colIndex++) {
        // если текущая ячейка пуста, игра продолжается
        if (allGameNumbers[rowIndex * 4 + colIndex].textContent === '0') {
          return false;
        }
        // проверяем соседние ячейки
        if (
          rowIndex < 3 &&
          allGameNumbers[rowIndex * 4 + colIndex].textContent ===
            allGameNumbers[(rowIndex + 1) * 4 + colIndex].textContent
        ) {
          return false;
        }
        if (
          colIndex < 3 &&
          allGameNumbers[rowIndex * 4 + colIndex].textContent ===
            allGameNumbers[rowIndex * 4 + (colIndex + 1)].textContent
        ) {
          return false;
        }
      }
    }
    // если все ячейки заполнены и нет одинаковых чисел рядом, игра закончена
    return true;
  };

  // определяем направление по нажатой клавише
  const direction = keyToDirectionMap[e.key];
  if (direction) {
    // если направление влево или вправо, вызываем функцию для горизонтального перемещения
    if (direction === 'left' || direction === 'right') {
      moveNumbersHorizontal(direction);
    }
    // если направление вверх или вниз, вызываем функцию для вертикального перемещения
    else if (direction === 'up' || direction === 'down') {
      moveNumbersVertical(direction);
    }

    // добавляем новое число после каждого хода
    addNewNumber();

    // показать alert когда игра окончена
    if (checkGameOver()) {
      console.log('Игра окончена!');
      hideGame();
    }
  }
});

// добавления нового числа после хода
const addNewNumber = () => {
  // фильтруем только пустые ячейки
  const emptyCells = Array.from(allGameNumbers).filter(
    number => number.textContent === '0'
  );

  if (emptyCells.length > 0) {
    // выбираем случайную пустую ячейку
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    // добавляем в нее новое случайное число (2 или 4)
    randomCell.textContent = Math.random() < 0.5 ? '2' : '4';
  }
};
