function createSearchPokemonProgramLike(): HTMLDivElement {

    const programLikeSearch = document.createElement('div');
    programLikeSearch.classList.add('program-like-search');

        const searchTextboxLabel = document.createElement('label');
        searchTextboxLabel.textContent = "I'm looking for: "
        programLikeSearch.appendChild(searchTextboxLabel);

        const searchTextboxInput = document.createElement('input');
        searchTextboxInput.classList.add('textbox');
        searchTextboxInput.type = 'text';
        searchTextboxLabel.appendChild(searchTextboxInput);

    return programLikeSearch;
}

export default createSearchPokemonProgramLike;