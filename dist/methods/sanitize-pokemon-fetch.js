function sanitizePokemon(pokemonResponse) {
    console.log(pokemonResponse);
    const { id, name, types, sprites } = pokemonResponse;
    const typeName = types[0]?.type.name;
    const sprite = sprites?.front_default;
    return { id, name, type: typeName, sprite };
}
function sanitizePokemons(pokemonsResponses) {
    return pokemonsResponses.map(pokemonResponse => sanitizePokemon(pokemonResponse));
}
export { sanitizePokemon, sanitizePokemons };
