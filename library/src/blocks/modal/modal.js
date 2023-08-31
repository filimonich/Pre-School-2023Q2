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
  // const modalContent = document.querySelector('.modal__content');
  const modalContent = document.querySelector('.modal__login .modal__content');
  const passwordInput = document.querySelector('#password');
  const signUpButton = document.querySelector('.modal__button');
  const togglePasswordButton = document.querySelector(
    '.modal__toggle-password'
  );

  const loginCloseButton = document.querySelector(
    '.modal__login .modal__close-button'
  );

  // функция переключения модального окна регистрации
  const toggleModal = modalSelector => {
    // Закрыть другое модальное окно
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

    // Открыть или закрыть выбранное модальное окно
    const modalElement = document.querySelector(modalSelector);
    const isModalOpen = modalElement.style.display === 'block';
    modalElement.style.display = isModalOpen ? 'none' : 'block';
    document.body.style.overflow = isModalOpen ? '' : 'hidden';
  };

  // const toggleModal = modalSelector => {
  //   const modalElement = document.querySelector(modalSelector);
  //   const isModalOpen = modalElement.style.display === 'block';
  //   modalElement.style.display = isModalOpen ? 'none' : 'block';
  //   document.body.style.overflow = isModalOpen ? '' : 'hidden';
  // };
  // const toggleModal = () => {
  //   const isModalOpen = modal.style.display === 'block';
  //   modal.style.display = isModalOpen ? 'none' : 'block';
  //   document.body.style.overflow = isModalOpen ? '' : 'hidden';
  // };

  // добовляем обработчик событий при клике
  // openModalRegisterButtons.forEach(button => {
  //   button.addEventListener('click', toggleModal);
  // });

  openModalRegisterButtons.forEach(button => {
    button.addEventListener('click', () => toggleModal('.modal__register'));
  });
  openModalLoginButtons.forEach(button => {
    button.addEventListener('click', () => toggleModal('.modal__login'));
  });
  // openModalLogin.addEventListener('click', () => toggleModal('.modal__login'));

  // closeButton.addEventListener('click', toggleModal);

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

  // closeButton.addEventListener('click', () => {
  //   toggleModal('.modal__register');
  //   toggleModal('.modal__login');
  // });

  // Добавляем обработчик событий click к элементу модального окна
  modal.addEventListener('click', e => {
    // Проверяем, было ли нажатие вне элемента modal__content
    if (!modalContent.contains(e.target)) {
      // Метод contains возвращает true, если узел является потомком указанного узла,
      // иначе - false. В данном случае, если элемент,
      // на который было нажатие (event.target),
      // не является потомком элемента modalContent, то метод вернет false,
      // и условие !modalContent.contains(event.target) будет истинным.
      // Скрываем модальное окно, устанавливая свойство display в none
      // modal.style.display = 'none';
      // closeModal();
      if (modalRegister.style.display === 'block') {
        toggleModal('.modal__register');
      }
      if (modalLogin.style.display === 'block') {
        toggleModal('.modal__login');
      }
    }
  });

  //////////

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.modal__form');
    // const modal = document.querySelector('.modal');

    const fields = ['firstName', 'lastName', 'email', 'password'];

    // проверяет стутс входа
    function checkLoginStatus() {
      if (localStorage.getItem('loggedIn') === 'true') {
        updateIcon();
        // activateIcon();
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
      const firstName = localStorage.getItem('firstName');
      const lastName = localStorage.getItem('lastName');
      const icon = document.getElementById('userIcon');
      icon.textContent =
        firstName && lastName
          ? firstName[0].toUpperCase() + lastName[0].toUpperCase()
          : '??';
      localStorage.setItem('loggedIn', 'true'); // сохранение входа
    }

    // смена иконки пользователя
    // function activateIcon() {
    //   document.querySelector('.header__image').classList.remove('active');
    //   document.getElementById('userIcon').classList.add('active');
    // }

    function updateMenuAndIcon() {
      // смена иконки пользователя
      document.querySelector('.header__image').classList.remove('active');
      document.getElementById('userIcon').classList.add('active');

      // обновление меню
      const cardNumberElement = document.querySelector('.header__card-number');
      const cardNumber = localStorage.getItem('cardNumber');
      cardNumberElement.textContent = cardNumber;
      cardNumberElement.classList.add('active');

      const myProfileButton = document.querySelector('.button-my-profile');
      myProfileButton.classList.add('active');

      const logOutButton = document.querySelector('.button-log-out');
      logOutButton.classList.add('active');

      const loginButton = document.querySelector('.button-login');
      loginButton.classList.remove('active');

      const registerButton = document.querySelector('.button-register');
      registerButton.classList.remove('active');

      const cardProfileTitle = document.querySelector('.header__profile-title');
      cardProfileTitle.classList.remove('active');
    }

    // вызов функций, если форма валидна
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.checkValidity()) {
        saveData();
        updateIcon();
        generateCardNumber();
        // activateIcon();
        localStorage.setItem('loggedIn', 'true'); // сохранение входа
        // modal.classList.remove('active'); // закрытие формы
        // modal.style.display = 'none';
        updateMenuAndIcon(); // обновление иконки и меню
        closeModal();
      }
    });

    // закрыть, если нажать signUpButton
    signUpButton.addEventListener('click', function () {
      if (form.checkValidity()) {
        // modal.style.display = 'none';
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

    //////////
  });

  // выхода из учетной записи
  const logOutButton = document.querySelector('.button-log-out');
  logOutButton.addEventListener('click', () => {
    localStorage.setItem('loggedIn', 'false');
    // нужно дописать поведение при выходе
  });

  ///////
})();
