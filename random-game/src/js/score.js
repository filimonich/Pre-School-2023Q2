export const saveScore = () => {
  // получаем текущий счет из элемента на странице
  let currentScore = parseInt(
    document.querySelector('.header__score-point').innerText
  );

  // получаем сохраненные игры из localStorage
  let savedGames = JSON.parse(localStorage.getItem('games')) || [];

  // добавляем новую игру в массив, только если счет больше 0
  if (currentScore > 0) {
    savedGames.push({ gameNumber: savedGames.length + 1, score: currentScore });

    // сортируем игры по счету от большего к меньшему
    savedGames.sort((a, b) => b.score - a.score);

    // оставляем только 10 игр с наибольшим счетом
    if (savedGames.length > 10) {
      savedGames = savedGames.slice(0, 10);
    }
  }

  // сохраняем обновленный массив обратно в localStorage
  localStorage.setItem('games', JSON.stringify(savedGames));
};

export const displayScores = () => {
  // получаем сохраненные игры из localStorage
  let savedGames = JSON.parse(localStorage.getItem('games')) || [];

  // получаем элемент, где будут отображаться счета
  let listElement = document.querySelector('.modal__items');

  // очищаем список перед добавлением новых элементов
  listElement.innerHTML = '';

  // проходим по каждой игре и добавляем ее в список
  for (let game of savedGames) {
    let listItem = document.createElement('li');
    listItem.className = 'modal__item';

    let placeElement = document.createElement('p');
    placeElement.className = 'modal__place';
    placeElement.innerText = 'Номер игры: ' + game.gameNumber;

    let scoreElement = document.createElement('p');
    scoreElement.className = 'modal__point';
    scoreElement.innerText = 'Ваш счёт: ' + game.score;

    listItem.appendChild(placeElement);
    listItem.appendChild(scoreElement);

    listElement.appendChild(listItem);

    // добавляем горизонтальную линию после каждого элемента списка
    let hrElement = document.createElement('hr');
    listElement.appendChild(hrElement);
  }
};

export const updateRecordScore = () => {
  // получаем сохраненные игры из localStorage
  let savedGames = JSON.parse(localStorage.getItem('games')) || [];

  // если есть сохраненные игры, находим игру с максимальным счетом
  if (savedGames.length > 0) {
    let maxScore = Math.max(...savedGames.map(game => game.score));

    // получаем элемент, где будет отображаться рекордный счет
    let recordElement = document.querySelector('.header__record-point');

    // обновляем рекордный счет
    recordElement.innerText = maxScore;
  }
};

displayScores();
updateRecordScore();
