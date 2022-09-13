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
            c = Math.round((a + b) * 100) / 100;
            break;
        case '-':
            c = Math.round((a - b) * 100) / 100;
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

    calcArray[2] = calcArray[2].indexOf('.') === -1 ? calcArray[2] - 0 : calcArray[2];
    numberDisplay.textContent = calcArray[2];
}

function getFirstNumber(itsNumber, itsDot, text) {
    const maxLength = numberDisplay.textContent.length < 9;
    const noDot = numberDisplay.textContent.indexOf('.') === -1;
    const itsOperator = !itsNumber && !itsDot;

    if(itsDot && noDot && maxLength)  {
        numberDisplay.textContent += text;
    } else if(itsNumber && maxLength) {
        numberDisplay.textContent += text;
        numberDisplay.textContent = numberDisplay.textContent.indexOf('.') === -1 ? numberDisplay.textContent - 0 : numberDisplay.textContent;
    } else if(itsOperator) {
        calcArray[0] = numberDisplay.textContent;
        calcArray[1] = text;
    }
}

function clearDisplay(itsBackspace ,itsClear) {
    if(numberDisplay.textContent.length > 1 && itsBackspace) {
        numberDisplay.textContent = numberDisplay.textContent.slice(0, -1);
        calcArray[2] = calcArray[2] > 0 ? numberDisplay.textContent : calcArray[0];
    } else if(itsBackspace) {
        numberDisplay.textContent = 0;
        calcArray[2] = calcArray[2] > 0 ? numberDisplay.textContent : calcArray[0];
    } else if(itsClear) {
        numberDisplay.textContent = 0;
        [calcArray[0], calcArray[1], calcArray[2]] = [0, false, 0];
    }

    numberDisplay.textContent = isNaN(numberDisplay.textContent) ? 0 : numberDisplay.textContent;
}

function getPercent() {
    numberDisplay.textContent /= 100;

    if(calcArray[2] !== 0) {
        numberDisplay.textContent = calcArray[0] - (calcArray[0] * (calcArray[2] / 100));
    }
}

function getInput(e) {
    const hasNum = e.target.classList.contains('number');
    const hasDot = e.target.classList.contains('dot');
    const hasOp = e.target.classList.contains('operator');
    const hasEquals = e.target.classList.contains('equals');
    const hasClear = e.target.classList.contains('clear');
    const hasBackspace = e.target.classList.contains('backspace');
    const hasPlusMinus = e.target.classList.contains('plus-minus');
    const hasPercent = e.target.classList.contains('percent');
    const result = calcArray[0] && calcArray[1] && calcArray[2] && (hasOp || hasEquals);
    const secondNumber = calcArray[0] && calcArray[1] && (hasNum || hasDot);
    const firstNumber = hasNum || hasDot || hasOp;

    if(result) {
        const a = calculator(calcArray);
        numberDisplay.textContent = a;
        [calcArray[0], calcArray[1], calcArray[2]] = [a, false, 0];
    }
    
    if(secondNumber) {
        getSecondNumber(hasNum, hasDot, e.target.textContent);
    } else if(firstNumber) {
        getFirstNumber(hasNum, hasDot, e.target.textContent);
    } else if(hasBackspace || hasClear) {
        clearDisplay(hasBackspace, hasClear);
    } else if(hasPercent) {
        getPercent();
    } else if(hasPlusMinus) {
        numberDisplay.textContent *= -1;
        calcArray[2] = calcArray[2] !== 0 ? numberDisplay.textContent : 0;
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
