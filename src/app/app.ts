import('../dom/programs-like/draggable-programs-like.js');

import loadPokemons from '../dom/pokemons/pokemons-loader.js';
import ToolsManager from '../dom/tools/Tools-Manager.js';
import randomSearch from '../dom/tools/_random-fetch.js';
import settings from './settings.js';

const fetchPokemonsBtn = <HTMLButtonElement>document.querySelector('[data-btn="fetch-pokemons"]');
const randomFetchTool = new ToolsManager('random-fetch');

function loadMorePokemons() {

    settings.pokemonsFetch.fromId = settings.pokemonsFetch.toId + 1;
    settings.pokemonsFetch.toId = settings.pokemonsFetch.toId + 15;

    loadPokemons(settings.pokemonsFetch.fromId, settings.pokemonsFetch.toId);
}

fetchPokemonsBtn.addEventListener('click', (): void => {

    if(randomFetchTool.isChecked()) {
        randomSearch();
        return;
    }

    loadMorePokemons();
});