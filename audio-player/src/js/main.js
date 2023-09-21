import '/styles/style.scss';
import '/js/blocks.js';

for (let i = 1; i < 6; i++) {
  setTimeout(() => {
    console.log('Hello');
  }, i * 2000);
}

// убирает класс, что бы анимации не срабатывали раньше времени
document.addEventListener('DOMContentLoaded', function () {
  let preload = document.querySelector('.preload');

  function removePreloadClass() {
    preload.classList.remove('preload');
  }

  setTimeout(() => {
    removePreloadClass();
  }, 100);
});