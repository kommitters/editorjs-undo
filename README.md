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

Include module in your application

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



### Initialize the plugin with data

**Note:** If you have loaded EditorJS with any initial data (such as some saved content), you _must_ pass in an `initialData` object. If you don't, the default initial undo state lead to an empty editor.

You may use the `initialize` method inside the editor's `onReady` callback.

```javascript
const editor = new EditorJS({
  onReady: () => {
    const undo = new Undo({ editor });
    undo.initialize(initialData);
  },
});
```

### Add a custom shortcut to undo and redo

**Note:** If you do not add any shortcut, the default shortcuts will be set up.

If you want to add custom shortcuts, pass a config object with a shortcut key in the undo instance, the shortcuts must be called `undo` and `redo`.

```javascript
const config = {
  shortcuts: {
    undo: 'ctrlKey+x',
    redo: 'ctrlKey+altKey+c'
  }
}
const editor = new EditorJS({
  onReady: () => {
    const undo = new Undo({ editor, config });
  },
});
```

You can set each shortcut with two or three keys, remember the special keys (ctrlKey, altKey, shiftKey, metaKey). 

### Available Options

| Field      | Type       | Description                                                    |
| ---------- | ---------- | -------------------------------------------------------------- |
| editor     | `EditorJS`   | **Required.** The EditorJS instance.                         |
| maxLength  | `Number`   | Max amount of changes recorded by the history stack.           |
| onUpdate() | `function` | Callback called when the user performs an undo or redo action. |
| config     | `object`   | Set up the configuration to editorjs-undo like the shortcuts   |

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

## Code of conduct
We welcome everyone to contribute. Make sure you have read the [CODE_OF_CONDUCT][coc] before.

## Contributing
For information on how to contribute, please refer to our [CONTRIBUTING][contributing] guide.

## Changelog
Features and bug fixes are listed in the [CHANGELOG][changelog] file.

## License
This library is licensed under an MIT license. See [LICENSE][license] for details.

## Acknowledgements
Made with 💙 by [kommitters Open Source](https://kommit.co)

[license]: https://github.com/kommitters/editorjs-undo/blob/master/LICENSE
[coc]: https://github.com/kommitters/editorjs-undo/blob/master/CODE_OF_CONDUCT.md
[changelog]: https://github.com/kommitters/editorjs-undo/blob/master/CHANGELOG.md
[contributing]: https://github.com/kommitters/editorjs-undo/blob/master/CONTRIBUTING.md
