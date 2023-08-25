(() => {
  document.addEventListener('DOMContentLoaded', () => {
    // Установка начальной высоты блока избранного
    // const initialHeight = document.querySelector('.favorites__contents').offsetHeight;
    // document.querySelector('.favorites__contents').style.height = `${initialHeight}px`;


    // Функция для затухания текущих карточек и проявления новых карточек
    const changeCards = season => {
      // Затухание текущих карточек
      const currentCards = document.querySelector(
        '.favorites__holder:not([style*="display: none"])'
      );
      currentCards.style.display = 'none';
      // Проявление новых карточек
      const newCards = document.querySelectorAll('.favorites__holder')[season];
      newCards.style.display = 'block';
    };

    // Обработка нажатий на кнопки панели навигации
    const buttons = document.querySelectorAll('.favorites__input-button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Получение индекса нажатой кнопки
        const season = Array.prototype.indexOf.call(buttons, button);
        // Изменение карточек
        changeCards(season);
      });
    });
  });
})();
