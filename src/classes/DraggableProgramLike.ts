import { InteractionType, InteractionMouseMovementType, InteractionTouchMovementType } from '../types/programs-like/ProgramLikeInteractions.js';
import ProgramLikeElement from '../types/programs-like/ProgramLikeElement.js';

type Interactions = InteractionMouseMovementType | InteractionTouchMovementType;
type ProgramLikeCoords = { modalLeft: number, modalTop: number };
type ProgramLikeNewCoords = { newCoordX: number, newCoordY: number };

const programsLike: DraggableProgramLike[] = [];

class DraggableProgramLike {

    private coordX: number = 0;
    private coordY: number = 0;

    public isDragging: boolean;

    constructor(
        public programLikeContext: ProgramLikeElement,
        public interactionType: InteractionType
    ) {

        this.programLikeContext = programLikeContext;
        this.interactionType = interactionType;

        this.isDragging = false;
    }

    public static storeProgramLike(draggableProgramLike: DraggableProgramLike): void {
        programsLike.push(draggableProgramLike);
    }

    public static getProgramsLike(): DraggableProgramLike[] {
        return programsLike;
    }

    public static getProgramsLikeLen(): number {
        return DraggableProgramLike.getProgramsLike().length;
    }

    public static overlapProgramLike(draggableProgramLike: DraggableProgramLike): void {

        const dplLen: number = DraggableProgramLike.getProgramsLikeLen()

        const applyOverlay = ({ programLikeContext }: DraggableProgramLike, index: number) => programLikeContext === draggableProgramLike.programLikeContext
            ? programLikeContext.style.zIndex = '99'
            : programLikeContext.style.zIndex = String(index + dplLen);

        programsLike.forEach(applyOverlay);
    }

    public static removeProgramLike(programLikeContext: HTMLDivElement): void {

        const programsLike = DraggableProgramLike.getProgramsLike();

        const indexFound = programsLike.findIndex((dpl: DraggableProgramLike) => dpl.programLikeContext == programLikeContext);

        if(indexFound !== -1) {
            programsLike.splice(indexFound, 1);
        }
    }

    public getProgramLikeHeader(): HTMLDivElement {

        const modalHeader = this.programLikeContext.querySelector('.header');

        if(!modalHeader) {
            throw new Error('The modal wrapper does not contain a header into it.');
        }

        return modalHeader as HTMLDivElement;
    }

    public getProgramLikeCoords(): ProgramLikeCoords {

        const m: HTMLDivElement = this.programLikeContext;

        const modalLeft = +m.style.left.replace('px', '') ?? 0;
        const modalTop = +m.style.top.replace('px', '') ?? 0;

        return { modalLeft, modalTop };
    }

    public calcModalCoords(currCoordX: number, currCoordY: number): ProgramLikeNewCoords {

        const { modalLeft, modalTop }: ProgramLikeCoords = this.getProgramLikeCoords();

        const newCoordX: number = modalLeft + (currCoordX - this.coordX);
        const newCoordY: number = modalTop + (currCoordY - this.coordY);

        return { newCoordX, newCoordY };
    }

    public updateProgramLikePosition(currClientX: number = 0, currClientY: number = 0): void {

        const m: HTMLDivElement = this.programLikeContext;

        const { newCoordX, newCoordY }: ProgramLikeNewCoords = this.calcModalCoords( currClientX, currClientY);

        m.style.left = `${newCoordX}px`;
        m.style.top = `${newCoordY}px`;

        this.coordX = currClientX;
        this.coordY = currClientY;
    }

    public initializeInteractionEvents(interactionDown: Interactions, interactionUp: Interactions): void {

        const h: HTMLDivElement = this.getProgramLikeHeader();

        h.addEventListener('mouseenter', () => h.style.cursor = 'grab');
        h.addEventListener(interactionDown, (event: MouseEvent | TouchEvent): void => {

            const { clientX, clientY } = this.interactionType === 'mouse'
                ? (event as MouseEvent)
                : (event as TouchEvent).touches[0];

            this.isDragging = true;

            this.coordX = clientX;
            this.coordY = clientY;

            h.style.cursor = 'grabbing';
        }, { passive: true });

        window.addEventListener(interactionUp, () => {
            this.isDragging = false;
            h.style.cursor = 'grab';
        });
    }
}

export default DraggableProgramLike;