import { greetingElement } from './movementWhenPressed.js';

(async () => {
  for (let i = 1; i < 6; i++) {
    await new Promise(resolve => setTimeout(resolve, i * 2048));
    console.log('счёт');
  }
})();

document.addEventListener('DOMContentLoaded', function () {
  const mainElement = document.querySelector('.main');
  const closeButton = document.querySelector('.greet__close');
  const startButton = document.querySelector('.greet__button');
  const infoButton = document.querySelector('.header__subtitle');

  function switchToMainFromGreeting() {
    greetingElement.style.display = 'none';
    mainElement.style.display = 'block';
  }

  function switchToGreetingFromMain() {
    greetingElement.style.display = 'block';
    mainElement.style.display = 'none';
  }

  closeButton.addEventListener('click', switchToMainFromGreeting);
  startButton.addEventListener('click', switchToMainFromGreeting);
  infoButton.addEventListener('click', switchToGreetingFromMain);
});
