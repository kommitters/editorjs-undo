![](https://badgen.net/badge/Editor.js/v2.0/blue)

# EditorJS Undo Plugin

Undo/Redo feature for [Editor.js](https://editorjs.io).

![](assets/demo.gif)

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

```javascript
const editor = new EditorJS({
  onReady: () => {
    new Undo({ editor });
  },
});
```

On the editor, use <kbd>Ctrl</kbd> + <kbd>Z</kbd> or <kbd>⌘</kbd> + <kbd>Z</kbd> to undo, or use <kbd>Ctrl</kbd> + <kbd>Y</kbd> or <kbd>⌘</kbd> + <kbd>Y</kbd> to redo.

## Initialize the plugin with data

To initialize the plugin with data, use the `initialize` method inside the editor's onReady callback.

```javascript
const editor = new EditorJS({
  onReady: () => {
    const undo = new Undo({ editor });
    undo.initialize(initialData);
  },
});
```

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

## Contributing and Development
Bug reports and pull requests are welcome on GitHub https://github.com/kommitters/editorjs-undo. Everyone is welcome to participate in the project.

## License
See [LICENSE](https://github.com/kommitters/editorjs-undo/blob/master/LICENSE) for details.

## Credits
Made with 💙 by [kommit](https://kommit.co)
