import { renderPokemons } from './pokemon-renderer.js';
import { sanitizePokemons } from '../methods/sanitize-pokemon-fetch.js';
import { fetchPokemons } from '../methods/fetch-pokemons.js';
import settings from '../app/settings.js';
const pokemonsContent = document.querySelector('[data-pokemons="content"]');
async function fetchAndSanitizePokemons(fromId, toId) {
    const pokemons = await fetchPokemons(fromId, toId);
    const sanitizedPokemons = sanitizePokemons(pokemons);
    return sanitizedPokemons;
}
async function appendPokemons(loadedPokemons) {
    pokemonsContent.append(...loadedPokemons);
}
async function loadPokemons(fromId, toId) {
    const pokemons = await fetchAndSanitizePokemons(fromId, toId);
    const renderedPokemons = renderPokemons(pokemons);
    await appendPokemons(renderedPokemons);
    return renderedPokemons;
}
loadPokemons(settings.pokemonsFetch.fromId, settings.pokemonsFetch.toId);
export default loadPokemons;
