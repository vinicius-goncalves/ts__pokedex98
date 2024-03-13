import settings from '../../app/settings.js';
import loadPokemons from '../pokemons-loader.js';
import ToolsManager from './Tools-Manager.js';
const fetchPokemonsBtn = document.querySelector('[data-btn="fetch-pokemons"]');
const smartFetchTool = new ToolsManager('smart-fetch');
function toggleFetchPokemonsBtnVisibility() {
    fetchPokemonsBtn.style.setProperty('display', smartFetchTool.isChecked() ? 'none' : 'inline-block');
}
function getLastPokemonIntoDOM() {
    const pokemons = document.querySelector('[data-pokemons="content"]');
    return [...pokemons.children].reverse()[0];
}
const pokemonObserver = new IntersectionObserver(async ([intersection]) => {
    if (!intersection || !intersection.isIntersecting) {
        return;
    }
    settings.pokemonsFetch.fromId = settings.pokemonsFetch.toId + 1;
    settings.pokemonsFetch.toId = settings.pokemonsFetch.toId + 15;
    await loadPokemons(settings.pokemonsFetch.fromId, settings.pokemonsFetch.toId);
    pokemonObserver.disconnect();
    pokemonObserver.observe(getLastPokemonIntoDOM());
}, { rootMargin: '3px' });
function handleWithIntersectionObserver() {
    toggleFetchPokemonsBtnVisibility();
    if (!smartFetchTool.isChecked()) {
        return pokemonObserver.disconnect();
    }
    pokemonObserver.observe(getLastPokemonIntoDOM());
}
export default handleWithIntersectionObserver;
