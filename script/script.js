function highlight(e) {
    e.target.classList.add('mouseover');
}

function removeHighlight(e) {
    e.target.classList.remove('mouseover');
}

const keys = Array.from(document.querySelectorAll('.key'));

keys.forEach(key => key.addEventListener('mouseover', highlight));
keys.forEach(key => key.addEventListener('mouseout', removeHighlight));