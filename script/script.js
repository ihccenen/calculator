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

function getNumber(e) {
    if(a && op && b && (e.target.classList.contains('operator') || e.target.classList.contains('equals'))) {
        const result = calculator(a, op, b);
        numberDisplay.textContent = result;
        a = result;
        b = 0;
        console.log(result);
    }

    if(a && op && (e.target.classList.contains('number') || e.target.classList.contains('dot'))) {
        if(numberDisplay.textContent.indexOf('.') === -1) {
            numberDisplay.textContent = 0;
            if(e.target.textContent === '.') {
                b += e.target.textContent
            } else {
                b += e.target.textContent
                b -= 0
            }
            numberDisplay.textContent = b;
            console.log(b);
        } else if (e.target.classList.contains('number')){
            numberDisplay.textContent = 0;
            b += e.target.textContent;
            if(!b.includes('.')) {
                b -= 0;
            }
            numberDisplay.textContent = b;
            console.log(b);
        }
    } else if(e.target.classList.contains('number')) {
        numberDisplay.textContent += e.target.textContent;
        if(numberDisplay.textContent.indexOf('.') === -1) {
            numberDisplay.textContent -= 0;
        }
        console.log(numberDisplay.textContent);
    } else if(e.target.classList.contains('operator')) {
        if(!a) {
            a = numberDisplay.textContent;
            console.log(a);
        }
        op = e.target.textContent;
        console.log(op);
    } else if(e.target.classList.contains('dot') && numberDisplay.textContent.indexOf('.') === -1) {
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