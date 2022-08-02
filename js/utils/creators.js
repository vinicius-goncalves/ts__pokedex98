export const createPokemonWrapper = (pokemonType, pokemonId, pokemonName, pokemonSprite) => {
    const divPokemonWrapper = document.createElement('div')
    divPokemonWrapper.setAttribute('data-js', 'pokemon-wrapper')
    divPokemonWrapper.setAttribute('data-type', `${pokemonType}`)
    divPokemonWrapper.setAttribute('data-pokemon-id', `${pokemonId}`)

    const divPokemonContent = document.createElement('div')
    divPokemonContent.setAttribute('data-js', 'pokemon-content')
    divPokemonWrapper.appendChild(divPokemonContent)

    const divTitle = document.createElement('div')
    divTitle.setAttribute('data-js', 'title')
    divPokemonContent.append(divTitle)

    const span = document.createElement('span')
    span.setAttribute('data-js', String(Math.random() * 99999))
    span.textContent = pokemonName
    
    const i = document.createElement('i')
    i.textContent = 'x'
    i.setAttribute('data-pokemon-id-close', `${pokemonId}`)

    
    i.addEventListener('click', event => {
        const { pokemonIdClose } = event.target.dataset
        document.querySelector(`[data-pokemon-id="${pokemonIdClose}"]`)?.remove()
    })

    divTitle.append(span, i)

    const divPokemonLore = document.createElement('div')
    divPokemonLore.setAttribute('data-js', 'pokemon-lore')
    divPokemonWrapper.appendChild(divPokemonLore)

    const pokemonImageWrapper = document.createElement('div')
    pokemonImageWrapper.setAttribute('data-js', 'pokemon-image-wrapper')
    divPokemonWrapper.appendChild(pokemonImageWrapper)

    const pokemonImageBackground = document.createElement('span')
    pokemonImageWrapper.append(pokemonImageBackground)

    const pokemonImage = document.createElement('img')
    pokemonImage.setAttribute('data-js', 'pokemon-image')
    pokemonImage.setAttribute('src', pokemonSprite)
    pokemonImageWrapper.appendChild(pokemonImage)
    pokemonImage.setAttribute('alt', pokemonName)

    const pokemonBottom = document.createElement('div')
    pokemonBottom.setAttribute('data-js', 'pokemon-bottom')

    const spanPokemonID = document.createElement('span')
    spanPokemonID.textContent = pokemonId

    const spanPokemonType = document.createElement('span')
    spanPokemonType.textContent = pokemonType

    pokemonBottom.append(spanPokemonID, spanPokemonType)

    divPokemonWrapper.appendChild(pokemonBottom)

    return divPokemonWrapper
}