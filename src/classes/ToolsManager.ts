import type ToolName from '../types/Tools.js';

class ToolsManager {

    private toolName: string;

    constructor(toolName: ToolName) {
        this.toolName = toolName;
    }

    public getToolInput(): HTMLInputElement {

        const toolInput: HTMLElement | null = document.getElementById(this.toolName);

        if(toolInput === null) {
            throw new Error(`The tool with the id "${this.toolName}" was not found in DOM.`);
        }

        return toolInput as HTMLInputElement;
    }

    private isCheckboxType(): boolean {
        return this.getToolInput().type === 'checkbox';
    }

    public isChecked(): boolean {

        if(!this.isCheckboxType()) {
            return false;
        };

        const toolInput: HTMLInputElement = this.getToolInput();
        return toolInput.checked !== false;
    }
}

export default ToolsManager;