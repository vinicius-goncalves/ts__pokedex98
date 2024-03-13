const modalHeader = document.querySelector('[data-modal="header"]');
const modal = modalHeader.closest('[data-modal="search-by-name-or-id"]');
const interactions = {
    type: 'mouse',
    mouse: {
        down: 'mousedown',
        up: 'mouseup',
        move: 'mousemove'
    },
    touch: {
        down: 'touchstart',
        up: 'touchend',
        move: 'touchmove'
    }
};
try {
    document.createEvent('TouchEvent');
    interactions.type = 'touch';
}
catch (err) {
    interactions.type = 'mouse';
}
let isDragging = false;
let coordX = 0;
let coordY = 0;
const interactionType = interactions.type;
const interactionsEvents = interactions[interactions.type];
function getModalCoords(modal) {
    const modalLeft = +modal.style.left.replace('px', '') ?? 0;
    const modalTop = +modal.style.top.replace('px', '') ?? 0;
    return { modalLeft, modalTop };
}
function calcModalCoords(modal, currCoordX, currCoordY) {
    const { modalLeft, modalTop } = getModalCoords(modal);
    const newCoordX = modalLeft + (currCoordX - coordX);
    const newCoordY = modalTop + (currCoordY - coordY);
    return { newCoordX, newCoordY };
}
function updateMousePosition(modal, currClientX = 0, currClientY = 0) {
    const { newCoordX, newCoordY } = calcModalCoords(modal, currClientX, currClientY);
    modal.style.left = `${newCoordX}px`;
    modal.style.top = `${newCoordY}px`;
    coordX = currClientX;
    coordY = currClientY;
}
modalHeader.addEventListener(interactionsEvents.down, (event) => {
    isDragging = true;
    const { clientX, clientY } = interactionType === 'mouse' ? event : event.touches[0];
    coordX = clientX;
    coordY = clientY;
});
window.addEventListener(interactionsEvents.move, (event) => {
    if (!isDragging) {
        return;
    }
    const { clientX, clientY } = interactionType === 'mouse' ? event : event.touches[0];
    const currClientX = clientX;
    const currClientY = clientY;
    updateMousePosition(modal, currClientX, currClientY);
});
window.addEventListener(interactionsEvents.up, () => {
    isDragging = false;
});
export default {};
