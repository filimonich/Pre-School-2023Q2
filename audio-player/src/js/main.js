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
  const nextButton = document.querySelector('.player__right');
  const prevButton = document.querySelector('.player__left');
  const volumeSlider = document.querySelector('.player__volume-input');
  const muteButton = document.querySelector('.player__volume-btn');
  const imageElement = document.querySelector('.player__img');
  const wrapperElement = document.querySelector('.wrapper');
  // создаем объект для хранения соответствия между именами треков и именами файлов изображений
  const trackToImage = {
    Succession: ['Succession', 'Succession-80'],
    'If I Had a Heart': ['vikings', 'vikings-17'],
    // добавьте сюда другие треки по мере необходимости
  };

  const tracks = [
    'audio/Succession - Nicholas Britell.mp3',
    'audio/If I Had a Heart - Fever Ray Vikings.mp3',
  ];

  let maxProgress = 10000; // максимальное значение прогресса

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
    // проверяем, является ли длительность аудио числом
    if (!isNaN(audioPlayer.duration)) {
      // обновляем значение ползунка прогресса, округляя до ближайшего целого числа
      console.log(progressSlider.value);
      progressSlider.value = Math.round(
        (audioPlayer.currentTime / audioPlayer.duration) * maxProgress
        // maxProgress представляет максимальное значение прогресса (10000)
        // audioPlayer.currentTime - текущее время воспроизведения аудиофайла
        // audioPlayer.duration - длительность аудиофайла
      );
      console.log(progressSlider.value);
    }
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
  volumeSlider.addEventListener('input', function () {
    audioPlayer.volume = volumeSlider.value / 100;
  });

  let lastVolume = 1;
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

  // переключение треков
  let currentTrackIndex = 0;

  function playTrack() {
    audioPlayer.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline';
  }

  function pauseTrack() {
    audioPlayer.pause();
    playBtn.style.display = 'inline';
    pauseBtn.style.display = 'none';
  }

  function nextTrack() {
    currentTrackIndex++;
    if (currentTrackIndex >= tracks.length) {
      currentTrackIndex = 0;
    }
    audioPlayer.src = tracks[currentTrackIndex];
    playTrack();
  }

  function prevTrack() {
    currentTrackIndex--;
    if (currentTrackIndex < 0) {
      currentTrackIndex = tracks.length - 1;
    }
    audioPlayer.src = tracks[currentTrackIndex];
    playTrack();
  }

  nextButton.addEventListener('click', nextTrack);
  prevButton.addEventListener('click', prevTrack);
  playBtn.addEventListener('click', playTrack);
  pauseBtn.addEventListener('click', pauseTrack);

  // смена имени треков и изображений

  // получаем элементы для названия трека и исполнителя
  const trackNameElement = document.querySelector('.player__track-name');
  const executorElement = document.querySelector('.player__executor');

  let audioUrl, fileName, trackName, executor, imageNames;

  function updateVariables() {
    // получаем url текущего аудиофайла
    audioUrl = audioPlayer.src;

    // извлекаем имя файла из url
    fileName = audioUrl.substring(audioUrl.lastIndexOf('/') + 1);

    // удаляем расширение .mp3
    fileName = fileName.replace('.mp3', '');

    // декодируем имя файла
    fileName = decodeURIComponent(fileName);

    // разделяем имя файла на имя трека и исполнителя
    [trackName, executor] = fileName.split(' - ');

    // получаем имена файлов изображений из объекта trackToImage
    imageNames = trackToImage[trackName];

    // если имена файлов изображений не найдены, используем имя трека в качестве имени файла изображения
    if (!imageNames) {
      imageNames = [trackName.replace(/ /g, '_'), trackName.replace(/ /g, '_')];
    }
  }

  // функция для изменения текста
  function updateText() {
    // если текущий трек уже отображается или trackName и executor не определены, не обновляем текст
    if (
      (trackNameElement.textContent === trackName &&
        executorElement.textContent === executor) ||
      !trackName ||
      !executor
    ) {
      return;
    }

    // обновляем текст элементов
    trackNameElement.textContent = trackName;
    executorElement.textContent = executor;
  }

  // функция для изменения изображений
  function updateImages() {
    // если текущее изображение уже отображается, не обновляем изображения
    if (imageElement.src.includes(imageNames[0])) {
      return;
    }

    // обновляем src изображения и фоновое изображение
    imageElement.src = 'images/img/' + imageNames[0] + '.png';
    wrapperElement.style.setProperty(
      '--bg-url',
      'url("../images/img/' + imageNames[1] + '.png")'
    );
  }

  // добавляем обработчики событий для воспроизведения аудио
  audioPlayer.addEventListener('play', function () {
    updateVariables();
    updateText();
    updateImages();
  });
})();
