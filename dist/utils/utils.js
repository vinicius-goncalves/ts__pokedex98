export const forEach = (list, callback) => {
    return Array.prototype.forEach.call(list, callback);
};
export const makeFetchRequest = async (pokemonNameOrID) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrID}`);
    if (!response.ok) {
        return;
    }
    const data = await response.json();
    return data;
};
