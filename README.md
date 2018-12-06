# Paste from Web for Visual Studio Code

Paste from Web is a [Visual Studio Code](https://code.visualstudio.com/) extension that enables the ability to copy a resource from a copied URL directly without having to download the asset and import manually. 

> Note: This is my first extension, and I will be looking to create future plugins and also improve upon this one. However, all of the work I do is in my spare time outside of work, school, and family. Please be patient with me on the resolution to any issues reported. 

## Installation

 **On the Web:**
* Go to the [extensions](https://marketplace.visualstudio.com/items?itemName=BishopCodes.vscode-pfw) page on the Visual Studio Marketplace and click Install

**Within VSCode:**
* Press `F1` and type `Extensions: Install Extensions`
* Search for `Paste from Web` and select `install`

## Extension Overview

Paste from Web will take a copied URL from the user's clipboard and download that resource into the associated directory selected during invocation. The filename itself will attempt to be inferred from the URL and by default prompted to the user for confirmation and or change. Invalid filename characters are then scrubbed from the name and passed along for HTTP resource request. If the provided filename does not have an extension, the extension will attempt to infer one from the content-type of the request along with the support of [mime](https://github.com/broofa/node-mime#readme). After that, the extension will fetch the content from the URL and save it as a file in the editor directory previously specified, and attempt to open the file in the main editor window. 

> Note: Behavior will vary based on the settings overridden from within a users configuration file.

## Quick Start

* Install extension into VSCode and reload
* Create or open an existing workspace or folder.
* Copy a web URL address such as https://picsum.photos/200
* Right click on any file, folder, or empty explorer window space and select **Paste from Web** from the context menu.

![General Features](https://raw.githubusercontent.com/BishopCodes/vscode-pfw/master/images/ExtensionPreview.gif)

## Extension Settings

Any of the following settings can be overwritten through usersettings.json

* `pfw.alwaysShowFileNamePrompt`: Sets to show the prompt for the file to be saved (default:true)
* `pfw.defaultFileName`: Sets the default file name to use if it cannot be inferred (default: filename.ext)
* `pfw.openFileAfterCopy`: Opens the file copied from the web in VSCode. Limited to text based files. (default: true)
* `pfw.overwriteExistingFile`: Overwrite an existing file with the one grabbed from the web otherwise rename to unique instance (default: false)
* `pfw.promptBeforeOverwrite`: If `pfw.overwriteExistingFile` is set to true in tandem with this setting a prompt will ask before overwriting an existing file. If the prompt is closed or no is chosen the rename process takes precedence.
* `pfw.showProgressPrompts`: Shows an info dialog during file download and completion (default: true)
* `pfw.useUuidRename`: Use a timestamp UUID instead of "copy" during the duplicate rename process (default: false)

## Main Project Dependancies

* [axios](https://github.com/axios/axios): For HTTP request handling
* [clipboard](https://github.com/sindresorhus/clipboardy): For clipboard access
* [filenamify](https://github.com/sindresorhus/filenamify): For file name scrubbing
* [mime](https://github.com/broofa/node-mime#readme): For fill-in of unset file extensions based on content-type coming from URL.
* [uuid](https://github.com/kelektiv/node-uuid#readme): For UUID generation for duplicate files if set in `pfw.useUuidRename`

## Known Issues


* None


## Release Notes and Latest Version

Please visit the [release page](https://github.com/BishopCodes/vscode-pfw/releases/) for details






