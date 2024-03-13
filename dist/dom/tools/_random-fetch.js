import settings from '../../app/settings.js';
import { fetchPokemon } from '../../methods/pokemons/fetch-pokemons.js';
import { sanitizePokemons } from '../../methods/pokemons/sanitize-pokemon-fetch.js';
import { renderPokemons } from '../pokemons/pokemon-renderer.js';
const maxLength = Math.floor((settings.pokemonsFetch.toId - settings.pokemonsFetch.fromId) + 1);
const pokemonsContent = document.querySelector('[data-pokemons="content"]');
const fetchedPokemonsId = Array
    .from({ length: maxLength })
    .fill(undefined)
    .map((_, index) => index + 1);
function containsIds(...ids) {
    return ids.some((id) => fetchedPokemonsId.includes(id));
}
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function createArray(length, mapFn) {
    return Array.from({ length }, (v, i) => mapFn(v, i));
}
function generateRandomIds() {
    let randomIds = [];
    do {
        randomIds = createArray(maxLength, () => randomBetween(1, 1025));
    } while (containsIds(...randomIds));
    fetchedPokemonsId.push(...randomIds);
    return randomIds;
}
async function randomSearch() {
    const numbersGenerated = generateRandomIds();
    const pokemons = await Promise.all(numbersGenerated.map(randomId => fetchPokemon(randomId)));
    const sanitizedPokemons = sanitizePokemons(pokemons);
    const renderedPokemons = renderPokemons(sanitizedPokemons);
    renderedPokemons.forEach(p => pokemonsContent.appendChild(p));
}
export default randomSearch;
