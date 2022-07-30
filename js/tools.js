const pokemonsMainList = document.querySelector('[data-js="pokemons"]')
const fieldsetWrapper = document.querySelector('[data-js="fieldset-wrapper"]')

const setupOptionsCheckbox = () => {
    const optionsCheckbox = document.querySelectorAll('[data-input="checkbox"]')

    Array.prototype.forEach.call(optionsCheckbox, (checkboxInput) => {
        checkboxInput.addEventListener('click', event => {
    
            const { checked } = event.target
            const targetDatasetClicked = event.target.dataset
            const { option } = targetDatasetClicked

            switch(checked) {
                case true:
    
                    const div = document.createElement('div')
                    div.setAttribute('data-wrapper-type', option)

                    document.querySelector('[data-js="pokemons-filtered"]').append(div)
    
                    Array.prototype.forEach.call([...pokemonsMainList.children], (pokemon, index) => {
                        if(pokemon.dataset.type === undefined) {
                            return
                        }
    
                        switch(pokemon.dataset.type.includes(`${option}`)) {
                            case true:
                                pokemon.removeAttribute('style')
                                div.insertAdjacentElement('afterbegin', pokemon)
                                break
                            case false:
                                pokemon.style.display = 'none'
                                break
                        }
                    })
                    break
                    
                case false:
                    
                    const pokemonsWrappersTypes = 
                        [...document.querySelector(`[data-wrapper-type="${option}"]`).children]

                    pokemonsWrappersTypes.forEach(pokemonFiltred => 
                            pokemonsMainList.insertAdjacentElement('afterbegin', pokemonFiltred))
    
                    document.querySelector(`[data-wrapper-type="${option}"]`)?.remove()
    
                    Array.prototype.forEach.call([...pokemonsMainList.children], pokemon => {
                        
                        if(!pokemon.dataset.type.includes(option)) {
                            pokemon.removeAttribute('style')
                        }
                    })
                    
                    break
                default:
                    break
            }
        })  
    })
}

export const handleTools = (event, handlePokemonsTypes) => {
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
            setupOptionsCheckbox()

        })
    }else {
       document.querySelector(`[data-js="${event.target.dataset.target}"]`)?.remove()

    }
}
