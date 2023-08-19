(() => {
  const slider = document.querySelector('.about__benefits');
  const slides = slider.querySelectorAll('.about__benefit');
  const prevButton = document.querySelector('.about__control:first-child');
  const nextButton = document.querySelector('.about__control:last-child');
  const dotButtons = document.querySelectorAll('.about__dot');

  // индекс текущего слайда
  let currentSlideIndex = 0;

  const showSlideDesktop = function (index) {
    // проверка индекса слайда
    if (index === 0) {
      // перемещение слайда с помощью CSS-трансформаций
      slides[0].style.transform = `translateX(0%)`;
      slides[1].style.transform = `translateX(0%)`;
      slides[2].style.transform = `translateX(0%)`;
      slides[3].style.transform = `translateX(0%)`;
      slides[4].style.transform = `translateX(0%)`;
    } else if (index === 1) {
      slides[0].style.transform = `translateX(-100%)`;
      slides[1].style.transform = `translateX(-100%)`;
      slides[2].style.transform = `translateX(-100%)`;
      slides[3].style.transform = `translateX(-100%)`;
      slides[4].style.transform = `translateX(-100%)`;
    } else if (index === 2) {
      slides[0].style.transform = `translateX(-200%)`;
      slides[1].style.transform = `translateX(-200%)`;
      slides[2].style.transform = `translateX(-200%)`;
      slides[3].style.transform = `translateX(-200%)`;
      slides[4].style.transform = `translateX(-200%)`;
    }

    // удалить класс active-dot у текущей кнопки навигации
    dotButtons[currentSlideIndex]
      .querySelector('a')
      .classList.remove('active-dot');
    // добавить класс active-dot у текущей кнопки навигации
    dotButtons[index].querySelector('a').classList.add('active-dot');

    // обновить индецс текущего слайда
    currentSlideIndex = index;
  };

  // флаг для отслеживания анимации
  let isAnimating = false;

  const showSlideTablet = function (index) {
    if (!isAnimating) {
      // проверка, если не false
      isAnimating = true; // устанавливаем флаг анимации в true
      if (index === 0) {
        slides[0].style.transform = `translateX(200%)`;
        slides[1].style.transform = `translateX(200%)`;
        slides[2].style.transform = `translateX(100%)`;
        slides[3].style.transform = `translateX(200%)`;
        slides[4].style.transform = `translateX(300%)`;
      } else if (index === 1) {
        slides[0].style.transform = `translateX(100%)`;
        slides[1].style.transform = `translateX(100%)`;
        slides[2].style.transform = `translateX(100%)`;
        slides[3].style.transform = `translateX(0%)`;
        slides[4].style.transform = `translateX(-100%)`;
      } else if (index === 2) {
        slides[0].style.transform = `translateX(100%)`;
        slides[1].style.transform = `translateX(0%)`;
        slides[2].style.transform = `translateX(0%)`;
        slides[3].style.transform = `translateX(0%)`;
        slides[4].style.transform = `translateX(-100%)`;
      } else if (index === 3) {
        slides[0].style.transform = `translateX(100%)`;
        slides[1].style.transform = `translateX(0%)`;
        slides[2].style.transform = `translateX(-100%)`;
        slides[3].style.transform = `translateX(-100%)`;
        slides[4].style.transform = `translateX(-100%)`;
      } else if (index === 4) {
        slides[0].style.transform = `translateX(100%)`;
        slides[1].style.transform = `translateX(0%)`;
        slides[2].style.transform = `translateX(-100%)`;
        slides[3].style.transform = `translateX(-200%)`;
        slides[4].style.transform = `translateX(-200%)`;
      }

      // удалить класс active-dot у текущей кнопки навигации
      dotButtons[currentSlideIndex]
        .querySelector('a')
        .classList.remove('active-dot');
      // добавить класс active-dot к выбранной кнопке навигации
      dotButtons[index].querySelector('a').classList.add('active-dot');

      // отвключить prevButton, если текущий слайд является первым
      // prevButton.disabled = index === 0;
      // отвключить prevButton, если текущий слайд является последним
      // nextButton.disabled = index === dotButtons.length - 1;

      // добавить или удалить класс disable-control у
      // кнопки prevButton в зависимости от того, является ли текущий слайд первым
      prevButton.classList.toggle('disable-control', index === 0);
      nextButton.classList.toggle(
        'disable-control',
        index === dotButtons.length - 1
      );

      // хранения индекса текущего слайда в слайдере. Обновление значения
      // этой переменной необходимо для того, чтобы отслеживать,
      // какой слайд в данный момент является активным.
      currentSlideIndex = index;

      // установить таймаут для сброса флага анимации
      setTimeout(() => {
        // сброс флага
        isAnimating = false;
      }, 500); // Задержка в миллисекундах
    }
  };

  // функцию для изменения текущего слайда
  const changeSlide = function (index) {
    // проверка индекса слайда
    if (index >= 0 && index < dotButtons.length) {
      if (window.innerWidth >= 769) showSlideDesktop(index);
      if (window.innerWidth <= 768) showSlideTablet(index);
    }
  };

  // проверяем ширину окна
  if (window.innerWidth >= 769) {
    showSlideDesktop(currentSlideIndex);
    changeSlide(currentSlideIndex);

    // обработчики событий для кнопок навигации слайдера
    // принимает два аргумента: текущий элемент массива (dot) и его индекс (index).
    dotButtons.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        changeSlide(index);
      });
    });
  }

  if (window.innerWidth <= 768) {
    showSlideTablet(currentSlideIndex);
    changeSlide(currentSlideIndex);

    prevButton.addEventListener('click', () => {
      // проверить флаг анимации
      if (!isAnimating) {
        // вызов функции changeSlide, чтобы переключиться на предыдущий слайд
        changeSlide(currentSlideIndex - 1);
      }
    });

    nextButton.addEventListener('click', () => {
      if (!isAnimating) {
        changeSlide(currentSlideIndex + 1);
      }
    });

    dotButtons.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (!isAnimating) {
          changeSlide(index);
        }
      });
    });
  }
})();
