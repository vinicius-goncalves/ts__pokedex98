import settings from '../../app/settings.js';
import loadPokemons from '../pokemons/pokemons-loader.js';
import ToolsManager from './Tools-Manager.js';
import randomFetch from './_random-fetch.js';

const fetchPokemonsBtn = document.querySelector('[data-btn="fetch-pokemons"]') as HTMLButtonElement;

const smartFetchTool = new ToolsManager('smart-fetch');
const randomFetchTool = new ToolsManager('random-fetch');

function toggleFetchPokemonsBtnVisibility(): void {
    fetchPokemonsBtn.style.setProperty('display', smartFetchTool.isChecked() ? 'none' : 'inline-block');
}

function getLastPokemonIntoDOM(): HTMLElement {

    const pokemons = <HTMLDivElement>document.querySelector('[data-pokemons="content"]');
    return <HTMLElement>[...pokemons.children].reverse()[0];
}

async function loadMorePokemons(): Promise<void> {

    settings.pokemonsFetch.fromId = settings.pokemonsFetch.toId + 1;
    settings.pokemonsFetch.toId = settings.pokemonsFetch.toId + 15;

    await loadPokemons(settings.pokemonsFetch.fromId, settings.pokemonsFetch.toId);
}

const pokemonObserver = new IntersectionObserver(async ([ intersection ]): Promise<void> => {

    if(!intersection || !intersection.isIntersecting) {
        return
    }

    if(!randomFetchTool.isChecked()) {
        await loadMorePokemons();
    } else {
        await randomFetch();
    }

    pokemonObserver.disconnect();
    pokemonObserver.observe(getLastPokemonIntoDOM());

}, { rootMargin: '300px' });

function handleWithIntersectionObserver(): void {

    toggleFetchPokemonsBtnVisibility();

    if(!smartFetchTool.isChecked()) {
        return pokemonObserver.disconnect()
    }

    pokemonObserver.observe(getLastPokemonIntoDOM());
}

export default handleWithIntersectionObserver;