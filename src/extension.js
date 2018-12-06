const vscode = require('vscode');
const path = require('path');
const intentHelper = require('./lib/intentHelper');
const promptHelper = require('./lib/promptHelper');
const webFetchHandler = require('./lib/webFetchHandler');
const fileManager = require('./lib/fileManager');

const handleCopyIntentAsync = async (intent, locationUri, settings) => {
    const filePath = fileManager.getDirectoryFromPath(locationUri);
    const fileName = await promptHelper.promptForFileName(intent.fileName, settings);
    const cleanedFileName = fileManager.cleanFileName(fileName);
    const fullFilePath = path.join(filePath, cleanedFileName);
    const pathWritten = await webFetchHandler.fetchAndWriteFileFromWeb(fullFilePath, intent.url, settings);

    if (settings.openFileAfterCopy) {
        vscode.workspace.openTextDocument(pathWritten)
            .then(openedDocument => vscode.window.showTextDocument(openedDocument))
            .catch(error => promptHelper.showSimpleMessage(error, 'error'));
    }
}

const activate = context => {
    let command = vscode.commands.registerCommand('pasteFromWeb.execute', uri => {
        const settings = vscode.workspace.getConfiguration().get('pfw');
        const intent = intentHelper.getIntentDetails(uri);
        if (!intent.isValid) return;
        handleCopyIntentAsync(intent, uri, settings)
            .catch(error => promptHelper.showSimpleMessage(error, 'error'));
    });

    context.subscriptions.push(command);
}

exports.activate = activate;