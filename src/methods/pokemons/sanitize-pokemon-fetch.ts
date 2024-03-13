import type Pokemon from '../../types/pokemons/Pokemon.js';

function sanitizePokemon(pokemonResponse: any): Pokemon {

    const { id, name, types, sprites } = pokemonResponse;
    const typeName = types[0]?.type.name;
    const sprite = sprites?.front_default;

    return { id, name, type: typeName, sprite };
}

function sanitizePokemons(pokemonsResponses: Response[]): Pokemon[] {
    return pokemonsResponses.map(pokemonResponse => sanitizePokemon(pokemonResponse));
}

export { sanitizePokemon, sanitizePokemons };