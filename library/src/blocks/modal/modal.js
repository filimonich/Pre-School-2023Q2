(() => {
  const openButton = document.querySelector('.header__button-login');
  const closeButton = document.querySelector('.modal__close-button');
  const modal = document.querySelector('.modal');
  const togglePasswordButton = document.querySelector('.modal__toggle-password');
  const modalContent = document.querySelector('.modal__content');
  const passwordInput = document.querySelector('#password');

  // функция переключения модального окна
  const toggleModal = () => {
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    document.body.style.overflow = modal.style.display === 'block' ? 'hidden' : '';
  };
  // добовляем обработчик событий при клике
  openButton.addEventListener('click', toggleModal);
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

  // // добавляем обработчик для показа и скрытия пароля
  // togglePasswordButton.addEventListener('click', () => {
  //   const type =
  //     passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  //   passwordInput.setAttribute('type', type);
  // });
})();
