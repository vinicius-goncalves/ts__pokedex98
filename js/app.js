import { pokemonResults } from './object-utils.js'
import { handleTools } from './tools.js'

const pokemons = document.querySelector('[data-js="pokemons"]')
const tools = document.querySelector('[data-js="tools"]')

const morePokemons = document.querySelector('[data-button="more-pokemons"]')

const fetchPokemons = (fromPokemons, toPokemons) => {
    
    return new Promise(resolve => {

        const totalResults = ((toPokemons + 1) - fromPokemons)
        
        const pokemonsFulfilled = Array(totalResults).fill('').map(async (_, index) => {
            const pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon/${(fromPokemons + index)}`)
            const response = await pokemons.json()
            return response
        })

        resolve(pokemonsFulfilled)

    })
}

const loadPokemons = async (fromPokemons, toPokemons) => {

    const pokemonsSettled = await fetchPokemons(fromPokemons, toPokemons).then(pokemon => Promise.all(pokemon))

    const pokemonsDiv = pokemonsSettled.map(pokemon => {
        const { name } = pokemon

        const divPokemonWrapper = document.createElement('div')
        divPokemonWrapper.setAttribute('data-js', 'pokemon-wrapper')
        divPokemonWrapper.setAttribute('data-type', `${pokemon.types[0].type.name}`)

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
        pokemonImage.setAttribute('src', pokemon.sprites.front_default)
        pokemonImageWrapper.appendChild(pokemonImage)
        pokemonImage.setAttribute('alt', name)

        const pokemonBottom = document.createElement('div')
        pokemonBottom.setAttribute('data-js', 'pokemon-bottom')

        const spanPokemonID = document.createElement('span')
        spanPokemonID.textContent = pokemon.id

        const spanPokemonType = document.createElement('span')
        spanPokemonType.textContent = pokemon.types[0].type.name

        pokemonBottom.append(spanPokemonID, spanPokemonType)

        divPokemonWrapper.appendChild(pokemonBottom)

        return divPokemonWrapper
    })

    pokemonsDiv.forEach(pokemonDiv => pokemons.append(pokemonDiv))
        
}

const handlePokemonsTypes = () => {
    const promise = new Promise(async resolve => {
        const pokemons = await fetchPokemons(pokemonResults.fromPokemons, pokemonResults
            .toPokemons).then(data => Promise.all(data))
        const pokemonsTypes = pokemons.map(item => {
            return item.types[0].type.name
        })

        const filterTypes = pokemonsTypes.filter((item, index, self) => self.indexOf(item) === index)
        resolve(filterTypes)

    })

    return promise
}

loadPokemons(pokemonResults.fromPokemons, pokemonResults.toPokemons)
    
const options = document.querySelector('[data-js="options"]')

tools.addEventListener('click', event => {
    handleTools(event, handlePokemonsTypes)
})

morePokemons.addEventListener('click', () => {

    pokemonResults.setResult('fromPokemons', pokemonResults.fromPokemons + 20)
    pokemonResults.setResult('toPokemons', pokemonResults.toPokemons + 20)
    
    loadPokemons(pokemonResults.fromPokemons, pokemonResults.toPokemons)

})