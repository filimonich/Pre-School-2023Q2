// Создайте экземпляр класса MutationObserver
import { hideGame, modalTable } from './onOffModal.js';
import { notificationsElement, titleElement } from './movementWhenPressed.js';
import { saveScore, displayScores, updateRecordScore } from './score.js';

// создаём экземпляр класса MutationObserver
let observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    // проверяем, были ли изменены дочерние узлы или текст узла
    if (mutation.type === 'childList' || mutation.type === 'characterData') {
      let numberElements = document.querySelectorAll('.is-game__number');
      numberElements.forEach(function (numberElement) {
        if (numberElement.textContent == '2048') {
          console.log('Вы победили!');

          setTimeout(() => {
            modalTable.style.display = 'none';
            hideGame();
          }, 1048);

          // скрываем элемент
          notificationsElement.classList.add('hide');
          notificationsElement.style.display = 'block';
          setTimeout(() => {
            // показываем элемент
            notificationsElement.classList.remove('hide');
          }, 1048);

          saveScore(); // сохраняем счёт в localstorage
          displayScores(); // обновляем таблицу результатов
          updateRecordScore(); // отображаем рекордный результат

          titleElement.textContent = `You have won, to continue the game, click 'Field of play'`;
        }
      });
    }
  });
});

// настраиваем наблюдатель
let targetNode = document.querySelector('.is-game__items');
observer.observe(targetNode, {
  childList: true,
  subtree: true,
  characterData: true,
});
