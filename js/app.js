const pokemons = document.querySelector('[data-js="pokemons"]')

const pokemonsResolved = () => {

    return new Promise((resolve, _) => {
        const pokemonsFulFilled = Array(20).fill('').map(async (item, index) => {
            const pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon/${(index + 1)}`)
            const response = await pokemons.json()
            return response
        })
        resolve(pokemonsFulFilled)
    })
}

{/* <div data-js="pokemon-wrapper">
            <div data-js="pokemon-content">
                <div data-js="title">
                    <span>Pokemon Name</span>
                    <i>x</i>
                </div>
            </div>
            <div data-js="pokemon-lore">
                <img data-js="pokemon-image">
            </div>
        </div> */}

const loadPokemons = async () => {
    const pokemonsSettled = await pokemonsResolved().then(data => Promise.allSettled(data))
    
    const pokemonsDiv = pokemonsSettled.map(pokemon => {
        const { ['value']: pokemonValue } = pokemon
        const { name } = pokemonValue
        
        const divPokemonWrapper = document.createElement('div')
        divPokemonWrapper.setAttribute('data-js', 'pokemon-wrapper')

        const divPokemonContent = document.createElement('div')
        divPokemonContent.setAttribute('data-js', 'pokemon-content')
        divPokemonWrapper.appendChild(divPokemonContent)

        const divTitle = document.createElement('div')
        divTitle.setAttribute('data-js', 'title')
        divPokemonContent.append(divTitle)

        const span = document.createElement('span')
        span.setAttribute('data-js', String(Math.random() * 99999))
        span.textContent = name
        
        const i = document.createElement('i')
        i.textContent = 'x'

        divTitle.append(span, i)

        const divPokemonLore = document.createElement('div')
        divPokemonLore.setAttribute('data-js', 'pokemon-lore')
        divPokemonWrapper.appendChild(divPokemonLore)

        const pokemonImage = document.createElement('img')
        pokemonImage.setAttribute('pokemon-image', String(Math.random() * 99999))
        divPokemonWrapper.appendChild(pokemonImage)

        return divPokemonWrapper
    })

    pokemonsDiv.forEach(pokemonDiv => pokemons.append(pokemonDiv))
}

loadPokemons()

