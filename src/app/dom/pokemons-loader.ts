import type Pokemon from '../../types/Pokemon.js';

import renderPokemon from './pokemon-renderer.js';
import { sanitizePokemons } from '../../methods/sanitize-pokemon-fetch.js';
import { fetchPokemons } from '../../methods/fetch-pokemons.js';

const pokemonsContent = document.querySelector('[data-pokemons="content"]') as HTMLDivElement;

async function handleWithPokemonsRequestsAndSanitization(): Promise<Pokemon[]> {

    const pokemons = await fetchPokemons(1, 10);
    const sanitizedPokemons = sanitizePokemons(pokemons);

    return sanitizedPokemons;
}

async function loadPokemons() {

    const pokemons = await handleWithPokemonsRequestsAndSanitization();
    const pokemonsRendered = pokemons.map(pokemon => renderPokemon(pokemon));

    return pokemonsRendered;
}

const loadedPokemons = await loadPokemons();
pokemonsContent.append(...loadedPokemons);