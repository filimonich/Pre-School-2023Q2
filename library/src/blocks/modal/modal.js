(() => {
  const openModalRegisterButtons =
    document.querySelectorAll('.button-register');
  const buyButtons = document.querySelectorAll('.favorites__button');
  const openModalLoginButtons = document.querySelectorAll('.button-login');
  const modal = document.querySelector('.modal');
  const modalRegister = document.querySelector('.modal__register');
  const modalLogin = document.querySelector('.modal__login');
  const openModalLogin = document.querySelector('.header__button-login');
  const closeButton = document.querySelector('.modal__close-button');
  const modalContent = document.querySelector('.modal__login .modal__content');
  const passwordInput = document.querySelector('#password');
  const signUpButton = document.querySelector('.modal__button');

  const cardNumberElement = document.querySelector('.header__card-number');
  const cardNumber = localStorage.getItem('cardNumber');
  const cardProfileTitle = document.querySelector('.header__profile-title');
  const myProfileButton = document.querySelector('.button-my-profile');
  const logOutButton = document.querySelector('.button-log-out');
  const loginButton = document.querySelector('.button-login');
  const registerButton = document.querySelector('.button-register');
  const storedEmail = localStorage.getItem('email');
  const storedCard = localStorage.getItem('cardNumber');
  const storedPassword = localStorage.getItem('password');
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const icon = document.getElementById('userIcon');
  const modalLogInButton = document.querySelector('.modal__log-in-button');
  const form = document.querySelector('.modal__form');

  const checkCardButton = document.querySelector('.librarycard__button-check');
  const profileSection = document.querySelector('.librarycard__cards-profile');
  const getCardCaptions = document.querySelectorAll('.librarycard__caption');
  const getCardTexts = document.querySelectorAll('.librarycard__text');
  const getCardButtons = document.querySelectorAll('.librarycard__buttons');

  const fields = ['firstName', 'lastName', 'email', 'password'];

  const togglePasswordButton = document.querySelector(
    '.modal__toggle-password'
  );

  const loginCloseButton = document.querySelector(
    '.modal__login .modal__close-button'
  );

  // функция закрытия модального окна регистрации
  const toggleModal = modalSelector => {
    if (
      modalSelector === '.modal__register' &&
      modalLogin.style.display === 'block'
    ) {
      toggleModal('.modal__login');
    }
    if (
      modalSelector === '.modal__login' &&
      modalRegister.style.display === 'block'
    ) {
      toggleModal('.modal__register');
    }

    // открыть или закрыть выбранное модальное окно
    const modalElement = document.querySelector(modalSelector);
    const isModalOpen = modalElement.style.display === 'block';
    modalElement.style.display = isModalOpen ? 'none' : 'block';
    document.body.style.overflow = isModalOpen ? '' : 'hidden';
  };

  openModalRegisterButtons.forEach(button => {
    button.addEventListener('click', () => toggleModal('.modal__register'));
  });
  openModalLoginButtons.forEach(button => {
    button.addEventListener('click', () => toggleModal('.modal__login'));
  });

  function closeModal() {
    if (modalRegister.style.display === 'block') {
      toggleModal('.modal__register');
    }
    if (modalLogin.style.display === 'block') {
      toggleModal('.modal__login');
    }
  }

  closeButton.addEventListener('click', closeModal);

  loginCloseButton.addEventListener('click', () => {
    toggleModal('.modal__login');
  });

  // добавить обработчик событий click к элементу модального окна
  modal.addEventListener('click', e => {
    const currentModalContent = document.querySelector(
      '.modal__main[style*="block"] .modal__content'
    );
    if (currentModalContent && !currentModalContent.contains(e.target)) {
      if (modalRegister.style.display === 'block') {
        toggleModal('.modal__register');
      }
      if (modalLogin.style.display === 'block') {
        toggleModal('.modal__login');
      }
    }
  });

  //////////

  function toggleActiveClasstoggleActiveClass() {
    checkCardButton.classList.toggle('active');
    profileSection.classList.toggle('active');

    getCardCaptions.forEach(caption => {
      caption.classList.toggle('active');
    });

    getCardTexts.forEach(text => {
      text.classList.toggle('active');
    });

    getCardButtons.forEach(button => {
      button.classList.toggle('active');
    });
  }

  //////////

  document.addEventListener('DOMContentLoaded', function () {
    // проверяет стутс входа
    function checkLoginStatus() {
      if (localStorage.getItem('loggedIn') === 'true') {
        updateIcon();
        updateMenuAndIcon();
      }
    }

    // сохранение данных формы в localStorage
    function saveData() {
      fields.forEach(field => {
        localStorage.setItem(field, document.getElementById(field).value);
      });
    }

    // генерации случайного номера карты и сохранения в localStorage
    function generateCardNumber() {
      localStorage.setItem(
        'cardNumber',
        Math.floor(Math.random() * 0xfffffffff)
          .toString(16)
          .padStart(9, '0')
      );
    }

    // обновления иконки пользователя
    function updateIcon() {
      if (firstName && lastName) {
        icon.textContent =
          firstName[0].toUpperCase() + lastName[0].toUpperCase();
      }
      localStorage.setItem('loggedIn', 'true'); // Сохранение входа
    }

    // смена иконки и меню пользователя
    function updateMenuAndIcon() {
      // смена иконки пользователя
      document.querySelector('.header__image').classList.remove('active');
      document.getElementById('userIcon').classList.add('active');

      // обновление меню
      cardNumberElement.textContent = cardNumber;

      cardNumberElement.classList.add('active');
      myProfileButton.classList.add('active');
      logOutButton.classList.add('active');

      loginButton.classList.remove('active');
      registerButton.classList.remove('active');
      cardProfileTitle.classList.remove('active');
    }

    // вызов функций, если форма валидна, происходит логин
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.checkValidity()) {
        saveData();
        updateIcon();
        generateCardNumber();
        localStorage.setItem('loggedIn', 'true'); // сохранение входа
        updateMenuAndIcon(); // обновление иконки и меню
        closeModal();
        toggleActiveClasstoggleActiveClass()
      }
    });

    // закрыть, если нажать signUpButton
    signUpButton.addEventListener('click', function () {
      if (form.checkValidity()) {
        closeModal();
      }
    });

    checkLoginStatus();

    // при нажатии на любую кнопку Buy открывается модальное окно LOGIN
    // возможно стотит поставить в другое место
    buyButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (localStorage.getItem('loggedIn') !== 'true') {
          toggleModal('.modal__login');
        }
      });
    });

    modalLogInButton.addEventListener('click', function (e) {
      e.preventDefault();

      if (storedEmail || storedCard || storedPassword) {
        const emailOrCardInput = document.getElementById('emailOrCard').value;
        const passwordInput = document.getElementById('passwordLogin').value;

        if (
          (emailOrCardInput === storedEmail ||
            emailOrCardInput === storedCard) &&
          passwordInput === storedPassword
        ) {
          // если данные совпадают с данными из localStorage
          updateIcon();
          generateCardNumber();
          localStorage.setItem('loggedIn', 'true'); // Сохранение входа
          updateMenuAndIcon(); // Обновление иконки и меню
          closeModal();
          toggleActiveClasstoggleActiveClass()
        } else {
          // если данные не соответствуют данным из localStorage
          alert(
            'Invalid credentials. Please check your email address or card number and password.'
          );
        }
      } else {
        alert('You need to register before logging in.');
      }
    });
  });

  // выхода из учетной записи
  logOutButton.addEventListener('click', () => {
    localStorage.setItem('loggedIn', 'false');
    location.reload(); // перезагрузить страницу
  });
})();
