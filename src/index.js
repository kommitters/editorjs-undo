/**
 * Undo/Redo feature for Editor.js.
 *
 * @typedef {Object} DataHistory
 * @description Feature's initialization class.
 * @property {Object} editor — Editor.js instance object.
 * @property {Number} maxLength - Max amount of changes recorded by the history stack.
 * @property {Function} onUpdate - Callback called when the user performs an undo or redo action.
 * @property {Boolean} shouldSaveHistory - Defines if the plugin should save the change in the stack
 * @property {Object} initialItem - Initial data object.
 */
export default class DataHistory {
  /**
   * @param options — Plugin custom options.
   */
  constructor(options) {
    const defaultOptions = {
      maxLength: 30,
      onUpdate() {},
    };

    this.editor = options.editor;
    this.shouldSaveHistory = true;

    this.maxLength = options.maxLength
      ? options.maxLength
      : defaultOptions.maxLength;
    this.onUpdate = options.onUpdate
      ? options.onUpdate
      : defaultOptions.onUpdate;

    this.observer = null;
    this.debounceTimer = 200;
    this.mutationDebouncer = this.debounce(() => {
      this.registerChange();
    }, this.debounceTimer);
    this.setMutationObserver();
    this.setEventListeners();
    this.initialItem = null;
    this.clear();
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
    this.stack[0] = initialData;
    this.initialItem = initialData;
  }

  /**
   * Clears the history stack.
   */
  clear() {
    this.stack = [this.initialItem];
    this.position = 0;
    this.onUpdate();
  }

  /**
   * Registers the data returned by API's save method into the history stack.
   */
  registerChange() {
    if (this.shouldSaveHistory) {
      this.editor.save().then((savedData) => {
        if (this.editorDidUpdate(savedData.blocks)) this.save(savedData.blocks);
      });
    }
    this.shouldSaveHistory = true;
  }

  /**
   * Checks if the saved data has to be added to the history stack.
   *
   * @param {Object} newData  New data to be saved in the history stack.
   * @returns {Boolean}
   */
  editorDidUpdate(newData) {
    if (!this.count() && !this.initialItem) return true;

    const currentData = this.stack[this.position];
    if (newData.length !== currentData.length) return true;

    return JSON.stringify(currentData) !== JSON.stringify(newData);
  }

  /**
   * Adds the saved data in the history stack and updates current position.
   */
  save(current) {
    if (this.position >= this.maxLength) {
      this.truncate(this.stack, this.maxLength);
    }
    this.position = Math.min(this.position, this.stack.length - 1);

    this.stack = this.stack.slice(0, this.position + 1);
    this.stack.push(current);
    this.position += 1;
    this.onUpdate();
  }

  /**
   * Decreases the current position and renders the data in the editor.
   */
  undo() {
    if (this.canUndo()) {
      this.shouldSaveHistory = false;
      const item = this.stack[(this.position -= 1)];
      this.onUpdate();

      this.editor.blocks.render({ blocks: item });
    }
  }

  /**
   * Increases the current position and renders the data in the editor.
   */
  redo() {
    if (this.canRedo()) {
      this.shouldSaveHistory = false;
      const item = this.stack[(this.position += 1)];
      this.onUpdate();

      this.editor.blocks.render({ blocks: item });
    }
  }

  /**
   * Checks if the history stack can perform an undo action.
   *
   * @returns {Boolean}
   */
  canUndo() {
    return this.position > 0;
  }

  /**
   * Checks if the history stack can perform a redo action.
   *
   * @returns {Boolean}
   */
  canRedo() {
    return this.position < this.count();
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
   * Sets events listeners to allow keyboard actions support.
   */
  setEventListeners() {
    const buttonKey = /(Mac)/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey';
    document.addEventListener('keydown', (e) => {
      if (e[buttonKey] && e.key === 'z') {
        e.preventDefault();
        this.undo();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e[buttonKey] && e.key === 'y') {
        e.preventDefault();
        this.redo();
      }
    });
  }

  /**
   * Sets a mutation observer to catch every change in the editor.
   */
  setMutationObserver() {
    const observerOptions = {
      childList: true,
      attributes: true,
      subtree: true,
      characterData: true,
      characterDataOldValue: true,
    };

    const target = document.querySelector(`#${this.editor.configuration.holder}`);

    this.observer = new MutationObserver((mutationList) => {
      this.mutationHandler(mutationList);
    });
    this.observer.observe(target, observerOptions);
  }

  /**
   * Handles the mutations and checks if a new mutation has been produced.
   * @param {*} mutationList The registered mutations
   */
  mutationHandler(mutationList) {
    let contentMutated = false;

    mutationList.forEach((mutation) => {
      switch (mutation.type) {
        case 'childList':
        case 'characterData':
          contentMutated = true;
          break;
        case 'attributes':
          if (!mutation.target.classList.contains('ce-block')) {
            contentMutated = true;
          }
          break;
        default:
          break;
      }
    });

    if (contentMutated) this.mutationDebouncer();
  }

  /**
   * Delays invoking a function until after wait millis have elapsed.
   * @param {*} callback The function to be delayed.
   * @param {*} wait The deplay time in millis.
   */
  debounce(callback, wait) {
    let timeout;
    return (...args) => {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => callback.apply(context, args), wait);
    };
  }
}
