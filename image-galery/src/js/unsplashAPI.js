for (let i = 1; i < 6; i++) {
  setTimeout(() => {
    console.log('Hello');
  }, i * 2000);
}

// поле ввода
const input = document.getElementById('search-input');

// массив со случайными запросами
const randomRequests = [
  'spring',
  // 'summer',
  // 'autumn',
  // 'winter',
  // 'nature',
  // 'city',
  // 'people',
  // 'animals',
];

// получения данных от api
const getData = async url => {
  // делаем запрос к api
  const res = await fetch(url);
  // преобразуем ответ в json
  const data = await res.json();
  // возвращаем результаты
  return data.results;
};

// функция для создания div для изображения
const createImageDiv = () => {
  const imgDiv = document.createElement('div');
  imgDiv.className = 'galery__image';
  imgDiv.style.height = '100px'; // устанавливаем высоту блока равной 100px
  return imgDiv;
};

// функция для создания прелоадера
const createPreloader = () => {
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.style.display = 'block'; // показываем прелоадер
  return preloader;
};

const createImgElement = (url, imgDiv, preloader) => {
  const img = document.createElement('img');

  // когда изображение загрузится, скрываем прелоадер и добавляем img в imgDiv
  img.onload = function () {
    preloader.style.display = 'none'; // скрываем прелоадер
    imgDiv.style.height = 'auto'; // меняем высоту блока на auto
    imgDiv.appendChild(img); // добавляем img в imgDiv только после того, как изображение загрузилось
  };

  // устанавливаем src изображения с задержкой в 2 секунды для тестирования прелоадера
  setTimeout(() => {
    img.src = url;
  }, 212);
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

// главная функция
const main = async query => {
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=portrait&client_id=l-zkI308Tcihpn1AgexKwD_jFJ9SfU8I_008J48EBgg`;

  const images = await getData(url);

  const gallery = document.querySelector('.galery__contents');

  gallery.innerHTML = '';

  for (let index in images) {
    await new Promise(resolve => setTimeout(resolve, index * 1));
    const image = images[index];
    const imgDiv = createImageDiv();
    const preloader = createPreloader();
    addImageDivToGallery(gallery, imgDiv);
    createImgElement(image.urls.small, imgDiv, preloader);
    imgDiv.appendChild(preloader);
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
