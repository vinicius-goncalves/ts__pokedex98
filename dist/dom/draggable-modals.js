import DraggableModal from '../classes/DraggableModal.js';
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
    const wrappers = document.querySelectorAll('[data-modal]');
    wrappers.forEach((wrapper) => {
        const m = new DraggableModal(wrapper, interactionType);
        DraggableModal.storeModal(m);
        m.initializeInteractionEvents(interactionsEvents.down, interactionsEvents.up);
    });
    DraggableModal.getModals().forEach((modal) => {
        modal.getModalHeader().querySelector('button').onclick = () => modal.modalContext.remove();
    });
}
window.addEventListener('mousemove', (event) => {
    const draggableModal = DraggableModal.getModals().find(({ isDragging }) => isDragging);
    if (!draggableModal) {
        return;
    }
    const { clientX, clientY } = interactionType === 'mouse' ? event : event.touches[0];
    draggableModal.updateModalPosition(clientX, clientY);
    DraggableModal.overlapModal(draggableModal);
});
initializeModals();
export default {};
