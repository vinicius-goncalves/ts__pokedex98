import { renderWindowOfError, renderPokemonFoundProgramLike } from '../../dom/programs-like/program-like-control.js';
import { fetchPokemon } from '../pokemons/fetch-pokemons.js';
import { sanitizePokemon } from '../pokemons/sanitize-pokemon-fetch.js';
let timeout = null;
function clearTimer() {
    if (timeout) {
        clearTimeout(timeout);
    }
}
function onInputFinished(callback) {
    clearTimer();
    timeout = setTimeout(callback, 750);
}
function handleSearchPokemonProgramLike(programLikeRendered) {
    const headerTitle = programLikeRendered.querySelector('.header-title');
    const oldTitle = String(headerTitle.textContent);
    programLikeRendered.oninput = () => clearTimer();
    programLikeRendered.onkeyup = (event) => {
        headerTitle.textContent = 'Searching...';
        onInputFinished(async () => {
            const target = event.target;
            const pokemonId = target.value.toLowerCase();
            try {
                const pokemonFound = await fetchPokemon(pokemonId);
                if (!pokemonFound) {
                    return;
                }
                const sanitizedPokemon = sanitizePokemon(pokemonFound);
                renderPokemonFoundProgramLike(sanitizedPokemon);
            }
            catch (err) {
                const idType = pokemonId.match(/[0-9]/g) ? 'id' : 'name';
                renderWindowOfError('Pokemon not found', `The pokemon with the ${idType} "${pokemonId}" was not found.`);
            }
            finally {
                headerTitle.textContent = oldTitle;
            }
        });
    };
}
export default handleSearchPokemonProgramLike;
