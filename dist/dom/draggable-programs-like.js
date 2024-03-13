import DraggableProgramLike from '../classes/DraggableProgramLike.js';
const interactions = {
    type: 'mouse',
    mouse: { down: 'mousedown', up: 'mouseup', move: 'mousemove' },
    touch: { down: 'touchstart', up: 'touchend', move: 'touchmove' }
};
try {
    document.createEvent('TouchEvent');
    interactions.type = 'touch';
}
catch (err) {
    interactions.type = 'mouse';
}
const interactionType = interactions.type;
const interactionsEvents = interactions[interactions.type];
function initializeModals() {
    const wrappers = document.querySelectorAll('[data-program-like]');
    wrappers.forEach((wrapper) => {
        const m = new DraggableProgramLike(wrapper, interactionType);
        DraggableProgramLike.storeModal(m);
        m.initializeInteractionEvents(interactionsEvents.down, interactionsEvents.up);
    });
    DraggableProgramLike.getModals().forEach((modal) => {
        modal.getModalHeader().querySelector('button').onclick = () => modal.modalContext.remove();
    });
}
window.addEventListener('mousemove', (event) => {
    const draggableProgramLike = DraggableProgramLike.getModals().find(({ isDragging }) => isDragging);
    if (!draggableProgramLike) {
        return;
    }
    const { clientX, clientY } = interactionType === 'mouse' ? event : event.touches[0];
    draggableProgramLike.updateModalPosition(clientX, clientY);
    DraggableProgramLike.overlapModal(draggableProgramLike);
});
initializeModals();
export default {};
