const pokemons = document.querySelector('[data-js="pokemons"]')
const optionsCheckbox = document.querySelectorAll('[data-input="checkbox"]')

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
        
        const divPokemonWrapper = document.createElement('div')
        divPokemonWrapper.setAttribute('data-js', 'pokemon-wrapper')
        divPokemonWrapper.setAttribute('data-type', `${pokemonValue.types[0].type.name}`)

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

        const pokemonImageWrapper = document.createElement('div')
        pokemonImageWrapper.setAttribute('data-js', 'pokemon-image-wrapper')
        divPokemonWrapper.appendChild(pokemonImageWrapper)

        const pokemonImageBackground = document.createElement('span')
        pokemonImageWrapper.append(pokemonImageBackground)

        const pokemonImage = document.createElement('img')
        pokemonImage.setAttribute('data-js', 'pokemon-image')
        pokemonImage.setAttribute('src', pokemonValue.sprites.front_default)
        pokemonImageWrapper.appendChild(pokemonImage)


        const pokemonBottom = document.createElement('div')
        pokemonBottom.setAttribute('data-js', 'pokemon-bottom')

        const spanPkemonID = document.createElement('span')
        spanPkemonID.textContent = 'ID'

        const spanPokemonType = document.createElement('span')
        spanPokemonType.textContent = pokemonValue.types[0].type.name

        pokemonBottom.append(spanPkemonID, spanPokemonType)

        divPokemonWrapper.appendChild(pokemonBottom)

        return divPokemonWrapper
    })

    pokemonsDiv.forEach(pokemonDiv => pokemons.append(pokemonDiv))
}

loadPokemons()

optionsCheckbox.forEach(checkbox => {
    checkbox.addEventListener('click', event => {

        const { checked } = event.target

        switch(checked) {
            case true:

                const div = document.createElement('div')
                div.setAttribute('data-wrapper-type', event.target.dataset.option)
                document.querySelector('[data-js="pokemons-filtered"]').append(div)

                Array.prototype.forEach.call([...pokemons.children], (pokemon) => {
                    if(pokemon.dataset.type === undefined) {
                        return
                    }

                    if(pokemon.dataset.type.includes(`${event.target.dataset.option}`)) {
                        pokemon.removeAttribute('style')
                        div.append(pokemon)
                    }else {
                        pokemon.style.display = 'none'
                    }
                })

                break
            case false:
                const children = [...document.querySelector(`[data-wrapper-type="${event.target.dataset.option}"]`).children]

                children.forEach(item => {
                    pokemons.append(item)
                })

                document.querySelector(`[data-wrapper-type="${event.target.dataset.option}"]`)?.remove()

                const x = [...pokemons.children]
                x.forEach(pokemon => {
                    // console.log(event.target.dataset.option)
                    console.log(pokemon.dataset.type)
                    if(!pokemon.dataset.type.includes(event.target.dataset.option)) {
                        pokemon.removeAttribute('style')
                    }
                })

                break
            default:
                break
        }
    })
})