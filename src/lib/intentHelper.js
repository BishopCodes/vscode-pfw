const path = require('path');
const url = require('url');
const clipboardManager = require('./clipboardManager'); // Until VSCode Supports Clipboard access
const promptHelper = require('./promptHelper');

const getIntentInfo = (isValid, url, fileName) => ({
    isValid: isValid || false,
    url: url || null,
    fileName: fileName || null
});

const showWarningAndReturnDefaultIntent = message => {
    promptHelper.showSimpleMessage(message, 'warn');
    return getIntentInfo();
}

const getIntentDetails = (uri) => {
    if (!uri) return showWarningAndReturnDefaultIntent('PFW: No location specified to copy to');

    const clipboardContent = clipboardManager.getClipboardContentsOrEmpty();
    if (!clipboardContent) return showWarningAndReturnDefaultIntent('PFW: No valid string was found in the clipboard');

    const parsedUrl = url.parse(clipboardContent);
    if (!parsedUrl.hostname) return showWarningAndReturnDefaultIntent('PFW: Clipboard does not contain a valid url');

    return getIntentInfo(true, parsedUrl.href, path.basename(parsedUrl.path).replace(parsedUrl.search, ''));
};

exports.getIntentDetails = getIntentDetails;