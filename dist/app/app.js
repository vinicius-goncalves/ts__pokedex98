"use strict";
import('./dom/pokemons-loader.js');
// import('../methods/fetch-pokemons.js');
// const pokemonsMainList = document.querySelector('[data-js="pokemons"]')
// const tools = document.querySelector('[data-js="tools"]')
// const morePokemons = document.querySelector('[data-button="more-pokemons"]')
// const fetchPokemons = (fromPokemons, toPokemons) => {
//     return new Promise(resolve => {
//         const totalResults = ((toPokemons + 1) - fromPokemons)
//         const pokemonsFulfilled = Array(totalResults).fill('').map(async (_, index) => {
//             const pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon/${(fromPokemons + index)}`)
//             const response = await pokemons.json()
//             return response
//         })
//         resolve(pokemonsFulfilled)
//     })
// }
// const loadPokemons = async (fromPokemons, toPokemons) => {
//     const pokemonsSettled = await fetchPokemons(fromPokemons, toPokemons)
//     const pokemons = await Promise.allSettled(pokemonsSettled)
//     const pokemonsDiv = pokemons.map((pokemonSettledStatus) => {
//         const { ['value']: pokemon } = pokemonSettledStatus
//         const { name, id } = pokemon
//         const pokemonWrapper = createPokemonWrapper(pokemon.types[0].type.name, id, name, pokemon.sprites.front_default)
//         return pokemonWrapper
//     })
//     pokemonsDiv.forEach(pokemonDiv => pokemonsMainList.append(pokemonDiv))
// }
// const handlePokemonsTypes = () => {
//     const promise = new Promise(async resolve => {
//         const pokemons = await fetchPokemons(pokemonResults.fromPokemons, pokemonResults
//             .toPokemons).then(data => Promise.all(data))
//         const pokemonsTypes = pokemons.map(item => {
//             return item.types[0].type.name
//         })
//         const filterTypes = pokemonsTypes.filter((item, index, self) => self.indexOf(item) === index)
//         resolve(filterTypes)
//     })
//     return promise
// }
// loadPokemons(pokemonResults.fromPokemons, pokemonResults.toPokemons)
// tools.addEventListener('click', event => {
//     handleTools(event, handlePokemonsTypes)
// })
// morePokemons.addEventListener('click', () => {
//     pokemonResults.setResult('fromPokemons', pokemonResults.fromPokemons + 20);
//     pokemonResults.setResult('toPokemons', pokemonResults.toPokemons + 20);
//     loadPokemons(pokemonResults.fromPokemons, pokemonResults.toPokemons);
// });
