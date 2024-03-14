import settings from '../../app/settings.js';
import loadPokemons from '../pokemons/pokemons-loader.js';
import ToolsManager from '../../classes/ToolsManager.js';
import randomFetch from './_random-fetch.js';
const fetchPokemonsBtn = document.querySelector('[data-btn="fetch-pokemons"]');
const smartFetchTool = new ToolsManager('smart-fetch');
const randomFetchTool = new ToolsManager('random-fetch');
function toggleFetchPokemonsBtnVisibility() {
    fetchPokemonsBtn.style.setProperty('display', smartFetchTool.isChecked() ? 'none' : 'inline-block');
}
function getLastPokemonIntoDOM() {
    const pokemons = document.querySelector('[data-pokemons="content"]');
    return [...pokemons.children].reverse()[0];
}
async function loadMorePokemons() {
    settings.pokemonsFetch.fromId = settings.pokemonsFetch.toId + 1;
    settings.pokemonsFetch.toId = settings.pokemonsFetch.toId + 15;
    await loadPokemons(settings.pokemonsFetch.fromId, settings.pokemonsFetch.toId);
}
const pokemonObserver = new IntersectionObserver(async ([intersection]) => {
    if (!intersection || !intersection.isIntersecting) {
        return;
    }
    if (!randomFetchTool.isChecked()) {
        await loadMorePokemons();
    }
    else {
        await randomFetch();
    }
    pokemonObserver.disconnect();
    pokemonObserver.observe(getLastPokemonIntoDOM());
}, { rootMargin: '300px' });
function handleWithIntersectionObserver() {
    toggleFetchPokemonsBtnVisibility();
    if (!smartFetchTool.isChecked()) {
        return pokemonObserver.disconnect();
    }
    pokemonObserver.observe(getLastPokemonIntoDOM());
}
export default handleWithIntersectionObserver;
