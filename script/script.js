function mouseoverHighlight(e) {
    e.target.classList.add('key-hover');
    e.target.addEventListener('mouseout', () => e.target.classList.remove('key-hover'));
}

function click(e) {
    e.target.classList.add('click');
    e.target.addEventListener('mouseup', () => setTimeout(() => {
        e.target.classList.remove('click')
    }, 100));
}

const numbers = document.querySelector('.numbers');
const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('mouseover', mouseoverHighlight));
keys.forEach(key => key.addEventListener('mousedown', click));