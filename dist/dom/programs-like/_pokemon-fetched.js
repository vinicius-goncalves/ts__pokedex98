function createPokemonFetchedProgramLike(pokemon) {
    const divWrapper = document.createElement('div');
    const spriteWrapper = document.createElement('figure');
    spriteWrapper.setAttribute('data-pokemon', 'image-wrapper');
    divWrapper.appendChild(spriteWrapper);
    const sprite = document.createElement('img');
    spriteWrapper.appendChild(sprite);
    sprite.setAttribute('data-pokemon', 'image');
    sprite.setAttribute('src', pokemon.sprite);
    const pokemonDescription = document.createElement('div');
    divWrapper.appendChild(pokemonDescription);
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
    return divWrapper;
}
export default createPokemonFetchedProgramLike;
