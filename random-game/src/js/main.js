import '/styles/style.scss';
import '/js/isGameStartRestart.js';
import '/js/colorGradientNumbers.js';
import '/js/movementWhenPressed.js';

// for (let i = 1; i < 6; i++) {
//   setTimeout(() => {
//     console.log('Hello');
//   }, i * 2048);
// }

// убирает класс, что бы анимации не срабатывали раньше времени
document.addEventListener('DOMContentLoaded', () => {
  const preload = document.querySelector('.preload');

  const removePreloadClass = () => {
    preload.classList.remove('preload');
  };

  setTimeout(() => {
    removePreloadClass();
  }, 100);
});

// анимированная тень
const addDynamicShadow = () => {
  const blocks = document.getElementsByClassName('dynamic-shadow');

  document.addEventListener('mousemove', e => {
    if (window.innerWidth <= 780) {
      return;
    }

    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].style.boxShadow =
        (x - 0.5) * 40 +
        'px ' +
        (y - 0.5) * 40 +
        'px 20px rgba(0, 104, 111,0.65)';
    }
  });
};

addDynamicShadow();
