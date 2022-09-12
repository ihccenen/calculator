function getWindowSize() {
    bod.style.height = window.innerHeight + 'px';
    bod.style.width = window.innerWidth + 'px';
}

function mousedownHighlight(e) {
    e.target.classList.add('click');
    e.target.addEventListener('mouseup', () => e.target.classList.remove('click'));
}

function calculator (array) {
    const a = +array[0];
    const op = array[1];
    const b = +array[2];
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

    return c;
}

function getSecondNumber(itsNumber, itsDot, text) {
    const maxLength = String(calcArray[2]).length < 9;
    const noDot = String(calcArray[2]).indexOf('.') === -1;

    if(itsDot && noDot && maxLength) {
        calcArray[2] += text;
    } else if (itsNumber && maxLength) {
        calcArray[2] += text;
    }

    calcArray[2] = String(calcArray[2]).indexOf('.') === -1 ? calcArray[2] - 0 : calcArray[2];
    numberDisplay.textContent = calcArray[2];
}

function getFirstNumber(itsNumber, itsDot, text) {
    const maxLength = numberDisplay.textContent.length < 9;

    if(itsNumber || itsDot) {
        if(itsNumber && maxLength) {
            numberDisplay.textContent += text;
        } else if (itsDot && numberDisplay.textContent.indexOf('.') === -1 && maxLength) {
            numberDisplay.textContent += text;
        }
        
        if(numberDisplay.textContent.indexOf('.') === -1) {
            numberDisplay.textContent -= 0;
        }
    } else {
        if(!calcArray[0]) {
            calcArray[0] = numberDisplay.textContent;
        }

        calcArray[1] = text;
    }
}

function getInput(e) {
    const haveClassNumber = e.target.classList.contains('number');
    const haveClassDot = e.target.classList.contains('dot');
    const haveClassOperator = e.target.classList.contains('operator');
    const haveClassEquals = e.target.classList.contains('equals');
    const result = calcArray[0] && calcArray[1] && calcArray[2] && (haveClassOperator || haveClassEquals);
    const secondNumber = calcArray[0] && calcArray[1] && (haveClassNumber || haveClassDot);
    const firstNumber = haveClassNumber || haveClassDot || haveClassOperator;

    if(result) {
        const a = calculator(calcArray);
        numberDisplay.textContent = a;
        [calcArray[0], calcArray[1], calcArray[2]] = [a, false, 0]
    }
    
    if(secondNumber) {
        getSecondNumber(haveClassNumber, haveClassDot, e.target.textContent);
    } else if(firstNumber) {
        getFirstNumber(haveClassNumber, haveClassDot, e.target.textContent);
    } 
}

const bod = document.querySelector('body');
const keys = Array.from(document.querySelectorAll('.key'));
const numberDisplay = document.querySelector('.numbers-display');
const calcArray = [0, false, 0];

bod.style.height = window.innerHeight + 'px';
bod.style.width = window.innerWidth + 'px';
window.addEventListener('resize', getWindowSize);
keys.forEach(key => key.addEventListener('mousedown', mousedownHighlight));
keys.forEach(key => key.addEventListener('mouseup', getInput));
numberDisplay.textContent = 0;