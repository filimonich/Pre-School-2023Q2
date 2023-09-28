for (let i = 1; i < 6; i++) {
  setTimeout(() => {
    console.log('Hello');
  }, i * 2000);
}

// запрос
// const url =
//   'https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=landscape&client_id=l-zkI308Tcihpn1AgexKwD_jFJ9SfU8I_008J48EBgg';

// функция для получения данных от api
async function getData(url) {
  // делаем запрос к api
  const res = await fetch(url);
  // преобразуем ответ в json
  const data = await res.json();
  // возвращаем результаты
  return data.results;
}

// функция для создания и вставки изображения
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

// главная функция
const main = async () => {
  const url =
    'https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=portrait&client_id=l-zkI308Tcihpn1AgexKwD_jFJ9SfU8I_008J48EBgg';
  console.log(url);

  // получаем изображения от api
  const images = await getData(url);

  // получаем div с классом 'galery__contents'
  const gallery = document.querySelector('.galery__contents');

  let delayLoadingImages = 1000;

  // для каждого изображения вызываем функцию insertImage с задержкой в 1 секунду
  images.forEach((image, index) => {
    setTimeout(() => {
      insertImage(image, gallery);
    }, index * delayLoadingImages);
  });
};

// вызываем главную функцию
main();
