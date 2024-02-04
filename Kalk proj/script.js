const number = document.querySelector('.numbers');
const bar = document.querySelector('.bar');
const math = document.querySelector('.math-operators');
const result = document.querySelector('.result-operator button');
const deleteBtn = document.querySelector('.delete');
const clearBtn = document.querySelector('.clear');

number.addEventListener('click', numberEvent);
math.addEventListener('click', mathEvent);
result.addEventListener('click', resultEvent);
deleteBtn.addEventListener('click', deleteEvent);
clearBtn.addEventListener('click', clearEvent);

number.addEventListener('keydown', numberEventKey);

//*** FUNCTIONS

//* FUNKCIA NA NEOPAKOVANIE 0 a .
function numberEvent(e) {
  if (e.target.tagName === 'BUTTON') {
    const currentText = bar.innerHTML;
    const buttonText = e.target.textContent;
    // x
    // prvy char v stringu nesmie byt .
    if (buttonText === '.' && currentText.length === 0) {
      return;
    }

    if (buttonText === '0' && currentText === '0' && currentText.length === 1) {
      return;
    }

    // prvy char v substingu nesmie byt .
    const lastCharIsOperator = /[\+\-\*\/]$/.test(currentText);
    if (buttonText === '.' && lastCharIsOperator) {
      return;
    }

    const lastNumber = currentText.split(/[\+\-\*\/]+/).pop();
    // rozdeluje string medzi operatormi na substingy (teda jednotlive cisla ako array)
    // pop() chyti posledne cislo (teda poslednu hodnotu v array)
    const containsCharDot = lastNumber.includes('.');
    // substring nemsie obsahovat viac ako 1 .
    if (buttonText === '.' && containsCharDot) {
      return;
    }

    bar.innerHTML += buttonText;
  }
}

function mathEvent(e) {
  if (e.target.tagName === 'BUTTON') {
    const currentText = bar.innerHTML;
    const lastChar = currentText.charAt(currentText.length - 1);

    if (currentText === '' && e.target.textContent === '-') {
      bar.innerHTML += e.target.textContent;
      return;
    }

    if (isNaN(lastChar) || lastChar === '') {
      return;
    }

    bar.innerHTML += e.target.textContent;
  }
}

function resultEvent(e) {
  if (e.target.textContent === '=' && bar.innerHTML.length === 0) {
    return;
  }

  if (e.target.tagName === 'BUTTON') {
    const result = eval(bar.innerHTML);
    bar.innerHTML = result;
  }
}

function deleteEvent(e) {
  let currentText = bar.innerHTML;
  currentText = currentText.slice(0, -1);
  bar.innerHTML = currentText;
}

function clearEvent(e) {
  bar.innerHTML = '';
}

// **** FUNCKIA NA KLAVESY
// chyba pri . a 0, celkovo nedokonale
function numberEventKey(e) {
  console.log(e.key);
  if (e.key >= '0' && e.key <= '9') {
    const buttons = number.getElementsByTagName('button');
    if (e.key === '0') {
      buttons[buttons.length - 1].click();
    } else {
      buttons[Number(e.key) - 1].click();
    }
    // for (let i = 0; i < buttons.length; i++) {
    //   if (buttons[i].textContent === e.key) {
    //     buttons[i].click();
    //     break;
    //   }
    // }
  }
}
