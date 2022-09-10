function windowSize() {
    bod.style.height = window.innerHeight + 'px';
    bod.style.width = window.innerWidth + 'px';
}

function mouseoverHighlight(e) {
    e.target.classList.add('key-hover');
    e.target.addEventListener('mouseout', () => e.target.classList.remove('key-hover'));
}

function mousedown(e) {
    e.target.classList.add('click');
    e.target.addEventListener('mouseup', () => setTimeout(() => {
        e.target.classList.remove('click');
    }, 100));
}

function removeLeadingZero(num) {
    const hasDot = num.split('.')
                    .map(num => num > 0 ? num - 0 : num)
                    .join('.');
    const displayNumber = num.indexOf('.') === -1 ? num - 0 : hasDot;
    
    return displayNumber;
}

function getNumber(e) {
    const classNumber = e.target.classList.contains('number');
    const dot = e.target.classList.contains('dot') && numberDisplay.textContent.indexOf('.') === -1;
    const maxLength = numberDisplay.textContent.length < 9;
    let firstNumber = numberDisplay.textContent;

    if(maxLength) {
        if(dot) {
            firstNumber += e.target.textContent;
        } else if(classNumber) {
            firstNumber += e.target.textContent;
        }
    }
    
    numberDisplay.textContent = removeLeadingZero(firstNumber);    
}

const bod = document.querySelector('body');
const keys = Array.from(document.querySelectorAll('.key'));
const numberDisplay = document.querySelector('.numbers-display');

bod.style.height = window.innerHeight + 'px';
bod.style.width = window.innerWidth + 'px';
window.addEventListener('resize', windowSize);
keys.forEach(key => key.addEventListener('mouseover', mouseoverHighlight));
keys.forEach(key => key.addEventListener('mousedown', mousedown));
keys.forEach(key => key.addEventListener('mouseup', getNumber));
numberDisplay.textContent = 0;