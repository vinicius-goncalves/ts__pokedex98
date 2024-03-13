import DraggableProgramLike from '../../classes/DraggableProgramLike.js';
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
window.addEventListener('mousemove', (event) => {
    const draggableProgramLike = DraggableProgramLike
        .getProgramsLike().find(({ isDragging }) => isDragging);
    if (!draggableProgramLike) {
        return;
    }
    const { clientX, clientY } = interactionType === 'mouse' ? event : event.touches[0];
    draggableProgramLike.updateProgramLikePosition(clientX, clientY);
    DraggableProgramLike.overlapProgramLike(draggableProgramLike);
});
const observer = new MutationObserver(([mutation]) => {
    const removedNodes = mutation.removedNodes;
    if (removedNodes.length >= 1) {
        DraggableProgramLike.removeProgramLike(removedNodes[0]);
        return;
    }
    const addedNode = mutation.addedNodes.item(0);
    if (addedNode instanceof HTMLElement && !addedNode.hasAttribute('data-program-like')) {
        return;
    }
    const dpl = new DraggableProgramLike(addedNode, interactionType);
    DraggableProgramLike.storeProgramLike(dpl);
    dpl.initializeInteractionEvents(interactionsEvents.down, interactionsEvents.up);
});
observer.observe(document.body, { childList: true });
export default {};
