function getWindowSize() {
    bod.style.height = window.innerHeight + 'px';
    bod.style.width = window.innerWidth + 'px';
}

function mousedownHighlight(e) {
    e.target.classList.add('click');
    e.target.addEventListener('mouseup', () => e.target.classList.remove('click'));
}

function calculator (firstNumber, operator, secondNumber) {
    const a = +firstNumber;
    const op = operator;
    const b = +secondNumber;

    switch (op) {   
        case '+':
            return a + b;
        case '-':
            return  a - b;
        case '*':
            return a * b;
        case '÷':
            return a / b;
    }
}

function getResult() {
    const result = calculator(a, op, b);
    numberDisplay.textContent = result;
    a = result;
    b = 0;
}

function getSecondNumber(text) {
    if(numberDisplay.textContent.indexOf('.') === -1) {
        numberDisplay.textContent = 0;
        if(text === '.') {
            b += text;
        } else {
            b += text;
            b -= 0
        }
        numberDisplay.textContent = b;
    } else {
        numberDisplay.textContent = 0;
        b += text;
        if(!b.includes('.')) {
            b -= 0;
        }
        numberDisplay.textContent = b;
    }
}

function getFirstNumber(numTrue, text) {
    if(numTrue) {
        numberDisplay.textContent += text;
        if(numberDisplay.textContent.indexOf('.') === -1) {
            numberDisplay.textContent -= 0;
        }
    } else {
        if(!a) {
            a = numberDisplay.textContent;
        }
        op = text;
    }
}

function getNumber(e) {
    const resultCheck = a && op && b && (e.target.classList.contains('operator') || e.target.classList.contains('equals'));
    const secondNumberCheck = a && op && (e.target.classList.contains('number') || e.target.classList.contains('dot'));
    const firstNumberCheck = e.target.classList.contains('number') || e.target.classList.contains('operator');
    const displayNumberCheck = e.target.classList.contains('dot') && numberDisplay.textContent.indexOf('.') === -1;

    if(resultCheck) {
        getResult();
    }

    if(secondNumberCheck) {
        getSecondNumber(e.target.textContent);
    } else if(firstNumberCheck) {
        const isNum = e.target.classList.contains('number');
        getFirstNumber(isNum, e.target.textContent);
    } else if(displayNumberCheck) {
        numberDisplay.textContent += e.target.textContent;
    }
}

const bod = document.querySelector('body');
const keys = Array.from(document.querySelectorAll('.key'));
const numberDisplay = document.querySelector('.numbers-display');
let a;
let op;
let b = 0;

bod.style.height = window.innerHeight + 'px';
bod.style.width = window.innerWidth + 'px';
window.addEventListener('resize', getWindowSize);
keys.forEach(key => key.addEventListener('mousedown', mousedownHighlight));
keys.forEach(key => key.addEventListener('mouseup', getNumber));
numberDisplay.textContent = 0;