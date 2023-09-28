for (let i = 1; i < 6; i++) {
  setTimeout(() => {
    console.log('Hello');
  }, i * 2000);
}

// получаем поле ввода
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

// создания и вставки изображения
const insertImage = (image, gallery) => {
  // создаем div для изображения
  const imgDiv = document.createElement('div');
  imgDiv.className = 'galery__image';

  // создаем элемент img и устанавливаем его атрибут src равным url изображения
  const img = document.createElement('img');
  img.src = image.urls.small;

  // добавляем img в imgDiv
  imgDiv.appendChild(img);
  // добавляем imgDiv в gallery
  gallery.appendChild(imgDiv);
};

// получения случайного элемента из массива
const getRandomQuery = () => {
  const index = Math.floor(Math.random() * randomRequests.length);
  return randomRequests[index];
};

// основа
const main = async query => {
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=portrait&client_id=l-zkI308Tcihpn1AgexKwD_jFJ9SfU8I_008J48EBgg`;
  console.log(url);

  // получаем изображения от api
  const images = await getData(url);

  // получаем div с классом 'galery__contents'
  const gallery = document.querySelector('.galery__contents');

  // очищаем галерею
  gallery.innerHTML = '';

  let delayLoadingImages = 10;

  // для каждого изображения вызываем функцию insertImage с задержкой в 1 секунду
  images.forEach((image, index) => {
    setTimeout(() => {
      insertImage(image, gallery);
    }, index * delayLoadingImages);
  });
};

// добавляем обработчик событий keydown
input.addEventListener('keydown', function (event) {
  // проверяем, была ли нажата клавиша Enter
  if (event.key === 'Enter') {
    // здесь вызываем функцию поиска с запросом из поля ввода
    main(input.value);
  }
});

// вызываем главную функцию с случайным запросом при загрузке страницы
main(getRandomQuery());
