import type Pokemon from '../../types/Pokemon.js';

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

export default renderPokemon;

// export const createPokemonWrapper = (pokemonType, pokemonId, pokemonName, pokemonSprite) => {
//     const span = document.createElement('span')
//     span.setAttribute('data-js', String(Math.random() * 99999))
//     span.textContent = pokemonName

//     const i = document.createElement('i')
//     i.textContent = 'x'
//     i.setAttribute('data-pokemon-id-close', `${pokemonId}`)


//     i.addEventListener('click', event => {
//         const { pokemonIdClose } = event.target.dataset
//         document.querySelector(`[data-pokemon-id="${pokemonIdClose}"]`)?.remove()
//     })

//     divTitle.append(span, i)

//     const divPokemonLore = document.createElement('div')
//     divPokemonLore.setAttribute('data-js', 'pokemon-lore')
//     divPokemonWrapper.appendChild(divPokemonLore)

//     const pokemonImageWrapper = document.createElement('div')
//     pokemonImageWrapper.setAttribute('data-js', 'pokemon-image-wrapper')
//     divPokemonWrapper.appendChild(pokemonImageWrapper)

//     const pokemonImageBackground = document.createElement('span')
//     pokemonImageWrapper.append(pokemonImageBackground)

//     const pokemonImage = document.createElement('img')
//     pokemonImage.setAttribute('data-js', 'pokemon-image')
//     pokemonImage.setAttribute('src', pokemonSprite)
//     pokemonImageWrapper.appendChild(pokemonImage)
//     pokemonImage.setAttribute('alt', pokemonName)

//     const pokemonBottom = document.createElement('div')
//     pokemonBottom.setAttribute('data-js', 'pokemon-bottom')

//     const spanPokemonID = document.createElement('span')
//     spanPokemonID.textContent = pokemonId

//     const spanPokemonType = document.createElement('span')
//     spanPokemonType.textContent = pokemonType

//     pokemonBottom.append(spanPokemonID, spanPokemonType)

//     divPokemonWrapper.appendChild(pokemonBottom)

//     return divPokemonWrapper
// }