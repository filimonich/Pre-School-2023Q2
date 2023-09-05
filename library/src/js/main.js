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

const modalIcon = document.querySelector('.modal__icon-copy');
const modalNumber = document.querySelector('.modal__number');
const copyMessage = document.querySelector('.modal__copy-message');

modalIcon.addEventListener('click', async () => {
  const subjectText = modalNumber.textContent;

  try {
    await navigator.clipboard.writeText(subjectText);
    copyMessage.textContent = 'Copied';
  } catch (err) {
    console.error(`Couldn't copy text: `, err);
    copyMessage.textContent = 'Copy error';
  }

  copyMessage.style.display = 'inline'; // показать сообщение
  setTimeout(() => {
    copyMessage.style.display = 'none'; // cкрыть сообщение
  }, 500);
});
