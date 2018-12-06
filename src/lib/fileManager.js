const fs = require('fs');
const fileNamify = require('filenamify');
const path = require('path');
const uuidv1 = require('uuid/v1');
const mime = require('mime');

const getDirectoryFromPath = (path) => {
    const pathStat = fs.lstatSync(path.fsPath);
    return (pathStat.isDirectory()) ? path.fsPath : path.dirname(path.fsPath);
}

const fillFileExtensionIfNotSet = (responseContentType, destinationPath) => {
    const mimeExtension = mime.getExtension(responseContentType);
    const extensionName = path.extname(destinationPath);
    return (!extensionName) ? `${destinationPath}.${mimeExtension}` : destinationPath;
}

const getUniqueFileName = (destinationPath, settings) => {
    while (fs.existsSync(destinationPath)) {
        const renameValue = (settings.useUuidRename) ? uuidv1() : 'copy';
        destinationPath = destinationPath.split('.')
            .map((part, index) => (index === 0) ? `${part}-${renameValue}` : part)
            .join('.');
    }
    return destinationPath;
}

const cleanFileName = fileName => {
    return fileNamify(fileName);
}

module.exports = {
    cleanFileName: cleanFileName,
    fillFileExtensionIfNotSet: fillFileExtensionIfNotSet,
    getDirectoryFromPath: getDirectoryFromPath,
    getUniqueFileName: getUniqueFileName
}