# Paste from Web for Visual Studio Code
---
A [Visual Studio Code](https://code.visualstudio.com/) extension that allows the ability to copy a web url and paste the contents as a file into a given project. 

> Note: I am trying to build out more projects in my spare time and include updating this one. However, due to work, school and family my time will be limited so please be patient with any resolutions to issues reported.

## Quick Start
---
* Install extension into VSCode and reload
* Create or open an existing project that has files and or folders. 
* Copy a web url address such as https://picsum.photos/200
* Right click on any file or folder and select **Paste from Web** from the context menu

## Extension Settings
---
Any of the following settings can be overriden though usersettings.json

* `pfw.alwaysShowFileNamePrompt`: Sets to show the prompt for the file to be saved (default:true)
* `pfw.defaultFileName`: Sets the default file name to use if it cannot be inferred (default: filename.ext)
* `pfw.showProgressPrompts`: Shows an info dialog during file download and completion (default: true)
* `pfw.openFileAfterCopy`: Opens the file copied from the web in VSCode (default: true)
* `pfw.overrideExistingFile`: Override an existing file with the one grabbed from the web (default: false)
* `pfw.useUuidRename`: Use a timestamp UUID instead of .copy during the duplicate rename process (default: false)

## Known Issues
---

* Wont create a file if name is too large (WIP)


## Release Notes
---

### 1.0.1 [Unreleased]

* Add testing
* Refactor internal code
* Limit large file names
* Cleanup documentation

### 1.0.0 [Current]

Initial release







