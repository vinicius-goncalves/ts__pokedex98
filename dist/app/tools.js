import { createPokemonWrapper } from '../utils/creators.js';
import { forEach, makeFetchRequest } from '../utils/utils.js';
const pokemonsMainList = document.querySelector('[data-js="pokemons"]');
const fieldsetWrapper = document.querySelector('[data-js="fieldset-wrapper"]');
const pokemonsFilteredSection = document.querySelector('[data-js="pokemons-filtered"]');
const setupOptionsCheckbox = () => {
    const createOptions = (optionClicked) => {
        const div = document.createElement('div');
        div.setAttribute('data-wrapper-type', optionClicked);
        pokemonsFilteredSection.append(div);
        Array.prototype.forEach.call([...pokemonsMainList.children], (pokemon) => {
            if (pokemon.dataset.type === undefined) {
                return;
            }
            switch (pokemon.dataset.type.includes(`${optionClicked}`)) {
                case true:
                    pokemon.removeAttribute('style');
                    div.insertAdjacentElement('afterbegin', pokemon);
                    break;
                case false:
                    pokemon.setAttribute('style', 'display: none');
                    break;
            }
        });
    };
    const updateOptions = (optionClicked) => {
        const pokemonsWrappersTypes = [...document.querySelector(`[data-wrapper-type="${optionClicked}"]`).children];
        pokemonsWrappersTypes.forEach(pokemonFiltred => {
            pokemonFiltred.setAttribute('style', 'display: none');
            pokemonsMainList.insertAdjacentElement('afterbegin', pokemonFiltred);
        });
        document.querySelector(`[data-wrapper-type="${optionClicked}"]`)?.remove();
        if (pokemonsFiltredSection.children.length === 0) {
            Array.prototype.forEach.call([...pokemonsMainList.children], (pokemon) => {
                pokemon.removeAttribute('style');
            });
        }
    };
    const optionsCheckbox = document.querySelectorAll('[data-input="checkbox"]');
    forEach(optionsCheckbox, checkboxInput => {
        checkboxInput.addEventListener('click', event => {
            const { checked } = event.target;
            const targetDatasetClicked = event.target.dataset;
            const { ['option']: optionClicked } = targetDatasetClicked;
            switch (checked) {
                case true:
                    createOptions(optionClicked);
                    break;
                case false:
                    updateOptions(optionClicked);
                    break;
                default:
                    break;
            }
        });
    });
};
const setupPokemonsTypes = (ul, handlePokemonsTypes) => {
    handlePokemonsTypes().then(pokemonsTypes => {
        const pokemonsTypesLi = pokemonsTypes.map(pokemonType => {
            const li = document.createElement('li');
            const label = document.createElement('label');
            label.setAttribute('data-option', pokemonType);
            label.setAttribute('data-js', 'options-label');
            li.append(label);
            const input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.setAttribute('data-option', pokemonType);
            input.setAttribute('data-input', 'checkbox');
            label.append(input);
            const pokemonTypeNameFormatted = pokemonType.replace(pokemonType.charAt(0), pokemonType.charAt(0).toUpperCase());
            const a = document.createElement('a');
            a.textContent = pokemonTypeNameFormatted;
            label.append(a);
            return li;
        });
        pokemonsTypesLi.forEach(li => ul.append(li));
        setupOptionsCheckbox();
    });
};
const initializeToolsFieldset = (tool, title, handlePokemonsTypes) => {
    const searchPokemonByTerm = async (termToSearch) => {
        const pokemonFilteredSection = document.querySelector('[data-js="pokemons-filtered"]');
        const pokemon = await makeFetchRequest(termToSearch);
        const { name, id } = pokemon;
        const div = document.createElement('div');
        div.setAttribute('data-pokemon-found', name);
        const pokemonWrapper = createPokemonWrapper(pokemon.types[0].type.name, id, name, pokemon.sprites.front_default);
        div.append(pokemonWrapper);
        pokemonFilteredSection.append(pokemonWrapper);
        const pokemonMainListChildren = [...pokemonsMainList.children];
        forEach(pokemonMainListChildren, pokemon => pokemon.setAttribute('style', 'display: none;'));
        document.querySelectorAll('[data-tool="filters"]')[1]?.setAttribute('disabled', '');
    };
    const setupPokemonSearchedTerm = async () => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('data-js', 'pokemonNameOrID');
        const button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.setAttribute('value', 'Search');
        li.append(input, button);
        const reset = document.createElement('input');
        reset.setAttribute('type', 'button');
        reset.setAttribute('value', 'Reset');
        reset.addEventListener('click', () => {
            const pokemonFiltredSection = document.querySelector('[data-js="pokemons-filtered"]');
            const inputForSearch = document.querySelector('[data-js="pokemonNameOrID"]');
            const pokemonsMainListChildren = [...pokemonsMainList.children];
            const pokemonFiltredSectionChildren = [...pokemonFiltredSection.children];
            forEach(pokemonsMainListChildren, pokemon => pokemon.removeAttribute('style'));
            forEach(pokemonFiltredSectionChildren, pokemon => pokemon.remove());
            document.querySelectorAll('[data-tool="filters"]')[1]?.removeAttribute('disabled', '');
            inputForSearch.setAttribute('value', '');
        });
        button.addEventListener('click', async () => {
            const inputForSearch = document.querySelector('[data-js="pokemonNameOrID"]');
            const searchedTerm = inputForSearch.value.toLowerCase();
            if (searchedTerm.match(/[0-9]/g)) {
                searchPokemonByTerm(searchedTerm);
            }
            if (searchedTerm.match(/[a-zA-Z]/g)) {
                searchPokemonByTerm(searchedTerm);
            }
        });
        li.append(reset);
        ul.append(li);
    };
    const fieldSet = document.createElement('fieldset');
    fieldSet.setAttribute('data-js', `${tool}-wrapper`);
    fieldSet.setAttribute('data-wrapper', `fieldset-wrappers`);
    const legend = document.createElement('legend');
    legend.textContent = title;
    fieldSet.append(legend);
    const ul = document.createElement('ul');
    ul.setAttribute('data-js', 'options');
    fieldSet.append(ul);
    fieldsetWrapper.append(fieldSet);
    switch (tool) {
        case 'filters':
            setupPokemonsTypes(ul, handlePokemonsTypes);
            break;
        case 'findByNameAndID':
            setupPokemonSearchedTerm();
            break;
        default:
            break;
    }
};
export const handleTools = (event, handlePokemonsTypes) => {
    const targetClicked = event.target;
    const targetDatasetClicked = targetClicked.dataset;
    const { ['checked']: isChecked } = targetClicked;
    const { tool, title } = targetDatasetClicked;
    switch (isChecked) {
        case true:
            initializeToolsFieldset(tool, title, handlePokemonsTypes);
            break;
        case false:
            document.querySelector(`[data-js="${tool}-wrapper"]`)?.remove();
            break;
        default:
            break;
    }
};
