import Observer from './observer';

/**
 * Undo/Redo feature for Editor.js.
 *
 * @typedef {Object} Undo
 * @description Feature's initialization class.
 * @property {Object} editor — Editor.js instance object.
 * @property {Number} maxLength - Max amount of changes recorded by the history stack.
 * @property {Function} onUpdate - Callback called when the user performs an undo or redo action.
 * @property {Boolean} shouldSaveHistory - Defines if the plugin should save the change in the stack
 * @property {Object} initialItem - Initial data object.
 */
export default class Undo {
  /**
   * @param options — Plugin custom options.
   */
  constructor({
    editor,
    config = {},
    onUpdate,
    maxLength,
  }) {
    const defaultOptions = {
      maxLength: 30,
      onUpdate() {},
      config: {
        shortcuts: {
          undo: 'CMD+Z',
          redo: 'CMD+Y',
        },
      },
    };

    const { configuration } = editor;
    const { holder } = configuration;
    const defaultShortcuts = defaultOptions.config.shortcuts;
    const { shortcuts = defaultShortcuts } = config;

    this.holder = typeof holder === 'string' ? document.getElementById(holder) : holder;
    this.editor = editor;
    this.shouldSaveHistory = true;
    this.readOnly = configuration.readOnly;
    this.maxLength = maxLength || defaultOptions.maxLength;
    this.onUpdate = onUpdate || defaultOptions.onUpdate;
    this.config = { shortcuts };

    const observer = new Observer(
      () => this.registerChange(),
      this.holder,
    );
    observer.setMutationObserver();

    this.setEventListeners();
    this.initialItem = null;
    this.clear();
  }

  /**
   * Notify core that read-only mode is suppoorted
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Truncates the history stack when it excedes the limit of changes.
   *
   * @param {Object} stack  Changes history stack.
   * @param {Number} stack  Limit of changes recorded by the history stack.
   */
  truncate(stack, limit) {
    while (stack.length > limit) {
      stack.shift();
    }
  }

  /**
   * Initializes the stack when the user provides initial data.
   *
   * @param {Object} initialItem  Initial data provided by the user.
   */
  initialize(initialItem) {
    const initialData = 'blocks' in initialItem ? initialItem.blocks : initialItem;
    const initialIndex = initialData.length - 1;
    const firstElement = { index: initialIndex, state: initialData };
    this.stack[0] = firstElement;
    this.initialItem = firstElement;
  }

  /**
   * Clears the history stack.
   */
  clear() {
    this.stack = this.initialItem
      ? [this.initialItem]
      : [{ index: 0, state: [{ type: 'paragraph', data: { text: '' } }] }];
    this.position = 0;
    this.onUpdate();
  }

  /**
   * Registers the data returned by API's save method into the history stack.
   */
  registerChange() {
    if (!this.readOnly) {
      if (this.editor && this.editor.save && this.shouldSaveHistory) {
        this.editor.save().then((savedData) => {
          if (this.editorDidUpdate(savedData.blocks)) this.save(savedData.blocks);
        });
      }
      this.shouldSaveHistory = true;
    }
  }

  /**
   * Checks if the saved data has to be added to the history stack.
   *
   * @param {Object} newData  New data to be saved in the history stack.
   * @returns {Boolean}
   */
  editorDidUpdate(newData) {
    const { state } = this.stack[this.position];
    if (!newData.length) return false;
    if (newData.length !== state.length) return true;

    return JSON.stringify(state) !== JSON.stringify(newData);
  }

  /**
   * Adds the saved data in the history stack and updates current position.
   */
  save(state) {
    if (this.position >= this.maxLength) {
      this.truncate(this.stack, this.maxLength);
    }
    this.position = Math.min(this.position, this.stack.length - 1);

    this.stack = this.stack.slice(0, this.position + 1);

    const index = this.editor.blocks.getCurrentBlockIndex();
    this.stack.push({ index, state });
    this.position += 1;
    this.onUpdate();
  }

  /**
   * Decreases the current position and renders the data in the editor.
   */
  undo() {
    if (this.canUndo()) {
      this.shouldSaveHistory = false;
      const { index, state } = this.stack[(this.position -= 1)];
      this.onUpdate();

      this.editor.blocks
        .render({ blocks: state })
        .then(() => this.editor.caret.setToBlock(index, 'end'));
    }
  }

  /**
   * Increases the current position and renders the data in the editor.
   */
  redo() {
    if (this.canRedo()) {
      this.shouldSaveHistory = false;
      const { index, state } = this.stack[(this.position += 1)];
      this.onUpdate();

      this.editor.blocks
        .render({ blocks: state })
        .then(() => this.editor.caret.setToBlock(index, 'end'));
    }
  }

  /**
   * Checks if the history stack can perform an undo action.
   *
   * @returns {Boolean}
   */
  canUndo() {
    return !this.readOnly && this.position > 0;
  }

  /**
   * Checks if the history stack can perform a redo action.
   *
   * @returns {Boolean}
   */
  canRedo() {
    return !this.readOnly && this.position < this.count();
  }

  /**
   * Returns the number of changes recorded in the history stack.
   *
   * @returns {Number}
   */
  count() {
    return this.stack.length - 1; // -1 because of initial item
  }

  /**
   * Parses the keys passed in the shortcut property to accept CMD,ALT and SHIFT
   *
   * @param {Array} keys are the keys passed in shortcuts in config
   * @returns {Array}
   */

  parseKeys(keys) {
    const specialKeys = {
      CMD: /(Mac)/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey',
      ALT: 'altKey',
      SHIFT: 'shiftKey',
    };
    const parsedKeys = keys.slice(0, -1).map((key) => specialKeys[key]);
    const letterKey = parsedKeys.includes('shiftKey')
      ? keys[keys.length - 1].toUpperCase()
      : keys[keys.length - 1].toLowerCase();

    parsedKeys.push(letterKey);
    return parsedKeys;
  }

  /**
   * Sets events listeners to allow keyboard actions support
   */

  setEventListeners() {
    const { holder } = this;
    const { shortcuts } = this.config;
    const { undo, redo } = shortcuts;
    const keysUndo = undo.replace(/ /g, '').split('+');
    const keysRedo = redo.replace(/ /g, '').split('+');

    const keysUndoParsed = this.parseKeys(keysUndo);
    const keysRedoParsed = this.parseKeys(keysRedo);

    const pressedKeys = (e, keys) => {
      if (keys.length === 2 && e[keys[0]] && e.key === keys[1]) return true;
      if (keys.length === 3 && e[keys[0]] && e[keys[1]] && e.key === keys[2]) {
        return true;
      }
      return false;
    };

    const handleUndo = (e) => {
      if (pressedKeys(e, keysUndoParsed)) {
        e.preventDefault();
        this.undo();
      }
    };

    const handleRedo = (e) => {
      if (pressedKeys(e, keysRedoParsed)) {
        e.preventDefault();
        this.redo();
      }
    };

    const handleDestroy = () => {
      holder.removeEventListener('keydown', handleUndo);
      holder.removeEventListener('keydown', handleRedo);
    };

    holder.addEventListener('keydown', handleUndo);
    holder.addEventListener('keydown', handleRedo);
    holder.addEventListener('destroy', handleDestroy);
  }
}
