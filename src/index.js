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
  constructor({ editor, onUpdate, maxLength }) {
    const defaultOptions = {
      maxLength: 30,
      onUpdate() {},
    };

    const { configuration } = editor;
    const { holder } = configuration;

    this.holder = typeof holder === 'string' ? document.getElementById(holder) : holder;
    this.editor = editor;
    this.shouldSaveHistory = true;
    this.readOnly = configuration.readOnly;
    this.maxLength = maxLength || defaultOptions.maxLength;
    this.onUpdate = onUpdate || defaultOptions.onUpdate;

    const buttonKey = /(Mac)/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey';
    this.shortcutUndo = `${buttonKey}+z`;
    this.shortcutRedo = `${buttonKey}+y`;

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
      : [{ index: 0, state: [] }];
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
   * Sets up the shortcuts to undo and redo
   * @param {string} shortcutUndo shortcut to the Undo action, it is by default ctrlKey+z
   * @param {string} shortcutRedo shortcut to the Redo action, it is by default ctrlKey+y
   */

  shortcut(shortcutUndo = this.shortcutUndo, shortcutRedo = this.shortcutRedo) {
    this.shortcutRedo = shortcutRedo;
    this.shortcutUndo = shortcutUndo;
  }

  /**
   * Sets events listeners to allow keyboard actions support
   */

  setEventListeners() {
    const { holder } = this;

    const handleUndo = (e) => {
      const buttonKeyUndo = this.shortcutUndo.replace(/ /g, '').split('+')[0];
      const keyUndo = this.shortcutUndo.replace(/ /g, '').split('+')[1];
      if (e[buttonKeyUndo] && e.key === keyUndo) {
        e.preventDefault();
        this.undo();
      }
    };

    const handleRedo = (e) => {
      const buttonKeyRedo = this.shortcutRedo.replace(/ /g, '').split('+')[0];
      const keyRedo = this.shortcutRedo.replace(/ /g, '').split('+')[1];
      if (e[buttonKeyRedo] && e.key === keyRedo) {
        e.preventDefault();
        this.redo();
      }
    };

    holder.addEventListener('keydown', handleUndo);
    holder.addEventListener('keydown', handleRedo);
  }
}
