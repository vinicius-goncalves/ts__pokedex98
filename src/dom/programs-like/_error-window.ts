function createErrorWindowProgramLike(message: string): HTMLDivElement {

    const divWrapper = document.createElement('div');
    divWrapper.style.display = 'flex';
    divWrapper.style.gap = '.5rem';

    const img = document.createElement('img');
    img.src = '../dist/assets/images/windows-98-error-icon.png';
    img.width = 48;
    img.style.filter = 'drop-shadow(2.5px 2.5px #0b0b0b55)'

    const p = document.createElement('p')
    p.textContent = message;

    divWrapper.append(img, p);

    return divWrapper;
}

export default createErrorWindowProgramLike;