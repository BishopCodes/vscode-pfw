const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const url = require('url');
const clipboardy = require('clipboardy');
const request = require('request');
const uuidv1 = require('uuid/v1');
const mime = require('mime-types');

const getValidActionInfo = uri => {
    const action = {
        isValid: false,
        url: null,
        fileName: null
    };

    if (!uri) return action;

    let clipboardContent;

    try { clipboardContent = clipboardy.readSync(); } catch (exception) { }

    if (!clipboardContent) {
        vscode.window.showWarningMessage('No valid string was found in the clipboard');
        return action;
    }

    const parsedUrl = url.parse(clipboardContent);

    if (!parsedUrl.hostname) {
        vscode.window.showWarningMessage('Clipboard does not contain a valid url');
        return action
    };

    action.isValid = true;
    action.fileName = path.basename(parsedUrl.path);
    action.url = parsedUrl.href;

    return action;
};

const getFileNameOrPrompt = async (webFileName, settings) => {
    if (settings.alwaysShowFileNamePrompt) {
        const userFileName = await vscode.window.showInputBox({
            placeHolder: 'Filename unknown enter a new name with extension',
            value: webFileName || settings.defaultFileName
        });
        return userFileName;
    }
    return webFileName || settings.defaultFileName
}

const fetchFileFromWeb = (destinationPath, webUrl, settings) => {
    if (settings.showProgressPrompts) vscode.window.showInformationMessage(`Fetching ${webUrl}`);

    const req = request.get(webUrl);

    req.on('error', () => {
        vscode.window.showErrorMessage(`An error occured while attempting to fetch the file`);
    });

    req.on('response', (response) => {
        if (response.statusCode !== 200) {
            vscode.window.showErrorMessage(`Tried to fetch file from URL but received '${response.statusCode}' status code`);
        }
        const mimeExtension = mime.extension(response.headers['content-type']);
        const extensionName = path.extname(destinationPath);
        if (!extensionName) destinationPath = `${destinationPath}.${mimeExtension}`;

        while (fs.existsSync(destinationPath)) {
            const extensionName = path.extname(destinationPath);
            const renameValue = (settings.useUuidRename) ? uuidv1() : 'copy';
            destinationPath = destinationPath.replace(extensionName, `.${renameValue}${extensionName}`);
        }

        req.pipe(fs.createWriteStream(destinationPath))
        req.on('end', () => {
            if (settings.showProgressPrompts) vscode.window.showInformationMessage(`Fetch complete and written to ${destinationPath}`);
        });
    });
}

const copyContentToContextLocation = (actionInfo, locationUri, settings) => {
    try {
        const pathStat = fs.lstatSync(locationUri.fsPath);
        let filePath = (pathStat.isDirectory()) ? locationUri.fsPath : path.dirname(locationUri.fsPath);
        getFileNameOrPrompt(actionInfo.fileName, settings).then(fileName => {
            let destinationPath = path.join(filePath, fileName);
            fetchFileFromWeb(destinationPath, actionInfo.url, settings);
        }).catch(error => vscode.window.showErrorMessage(error));
    } catch (error) {
        vscode.window.showErrorMessage(error);
    }
}

const activate = context => {
    let command = vscode.commands.registerCommand('pasteFromWeb.execute', uri => {
        const settings = vscode.workspace.getConfiguration().get('pfw');
        const actionInfo = getValidActionInfo(uri);
        if (!actionInfo.isValid) return;
        copyContentToContextLocation(actionInfo, uri, settings)
    });

    context.subscriptions.push(command);
}

exports.activate = activate;