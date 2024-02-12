const stopky = document.querySelectorAll('.stopky-form h4');
const stopkyStot = document.querySelector('.stotiny');
const stopkySek = document.querySelector('.sekundy');
const stopkyMin = document.querySelector('.minuty');

const medzicas1 = document.querySelector('.medzicas1');
const medzicas2 = document.querySelector('.medzicas2');
const medzicas3 = document.querySelector('.medzicas3');
const medzicas4 = document.querySelector('.medzicas4');

const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const medzicasBtn = document.querySelector('.medzicas');
const restartBtn = document.querySelector('.restart');

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
restartBtn.addEventListener('click', restart);
medzicasBtn.addEventListener('click', medzicas);

stopky.forEach(function (cas, index) {
  cas.innerHTML = '00';
});

medzicasBtn.classList.add('invis');
restartBtn.classList.add('invis');
medzicas1.classList.add('invis');
medzicas2.classList.add('invis');
medzicas3.classList.add('invis');
medzicas4.classList.add('invis');

let timerTStotiny, timerTSekundy, timerTMinuty;
let elapsedTStotiny = 0,
  elapsedTSekundy = 0,
  elapsedTMinuty = 0;

function start() {
  startBtn.classList.add('invis');
  stopBtn.classList.remove('invis');
  restartBtn.classList.add('invis');
  medzicasBtn.classList.remove('invis');

  function stotiny() {
    function updateTime() {
      elapsedTStotiny = (elapsedTStotiny + 1) % 100;
      if (elapsedTStotiny === 0) {
        elapsedTSekundy = (elapsedTSekundy + 1) % 60;
        if (elapsedTSekundy === 0) {
          elapsedTMinuty++;
        }
        let formattedSekundy = elapsedTSekundy < 10 ? `0${elapsedTSekundy}` : elapsedTSekundy;
        stopkySek.innerHTML = formattedSekundy;
        let formattedMinuty = elapsedTMinuty < 10 ? `0${elapsedTMinuty}` : elapsedTMinuty;
        stopkyMin.innerHTML = formattedMinuty;
      }
      let formattedStotiny = elapsedTStotiny < 10 ? `0${elapsedTStotiny}` : elapsedTStotiny;
      stopkyStot.innerHTML = formattedStotiny;
    }
    timerTStotiny = setInterval(updateTime, 10);
  }
  stotiny();
}

function stop() {
  stopBtn.classList.add('invis');
  startBtn.classList.remove('invis');
  restartBtn.classList.remove('invis');

  clearInterval(timerTStotiny);
  clearInterval(timerTSekundy);
  clearInterval(timerTMinuty);
}

function restart() {
  restartBtn.classList.add('invis');
  startBtn.classList.remove('invis');
  stopBtn.classList.add('invis');
  medzicasBtn.classList.add('invis');
  medzicas1.classList.add('invis');
  medzicas2.classList.add('invis');
  medzicas3.classList.add('invis');
  medzicas4.classList.add('invis');

  elapsedTStotiny = 0;
  elapsedTSekundy = 0;
  elapsedTMinuty = 0;
  clickCounter = 0;
  stopkyStot.innerHTML = '00';
  stopkySek.innerHTML = '00';
  stopkyMin.innerHTML = '00';
  medzicas1.innerHTML = '00 : 00 : 00';
  medzicas2.innerHTML = '00 : 00 : 00';
  medzicas3.innerHTML = '00 : 00 : 00';
  medzicas4.innerHTML = '00 : 00 : 00';
}

let clickCounter = 0;
function medzicas() {
  clickCounter++;
  medzicas4.innerHTML = `${medzicas3.textContent}`;
  medzicas3.innerHTML = `${medzicas2.textContent}`;
  medzicas2.innerHTML = `${medzicas1.textContent}`;
  medzicas1.innerHTML = `${stopkyMin.textContent} : ${stopkySek.textContent} : ${stopkyStot.textContent}`;

  if (clickCounter === 1) {
    medzicas1.classList.remove('invis');
  } else if (clickCounter === 2) {
    medzicas2.classList.remove('invis');
  } else if (clickCounter === 3) {
    medzicas3.classList.remove('invis');
  } else if (clickCounter === 4) {
    medzicas4.classList.remove('invis');
  }
}
