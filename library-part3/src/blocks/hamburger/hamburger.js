(() => {
  // открытие и закрытие меню и меню-профиля
  const hamburgerButton = document.querySelector('.hamburger-js');
  const menuElement = document.querySelector('.menu');
  const dropMenuProfile = document.querySelector('.header__menu-drop');
  const menuProfile = document.querySelector('.header__menu-profile');

  function toggleMainMenu() {
    hamburgerButton.classList.toggle('hamburger--active');
    menuElement.classList.toggle('menu--active');
  }

  function closeMainMenu() {
    hamburgerButton.classList.remove('hamburger--active');
    menuElement.classList.remove('menu--active');
  }

  function toggleProfileMenu() {
    menuProfile.classList.toggle('header__menu-profile--active');
  }

  function closeProfileMenu() {
    menuProfile.classList.remove('header__menu-profile--active');
  }

  function handleMainMenuItemClick(event) {
    if (event.target.classList.contains('menu__link')) {
      toggleMainMenu();
    }
  }

  function handleDocumentClick(event) {
    if (
      !menuElement.contains(event.target) &&
      event.target !== hamburgerButton
    ) {
      closeMainMenu();
    }
    if (
      !dropMenuProfile.contains(event.target) &&
      event.target !== menuProfile
    ) {
      closeProfileMenu();
    }
  }

  function handleProfileMenuClick() {
    toggleProfileMenu();
  }

  menuElement.addEventListener('click', handleMainMenuItemClick);
  hamburgerButton.addEventListener('click', toggleMainMenu);
  document.addEventListener('click', handleDocumentClick);
  dropMenuProfile.addEventListener('click', handleProfileMenuClick);

  // const hamburgerButton = document.querySelector('.hamburger-js');
  // const menuElement = document.querySelector('.menu');

  // function toggleMenu() {
  //   hamburgerButton.classList.toggle('hamburger--active');
  //   menuElement.classList.toggle('menu--active');
  // }

  // function closeMenu() {
  //   hamburgerButton.classList.remove('hamburger--active');
  //   menuElement.classList.remove('menu--active');
  // }

  // menuElement.addEventListener('click', event => {
  //   if (event.target.classList.contains('menu__link')) {
  //     toggleMenu();
  //   }
  // });

  // hamburgerButton.addEventListener('click', toggleMenu);

  // document.addEventListener('click', event => {
  //   if (!menuElement.contains(event.target) && event.target !== hamburgerButton) {
  //     closeMenu();
  //   }
  // });
})();
