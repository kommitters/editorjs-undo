![](https://badgen.net/badge/Editor.js/v2.0/blue)

# EditorJS Undo Plugin

Undo/Redo feature for [Editor.js](https://editorjs.io).

## Notes

Requires no server-side uploader.

## Installation

### Install via NPM

Get the package

```shell
$ npm i --save-dev editorjs-undo
```

Include module at your application

```javascript
import Undo from 'editorjs-undo';
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
let dataHistory;

const editor = new EditorJS({
  onChange: () => {
    dataHistory.registerChange();
  },
  onReady: () => {
    dataHistory = new DataHistory({ editor });
  },
});
```

Perform an undo action using <kbd>Ctrl</kbd> + <kbd>Z</kbd> or <kbd>⌘</kbd> + <kbd>Z</kbd>.
Perform a redo action using <kbd>Ctrl</kbd> + <kbd>Y</kbd> or <kbd>⌘</kbd> + <kbd>Y</kbd>.

## Available Options

| Field      | Type       | Description                                                    |
| ---------- | ---------- | -------------------------------------------------------------- |
| maxLength  | `Number`   | Max amount of changes recorded by the history stack.           |
| onUpdate() | `function` | Callback called when the user performs an undo or redo action. |

## Development

**Development mode**

```shell
$ yarn build:dev
```

**Production release**

1. Create a production bundle

```shell
$ yarn build
```

2. Commit `dist/bundle.js`

**Run tests**

```shell
$ yarn test
```
