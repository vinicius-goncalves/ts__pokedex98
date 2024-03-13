import renderProgramLike from './program-like-render.js';
import createSearchPokemonProgramLike from './_search-pokemon.js';
import createPokemonFetchedProgramLike from './_pokemon-fetched.js';
import handleSearchPokemonProgramLike from '../../methods/programs-like/search-pokemon.js';
import createErrorWindowProgramLike from './_error-window.js';
function renderSearchPokemonProgramLike() {
    const pl = { id: 'search-by-name-or-id', title: 'Search by name or id' };
    const searchPokemonProgramLikeRendered = renderProgramLike(pl, createSearchPokemonProgramLike());
    handleSearchPokemonProgramLike(searchPokemonProgramLikeRendered);
    document.body.prepend(searchPokemonProgramLikeRendered);
}
function renderPokemonFoundProgramLike(pokemon) {
    const pl = { id: 'pokemon-fetched', title: pokemon.name };
    const pokemonFoundProgramLike = renderProgramLike(pl, createPokemonFetchedProgramLike(pokemon));
    document.body.prepend(pokemonFoundProgramLike);
}
function renderWindowOfError(cause, message) {
    const pl = { id: `error-${Date.now()}`, title: cause };
    const windowError = renderProgramLike(pl, createErrorWindowProgramLike(message));
    document.body.prepend(windowError);
}
export { renderSearchPokemonProgramLike, renderPokemonFoundProgramLike, renderWindowOfError };
