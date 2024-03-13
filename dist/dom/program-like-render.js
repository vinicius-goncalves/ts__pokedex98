// <div data-modal="search-by-name-or-id" class="window window-shadow program-like" style="position: absolute; z-index: 1;">
//             <div data-modal-content="search-by-name-or-id" class="program-like-container">
//                 <div class="header">
//                     <span class="header-title">albblaldBLDAGASD3</span>
//                     <button class="btn header-btn">X</button>
//                 </div>
//                 <div data-modal-template="slot">
//                     <div class="program-like-main" style="display: flex; flex-direction: column; gap: 5px;">
//                         <p>
//                             <label>I'm looking for: <input type="text" class="textbox"></label>
//                         </p>
//                         <p>
//                             <label>I'm looking for: <input type="text" class="textbox"></label>
//                         </p>
//                     </div>
//                 </div>
//                 <footer class="btns">
//                     <div class="btns-wrapper">
//                         <button class="btn">Search</button>
//                         <button class="btn">Cancel</button>
//                     </div>
//                 </footer>
//             </div>
//         </div>
function createProgramLikeWrapper(programLike) {
    const programLikeWrapper = document.createElement('div');
    programLikeWrapper.setAttribute('data-program-like', programLike.id);
    programLikeWrapper.classList.add('window', 'window-shadow', 'program-like');
    programLikeWrapper.style.position = 'absolute';
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
    programLikeHeader.append(headerTitle, closeBtn);
    const programLikeFooter = document.createElement('footer');
    programLikeFooter.classList.add('btns');
    const programLikeFooterBtns = document.createElement('div');
    programLikeFooterBtns.classList.add('btns-wrapper');
    programLikeFooter.appendChild(programLikeFooterBtns);
    return programLikeWrapper;
}
function renderProgramLike(programLike) {
    const programLikeWrapper = createProgramLikeWrapper(programLike);
    return programLikeWrapper;
}
export default renderProgramLike;
