import { pokemonResults } from './object-utils.js'

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
    console.log(pokemonsSettled)

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

        const spanPkemonID = document.createElement('span')
        spanPkemonID.textContent = pokemon.id

        const spanPokemonType = document.createElement('span')
        spanPokemonType.textContent = pokemon.types[0].type.name

        pokemonBottom.append(spanPkemonID, spanPokemonType)

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

loadPokemons(pokemonResults.fromPokemons, pokemonResults.toPokemons).then(() => {
    const optionsCheckbox = document.querySelectorAll('[data-input="checkbox"]')

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
})

const options = document.querySelector('[data-js="options"]')
const fieldsetWrapper = document.querySelector('[data-js="fieldset-wrapper"]')

tools.addEventListener('click', event => {
    // <fieldset data-js="filters-wrapper" style="display: none;">
//     <legend>Filters</legend>
//     <ul data-js="options"></ul>
// </fieldset>
    if(event.target.checked) {

        const fieldSet = document.createElement('fieldset')
        fieldSet.setAttribute('data-js', `${event.target.dataset.tool}-wrapper`)
        
        const legend = document.createElement('legend')
        legend.textContent = 'Filters'
        fieldSet.append(legend)

        const ul = document.createElement('ul')
        ul.setAttribute('data-js', 'options')
        fieldSet.append(ul)

        fieldsetWrapper.append(fieldSet)

        handlePokemonsTypes().then(pokemonsTypes => {
            const pokemonsTypesLi = pokemonsTypes.map(pokemonType => {
                
                const li = document.createElement('li')
        
                const label = document.createElement('label')
                label.setAttribute('data-option', pokemonType)
                label.setAttribute('data-js', 'options-label')
                li.append(label)
        
                const input = document.createElement('input')
                input.setAttribute('type', 'checkbox')
                input.setAttribute('data-option', pokemonType)
                input.setAttribute('data-input', 'checkbox')
                label.append(input)
        
                const a = document.createElement('a')
                a.textContent = pokemonType.replace(pokemonType.charAt(0), pokemonType.charAt(0).toUpperCase())
                label.append(a)
        
                return li
        
            })

            pokemonsTypesLi.forEach(li => ul.append(li))

        })
    }else {
       document.querySelector(`[data-js="${event.target.dataset.target}"]`).remove()

    }
})

morePokemons.addEventListener('click', () => {

    pokemonResults.setResult('fromPokemons', pokemonResults.fromPokemons + 20)
    pokemonResults.setResult('toPokemons', pokemonResults.toPokemons + 20)
    
    loadPokemons(pokemonResults.fromPokemons, pokemonResults.toPokemons)

})