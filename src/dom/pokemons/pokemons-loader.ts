import type Pokemon from '../../types/pokemons/Pokemon.js';

import { renderPokemons } from './pokemon-renderer.js';
import { sanitizePokemons } from '../../methods/pokemons/sanitize-pokemon-fetch.js';
import { fetchPokemons } from '../../methods/pokemons/fetch-pokemons.js';
import settings from '../../app/settings.js';

const pokemonsContent = document.querySelector('[data-pokemons="content"]') as HTMLDivElement;

async function fetchAndSanitizePokemons(fromId: number, toId: number): Promise<Pokemon[]> {

    const pokemons = await fetchPokemons(fromId, toId);
    const sanitizedPokemons: Pokemon[] = sanitizePokemons(pokemons);

    return sanitizedPokemons;
}

async function appendPokemons(loadedPokemons: HTMLDivElement[]): Promise<void> {
    pokemonsContent.append(...loadedPokemons);
}

async function loadPokemons(fromId: number, toId: number): Promise<HTMLDivElement[]> {

    const pokemons: Pokemon[] = await fetchAndSanitizePokemons(fromId, toId);
    const renderedPokemons: HTMLDivElement[] = renderPokemons(pokemons);

    await appendPokemons(renderedPokemons);

    return renderedPokemons;
}

loadPokemons(settings.pokemonsFetch.fromId, settings.pokemonsFetch.toId);

export default loadPokemons;