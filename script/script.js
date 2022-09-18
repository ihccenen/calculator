function removeLeadingZero(string) {
    const str = string.split('.');

    str[0] -= 0;

    return str.join('.');
}

function getNumber(string) {
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

    display.textContent = getNumber(display.textContent);
}

const display = document.querySelector('.display');
const keys = Array.from(document.querySelectorAll('.key'));

keys.forEach((key) => key.addEventListener('click', showDisplay));
