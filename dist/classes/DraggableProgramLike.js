const programsLike = [];
class DraggableProgramLike {
    programLikeContext;
    interactionType;
    coordX = 0;
    coordY = 0;
    isDragging;
    constructor(programLikeContext, interactionType) {
        this.programLikeContext = programLikeContext;
        this.interactionType = interactionType;
        this.programLikeContext = programLikeContext;
        this.interactionType = interactionType;
        this.isDragging = false;
    }
    static storeProgramLike(draggableProgramLike) {
        programsLike.push(draggableProgramLike);
    }
    static getProgramsLike() {
        return programsLike;
    }
    static getProgramsLikeLen() {
        return DraggableProgramLike.getProgramsLike().length;
    }
    static overlapProgramLike(draggableProgramLike) {
        const dplLen = DraggableProgramLike.getProgramsLikeLen();
        const applyOverlay = ({ programLikeContext }, index) => programLikeContext === draggableProgramLike.programLikeContext
            ? programLikeContext.style.zIndex = '99'
            : programLikeContext.style.zIndex = String(index + dplLen);
        programsLike.forEach(applyOverlay);
    }
    static removeProgramLike(programLikeContext) {
        const programsLike = DraggableProgramLike.getProgramsLike();
        const indexFound = programsLike.findIndex((dpl) => dpl.programLikeContext == programLikeContext);
        if (indexFound !== -1) {
            programsLike.splice(indexFound, 1);
        }
    }
    getProgramLikeHeader() {
        const modalHeader = this.programLikeContext.querySelector('.header');
        if (!modalHeader) {
            throw new Error('The modal wrapper does not contain a header into it.');
        }
        return modalHeader;
    }
    getProgramLikeCoords() {
        const m = this.programLikeContext;
        const modalLeft = +m.style.left.replace('px', '') ?? 0;
        const modalTop = +m.style.top.replace('px', '') ?? 0;
        return { modalLeft, modalTop };
    }
    calcModalCoords(currCoordX, currCoordY) {
        const { modalLeft, modalTop } = this.getProgramLikeCoords();
        const newCoordX = modalLeft + (currCoordX - this.coordX);
        const newCoordY = modalTop + (currCoordY - this.coordY);
        return { newCoordX, newCoordY };
    }
    updateProgramLikePosition(currClientX = 0, currClientY = 0) {
        const m = this.programLikeContext;
        const { newCoordX, newCoordY } = this.calcModalCoords(currClientX, currClientY);
        m.style.left = `${newCoordX}px`;
        m.style.top = `${newCoordY}px`;
        this.coordX = currClientX;
        this.coordY = currClientY;
    }
    initializeInteractionEvents(interactionDown, interactionUp) {
        const h = this.getProgramLikeHeader();
        h.addEventListener('mouseenter', () => h.style.cursor = 'grab');
        h.addEventListener(interactionDown, (event) => {
            const { clientX, clientY } = this.interactionType === 'mouse'
                ? event
                : event.touches[0];
            this.isDragging = true;
            this.coordX = clientX;
            this.coordY = clientY;
            h.style.cursor = 'grabbing';
        }, { passive: false });
        window.addEventListener(interactionUp, () => {
            this.isDragging = false;
            h.style.cursor = 'grab';
        });
    }
}
export default DraggableProgramLike;
