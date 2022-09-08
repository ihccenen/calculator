function mouseoverHighlight(e) {
    e.target.classList.add('key-hover');
}

function removeHighlight(e) {
    e.target.classList.remove('key-hover');
}

function clickHighlight(e) {
    e.target.classList.remove('key-hover')
    e.target.classList.add('click');

    setTimeout(() => {
        e.target.classList.remove('click');
    }, 100);

    e.target.classList.add('key-hover');
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('mouseover', mouseoverHighlight));
keys.forEach(key => key.addEventListener('mouseout', removeHighlight))
keys.forEach(key => key.addEventListener('click', clickHighlight));