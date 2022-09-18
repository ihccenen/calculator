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
        case '':
            c = a / b;
    }

    return c;
}

function getSecondNumber(char) {
    if (String(calcArr[2]).length >= 9) return;

    calcArr[2] = getNumber((calcArr[2] += char));

    return (display.textContent = calcArr[2]);
}

function getOperator(e) {
    calcArr[0] = display.textContent;
    calcArr[1] = e.target.textContent;
    calcArr[2] = 0;
}

function removeLeadingZero(string) {
    const str = string.split('.');

    str[0] -= 0;

    return str.join('.');
}

function getNumber(string) {
    console.log(calcArr);
    const num = string.split('').reduce((arr, current) => {
        if (current >= 0) {
            arr.push(current);
        } else if (current === '.' && arr.indexOf('.') === -1 && arr.length < 8) {
            arr.push(current);
        }

        return arr;
    }, []);

    if (num.indexOf('.') === -1) {
        return removeLeadingZero(num.join(''));
    }

    return num.join('');
}

function showDisplay(e) {
    if (display.textContent.length < 9) {
        display.textContent += e.target.textContent;
    }

    if (calcArr[2] !== null) {
        getSecondNumber(e.target.textContent);
        return;
    }

    return (display.textContent = getNumber(display.textContent));
}

const display = document.querySelector('.display');
const numKeys = Array.from(document.querySelectorAll('.number, .dot'));
const operatorKey = Array.from(document.querySelectorAll('.operator'));
const calcArr = [null, null, null];

numKeys.forEach((key) => key.addEventListener('click', showDisplay));
operatorKey.forEach((key) => key.addEventListener('click', getOperator));
