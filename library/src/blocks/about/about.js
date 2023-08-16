(() => {
  const slider = document.querySelector('.about__benefits');
  const slides = slider.querySelectorAll('.about__benefit');
  const prevButton = document.querySelector('.about__control:first-child');
  const nextButton = document.querySelector('.about__control:last-child');
  const dots = document.querySelectorAll('.about__dot');

  let currentSlide = 0;

  if (window.innerWidth >= 769) {
    console.log('привет');
    function showSlide(index) {
      if (index === 0) {
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

      dots[currentSlide].querySelector('a').classList.remove('active-dot');
      dots[index].querySelector('a').classList.add('active-dot');

      currentSlide = index;
    }

    function changeSlide(index) {
      if (index >= 0 && index < dots.length) {
        showSlide(index);
      }
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        changeSlide(index);
      });
    });
  }
})();

// (() => {
//   const slider = document.querySelector('.about__benefits');
//   const slides = slider.querySelectorAll('.about__benefit');
//   const prevButton = document.querySelector('.about__control:first-child');
//   const nextButton = document.querySelector('.about__control:last-child');
//   const dots = document.querySelectorAll('.about__dot');

//   let currentSlide = 0;

//   function showSlide(index) {
//     slides.forEach(slide => {
//       slide.style.transform = `translateX(-${index * 100}%)`;
//     });

//     dots[currentSlide].querySelector('a').classList.remove('active-dot');
//     dots[index].querySelector('a').classList.add('active-dot');

//     currentSlide = index;
//   }

//   function changeSlide(index) {
//     if (index >= 0 && index < dots.length) {
//       showSlide(index);
//     }
//   }

//   dots.forEach((dot, index) => {
//     dot.addEventListener('click', () => {
//       changeSlide(index);
//     });
//   });
// })();
