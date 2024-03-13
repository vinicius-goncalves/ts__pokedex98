import('../dom/programs-like/draggable-programs-like.js');
import loadPokemons from '../dom/pokemons/pokemons-loader.js';
import randomSearch from '../dom/tools/_random-fetch.js';
import settings from './settings.js';
const fetchPokemonsBtn = document.querySelector('[data-btn="fetch-pokemons"]');
function loadMorePokemons() {
    settings.pokemonsFetch.fromId = settings.pokemonsFetch.toId + 1;
    settings.pokemonsFetch.toId = settings.pokemonsFetch.toId + 15;
    loadPokemons(settings.pokemonsFetch.fromId, settings.pokemonsFetch.toId);
}
fetchPokemonsBtn.addEventListener('click', () => {
    if (document.getElementById('random-fetch')?.checked) {
        randomSearch();
        return;
    }
    loadMorePokemons();
});
