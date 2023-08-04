let hamburger = document.querySelector('.hamburger');
let overlay = document.querySelector('.overlay');

let links = document.querySelectorAll('.menu__link');

links.forEach(function (element) {
  element.addEventListener('click', toggleMenu);
})

function toggleMenu() {
  hamburger.classList.toggle('hamburger--active');
  overlay.classList.toggle('overlay--active');
}

hamburger.addEventListener('click', toggleMenu);

document.addEventListener('click', (event) => {
  if (!overlay.contains(event.target) && event.target !== hamburger) {
    hamburger.classList.remove('hamburger--active');
    overlay.classList.remove('overlay--active');
  }
});
