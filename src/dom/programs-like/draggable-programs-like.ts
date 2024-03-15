import type {
    InteractionType,
    InteractionXYPosition,
    InteractionTouchMovementType,
    InteractionMouseMovementType
} from '../../types/programs-like/ProgramLikeInteractions.js';

import type ProgramLikeElement from '../../types/programs-like/ProgramLikeElement.js';

import DraggableProgramLike from '../../classes/DraggableProgramLike.js';

type InteractionEvents = {
    type: InteractionType,
    mouse: Record<InteractionXYPosition, InteractionTouchMovementType>;
    touch: Record<InteractionXYPosition, InteractionMouseMovementType>;
}

const interactions: InteractionEvents = {
    type: 'mouse',
    mouse: { down: 'mousedown', up: 'mouseup', move: 'mousemove' },
    touch: { down: 'touchstart', up: 'touchend', move: 'touchmove' }
};

try {
    document.createEvent('TouchEvent');
    interactions.type = 'touch';
} catch(err: Error | ErrorEvent | any) {
    interactions.type = 'mouse';
}

const interactionType: InteractionType = interactions.type;
const interactionsEvents: InteractionEvents['mouse'] | InteractionEvents['touch'] = interactions[interactions.type];

window.addEventListener(interactionsEvents.move, (event: MouseEvent | TouchEvent): void => {

    event.preventDefault();

    const draggableProgramLike: DraggableProgramLike | undefined = DraggableProgramLike
        .getProgramsLike().find(({ isDragging }) => isDragging);

    if(!draggableProgramLike) {
        return;
    }

    const { clientX, clientY } = interactionType === 'mouse' ? (event as MouseEvent) : (event as TouchEvent).touches[0];

    draggableProgramLike.updateProgramLikePosition(clientX, clientY);
    DraggableProgramLike.overlapProgramLike(draggableProgramLike);

}, { passive: false });

const observer = new MutationObserver(([ mutation ]): void => {

    const removedNodes = mutation.removedNodes;

    if(removedNodes.length >= 1) {
        DraggableProgramLike.removeProgramLike(<HTMLDivElement>removedNodes[0]);
        return;
    }

    const addedNode: Node | null = mutation.addedNodes.item(0);

    if(addedNode instanceof HTMLElement && !addedNode.hasAttribute('data-program-like')) {
        return;
    }

    const dpl = new DraggableProgramLike(addedNode as ProgramLikeElement, interactionType);
    DraggableProgramLike.storeProgramLike(dpl);

    dpl.initializeInteractionEvents(interactionsEvents.down, interactionsEvents.up);
});

observer.observe(document.body, { childList: true });

export default {};