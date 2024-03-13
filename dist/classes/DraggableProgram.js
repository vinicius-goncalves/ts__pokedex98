const draggableModals = [];
class DraggableModal {
    modalContext;
    interactionType;
    coordX = 0;
    coordY = 0;
    isDragging;
    constructor(modalContext, interactionType) {
        this.modalContext = modalContext;
        this.interactionType = interactionType;
        this.modalContext = modalContext;
        this.interactionType = interactionType;
        this.isDragging = false;
    }
    static storeModal(modal) {
        draggableModals.push(modal);
    }
    static getModals() {
        return draggableModals;
    }
    static overlapModal(modal) {
        const applyOverlay = ({ modalContext }) => modalContext === modal.modalContext
            ? modalContext.style.zIndex = '99'
            : modalContext.style.zIndex = '66';
        draggableModals.forEach(applyOverlay);
    }
    getModalHeader() {
        const modalHeader = this.modalContext.querySelector('.header');
        if (!modalHeader) {
            throw new Error('The modal wrapper does not contain a header into it.');
        }
        return modalHeader;
    }
    getModalCoords() {
        const m = this.modalContext;
        const modalLeft = +m.style.left.replace('px', '') ?? 0;
        const modalTop = +m.style.top.replace('px', '') ?? 0;
        return { modalLeft, modalTop };
    }
    calcModalCoords(currCoordX, currCoordY) {
        const { modalLeft, modalTop } = this.getModalCoords();
        const newCoordX = modalLeft + (currCoordX - this.coordX);
        const newCoordY = modalTop + (currCoordY - this.coordY);
        return { newCoordX, newCoordY };
    }
    updateModalPosition(currClientX = 0, currClientY = 0) {
        const m = this.modalContext;
        const { newCoordX, newCoordY } = this.calcModalCoords(currClientX, currClientY);
        m.style.left = `${newCoordX}px`;
        m.style.top = `${newCoordY}px`;
        this.coordX = currClientX;
        this.coordY = currClientY;
    }
    initializeInteractionEvents(interactionDown, interactionUp) {
        const h = this.getModalHeader();
        h.addEventListener(interactionDown, (event) => {
            const { clientX, clientY } = this.interactionType === 'mouse'
                ? event
                : event.touches[0];
            this.isDragging = true;
            this.coordX = clientX;
            this.coordY = clientY;
        });
        window.addEventListener(interactionUp, () => this.isDragging = false);
    }
}
export default DraggableModal;
