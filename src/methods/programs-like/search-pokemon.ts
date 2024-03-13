import type Pokemon from '../../types/pokemons/Pokemon.js';
import type ProgramLikeElement from '../../types/programs-like/ProgramLikeElement.js';

import { renderWindowOfError, renderPokemonFoundProgramLike } from '../../dom/programs-like/program-like-control.js';
import { fetchPokemon } from '../pokemons/fetch-pokemons.js';
import { sanitizePokemon } from '../pokemons/sanitize-pokemon-fetch.js';

let timeout: ReturnType<typeof setTimeout> | null = null;

function clearTimer(): void {

    if(timeout) {
        clearTimeout(timeout);
    }
}

function onInputFinished(callback: () => void) {

    clearTimer();
    timeout = setTimeout(callback, 750);
}

function handleSearchPokemonProgramLike(programLikeRendered: ProgramLikeElement): void {

    const headerTitle: HTMLSpanElement = <HTMLSpanElement>programLikeRendered.querySelector('.header-title');
    const oldTitle: string = String(headerTitle.textContent);

    programLikeRendered.oninput = (): void => clearTimer();
    programLikeRendered.onkeyup = (event): void => {

        headerTitle.textContent = 'Searching...'

        onInputFinished(async (): Promise<void> => {

            const target: HTMLInputElement = <HTMLInputElement>event.target;
            const pokemonId: string = target.value.toLowerCase();

            try {

                const pokemonFound: Response | undefined = await fetchPokemon(pokemonId);

                if(!pokemonFound) {
                    return;
                }

                const sanitizedPokemon: Pokemon = sanitizePokemon(pokemonFound);
                renderPokemonFoundProgramLike(sanitizedPokemon);

            } catch(err) {

                const idType = pokemonId.match(/[0-9]/g) ? 'id' : 'name';
                renderWindowOfError('Pokemon not found', `The pokemon with the ${idType} "${pokemonId}" was not found.`);

            } finally {

                headerTitle.textContent = oldTitle
            }
        });
    };
}

export default handleSearchPokemonProgramLike;