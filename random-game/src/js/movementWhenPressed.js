const allGameNumbers = document.querySelectorAll('.is-game__number');

// функция для перемещения чисел влево или вправо
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

// функция для перемещения чисел вверх или вниз
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
  // карта соответствия клавиш и направлений
  const keyToDirectionMap = {
    ArrowLeft: 'left',
    a: 'left',
    ArrowRight: 'right',
    d: 'right',
    ArrowUp: 'up',
    w: 'up',
    ArrowDown: 'down',
    s: 'down',
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
  }
});
