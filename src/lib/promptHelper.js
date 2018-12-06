const vscode = require('vscode');

const getPromptOption = (name) => ({
    title: name
});

const showSimpleMessage = (message, type = 'info') => {
    if (type.toLowerCase() === 'error') return vscode.window.showErrorMessage(message);
    if (type.toLowerCase() === 'warn') return vscode.window.showWarningMessage(message);
    return vscode.window.showInformationMessage(message);
}

const promptForFileName = async (fileName, settings) => {
    if (settings.alwaysShowFileNamePrompt) {
        const userFileName = await vscode.window.showInputBox({
            prompt: 'PFW: What should the file name be copied as?',
            placeHolder: 'Enter a file name with extension',
            value: fileName || settings.defaultFileName
        });
        return userFileName;
    }
    return fileName || settings.defaultFileName;
}

const confirmOverwrite = async (fileName) => {
    const message = `The file "${fileName}" already exists. Would you like to overwrite the existing file with the new one?`
    return await vscode.window.showWarningMessage(message, getPromptOption('Yes'), getPromptOption('No'));
}

module.exports = {
    confirmOverwrite: confirmOverwrite,
    promptForFileName: promptForFileName,
    showSimpleMessage: showSimpleMessage
}