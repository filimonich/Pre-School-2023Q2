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
  const audioPlayer = document.getElementById('myAudio');
  const playBtn = document.querySelector('.player__play-inner');
  const pauseBtn = document.querySelector('.player__stop-inner');
  const endTimeLabel = document.querySelector('.player__end');
  const currentTimeLabel = document.querySelector('.player__begin');
  const progressSlider = document.querySelector('.player__progress-input');

  let maxProgress = 10000; // максимальное значение прогресса

  // включить трек
  playBtn.addEventListener('click', function () {
    audioPlayer.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline';
  });

  // пауза
  pauseBtn.addEventListener('click', function () {
    audioPlayer.pause();
    playBtn.style.display = 'inline';
    pauseBtn.style.display = 'none';
  });

  // длина трека
  audioPlayer.addEventListener('loadedmetadata', function () {
    // получаем длительность аудиофайла в секундах
    let durationInSeconds = audioPlayer.duration;
    // преобразуем длительность из секунд в минуты, используя Math.floor для округления вниз
    let minutes = Math.floor(durationInSeconds / 60);
    // получаем оставшиеся секунды после вычисления минут, используя оператор остатка от деления (%)
    let seconds = Math.floor(durationInSeconds % 60);
    // обновляем текстовое содержимое endTimeLabel, добавляем ноль перед секундами, если они меньше 10
    endTimeLabel.textContent =
      minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  });

  // обновление метаданных
  audioPlayer.load();

  // добавляем обработчик события 'timeupdate'
  audioPlayer.addEventListener('timeupdate', function () {
    // получаем текущее время воспроизведения аудиофайла в секундах
    let currentTimeInSeconds = audioPlayer.currentTime;

    // преобразуем текущее время из секунд в минуты, используя Math.floor для округления вниз
    let minutes = Math.floor(currentTimeInSeconds / 60);

    // получаем оставшиеся секунды после вычисления минут, используя оператор остатка (%)
    let seconds = Math.floor(currentTimeInSeconds - minutes * 60);

    // добавляем ноль перед значениями < 10
    let minuteValue;
    let secondValue;

    let singleDigitThreshold = 10; // пороговое значение для однозначных чисел

    if (minutes < singleDigitThreshold) {
      // если минуты - однозначное число, добавляем перед ним ноль
      minuteValue = '0' + minutes;
    } else {
      // иначе просто используем значение минут
      minuteValue = minutes;
    }

    if (seconds < singleDigitThreshold) {
      // если секунды - однозначное число, добавляем перед ним ноль
      secondValue = '0' + seconds;
    } else {
      // иначе просто используем значение секунд
      secondValue = seconds;
    }

    // выводим текущее время в формате mm:ss
    currentTimeLabel.textContent = minuteValue + ':' + secondValue;

    // обновляем значение ползунка прогресса
    progressSlider.value = audioPlayer.currentTime;
  });

  // добавляем обработчик события 'timeupdate'
  audioPlayer.addEventListener('timeupdate', function () {
    // обновляем значение ползунка прогресса, округляя до ближайшего целого числа
    progressSlider.value = Math.round(
      (audioPlayer.currentTime / audioPlayer.duration) * maxProgress
      // maxProgress представляет максимальное значение прогресса (10000)
      // audioPlayer.currentTime - текущее время воспроизведения аудиофайла
      // audioPlayer.duration - длительность аудиофайла
    );
  });

  // добавляем обработчик события 'input' для ползунка прогресса
  progressSlider.addEventListener('input', function () {
    // обновляем текущее время воспроизведения аудиофайла
    audioPlayer.currentTime =
      (progressSlider.value / maxProgress) * audioPlayer.duration;
    // progressSlider.value - текущее значение ползунка прогресса
    // maxProgress - максимальное значение прогресса (10000)
    // audioPlayer.duration - длительность аудиофайла
  });

  // добавляем обработчик события 'loadedmetadata'
  audioPlayer.addEventListener('loadedmetadata', function () {
    // устанавливаем максимальное значение ползунка равным maxProgress (представляет максимальное значение прогресса)
    progressSlider.max = maxProgress;
  });

  // регулировка звука с помощью ползунка
  const volumeSlider = document.querySelector('.player__volume-input');
  volumeSlider.addEventListener('input', function () {
    audioPlayer.volume = volumeSlider.value / 100;
  });

  let lastVolume = 1;
  const muteButton = document.querySelector('.player__volume-btn');
  muteButton.addEventListener('click', function () {
    if (audioPlayer.volume !== 0) {
      lastVolume = audioPlayer.volume;
      audioPlayer.volume = 0;
      volumeSlider.value = 0;
      muteButton.style.backgroundPosition = '0 28px';
    } else {
      audioPlayer.volume = lastVolume;
      volumeSlider.value = lastVolume * 100;
      if (volumeSlider.value > 50) {
        muteButton.style.backgroundPosition = '0 0';
      } else {
        muteButton.style.backgroundPosition = '0 56px';
      }
    }
  });

  volumeSlider.addEventListener('input', function () {
    if (volumeSlider.value === '0') {
      muteButton.style.backgroundPosition = '0 28px';
    } else if (volumeSlider.value > 50) {
      muteButton.style.backgroundPosition = '0 0';
    } else {
      muteButton.style.backgroundPosition = '0 56px';
    }
  });
  /////////////
})();
