function calculator(arr) {
  const a = +arr[0];
  const op = arr[1];
  const b = +arr[2];
  let c;

  switch (op) {
    case '+':
      c = a + b;
      break;
    case '-':
      c = a - b;
      break;
    case '*':
      c = a * b;
      break;
    case '÷':
      c = a / b;
      break;
  }

  calcArr[1] = null;
  calcArr[2] = null;

  return String(c).indexOf('.') !== -1 ? c.toFixed(8) - 0 : c;
}

function getPercent() {
  if (calcArr[2] !== null) {
    calcArr[0] = calcArr[0] - calcArr[0] * (calcArr[2] / 100);
    calcArr[1] = null;
    calcArr[2] = null;

    display.textContent = calcArr[0];

    return;
  }

  display.textContent /= 100;
}

function clearDisplay(e) {
  const text = e.key || display.textContent;

  if (text === 'CE' || text === 'Delete') {
    display.textContent = 0;

    return;
  }

  display.textContent =
    display.textContent.length === 1 ||
    (display.textContent[0] === '-' && display.textContent.length === 2)
      ? 0
      : display.textContent.slice(0, -1);

  if (calcArr[2] !== null) {
    calcArr[2] = display.textContent;
  }
}

function getSecondNumber(char) {
  if (String(calcArr[2]).length >= 9) return;

  if (calcArr[2] === null) {
    calcArr[2] = 0;
  }

  calcArr[2] = getNumber((calcArr[2] += char));

  display.textContent = calcArr[2];
}

function getOperator(e) {
  const text = e.key || e.target.textContent;

  if (text === '=') {
    display.textContent =
      calcArr.indexOf(null) === -1 ? calculator(calcArr) : display.textContent;

    return;
  } else if (text === '±') {
    display.textContent *= -1;

    calcArr[2] = calcArr[2] !== null ? display.textContent : null;

    return;
  } else if (text === '%') {
    getPercent();
    return;
  } else if (calcArr[2] === null) {
    calcArr[0] = display.textContent;
    calcArr[1] = text;

    return;
  }

  display.textContent = calculator(calcArr);

  calcArr[0] = display.textContent;
  calcArr[1] = text;
}

function removeLeadingZero(string) {
  const str = string.split('.');

  str[0] -= 0;

  return str.join('.');
}

function getNumber(string) {
  const num = string
    .split('')
    .reduce((arr, current) => {
      if (current >= 0) {
        arr.push(current);
      } else if (current === '.' && arr.indexOf('.') === -1 && arr.length < 8) {
        arr.push(current);
      }

      return arr;
    }, [])
    .join('');

  if (num.indexOf('.') === -1) {
    return removeLeadingZero(num);
  }

  return num;
}

function getKey(e) {
  const operatorArr = ['+', '-', '*', '/', '%', '='];

  if (operatorArr.indexOf(e.key) !== -1) {
    getOperator(e);
  } else if (e.key === 'Backspace' || e.key === 'Delete') {
    clearDisplay(e);
  } else if (e.key >= 0 || e.key === '.') {
    showDisplay(e);
  }
}

function showDisplay(e) {
  const text = e.key || e.target.textContent;

  if (display.textContent.length < 9) {
    display.textContent += text;
  }

  if (calcArr[1] !== null) {
    getSecondNumber(text);
    return;
  }

  display.textContent = getNumber(display.textContent);
}

const display = document.querySelector('.display');
const numKeys = Array.from(document.querySelectorAll('.number, .dot'));
const operatorKey = Array.from(document.querySelectorAll('.operator'));
const clearKeys = Array.from(document.querySelectorAll('.clear, .backspace'));
const calcArr = [null, null, null];

window.addEventListener('keydown', getKey);
numKeys.forEach((key) => key.addEventListener('click', showDisplay));
operatorKey.forEach((key) => key.addEventListener('click', getOperator));
clearKeys.forEach((key) => key.addEventListener('click', clearDisplay));
