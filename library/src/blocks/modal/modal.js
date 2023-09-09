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

    // открываем или закрываем выбранное модальное окно
    const modalElement = document.querySelector(modalSelector);
    const isModalOpen = modalElement.style.display === 'block';

    // проверки
    if (
      modalSelector === '.modal__login' &&
      localStorage.getItem('loggedIn') === 'true'
    ) {
      // вошел в аккаунт, не открываем модальное окно логина
      return;
    }

    if (
      modalSelector === '.modal__buy-card' &&
      localStorage.getItem('loggedIn') !== 'true'
    ) {
      // не вошел в аккаунт, не открываем модальное окно покупки карты
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

    // функцию для обновления полного имени
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

  // функция для обработки нажатия кнопки "Check the card"
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
      // скрыть кнопку "Check the card" и отображаем панель с информацией
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

  // увеличения счетчика "Visits" в Local Storage и обновления отображения
  function increaseVisitsCounter() {
    // текущее значение счетчика "Visits" из Local Storage
    const visitsCount = getVisitsCount();

    // увеличиваем счетчик на 1
    const newVisitsCount = incrementCount(visitsCount);

    // обновляем значение счетчика в Local Storage
    updateVisitsCountInStorage(newVisitsCount);

    // обновляем отображение счетчика на странице
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
      // если пользователь вошел, увеличиваем счетчик "Visits"
      increaseVisitsCounter();
    }
  });

  function isUserLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
  }
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

  // добавить обработчики для закрытия модальных окон по кнопке "Закрыть"
  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      closeModal(modalLogin);
      closeModal(modalRegister);
    });
  });
})();

(() => {
  ///////////////////////
  // функция для обновления счетчика книг
  function updateBookCounter() {
    // получить количество книг из localStorage
    const bookCount = getBookCount();
    console.log(`Updating book counter with count: ${bookCount}`);

    // элементы с классом "librarycard__amount--books" на странице
    const booksCounterElements = document.querySelectorAll(
      '.librarycard__amount--books'
    );

    // обновляем содержимое всех элементов с новым значением счетчика книг
    booksCounterElements.forEach(element => {
      element.textContent = bookCount;
    });

    // обновляем содержимое элементов в модальном окне (если есть)
    const modalBooksCounterElements = document.querySelectorAll(
      '.modal__content .librarycard__amount--books'
    );
    modalBooksCounterElements.forEach(element => {
      element.textContent = bookCount;
    });
  }

  // для удаления "By" из имени автора
  function removeByFromAuthor(author) {
    // return author.replace('By ', '');
    return author;
  }

  // обработка нажатия на кнопку "Buy"
  function handleBuyButtonClick(event) {
    console.log('handleBuyButtonClick вызван');
    // вошел ли пользователь в аккаунт
    if (localStorage.getItem('loggedIn') === 'true') {
      // найти элементы, содержащие информацию о книге и авторе
      const card = event.target.closest('.favorites__card');
      const titleElement = card.querySelector('.favorites__title-name');
      const authorElement = card.querySelector('.favorites__title-author');

      // извлечь текст из элементов
      const title = titleElement.textContent;
      const author = authorElement.textContent;

      // удалить "By" из автора
      const authorWithoutBy = removeByFromAuthor(author);

      // создать строку в нужном формате
      const formattedData = `${authorWithoutBy.trim()}, ${title.trim()}`;

      // проверить, существует ли уже запись с такими данными в localStorage
      if (!isBookInLocalStorage(formattedData)) {
        // сгенерировать уникальный ключ для каждой книги
        const key = `book_${Date.now()}`;

        // сохранить данные о покупке в localStorage
        localStorage.setItem(key, formattedData);

        // отключить кнопку и изменить ее текст на "Own"
        const buyButton = event.target;
        buyButton.disabled = true;
        buyButton.querySelector('.favorites__text').textContent = 'Own';

        // обновить счетчик книг и список книг в модальном окне
        updateBookCounter();
        updateBookList();
      }
    }
    console.log(event.target);
  }

  // проверка, существует ли уже запись с такими данными в localStorage
  function isBookInLocalStorage(data) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const storedData = localStorage.getItem(key);
      if (storedData === data) {
        return true; // книга уже существует в localStorage
      }
    }
    return false; // книга не найдена в localStorage
  }

  // находим все кнопки "Buy"
  const buyButtons = document.querySelectorAll('.favorites__button');

  // добавить обработчик события для каждой кнопки "Buy"
  buyButtons.forEach(button => {
    button.addEventListener('click', handleBuyButtonClick);
  });

  buyButtons.forEach(button => {
    const card = button.closest('.favorites__card');
    const titleElement = card.querySelector('.favorites__title-name');
    const authorElement = card.querySelector('.favorites__title-author');

    const title = titleElement.textContent;
    const author = authorElement.textContent;
    const formattedData = `${author.trim()}, ${title.trim()}`;

    if (localStorage.getItem('loggedIn') === 'true') {
      console.log(localStorage.getItem('loggedIn'));
      console.log('Checking:', formattedData);

      let found = false;
      // проверить, была ли книга куплена
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const data = localStorage.getItem(key);
        console.log('data:', data);
        if (data === formattedData) {
          found = true;
          break;
        }
      }

      if (found) {
        console.log('Found match for:', formattedData);
        button.disabled = true;
        button.querySelector('.favorites__text').textContent = 'Own';
      }
    }
  });

  // получить количества книг в localStorage
  function getBookCount() {
    let count = 0;

    // перебирать все ключи в localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      // проверить, начинается ли ключ с "book_"
      if (key.startsWith('book_')) {
        count++;
      }
    }

    return count;
  }

  // вызывать функцию для обновления счетчика при загрузке страницы
  updateBookCounter();

  // обновления списка книг в модальном окне
  function updateBookList() {
    // находим контейнер для списка книг в модальном окне
    const modalBookList = document.querySelector('.modal__items-book');

    // очищаем существующий список книг
    modalBookList.innerHTML = '';

    // перебираем все элементы в localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const data = localStorage.getItem(key);

      // начинается ли ключ с "book_"
      if (key.startsWith('book_')) {
        // создать новый элемент списка и добавляем его в контейнер
        const listItem = document.createElement('li');
        listItem.className = 'modal__item-book';
        listItem.textContent = data;
        modalBookList.appendChild(listItem);
      }
    }
    console.log('Updating book list');
  }

  // функця для обновления списка книг при загрузке страницы
  updateBookList();

  ///////////////
})();
