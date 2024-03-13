function buildPokemonAPIURL(pokemonId) {
    return `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
}
function buildPokemonsAPIRequests(fromId, toId) {
    const requestsLen = toId - fromId + 1;
    const pokemonsRequestsUrls = Array.from({ length: requestsLen }, (_, index) => {
        const currPokemonId = fromId + index;
        const urlBuilt = buildPokemonAPIURL(currPokemonId);
        return urlBuilt;
    });
    return pokemonsRequestsUrls;
}
async function fetchPokemons(fromId, toId) {
    try {
        const pokemonsRequestsUrls = buildPokemonsAPIRequests(fromId, toId);
        const pokemonsRequests = pokemonsRequestsUrls.map((pokemonUrl) => fetch(pokemonUrl));
        const pokemonsResponses = await Promise.all(pokemonsRequests);
        const pokemonsData = await Promise.all(pokemonsResponses.map((pokemonResponse) => pokemonResponse.json()));
        return pokemonsData;
    }
    catch (err) {
        throw err;
    }
}
async function fetchPokemon(pokemonIdentifier) {
    try {
        const url = buildPokemonAPIURL(pokemonIdentifier);
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('There was a request error when trying to fetch '
                + 'a specific pokemon because the server has returned an error: '
                + res.status, { cause: res.status });
        }
        return res.json();
    }
    catch (err) {
        throw err;
    }
}
export { fetchPokemons, fetchPokemon };
