import DraggableProgramLike from '../../classes/DraggableProgramLike.js';
function createProgramLikeWrapper(programLike, content) {
    const dplLength = DraggableProgramLike.getProgramsLike().length;
    const programLikeWrapper = document.createElement('div');
    programLikeWrapper.setAttribute('data-program-like', programLike.id);
    programLikeWrapper.classList.add('window', 'window-shadow', 'program-like');
    programLikeWrapper.style.position = 'absolute';
    programLikeWrapper.style.left = `${dplLength * 64}px`;
    programLikeWrapper.style.top = `${dplLength * 64}px`;
    programLikeWrapper.style.zIndex = String(99 + dplLength);
    const programLikeContainer = document.createElement('div');
    programLikeContainer.setAttribute('data-program-like-container', programLike.id);
    programLikeContainer.classList.add('program-like-container');
    programLikeWrapper.appendChild(programLikeContainer);
    const programLikeHeader = document.createElement('div');
    programLikeHeader.classList.add('header');
    programLikeContainer.appendChild(programLikeHeader);
    const headerTitle = document.createElement('span');
    headerTitle.classList.add('header-title');
    headerTitle.textContent = programLike.title;
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('btn', 'header-btn');
    closeBtn.textContent = 'X';
    closeBtn.onclick = () => programLikeWrapper.remove();
    programLikeHeader.append(headerTitle, closeBtn);
    if (content !== undefined) {
        const programLikeContent = document.createElement('div');
        programLikeContent.classList.add('program-like-content');
        programLikeContent.appendChild(content);
        programLikeContainer.appendChild(programLikeContent);
    }
    const programLikeFooter = document.createElement('footer');
    programLikeFooter.classList.add('btns');
    const programLikeFooterBtns = document.createElement('div');
    programLikeFooterBtns.classList.add('btns-wrapper');
    programLikeFooter.appendChild(programLikeFooterBtns);
    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('btn');
    cancelBtn.textContent = 'Close';
    cancelBtn.onclick = () => programLikeWrapper.remove();
    programLikeFooterBtns.appendChild(cancelBtn);
    programLikeContainer.appendChild(programLikeFooter);
    return programLikeWrapper;
}
function renderProgramLike(programLike, programLikeContent) {
    const programLikeWrapper = createProgramLikeWrapper(programLike, programLikeContent);
    return programLikeWrapper;
}
export default renderProgramLike;
