import settings from '../../app/settings.js';
import { fetchPokemon, fetchPokemons } from '../../methods/pokemons/fetch-pokemons.js';
import { sanitizePokemons } from '../../methods/pokemons/sanitize-pokemon-fetch.js';
import { renderPokemons } from '../pokemons/pokemon-renderer.js';

const maxLength: number = Math.floor((settings.pokemonsFetch.toId - settings.pokemonsFetch.fromId) + 1);
const pokemonsContent = document.querySelector('[data-pokemons="content"]') as HTMLDivElement;

const fetchedPokemonsId = Array
    .from({ length: maxLength })
    .fill(undefined)
    .map((_, index) => index + 1);

function containsIds(...ids: number[]): boolean {
    return ids.some((id: number) => fetchedPokemonsId.includes(id));
}

function randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createArray<T>(length: number, mapFn: (value: T, index: number) => T): T[] {
    return Array.from({ length }, (v, i): T => mapFn(<T>v, i));
}

function generateRandomIds(): number[]  {

    let randomIds: number[] = [];

    do {

        randomIds = createArray<number>(maxLength, () => randomBetween(1, 1025));

    } while(containsIds(...randomIds));

    fetchedPokemonsId.push(...randomIds);
    return randomIds;
}

async function randomSearch() {

    const numbersGenerated = generateRandomIds();
    const pokemons = await Promise.all(numbersGenerated.map(randomId => fetchPokemon(randomId)));
    const sanitizedPokemons = sanitizePokemons(pokemons as Response[]);

    const renderedPokemons = renderPokemons(sanitizedPokemons);
    renderedPokemons.forEach(p => pokemonsContent.appendChild(p));
}

export default randomSearch;