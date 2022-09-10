function windowSize() {
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

function removeLeadingZero(num) {           
    if(num.indexOf('.') !== -1) {
        let hasDot = num.split('.');
        hasDot[0] - 0;
        return  hasDot.join('.');
    } else {
        return num - 0;
    } 
}

function getNumber(e) {
    const classNumber = e.target.classList.contains('number');
    const dot = e.target.classList.contains('dot') && numberDisplay.textContent.indexOf('.') === -1;
    const backspace = e.target.classList.contains('backspace');
    const maxLength = numberDisplay.textContent.length < 9;
    let firstNumber = numberDisplay.textContent;

    if(maxLength) {
        if(dot) {
            firstNumber += e.target.textContent;
        } else if(classNumber) {
            firstNumber += e.target.textContent;
        }
    }

    if(backspace) {
        firstNumber = numberDisplay.textContent.slice(0, -1)
    }

    numberDisplay.textContent = removeLeadingZero(firstNumber);

}

const bod = document.querySelector('body');
const keys = Array.from(document.querySelectorAll('.key'));
const numberDisplay = document.querySelector('.numbers-display');
const calculateNumbers = {};
let firstNumber = 0;
let secondNumber = 0;

bod.style.height = window.innerHeight + 'px';
bod.style.width = window.innerWidth + 'px';
window.addEventListener('resize', windowSize);
keys.forEach(key => key.addEventListener('mouseover', mouseoverHighlight));
keys.forEach(key => key.addEventListener('mousedown', mousedownHighlight));
keys.forEach(key => key.addEventListener('mouseup', getNumber));
numberDisplay.textContent = firstNumber;