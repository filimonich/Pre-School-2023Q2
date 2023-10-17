import { greetingElement } from './movementWhenPressed.js';

document.addEventListener('DOMContentLoaded', () => {
  const mainElement = document.querySelector('.main');
  const closeButton = document.querySelector('.greet__close');
  const startButton = document.querySelector('.greet__button');
  const infoButton = document.querySelector('.header__subtitle');

  const switchToMainFromGreeting = () => {
    greetingElement.style.display = 'none';
    mainElement.style.display = 'block';
  };

  const switchToGreetingFromMain = () => {
    greetingElement.style.display = 'block';
    mainElement.style.display = 'none';
  };

  closeButton.addEventListener('click', switchToMainFromGreeting);
  startButton.addEventListener('click', switchToMainFromGreeting);
  infoButton.addEventListener('click', switchToGreetingFromMain);
});
