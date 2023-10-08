export const gameMain = document.querySelector('.is-game__main');
export const modalOver = document.querySelector('.modal__over');
export const modalTable = document.querySelector('.modal__table');
// показать игру
export const showGame = () => {
  if (gameMain && modalOver) {
    gameMain.style.display = 'block';
    modalOver.style.display = 'none';
  }
};

// показать окно что бы начать новую игру
export const hideGame = () => {
  if (gameMain && modalOver) {
    gameMain.style.display = 'none';
    modalOver.style.display = 'block';
  }
};

// показать таблицу
export const showResultTable = () => {
  if (gameMain && modalTable) {
    gameMain.style.display = 'none';
    modalTable.style.display = 'block';
  }
};

// скрыть таблицу
export const hideResultTable = () => {
  if (gameMain && modalTable) {
    gameMain.style.display = 'block';
    modalTable.style.display = 'none';
  }
};

// открыть таблицу рекордов
const modalTableRecordOpen = document.querySelectorAll(
  '.modal__restart, .header__record, .modal__scor'
);
modalTableRecordOpen.forEach(button => {
  button.addEventListener('click', () => {
    showResultTable();
    if (modalOver) {
      console.log('если конец игры, закрыть окно');
      modalOver.style.display = 'none';
    }
  });
});

(async () => {
  for (let i = 1; i < 6; i++) {
    await new Promise(resolve => setTimeout(resolve, i * 2048));
    console.log('Hello');
  }
})();
