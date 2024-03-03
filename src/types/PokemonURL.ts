type PokemonURL<T extends number | string> = `https://pokeapi.co/api/v2/pokemon/${T}`;

export default PokemonURL;