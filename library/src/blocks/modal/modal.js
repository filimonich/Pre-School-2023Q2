(() => {
  const openModalRegisterButtons =
    document.querySelectorAll('.button-register');
  const buyButtons = document.querySelectorAll('.favorites__button');
  const openModalLoginButtons = document.querySelectorAll('.button-login');
  const modal = document.querySelector('.modal');
  const modalRegister = document.querySelector('.modal__register');
  const modalLogin = document.querySelector('.modal__login');
  const closeButton = document.querySelector('.modal__close-button');
  const signUpButton = document.querySelector('.modal__button');
  const cardNumberElement = document.querySelector('.header__card-number');
  const cardNumber = localStorage.getItem('cardNumber');
  const cardProfileTitle = document.querySelector('.header__profile-title');
  const myProfileButton = document.querySelector('.button-my-profile');
  const myProfileButtons = document.querySelectorAll('.button-my-profile');
  const logOutButton = document.querySelector('.button-log-out');
  const loginButton = document.querySelector('.button-login');
  const registerButton = document.querySelector('.button-register');
  const storedEmail = localStorage.getItem('email');
  const storedCard = localStorage.getItem('cardNumber');
  const storedPassword = localStorage.getItem('password');
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const icons = document.querySelectorAll('.user-icon');
  const modalLogInButton = document.querySelector('.modal__log-in-button');
  const form = document.querySelector('.modal__form');
  const checkCardButton = document.querySelector('.librarycard__button-check');
  const profileSection = document.querySelector('.librarycard__cards-profile');
  const getCardCaptions = document.querySelectorAll('.librarycard__caption');
  const getCardTexts = document.querySelectorAll('.librarycard__text');
  const getCardButtons = document.querySelectorAll('.librarycard__buttons');
  const getCardTitle = document.querySelectorAll('.librarycard__title');
  const modalIcon = document.querySelector('.modal__icon-copy');
  const modalNumber = document.querySelector('.modal__number');
  const copyMessage = document.querySelector('.modal__copy-message');
  const fields = ['firstName', 'lastName', 'email', 'password'];
  const nameInput = document.querySelector(
    '.librarycard__input[placeholder="Reader\'s name"]'
  );
  const cardNumberInput = document.querySelector(
    '.librarycard__input[placeholder="Card number"]'
  );
  const modalBuyCard = document.querySelector('.modal__buy-card');
  const modalMyProfile = document.querySelector('.modal__my-profile');
  const buyCardButtons = document.querySelectorAll('.button-buy-card');

  // функция закрытия модального окна регистрации
  const toggleModal = modalSelector => {
    // закрыть открытые модальные окна, если такие есть
    if (
      (modalSelector === '.modal__register' &&
        modalLogin.style.display === 'block') ||
      (modalSelector === '.modal__login' &&
        modalRegister.style.display === 'block') ||
      (modalSelector === '.modal__my-profile' &&
        modalBuyCard.style.display === 'block') ||
      (modalSelector === '.modal__buy-card' &&
        modalMyProfile.style.display === 'block')
    ) {
      toggleModal('.modal__login');
      toggleModal('.modal__register');
      toggleModal('.modal__my-profile');
      toggleModal('.modal__buy-card');
    }

    // открыть или закрываем выбранное модальное окно
    const modalElement = document.querySelector(modalSelector);
    const isModalOpen = modalElement.style.display === 'block';

    // проверки
    if (
      modalSelector === '.modal__login' &&
      localStorage.getItem('loggedIn') === 'true'
    ) {
      // вошел в аккаунт, не открыть модальное окно логина
      return;
    }

    if (
      modalSelector === '.modal__buy-card' &&
      localStorage.getItem('loggedIn') !== 'true'
    ) {
      // не вошел в аккаунт, не открыть модальное окно покупки карты
      return;
    }

    modalElement.style.display = isModalOpen ? 'none' : 'block';
    document.body.style.overflow = isModalOpen ? '' : 'hidden';
  };

  openModalRegisterButtons.forEach(button => {
    button.addEventListener('click', () => toggleModal('.modal__register'));
  });
  openModalLoginButtons.forEach(button => {
    button.addEventListener('click', () => toggleModal('.modal__login'));
  });
  myProfileButtons.forEach(button => {
    button.addEventListener('click', () => {
      toggleModal('.modal__my-profile');
    });
  });

  // обработчик события на нажатие кнопки
  buyCardButtons.forEach(button => {
    button.addEventListener('click', () => {
      toggleModal('.modal__buy-card');
    });
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

  // закрытие окон
  const buyCardCloseButton = document.querySelector(
    '.modal__buy-card .modal__close-button'
  );
  buyCardCloseButton.addEventListener('click', () => {
    toggleModal('.modal__buy-card');
  });

  const myProfileCloseButton = document.querySelector(
    '.modal__my-profile .modal__close-button'
  );
  myProfileCloseButton.addEventListener('click', () => {
    toggleModal('.modal__my-profile');
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
      if (modalMyProfile.style.display === 'block') {
        toggleModal('.modal__my-profile');
      }
      if (modalBuyCard.style.display === 'block') {
        toggleModal('.modal__buy-card');
      }
    }
  });

  // обновление класов в librarycard
  function toggleActiveClasstoggleActiveClass() {
    checkCardButton.classList.toggle('active');
    profileSection.classList.toggle('active');

    getCardCaptions.forEach(caption => {
      caption.classList.toggle('active');
    });

    getCardTexts.forEach(text => {
      text.classList.toggle('active');
    });

    getCardTitle.forEach(title => {
      title.classList.toggle('active');
    });

    getCardButtons.forEach(button => {
      button.classList.toggle('active');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // проверяет стутс входа
    function checkLoginStatus() {
      if (localStorage.getItem('loggedIn') === 'true') {
        updateIcon();
        updateMenuAndIcon();
        toggleActiveClasstoggleActiveClass();
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

    // обновления иконки пользователя и атрибута title
    function updateIcon() {
      const userIcons = document.querySelectorAll('.user-icon');
      if (firstName && lastName && userIcons.length > 0) {
        const fullName = `${firstName} ${lastName}`;
        userIcons.forEach(icon => {
          icon.title = fullName;
          icon.textContent =
            fullName[0].toUpperCase() +
            fullName[fullName.indexOf(' ') + 1].toUpperCase();
        });
      } else if (firstName || lastName) {
        const name = firstName || lastName;
        userIcons.forEach(icon => {
          icon.title = name;
          icon.textContent = name[0].toUpperCase();
        });
      }
      localStorage.setItem('loggedIn', 'true');
    }

    // смена иконки и меню пользователя
    function updateMenuAndIcon() {
      // смена иконки пользователя
      document.querySelector('.header__image').classList.remove('active');
      icons.forEach(icon => {
        icon.classList.add('active');
      });

      // обновление меню
      cardNumberElement.textContent = cardNumber;

      cardNumberElement.classList.add('active');
      myProfileButton.classList.add('active');
      logOutButton.classList.add('active');

      loginButton.classList.remove('active');
      registerButton.classList.remove('active');
      cardProfileTitle.classList.remove('active');
    }

    // получите элемент с классом .modal__name
    const modalName = document.querySelector('.modal__name');

    function updateFullName() {
      if (firstName && lastName) {
        const fullName = `${firstName[0].toUpperCase()}${firstName.slice(
          1
        )} ${lastName[0].toUpperCase()}${lastName.slice(1)}`;
        modalName.textContent = fullName;
      } else if (firstName || lastName) {
        const name = firstName ? firstName : lastName;
        const formattedName = `${name[0].toUpperCase()}${name.slice(1)}`;
        modalName.textContent = formattedName;
      } else {
        modalName.textContent = ''; // очистите содержимое, если нет имени
      }
    }

    // вызов функции для обновления полного имени
    updateFullName();

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
        toggleActiveClasstoggleActiveClass();
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
          localStorage.setItem('loggedIn', 'true'); // сохранение входа
          updateMenuAndIcon(); // обновление иконки и меню
          closeModal();
          toggleActiveClasstoggleActiveClass();
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

  // функция для обработки нажатия кнопки Check the card
  checkCardButton.addEventListener('click', function () {
    // получить данные из полей ввода
    const enteredName = nameInput.value;
    const enteredCardNumber = cardNumberInput.value;
    const informationDisplayTimer = 10000; // 10 секунд в миллисекундах

    // проверка совпадение данных
    if (
      (enteredName === firstName ||
        enteredName === firstName + ' ' + lastName) &&
      enteredCardNumber === cardNumber
    ) {
      // скрыть кнопку Check the card и отображаем панель с информацией
      checkCardButton.style.display = 'none';
      profileSection.style.display = 'block';

      // таймер на 10 секунд для возврата кнопки и скрытия панели
      setTimeout(function () {
        checkCardButton.style.display = 'block';
        profileSection.style.display = 'none';
      }, informationDisplayTimer);

      // через 10 секунд сбрасываем значения полей ввода
      setTimeout(function () {
        enteredName = '';
        enteredCardNumber = '';
      }, informationDisplayTimer);
    } else {
      // если данные не совпадают
      alert(
        'Invalid credentials. Please check your name and card number once.'
      );
    }
  });

  // копирование текста
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

  // увеличения счетчика Visits в Local Storage и обновления отображения
  function increaseVisitsCounter() {
    // текущее значение счетчика Visits из Local Storage
    const visitsCount = getVisitsCount();

    // увеличиваем счетчик на 1
    const newVisitsCount = incrementCount(visitsCount);

    // обновить значение счетчика в Local Storage
    updateVisitsCountInStorage(newVisitsCount);

    // обновить отображение счетчика на странице
    updateVisitsCountDisplay(newVisitsCount);
  }

  function getVisitsCount() {
    return localStorage.getItem('Visits') || 0;
  }

  function incrementCount(count) {
    return parseInt(count) + 1;
  }

  function updateVisitsCountInStorage(count) {
    localStorage.setItem('Visits', count);
  }

  function updateVisitsCountDisplay(count) {
    const visitsElements = document.querySelectorAll(
      '.librarycard__amount--visits'
    );
    visitsElements.forEach(element => {
      element.textContent = count;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // проверка, был ли пользователь зарегистрирован или вошел
    if (isUserLoggedIn()) {
      // если пользователь вошел, увеличиваем счетчик Visits
      increaseVisitsCounter();
    }
  });

  function isUserLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
  }
})();
//////////////////
(() => {
  /////////////////////
  // получить все кнопки купить в карточках
  const buyButtons = document.querySelectorAll('.favorites__button');
  // добавить обработчик событий для каждой кнопки купить
  for (let i = 0; i < buyButtons.length; i++) {
    // получить ID карточки
    const cardId = buyButtons[i].closest('.favorites__card').dataset.cardId;
    // проверить была ли книга уже куплена
    if (
      localStorage.getItem(cardId) === 'owned' &&
      localStorage.getItem('loggedIn') === 'true'
    ) {
      // поменять текст кнопки на Own и блокируем её
      buyButtons[i].textContent = 'Own';
      buyButtons[i].disabled = true;
    } else {
      // добавить обработчик событий для кнопки купить
      buyButtons[i].addEventListener('click', function () {
        // проверить вошел ли пользователь в аккаунт
        if (localStorage.getItem('loggedIn') === 'true') {
          // открыть модальное окно
          document.querySelector('.modal__buy-card').style.display = 'block';
        }
        // сохранить ссылку на кнопку купить в карточке
        const buyButton = this;
        // добавить обработчик событий для кнопки купить в модальном окне
        document
          .getElementById('buttonBuyCard')
          .addEventListener('click', function () {
            // .addEventListener('click', function (event) {
            // отменить отправку формы
            // event.preventDefault();
            // Проверяем валидность формы
            const form = document.querySelector('.modal__form--buy-card');
            if (
              form.checkValidity() &&
              localStorage.getItem('loggedIn') === 'true'
            ) {
              // Закрываем модальное окно
              document.querySelector('.modal__buy-card').style.display = 'none';
              // сохранить информацию о книге в локальном хранилище
              localStorage.setItem(cardId, 'owned');
              // поменять текст кнопки на Own и блокируем её
              buyButton.textContent = 'Own';
              buyButton.disabled = true;
            }
          });
      });
    }
  }

  // добавить префикс book- к ключам, которые относятся к книгам
  let cards = document.querySelectorAll('.favorites__card');
  cards.forEach(card => {
    if (card.querySelector('.favorites__button').hasAttribute('disabled')) {
      let title = card.querySelector('.favorites__title-name').innerText;
      let author = card
        .querySelector('.favorites__title-author')
        .innerText.replace('By ', '');
      if (!localStorage.getItem(`book-${title}`)) {
        localStorage.setItem(`book-${title}`, `${title}, ${author}`);
      }
    }
  });

  // получить ключи из localStorage
  let keys = Object.keys(localStorage);

  // фильтрация ключей, чтобы получить только те, которые начинаются с book-
  let bookKeys = keys.filter(key => key.startsWith('book-'));

  // получить количество книг
  let bookCount = bookKeys.length;

  // найти элементы на странице, где нужно отобразить количество книг
  let bookCountElements = document.querySelectorAll(
    '.librarycard__amount--books'
  );

  // обновить текст каждого элемента
  bookCountElements.forEach(element => {
    element.innerText = bookCount;
  });

  // найти элемент на странице, где нужно отобразить книги
  let bookList = document.querySelector('.modal__items-book');

  // пройти по каждому ключу
  bookKeys.forEach(key => {
    // получить данные книги из localStorage
    let bookData = localStorage.getItem(key);

    // создать новый элемент li
    let bookItem = document.createElement('li');
    bookItem.classList.add('modal__item-book');
    bookItem.innerText = bookData;

    // добавить новый элемент li в список книг
    bookList.appendChild(bookItem);
  });

  function populateCardNumber() {
    // получить номер карты из локального хранилища
    const cardNumber = localStorage.getItem('cardNumber');

    // есть ли номер карты в локальном хранилище
    if (cardNumber) {
      // найти элементы в DOM, которые нам нужно обновить
      const modalNumberElement = document.querySelector('.modal__number');

      // заполнить элементы данными из локального хранилища
      modalNumberElement.textContent = cardNumber;
    }
  }

  // вызов функции для заполнения номера карты при загрузке страницы
  populateCardNumber();
})();

(() => {
  // реализация открытие модального окна при нажатии на кнопку внутри модального окна
  const loginButtonIn = document.querySelector('.button-login-in');
  const registerButtonIn = document.querySelector('.button-register-in');
  const modalLogin = document.querySelector('.modal__login');
  const modalRegister = document.querySelector('.modal__register');
  const closeModalButtons = document.querySelectorAll('.modal__close-button');

  const openModal = modal => {
    if (getComputedStyle(modal).display !== 'block') {
      modal.style.display = 'block';
      setTimeout(() => openModal(modal), 100); // рекурсивный вызов с задержкой
    }
  };

  const closeModal = modal => {
    if (getComputedStyle(modal).display === 'block') {
      modal.style.display = 'none';
      setTimeout(() => closeModal(modal), 100); // рекурсивный вызов с задержкой
    }
  };

  loginButtonIn.addEventListener('click', () => {
    closeModal(modalRegister);
    openModal(modalLogin);
  });

  registerButtonIn.addEventListener('click', () => {
    closeModal(modalLogin);
    openModal(modalRegister);
  });

  // добавить обработчики для закрытия модальных окон по кнопке закрыть
  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      closeModal(modalLogin);
      closeModal(modalRegister);
    });
  });
})();
