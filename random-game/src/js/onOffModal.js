// Функция для изменения стиля элементов
function showGame() {
  const gameMain = document.querySelector('.is-game__main');
  const modalOver = document.querySelector('.modal__over');

  if (gameMain && modalOver) {
    gameMain.style.display = 'block';
    modalOver.style.display = 'none';
  }
}

// Функция для возвращения стиля элементов к исходному состоянию
function hideGame() {
  const gameMain = document.querySelector('.is-game__main');
  const modalOver = document.querySelector('.modal__over');

  if (gameMain && modalOver) {
    gameMain.style.display = 'none';
    modalOver.style.display = 'block';
  }
}

(async () => {
  for (let i = 1; i < 6; i++) {
    await new Promise(resolve => setTimeout(resolve, i * 2048));
    console.log('Hello');
  }
  console.log('Привет');
})();

for (let i = 1; i < 6; i++) {
  setTimeout(() => {
    console.log('Hello');
  }, i * 2048);
}
