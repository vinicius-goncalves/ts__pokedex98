import type PokemonURL from '../types/PokemonURL.js';
import type PokemonFetchResult from '../types/PokemonFetchResult.js';

function buildPokemonAPIURL<T extends number | string>(pokemonId: T): PokemonURL<T> {
    return `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
}

function buildPokemonsAPIRequests(fromId: number, toId: number): PokemonURL<number>[] {

    const requestsLen: number = toId - fromId + 1;

    const pokemonsRequestsUrls: PokemonURL<number>[] = Array.from({ length: requestsLen }, (_, index: number): PokemonURL<number> => {

        const currPokemonId: number = fromId + index;
        const urlBuilt: PokemonURL<number> = buildPokemonAPIURL(currPokemonId);

        return urlBuilt;

    });

    return pokemonsRequestsUrls
}

async function fetchPokemons(fromId: number, toId: number): Promise<any[]> {

    try {

        const pokemonsRequestsUrls = buildPokemonsAPIRequests(fromId, toId);
        const pokemonsRequests = pokemonsRequestsUrls.map((pokemonUrl: string) => fetch(pokemonUrl));

        const pokemonsResponses: Response[] = await Promise.all(pokemonsRequests);
        const pokemonsData = await Promise.all(pokemonsResponses.map((pokemonResponse: Response) => pokemonResponse.json()));

        return pokemonsData;

    } catch(err) {

        throw err;

    }
}

async function fetchPokemon(pokemonIdentifier: string | number): Promise<Response> {

    try {

        const url = buildPokemonAPIURL(pokemonIdentifier);
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error('There was a request error when trying to fetch a specific pokemon.');
        }

        return res.json();

    } catch(err) {
        throw err
    }
}


export { fetchPokemons, fetchPokemon }