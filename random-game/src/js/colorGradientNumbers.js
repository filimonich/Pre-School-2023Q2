for (let i = 1; i < 6; i++) {
  setTimeout(() => {
    console.log('Hello');
  }, i * 2048);
}

document.addEventListener('DOMContentLoaded', event => {
  const itemElements = document.querySelectorAll('.is-game__item');

  // функция для обновления цвета фона в зависимости от числа
  const updateItemColor = item => {
    let number = parseInt(item.innerText);

    if (number <= 0) {
      item.style.backgroundColor = '#046351ff';
    } else if (number > 0 && number <= 2) {
      item.style.backgroundColor = '#405ce8';
    } else if (number > 2 && number <= 4) {
      item.style.backgroundColor = '#3418e3';
    } else if (number > 4 && number <= 8) {
      item.style.backgroundColor = '#282137';
    } else if (number > 8 && number <= 16) {
      item.style.backgroundColor = '#ad8d10';
    } else if (number > 16 && number <= 32) {
      item.style.backgroundColor = '#e0cd6b';
    } else if (number > 32 && number <= 64) {
      item.style.backgroundColor = '#c27938';
    } else if (number > 64 && number <= 128) {
      item.style.backgroundColor = '#7a2d6a';
    } else if (number > 128 && number <= 256) {
      item.style.backgroundColor = '#0036f8';
    } else if (number > 256 && number <= 512) {
      item.style.backgroundColor = '#6c19b6';
    } else if (number > 512 && number <= 1024) {
      item.style.backgroundColor = '#912425';
    } else if (number > 1024 && number <= 2048) {
      item.style.backgroundColor = '#af0022';
    }
  };

  // обновляем цвета элементов сразу после инициализации
  itemElements.forEach(updateItemColor);

  // создаем экземпляр mutationobserver
  const domChangeObserver = new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // если были изменения в структуре dom, обновляем цвета элементов
        itemElements.forEach(updateItemColor);
      }
    }
  });

  // начинаем отслеживать изменения в dom
  domChangeObserver.observe(document.body, { childList: true, subtree: true });
});
