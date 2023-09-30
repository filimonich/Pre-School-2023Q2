for (let i = 1; i < 6; i++) {
  setTimeout(() => {
    console.log('Hello');
  }, i * 2000);
}

const input = document.getElementById('search-input');
const gallery = document.querySelector('.galery__contents');
const label = document.querySelector('label[for="search-input"]');

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
  'nightcity',
  'tram',
  'smile',
];

let delayTime = 20;

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
    gallery.innerHTML = '';
    createAndAppendP(
      'galery__text',
      'An error occurred while receiving the data. Please try again. Произошла ошибка при получении данных. Пожалуйста, попробуйте еще раз.'
    );
    throw error;
  }
};

// функция для создания текстового элемента для вывода сообщения ошибок
function createAndAppendP(className, innerHTML) {
  const createElementP = document.createElement('p');
  createElementP.className = className;
  createElementP.innerHTML = innerHTML;
  gallery.appendChild(createElementP);
}

// функция для создания div для изображения
const createImageDiv = () => {
  const imgDiv = document.createElement('div');
  imgDiv.className = 'galery__image';
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
  const createElementImg = document.createElement('img');
  // когда изображение загрузится, скрываем прелоудер и добавляем img в imgDiv
  createElementImg.onload = function () {
    preloader.style.display = 'none'; // скрываем прелоудер
    imgDiv.style.height = 'auto'; // меняем высоту блока на auto
    imgDiv.appendChild(createElementImg); // добавляем img в imgDiv только после того, как изображение загрузилось
  };

  // устанавливаем src изображения с задержкой в 2 секунды для тестирования прелоадера
  setTimeout(() => {
    createElementImg.src = url;
  }, delayTime);
};

// функция для добавления блока изображения в галерею
const addImageDivToGallery = (gallery, imgDiv) => {
  gallery.appendChild(imgDiv);
};

// получения случайного элемента из массива
const getRandomQuery = () => {
  const index = Math.floor(Math.random() * randomRequests.length);
  console.log(randomRequests[index]);
  return randomRequests[index];
};

// функция для очистки галереи
const clearGallery = gallery => {
  gallery.innerHTML = '';
};

// главная функция
// объявляем асинхронную функцию main с параметром query
const main = async query => {
  // формируем URL для запроса к API Unsplash
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=portrait&client_id=l-zkI308Tcihpn1AgexKwD_jFJ9SfU8I_008J48EBgg`;

  // получаем данные (изображения) от API Unsplash
  const images = await getData(url);

  // очищаем галерею перед каждым новым запросом
  clearGallery(gallery);

  // создаем и добавляем прелоудер в галерею
  const preloader = createPreloader();
  gallery.appendChild(preloader);

  // проверяем, есть ли изображения по данному запросу
  if (images.length === 0) {
    // если изображений нет, скрываем прелоудер и выводим сообщение об отсутствии изображений
    preloader.style.display = 'none';
    createAndAppendP(
      'galery__text',
      'Unfortunately, no images were found for your request. Try another query. К сожалению, по вашему запросу не было найдено изображений. Попробуйте другой запрос.'
    );
    // завершаем выполнение функции
    return;
  }

  // проходим по каждому изображению в массиве images
  for (let index in images) {
    // получаем текущее изображение
    const image = images[index];
    // создаем div для изображения
    const imgDiv = createImageDiv();
    // загружаем изображение и добавляем его в div
    loadImage(image.urls.small, imgDiv, preloader);
    // добавляем div с изображением в галерею
    addImageDivToGallery(gallery, imgDiv);
    // делаем паузу после загрузки изображения
    await new Promise(resolve => setTimeout(resolve, 1));
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

// добавляем обработчик событий click
label.addEventListener('click', () => {
  // очищаем поле ввода
  input.value = '';
});
