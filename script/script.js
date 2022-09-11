function getWindowSize() {
    bod.style.height = window.innerHeight + 'px';
    bod.style.width = window.innerWidth + 'px';
}

function mouseoverHighlight(e) {
    e.target.classList.add('key-hover');
    e.target.addEventListener('mouseout', () => e.target.classList.remove('key-hover'));
}

function mousedownHighlight(e) {
    e.target.classList.add('click');
    e.target.addEventListener('mouseup', () => setTimeout(() => {
        e.target.classList.remove('click');
    }, 100));
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
    if(a && op && b && (e.target.classList.contains('operator') || e.target.classList.contains('equal'))) {
        const result = calculator(a, op, b);
        numberDisplay.textContent = result;
        a = result;
        b = 0;
        console.log(result);
    }

    if(a && op && (e.target.classList.contains('number') || e.target.classList.contains('dot'))) {
        if(numberDisplay.textContent.indexOf('.') === -1) {
            numberDisplay.textContent = 0;
            b += e.target.textContent;
            numberDisplay.textContent = b;
            console.log(b);
        } else if (e.target.classList.contains('number')){
            numberDisplay.textContent = 0;
            b += e.target.textContent;
            numberDisplay.textContent = b;
            console.log(b);
        }
    } else if(e.target.classList.contains('number')) {
        numberDisplay.textContent += e.target.textContent;
        console.log(numberDisplay.textContent);
    } else if(e.target.classList.contains('operator')) {
        if(!a) {
            a = numberDisplay.textContent;
            console.log(a);
        }
        op = e.target.textContent;
        console.log(op);
    } if(e.target.classList.contains('dot') && numberDisplay.textContent.indexOf('.') === -1) {
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
keys.forEach(key => key.addEventListener('mouseover', mouseoverHighlight));
keys.forEach(key => key.addEventListener('mousedown', mousedownHighlight));
keys.forEach(key => key.addEventListener('mouseup', getNumber));
numberDisplay.textContent = 0;