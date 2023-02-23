import './style.css';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'ec04978179msh9a8e9c12b95184ep12c2dajsn5d4cc5140ae6',
    'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com',
  },
};

const gamesList = document.querySelector('#games');
const GAME_API = 'https://mmo-games.p.rapidapi.com/games';

const data = async () => {
  const apiResult = await fetch(GAME_API, options);
  const newDate = await apiResult.json();
  const datas = await newDate;
  return datas;
};

const handleCreateElement = (element, text, className, newDiv) => {
  const createElement = document.createElement(element);
  createElement.innerHTML = text;
  createElement.className = className;
  newDiv.appendChild(createElement);
};

const createImageGame = (thumbnail, title, newDiv) => {
  const createImg = document.createElement('img');
  createImg.setAttribute('src', thumbnail);
  createImg.setAttribute('alt', `Image of game: ${title}`);
  newDiv.appendChild(createImg);
};

const createUrlGame = (gameUrl, title, newDiv) => {
  const createUrl = document.createElement('a');
  createUrl.href = gameUrl;
  createUrl.innerHTML = title;
  newDiv.appendChild(createUrl);
};

const createDivOfTitles = () => {
  const newDiv = document.createElement('div');
  newDiv.className = 'game';
  gamesList.appendChild(newDiv);
  return newDiv;
};

const loadPage = async () => {
  const dataGame = await data();
  dataGame.forEach(async (game) => {
    const { title, thumbnail, short_description, developer, game_url } = game;
    const newDiv = createDivOfTitles();
    handleCreateElement('h1', title, 'title', newDiv);
    createImageGame(thumbnail, title, newDiv);
    handleCreateElement('p', short_description, 'description', newDiv);
    handleCreateElement(
      'p',
      `Desenvolvedor: ${developer}`,
      'developerClass',
      newDiv
    );
    createUrlGame(game_url, title, newDiv);
  });
};

window.onload = () => {
  loadPage();
};
