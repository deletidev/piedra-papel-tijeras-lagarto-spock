// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';
import paperImg from '../assets/images/icon-paper.svg';
import rockImg from '../assets/images/icon-rock.svg';
import scissorsImg from '../assets/images/icon-scissors.svg';
import lizardImg from '../assets/images/icon-lizard.svg';
import spockImg from '../assets/images/icon-spock.svg';

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

const rules = {
  scissors: {
    paper: true,
    rock: false,
    lizard: true,
    spock: false
  },
  paper: {
    scissors: false,
    rock: true,
    lizard: false,
    spock: true
  },
  rock: {
    paper: false,
    scissors: true,
    lizard: true,
    spock: false
  },
  lizard: {
    paper: true,
    rock: false,
    scissors: false,
    spock: true
  },
  spock: {
    paper: false,
    rock: true,
    lizard: false,
    scissors: true
  }
};

const result = (nameUser, namePc) => {
  if (!nameUser && !namePc) {
    throw new Error('tu juego está roto, recarga');
  }
  if (rules[nameUser][namePc]) {
    return 'win';
  }
  if (nameUser === namePc) {
    return 'tie';
  }
  return 'lose';
};

const changeScreen = () => {
  choose.classList.toggle('choose--active');
  results.classList.toggle('results--active');
  chooseTitle.classList.toggle('choose__title--active');
};

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const userChoose = nameUser => {
  resultUser.dataset.type = nameUser;
  userImg.src = images[nameUser];
  return nameUser;
};

const pcChoose = () => {
  const namePc = elements[randomNumber(0, elements.length - 1)];
  resultPc.dataset.type = namePc;
  pcImg.src = images[namePc];
  return namePc;
};

const counters = (nameUser, namePc) => {
  const restRules = result(nameUser, namePc);
  resultsTitle.textContent = `YOU ${restRules.toUpperCase()}!`;

  if (restRules === 'lose') {
    pcWin++;
  } else if (restRules === 'win') {
    userWin++;
  }
  counterUser.textContent = userWin;
  counterPc.textContent = pcWin;
};

if (choose) {
  if (choose.classList.contains('choose--version')) {
    elements.push('lizard', 'spock');
  }
  choose.addEventListener('click', e => {
    if (!e.target.classList.contains('game-item')) return;
    changeScreen();
    counters(userChoose(e.target.dataset.type), pcChoose());
  });
  playAgain.addEventListener('click', changeScreen);
}
