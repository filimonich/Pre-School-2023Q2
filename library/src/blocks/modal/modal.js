(() => {
  const openModalLogin = document.querySelector('.header__button-login');
  const openModalRegisterButtons =
    document.querySelectorAll('.button-register');
  const closeButton = document.querySelector('.modal__close-button');
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal__content');
  const passwordInput = document.querySelector('#password');
  const signUpButton = document.querySelector('.modal__button');
  const togglePasswordButton = document.querySelector(
    '.modal__toggle-password'
  );

  // функция переключения модального окна
  const toggleModal = () => {
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    document.body.style.overflow =
      modal.style.display === 'block' ? 'hidden' : '';
  };
  // добовляем обработчик событий при клике
  openModalRegisterButtons.forEach(button => {
    button.addEventListener('click', toggleModal);
  });
  closeButton.addEventListener('click', toggleModal);

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
      modal.style.display = 'none';
    }
  });

  //////////

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.modal__form');
    const modal = document.querySelector('.modal');

    const fields = ['firstName', 'lastName', 'email', 'password'];

    // проверяет стутс входа
    function checkLoginStatus() {
      if (localStorage.getItem('loggedIn') === 'true') {
        updateIcon();
        activateIcon();
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
    function activateIcon() {
      document.querySelector('.header__image').classList.remove('active');
      document.getElementById('userIcon').classList.add('active');
    }

    // вызов функций, если форма валидна
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.checkValidity()) {
        saveData();
        updateIcon();
        generateCardNumber();
        activateIcon();
        localStorage.setItem('loggedIn', 'true'); // сохранение входа
        modal.classList.remove('active'); // закрытие формы
      }
    });

    // закрыть, если нажать signUpButton
    signUpButton.addEventListener('click', function () {
      if (form.checkValidity()) {
        modal.style.display = 'none';
      }
    });

    checkLoginStatus();

    //////////
  });

  ///////
})();
