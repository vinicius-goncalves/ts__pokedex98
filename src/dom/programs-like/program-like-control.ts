import type ProgramLike from '../../types/programs-like/ProgramLike.js';
import type Pokemon from '../../types/pokemons/Pokemon.js';
import type ProgramLikeElement from '../../types/programs-like/ProgramLikeElement.js';

import renderProgramLike from './program-like-render.js';
import createSearchPokemonProgramLike from './_search-pokemon.js';
import createPokemonFetchedProgramLike from './_pokemon-fetched.js';

import handleSearchPokemonProgramLike from '../../methods/programs-like/search-pokemon.js';
import createErrorWindowProgramLike from './_error-window.js';

function renderSearchPokemonProgramLike(): void {

    const pl: ProgramLike = { id: 'search-by-name-or-id', title: 'Search by name or id' };
    const searchPokemonProgramLikeRendered: ProgramLikeElement = renderProgramLike(pl, createSearchPokemonProgramLike());

    handleSearchPokemonProgramLike(searchPokemonProgramLikeRendered);
    document.body.prepend(searchPokemonProgramLikeRendered);
}

function renderPokemonFoundProgramLike(pokemon: Pokemon): void {

    const pl: ProgramLike = { id: 'pokemon-fetched', title: pokemon.name };
    const pokemonFoundProgramLike: ProgramLikeElement = renderProgramLike(pl, createPokemonFetchedProgramLike(pokemon));

    document.body.prepend(pokemonFoundProgramLike);
}

function renderWindowOfError(cause: string, message: string): void {

    const pl: ProgramLike = { id: `error-${Date.now()}`, title: cause };
    const windowError: ProgramLikeElement = renderProgramLike(pl, createErrorWindowProgramLike(message));

    document.body.prepend(windowError);
}

export { renderSearchPokemonProgramLike, renderPokemonFoundProgramLike, renderWindowOfError };