const clipboardy = require('clipboardy');

const getClipboardContentsOrEmpty = () => {
    try {
        return clipboardy.readSync();
    } catch (error) {
        return;
    }
}

exports.getClipboardContentsOrEmpty = getClipboardContentsOrEmpty