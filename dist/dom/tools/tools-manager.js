class ToolsManager {
    toolName;
    constructor(toolName) {
        this.toolName = toolName;
    }
    getToolInput() {
        const toolInput = document.getElementById(this.toolName);
        if (toolInput === null) {
            throw new Error(`The tool with the id "${this.toolName}" was not found in DOM.`);
        }
        return toolInput;
    }
    isCheckboxType() {
        return this.getToolInput().type === 'checkbox';
    }
    isChecked() {
        if (!this.isCheckboxType()) {
            return false;
        }
        ;
        const toolInput = this.getToolInput();
        return toolInput.checked !== false;
    }
}
export default ToolsManager;
