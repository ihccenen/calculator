function getWindowSize() {
    bod.style.height = window.innerHeight + 'px';
}

function calculator (array) {
    const a = +array[0];
    const op = array[1] === "/" ? '÷' : array[1];
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
        calcArray[2] = calcArray[2].indexOf('.') === -1 ? calcArray[2] - 0 : calcArray[2];
    }

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

function clearDisplay(itsClear, itsBackspace) {
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
    const hasNum = e.target.classList.contains('number') || e.key >= 0;
    const hasDot = e.target.classList.contains('dot') || e.key === '.';
    const hasEquals = e.target.classList.contains('equals') || e.key === '=' || e.key === 'Enter';
    const hasOp = e.target.classList.contains('operator') || ['+', '-', '*', '/'].indexOf(e.key) !== -1;
    const hasBackspace = e.target.classList.contains('backspace') || e.key === 'Backspace';
    const hasPercent = e.target.classList.contains('percent') || e.key === '%';
    const hasClear = e.target.classList.contains('clear');
    const hasPlusMinus = e.target.classList.contains('plus-minus');
    const result = calcArray[0] && calcArray[1] && calcArray[2] && (hasOp || hasEquals);
    const secondNumber = calcArray[0] && calcArray[1] && (hasNum || hasDot);
    const firstNumber = hasNum || hasDot || hasOp;

    if(result) {
        const a = calculator(calcArray);
        numberDisplay.textContent = a;
        [calcArray[0], calcArray[1], calcArray[2]] = [a, false, 0];
    }
    
    if(secondNumber) {
        const text = e.key || e.target.textContent;
        getSecondNumber(hasNum, hasDot, text);
    } else if(firstNumber) {
        const text = e.key || e.target.textContent;
        getFirstNumber(hasNum, hasDot, text);
    } else if(hasBackspace || hasClear) {
        clearDisplay(hasClear, hasBackspace);
    } else if(hasPercent) {
        getPercent();
    } else if(hasPlusMinus) {
        numberDisplay.textContent *= -1;
        calcArray[2] = calcArray[2] !== 0 ? numberDisplay.textContent : 0;
    }


    if(hasNum || hasDot || hasOp || hasBackspace || hasEquals || hasPercent) {
        e.preventDefault();
    }
}

const bod = document.querySelector('body');
const keys = Array.from(document.querySelectorAll('.key'));
const numberDisplay = document.querySelector('.numbers-display');
const calcArray = [0, false, 0];

bod.style.height = window.innerHeight + 'px';
window.addEventListener('resize', getWindowSize);
window.addEventListener('keydown', getInput);
keys.forEach(key => key.addEventListener('mouseup', getInput));