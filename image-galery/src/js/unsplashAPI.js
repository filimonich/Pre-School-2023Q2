for (let i = 1; i < 6; i++) {
  setTimeout(() => {
    console.log('Hello');
  }, i * 2000);
}

const input = document.getElementById('search-input');
const gallery = document.querySelector('.galery__contents');

// массив со случайными запросами
const randomRequests = [
  'spring',
  'summer',
  'autumn',
  'winter',
  'nature',
  'city',
  'people',
  'animals',
];

// получения данных от api
const getData = async url => {
  try {
    // делаем запрос к api
    const res = await fetch(url);

    // проверяем, успешен ли запрос
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }

    // преобразуем ответ в json
    const data = await res.json();

    // возвращаем результаты
    return data.results;
  } catch (error) {
    console.error('An error occurred while receiving data:', error);

    gallery.innerHTML = ''; // очищаем галерею

    const errorMessage = document.createElement('p');
    errorMessage.className = 'galery__text';
    errorMessage.innerHTML =
      'An error occurred while receiving the data. Please try again. Произошла ошибка при получении данных. Пожалуйста, попробуйте еще раз.';
    gallery.appendChild(errorMessage);

    throw error; // Перебрасываем ошибку, чтобы остановить выполнение функции
  }
};

// функция для создания div для изображения
const createImageDiv = () => {
  const imgDiv = document.createElement('div');
  imgDiv.className = 'galery__image';
  imgDiv.style.height = '100px'; // устанавливаем высоту блока равной 100px
  return imgDiv;
};

// функция для создания прелоудера
const createPreloader = () => {
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.style.display = 'block'; // показываем прелоудер
  return preloader;
};

// функция для создания и загрузки изображения
const loadImage = (url, imgDiv, preloader) => {
  const img = document.createElement('img');

  // когда изображение загрузится, скрываем прелоудер и добавляем img в imgDiv
  img.onload = function () {
    preloader.style.display = 'none'; // скрываем прелоудер
    imgDiv.style.height = 'auto'; // меняем высоту блока на auto
    imgDiv.appendChild(img); // добавляем img в imgDiv только после того, как изображение загрузилось
  };

  // устанавливаем src изображения с задержкой в 2 секунды для тестирования прелоадера
  setTimeout(() => {
    img.src = url;
  }, 2);
};

// функция для добавления блока изображения в галерею
const addImageDivToGallery = (gallery, imgDiv) => {
  gallery.appendChild(imgDiv);
};

// получения случайного элемента из массива
const getRandomQuery = () => {
  const index = Math.floor(Math.random() * randomRequests.length);
  return randomRequests[index];
};

// функция для очистки галереи
const clearGallery = gallery => {
  gallery.innerHTML = '';
};

// главная функция
const main = async query => {
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=portrait&client_id=l-zkI308Tcihpn1AgexKwD_jFJ9SfU8I_008J48EBgg`;

  const images = await getData(url);

  // очищаем галерею перед каждым запросом
  clearGallery(gallery);

  const preloader = createPreloader();
  gallery.appendChild(preloader);

  // проверяем, есть ли изображения по данному запросу
  if (images.length === 0) {
    preloader.style.display = 'none'; // скрываем прелоудер
    const noImagesOnRequest = document.createElement('p');
    noImagesOnRequest.className = 'galery__text';
    noImagesOnRequest.innerHTML =
      'Unfortunately, no images were found for your request. Try another query. К сожалению, по вашему запросу не было найдено изображений. Попробуйте другой запрос.';
    gallery.appendChild(noImagesOnRequest);
    return;
  }

  for (let index in images) {
    const image = images[index];
    const imgDiv = createImageDiv();
    loadImage(image.urls.small, imgDiv, preloader);
    addImageDivToGallery(gallery, imgDiv);
    if (index == '0') {
      await new Promise(resolve => setTimeout(resolve, index * 20000));
    }
  }
};

// добавляем обработчик событий keydown
input.addEventListener('keydown', event => {
  // проверяем, была ли нажата клавиша Enter
  if (event.key === 'Enter') {
    // здесь вызываем функцию поиска с запросом из поля ввода
    main(input.value);
    input.value = '';
    input.blur();
  }
});

// вызываем главную функцию с случайным запросом при загрузке страницы
main(getRandomQuery());

const label = document.querySelector('label[for="search-input"]');

// добавляем обработчик событий click
label.addEventListener('click', () => {
  // очищаем поле ввода
  input.value = '';
});
