import '/styles/style.scss';

// предварительный загрузчик
document.body.onload = () => {
  let delayTime = 10;
  setTimeout(() => {
    const preloder = document.querySelector('.preloder');
    preloder.classList.add('done');
  }, delayTime); // Задержка в 500 миллисекунд
};

// создать новое изображение
const image = new Image();
// путь к изображению
image.src = 'images/img/Succession.png';
// элемент изображения на странице
const imageElement = document.getElementById('myImage');
// обработчик события загрузки
image.onload = () => {
  imageElement.src = image.src;
};

for (let i = 1; i < 6; i++) {
  setTimeout(() => {
    console.log('Hello');
  }, i * 2000);
}

// убирает класс, что бы анимации не срабатывали раньше времени
document.addEventListener('DOMContentLoaded', function () {
  let preload = document.querySelector('.preload');

  function removePreloadClass() {
    preload.classList.remove('preload');
  }

  setTimeout(() => {
    removePreloadClass();
  }, 100);
});

// анимированная тень
function addDynamicShadow() {
  const blocks = document.getElementsByClassName('dynamic-shadow');

  document.addEventListener('mousemove', function (e) {
    if (window.innerWidth <= 780) {
      return;
    }

    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].style.boxShadow =
        (x - 0.5) * 40 +
        'px ' +
        (y - 0.5) * 40 +
        'px 20px rgba(0, 104, 111,0.65)';
    }
  });
}

addDynamicShadow();

(() => {
  const audioElement = document.getElementById('myAudio');
  const playButton = document.querySelector('.player__play-inner');
  const pauseButton = document.querySelector('.player__stop-inner');
  const endTimeElement = document.querySelector('.player__end');

  // включить трек
  playButton.addEventListener('click', function () {
    audioElement.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline';
  });

  // пауза
  pauseButton.addEventListener('click', function () {
    audioElement.pause();
    playButton.style.display = 'inline';
    pauseButton.style.display = 'none';
  });

  // длина трека
  audioElement.addEventListener('loadedmetadata', function () {
    const duration = audioElement.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    endTimeElement.textContent =
      minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  });
  // обновление метаданных
  audioElement.load();

  ///////////////////
})();
