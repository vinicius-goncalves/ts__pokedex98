function createDOMPokemon(pokemon) {
    const pokemonWrapper = document.createElement('div');
    pokemonWrapper.setAttribute('data-pokemon', 'wrapper');
    pokemonWrapper.setAttribute('data-pokemon-type', pokemon.type);
    pokemonWrapper.setAttribute('data-pokemon-id', "" + pokemon.id);
    pokemonWrapper.classList.add('pokemon-wrapper', 'window', 'window-shadow');
    const pokemonContent = document.createElement('div');
    pokemonWrapper.appendChild(pokemonContent);
    pokemonContent.setAttribute('data-pokemon', 'content');
    const pokemonHeader = document.createElement('div');
    pokemonContent.appendChild(pokemonHeader);
    pokemonHeader.setAttribute('data-pokemon', 'header');
    const pokemonTitle = document.createElement('span');
    pokemonHeader.appendChild(pokemonTitle);
    pokemonTitle.setAttribute('data-pokemon-header', 'title');
    pokemonTitle.textContent = pokemon.name;
    const closeBtn = document.createElement('button');
    pokemonHeader.appendChild(closeBtn);
    closeBtn.setAttribute('data-pokemon-header', 'close-btn');
    closeBtn.classList.add('btn');
    closeBtn.textContent = 'X';
    closeBtn.addEventListener('click', () => pokemonWrapper.remove());
    const spriteWrapper = document.createElement('figure');
    pokemonContent.appendChild(spriteWrapper);
    spriteWrapper.setAttribute('data-pokemon', 'image-wrapper');
    const sprite = document.createElement('img');
    spriteWrapper.appendChild(sprite);
    sprite.setAttribute('data-pokemon', 'image');
    sprite.setAttribute('src', pokemon.sprite);
    const pokemonDescription = document.createElement('div');
    pokemonContent.appendChild(pokemonDescription);
    pokemonDescription.setAttribute('data-pokemon', 'description');
    const idBtnLike = document.createElement('span');
    idBtnLike.setAttribute('data-pokemon-description', 'id');
    idBtnLike.setAttribute('role', 'button');
    idBtnLike.classList.add('btn-like');
    idBtnLike.textContent = "" + pokemon.id;
    const typeBtnLike = document.createElement('span');
    typeBtnLike.setAttribute('data-pokemon-description', 'type');
    typeBtnLike.setAttribute('role', 'button');
    typeBtnLike.classList.add('btn-like');
    typeBtnLike.textContent = pokemon.type;
    pokemonDescription.append(idBtnLike, typeBtnLike);
    return pokemonWrapper;
}
function renderPokemon(pokemon) {
    const DOMPokemon = createDOMPokemon(pokemon);
    return DOMPokemon;
}
function renderPokemons(pokemons) {
    return pokemons.map(pokemon => renderPokemon(pokemon));
}
export { renderPokemon, renderPokemons };
