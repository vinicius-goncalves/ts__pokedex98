import type Pokemon from '../../types/pokemons/Pokemon.js';

function createDOMPokemon(pokemon: Pokemon): HTMLDivElement {

    const pokemonWrapper: HTMLDivElement = document.createElement('div');
    pokemonWrapper.setAttribute('data-pokemon', 'wrapper');
    pokemonWrapper.setAttribute('data-pokemon-type', pokemon.type);
    pokemonWrapper.setAttribute('data-pokemon-id', ""+pokemon.id);
    pokemonWrapper.classList.add('pokemon-wrapper', 'window', 'window-shadow')

    const pokemonContent: HTMLDivElement = document.createElement('div');
    pokemonWrapper.appendChild(pokemonContent);
    pokemonContent.setAttribute('data-pokemon', 'content');

    const pokemonHeader: HTMLDivElement = document.createElement('div');
    pokemonContent.appendChild(pokemonHeader)
    pokemonHeader.setAttribute('data-pokemon', 'header');

        const pokemonTitle: HTMLSpanElement = document.createElement('span');
        pokemonHeader.appendChild(pokemonTitle);
        pokemonTitle.setAttribute('data-pokemon-header', 'title');
        pokemonTitle.textContent = pokemon.name;

        const closeBtn = document.createElement('button');
        pokemonHeader.appendChild(closeBtn);
        closeBtn.setAttribute('data-pokemon-header', 'close-btn')
        closeBtn.classList.add('btn')
        closeBtn.textContent = 'X'
        closeBtn.addEventListener('click', (): void => pokemonWrapper.remove());

    const spriteWrapper: HTMLElement = document.createElement('figure');
    pokemonContent.appendChild(spriteWrapper);
    spriteWrapper.setAttribute('data-pokemon', 'image-wrapper');

        const sprite: HTMLImageElement = document.createElement('img')
        spriteWrapper.appendChild(sprite);
        sprite.setAttribute('data-pokemon', 'image');
        sprite.setAttribute('src', pokemon.sprite);

    const pokemonDescription: HTMLElement = document.createElement('div');
    pokemonContent.appendChild(pokemonDescription)
    pokemonDescription.setAttribute('data-pokemon', 'description');

        const idBtnLike: HTMLSpanElement = document.createElement('span');
        idBtnLike.setAttribute('data-pokemon-description', 'id');
        idBtnLike.setAttribute('role', 'button');
        idBtnLike.classList.add('btn-like');
        idBtnLike.textContent = ""+pokemon.id;

        const typeBtnLike: HTMLSpanElement = document.createElement('span');
        typeBtnLike.setAttribute('data-pokemon-description', 'type');
        typeBtnLike.setAttribute('role', 'button');
        typeBtnLike.classList.add('btn-like');
        typeBtnLike.textContent = pokemon.type;

        pokemonDescription.append(idBtnLike, typeBtnLike);

    return pokemonWrapper;
}

function renderPokemon(pokemon: Pokemon): HTMLDivElement {
    const DOMPokemon = createDOMPokemon(pokemon);
    return DOMPokemon;
}

function renderPokemons(pokemons: Pokemon[]) {
    return pokemons.map(pokemon => renderPokemon(pokemon));
}

export { renderPokemon, renderPokemons };