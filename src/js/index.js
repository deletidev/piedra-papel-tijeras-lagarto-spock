// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';
import paperImg from '../assets/images/icon-paper.svg';
import rockImg from '../assets/images/icon-rock.svg';
import scissorsImg from '../assets/images/icon-scissors.svg';
import lizardImg from '../assets/images/icon-lizard.svg';
import spockImg from '../assets/images/icon-spock.svg';

const gameItem = [...document.querySelectorAll('.game-item')];
const choose = document.getElementById('choose');
const results = document.getElementById('results');
const chooseTitle = document.getElementById('choose-title');
const resultUser = document.getElementById('result-user');
const userImg = document.getElementById('user-img');
const resultPc = document.getElementById('result-pc');
const pcImg = document.getElementById('pc-img');
const playAgain = document.getElementById('play-again');
const resultsTitle = document.getElementById('results-title');
const counterUser = document.getElementById('counter-user');
const counterPc = document.getElementById('counter-pc');
let elements = ['paper', 'scissors', 'rock'];
let pcWin = 0;
let userWin = 0;

const images = {
  rock: rockImg,
  paper: paperImg,
  scissors: scissorsImg,
  lizard: lizardImg,
  spock: spockImg
};

if (choose.classList.contains('choose--version')) {
  elements = ['paper', 'scissors', 'rock', 'lizard', 'spock'];
}

choose.addEventListener('click', e => {
  if (e.target.classList.contains('game-item')) {
    choose.classList.toggle('choose--active');
    results.classList.toggle('results--active');
    chooseTitle.classList.toggle('choose__title--active');
    const nameUser = e.target.dataset.type;
    resultUser.dataset.type = nameUser;
    const number = randomNumber(0, elements.length - 1);
    const namePc = elements[number];
    resultPc.dataset.type = namePc;
    userImg.src = images[nameUser];
    pcImg.src = images[namePc];
    const restRules = rules2(nameUser, namePc);
    if (restRules === 'loose') {
      pcWin++;
    }
    if (restRules === 'win') {
      userWin++;
    }
    counterUser.textContent = userWin;
    counterPc.textContent = pcWin;
    resultsTitle.textContent = `YOU ${restRules.toUpperCase()}!`;
  }
});

const rules2 = (nameUser, namePc) => {
  if (
    (nameUser === 'rock' && namePc === 'scissors') ||
    (nameUser === 'rock' && namePc === 'lizard')
  ) {
    return 'win';
  }
  if (
    (nameUser === 'paper' && namePc === 'rock') ||
    (nameUser === 'paper' && namePc === 'spock')
  ) {
    return 'win';
  }
  if (
    (nameUser === 'scissors' && namePc === 'paper') ||
    (nameUser === 'scissors' && namePc === 'lizard')
  ) {
    return 'win';
  }
  if (
    (nameUser === 'lizard' && namePc === 'paper') ||
    (nameUser === 'lizard' && namePc === 'spock')
  ) {
    return 'win';
  }
  if (
    (nameUser === 'spock' && namePc === 'rock') ||
    (nameUser === 'spock' && namePc === 'scissors')
  ) {
    return 'win';
  }
  if (nameUser === namePc) {
    return 'tie';
  }
  return 'loose';
};

playAgain.addEventListener('click', () => {
  choose.classList.toggle('choose--active');
  results.classList.toggle('results--active');
  chooseTitle.classList.toggle('choose__title--active');
});

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
