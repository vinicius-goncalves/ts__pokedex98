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


const loadPokemons = async () => {
    const pokemonsSettled = await pokemonsResolved().then(data => Promise.allSettled(data))
    
    const pokemonsDiv = pokemonsSettled.map((pokemon, index) => {
        const { ['value']: pokemonValue } = pokemon
        const { name } = pokemonValue

        const pokemonType = pokemonValue.types.reduce((acc, item) => {
            acc.push(`${item.type.name}`)
            return acc
        }, []).join(" / ")
        
        const divPokemonWrapper = document.createElement('div')
        divPokemonWrapper.setAttribute('data-js', 'pokemon-wrapper')

        const divPokemonContent = document.createElement('div')
        divPokemonContent.setAttribute('data-js', 'pokemon-content')
        divPokemonWrapper.appendChild(divPokemonContent)

        const divTitle = document.createElement('div')
        divTitle.setAttribute('data-js', 'title')
        divPokemonContent.append(divTitle)

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
            <div data-js="pokemon-bottom">
                <span>Lorem ipsum dolor sit.</span>
                <span>Lorem ipsum dolor sit amet.</span>
            </div>
        </div> */}
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
        pokemonImage.setAttribute('data-js', 'pokemon-image')
        divPokemonLore.appendChild(pokemonImage)

        const pokemonBottom = document.createElement('div')
        pokemonBottom.setAttribute('data-js', 'pokemon-bottom')

        const spanPkemonID = document.createElement('span')
        spanPkemonID.textContent = 'ID'

        const spanPokemonType = document.createElement('span')
        spanPokemonType.textContent = pokemonType

        pokemonBottom.append(spanPkemonID, spanPokemonType)

        divPokemonWrapper.appendChild(pokemonBottom)

        return divPokemonWrapper
    })

    pokemonsDiv.forEach(pokemonDiv => pokemons.append(pokemonDiv))
}

loadPokemons()

