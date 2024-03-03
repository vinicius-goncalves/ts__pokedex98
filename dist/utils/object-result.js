const setMoreResults = {
    setResult(key, value) {
        return this[key] = value;
    }
};
export const pokemonResults = Object.create(setMoreResults);
Object.defineProperties(pokemonResults, {
    fromPokemons: {
        value: 1,
        writable: true,
        enumerable: true,
    },
    toPokemons: {
        value: 20,
        writable: true,
        enumerable: true
    }
});
