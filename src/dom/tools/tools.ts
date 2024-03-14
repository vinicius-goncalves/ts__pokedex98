import type ToolName from '../../types/Tools.js';
import { renderSearchPokemonProgramLike } from '../programs-like/program-like-control.js';

import handleWithIntersectionObserver from './_smart-fetch.js';
// import handleWithRandomFetch from './_random-fetch.js';

const toolsContent = document.querySelector('[data-tools="content"]') as HTMLMenuElement;

const toolsLookup: Record<string, () => void> = {
    ['smart-fetch']: handleWithIntersectionObserver,
    ['random-fetch']: () => {},
    ['search-pokemon']: () => renderSearchPokemonProgramLike(),
}

function toolHandler(toolClicked: ToolName): void {

    const toolFunc: () => void = toolsLookup[toolClicked];

    if(!toolFunc || typeof toolFunc !== 'function') {
        return;
    }

    toolFunc();
}

toolsContent.addEventListener('click', (event) => {

    const targetClicked = event.target;

    if(!(targetClicked instanceof Element) || targetClicked.id === '') {
        return;
    }

    const toolClicked = targetClicked.id as ToolName;
    toolHandler(toolClicked);
});