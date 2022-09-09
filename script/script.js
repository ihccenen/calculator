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

const bod = document.querySelector('body');
const number = document.querySelector('.numbers-display');
const keys = Array.from(document.querySelectorAll('.key'));

bod.style.height = window.innerHeight + 'px';
bod.style.width = window.innerWidth + 'px';
window.addEventListener('resize', windowSize);
keys.forEach(key => key.addEventListener('mouseover', mouseoverHighlight));
keys.forEach(key => key.addEventListener('mousedown', mousedown));
