# EditorJS Undo Plugin
![](https://badgen.net/badge/Editor.js/v2.0/blue)
[![Coverage Status](https://coveralls.io/repos/github/kommitters/editorjs-undo/badge.svg)](https://coveralls.io/github/kommitters/editorjs-undo)
[![OpenSSF Best Practices](https://bestpractices.coreinfrastructure.org/projects/6471/badge)](https://bestpractices.coreinfrastructure.org/projects/6471)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/kommitters/editorjs-undo/badge)](https://api.securityscorecards.dev/projects/github.com/kommitters/editorjs-undo)

Undo/Redo feature for [Editor.js](https://editorjs.io).

![](assets/demo.gif)

## Installation
### Install via NPM

### 2.x.x (beta)

This new version introduces breaking changes. Remember that it is still in beta version.

Please, report bugs or behavior issues :).

#### What's new?
* Overall plugin performance is improved, especially with large documents.
* Undo/Redo lifecycle is managed through block updates instead of a full document render.
* Solves issues in documents with several images, for example the blink with undo/redo.
* Sets the caret in the respective position when the user is typing inside an existing text.
* Adds support to ReadOnly toggle.
* Optimizes the observer, saving with the EditorJS API only when the content changes.

Get the package

```shell
$ npm i --save-dev editorjs-undo
```

### 1.x.x (stable version)

To install the latest v1 stable version

Get the package

```shell
$ npm i --save-dev editorjs-undo@1.0.1
```

Include module in your application

```javascript
import Undo from 'editorjs-undo';
```

### Load from CDN

You can load a specific version of the package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/editorjs-undo).

Require this script on a page with Editor.js.

```html
<script src="https://cdn.jsdelivr.net/npm/editorjs-undo"></script>
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

### Usage with [react-editor-js](https://github.com/Jungwoo-An/react-editor-js).

If you are using [react-editor-js](https://github.com/Jungwoo-An/react-editor-js), you could create a function to handle the onReady property, the function will store the undo instance and the respective configuration or initialize method if you want to use them (they will be explained below). Then, you must call the function in onReady in the editorJS instance.

```javascript
const handleReady = (editor) => {
  new Undo({ editor });
};

class ReactEditor extends Component {
  render() {
    return (
      <EditorJs
        onReady = { handleReady }
        tools = { ... }
      />
    )
  }
}
```
**Note:** If you are already using [editorjs-drag-drop](https://github.com/kommitters/editorjs-drag-drop) your handleReady function must have the editorjs-drag-drop instance.

```javascript
const handleReady = (editor) => {
  new Undo({ editor });
  new DragDrop(editor);
};

```

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
    undo: 'CMD+X',
    redo: 'CMD+ALT+C'
  }
}
const editor = new EditorJS({
  onReady: () => {
    const undo = new Undo({ editor, config });
  },
});
```

You can set each shortcut with two or three keys, the available special keys are: CMD, ALT, SHIFT. CMD will be set up automatically as <kbd>Ctrl</kbd> or <kbd>⌘</kbd> depending on your OS.

### Provide a custom debounce time for the Observer

Internally, editorjs-undo uses an Observer instance that watches for changes in the text being entered. By default, it waits for a pause of 200ms in text entry before saving a change. If you want to have editorjs-undo save changes more or less often, pass a config object with a **debounceTimer** key in the undo instance and provide a different value in milliseconds.

```javascript
const config = {
  debounceTimer: 100
};
const editor = new EditorJS({
  onReady: () => {
    const undo = new Undo({ editor, config });
  },
});
```

Lowering the debounceTimer value below 200ms will make editorjs-undo save changes more often. Raising the debounceTimer value above 200ms will make editorjs-undo save changes less often.

Setting the debounceTimer value to 0 makes editorjs-undo save every character entered as an individual change, which makes undo and redo operations only remove/replace one character at a time.

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
