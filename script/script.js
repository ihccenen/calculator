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

        // remove leading zeros if there's no dot
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

        // remove leading zeros if there's no dot
        numberDisplay.textContent = numberDisplay.textContent.indexOf('.') === -1 ? numberDisplay.textContent - 0 : numberDisplay.textContent;
    } else if(itsOperator) {

        // save first number and operator
        calcArray[0] = numberDisplay.textContent;
        calcArray[1] = text;
    }
}

function clearDisplay(itsClear, itsBackspace) {
    const num = numberDisplay.textContent;

    if(itsBackspace) {
        // if it has only one number set to 0
        numberDisplay.textContent = num.length > 1 ? num.slice(0, -1) : 0;

        // remove last character if it's the second number
        calcArray[2] = calcArray[2] > 0 ? numberDisplay.textContent : 0;
    } else if(itsClear) {
        numberDisplay.textContent = 0;

        // reset calcArray
        [calcArray[0], calcArray[1], calcArray[2]] = [0, false, 0];
    }
    
    // if the last character is + or - change it to 0
    numberDisplay.textContent = isNaN(numberDisplay.textContent) ? 0 : numberDisplay.textContent;
}

function getPercent() {
    numberDisplay.textContent /= 100;
    
    // if it's used on the second number 
    if(calcArray[2] !== 0) {
        // calculate from the first number and subtract
        numberDisplay.textContent = calcArray[0] - (calcArray[0] * (calcArray[2] / 100));
    }
}

function getInput(e) {
    // check which class the div clicked or key pressed has
    const hasNum = e.target.classList.contains('number') || e.key >= 0;
    const hasDot = e.target.classList.contains('dot') || e.key === '.';
    const hasEquals = e.target.classList.contains('equals') || e.key === '=' || e.key === 'Enter';
    const hasOp = e.target.classList.contains('operator') || ['+', '-', '*', '/'].indexOf(e.key) !== -1;
    const hasBackspace = e.target.classList.contains('backspace') || e.key === 'Backspace';
    const hasPercent = e.target.classList.contains('percent') || e.key === '%';
    const hasClear = e.target.classList.contains('clear');
    const hasPlusMinus = e.target.classList.contains('plus-minus');
    
    // set conditions
    const firstNumber = hasNum || hasDot || hasOp;
    const result = calcArray[0] && calcArray[1] && calcArray[2] && (hasOp || hasEquals);
    const secondNumber = calcArray[0] && calcArray[1] && (hasNum || hasDot);
    
    // get text from the div clicked or the key pressed
    const text = e.key || e.target.textContent;
    
    // run the one which is true of result, firstNumber or secondNumber
    // or the one which has the right class or key pressed
    if(result) {
        const total = calculator(calcArray);
        const operator = hasOp ? (e.key || e.target.textContent) : false;
        numberDisplay.textContent = total;
        
        // set calcArray to be: total, text if it's an operator and 0
        [calcArray[0], calcArray[1], calcArray[2]] = [total, operator, 0];
    } else if(secondNumber) {
        getSecondNumber(hasNum, hasDot, text);
    } else if(firstNumber) {
        getFirstNumber(hasNum, hasDot, text);
    } else if(hasBackspace || hasClear) {
        clearDisplay(hasClear, hasBackspace);
    } else if(hasPercent) {
        getPercent();
    } else if(hasPlusMinus) {
        // convert number to negative or positive
        numberDisplay.textContent *= -1;
        
        // if it's the second number
        calcArray[2] = calcArray[2] !== 0 ? numberDisplay.textContent : 0;
    }
    
    if(hasBackspace || hasOp) {
        e.preventDefault();
    }
    console.log(calcArray);
}

const bod = document.querySelector('body');
const keys = Array.from(document.querySelectorAll('.key'));
const numberDisplay = document.querySelector('.numbers-display');

// store first number, operator and second number
const calcArray = [0, false, 0];

bod.style.height = window.innerHeight + 'px';
window.addEventListener('resize', getWindowSize);
window.addEventListener('keydown', getInput);
keys.forEach(key => key.addEventListener('mouseup', getInput));