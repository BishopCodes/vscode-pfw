const axios = require('axios').default;
const fs = require('fs');
const promptHelper = require('./promptHelper');
const fileManager = require('./fileManager');

const validatePathWithUserSettings = async (destinationPath, settings) => {
    let shouldRename = false;
    if (settings.overwriteExistingFile && fs.existsSync(destinationPath)) {
        if (settings.promptBeforeOverwrite) {
            const overwriteChoice = await promptHelper.confirmOverwrite(destinationPath);
            if (overwriteChoice.title !== 'Yes') {
                shouldRename = true;
            }

        }
    } else {
        shouldRename = true;
    }

    return (shouldRename) ? fileManager.getUniqueFileName(destinationPath, settings) : destinationPath;
}

const fetchAndWriteFileFromWeb = async (destinationPath, webUrl, settings) => {
    if (settings.showProgressPrompts) { promptHelper.showSimpleMessage(`PFW: Fetching ${webUrl}`, 'info') };

    const response = await axios.get(webUrl, { responseType: 'arraybuffer' });
    if (response.status !== 200) throw `Tried to fetch file from URL but received '${response.statusCode}' status code`;

    destinationPath = fileManager.fillFileExtensionIfNotSet(response.headers['content-type'], destinationPath);
    destinationPath = await validatePathWithUserSettings(destinationPath, settings);

    fs.writeFileSync(destinationPath, response.data);

    if (settings.showProgressPrompts) {
        promptHelper.showSimpleMessage(`PFW: Fetch complete and written to ${destinationPath}`, 'info');
    }
    return destinationPath;
}

exports.fetchAndWriteFileFromWeb = fetchAndWriteFileFromWeb;