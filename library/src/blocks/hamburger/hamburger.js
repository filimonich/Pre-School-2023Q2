(() => {
  let hamburger = document.querySelector('.hamburger-js');
  let menuOverlay = document.querySelector('.menu');
  let links = document.querySelectorAll('.menu__link');

  function toggleMenu(e) {
    hamburger.classList.toggle('hamburger--active');
    menuOverlay.classList.toggle('menu--active');
    console.info('Клик', e.target)
  }

  links.forEach(function (element) {
    element.addEventListener('click', toggleMenu);
  });

  hamburger.addEventListener('click', toggleMenu);

  document.addEventListener('click', e => {
    if (!menuOverlay.contains(e.target) && e.target !== hamburger) {
      hamburger.classList.remove('hamburger--active');
      menuOverlay.classList.remove('menu--active');
    }
  });
})();
