import VanillaCaret from 'vanilla-caret-js';
import { create } from 'jsondiffpatch';
// eslint-disable-next-line import/no-unresolved
import * as jsonpatchFormatter from 'jsondiffpatch/formatters/jsonpatch';
import Observer from './observer';
import ManagerHistory from './managerHistory';

/**
 * Undo/Redo feature for Editor.js.
 *
 * @typedef {Object} Undo
 * @description Feature's initialization class.
 * @property {Object} editor — Editor.js instance object.
 * @property {Number} maxLength - Max amount of changes recorded by the history undoStack.
 * @property {Function} onUpdate - Callback called when the user performs an undo or redo action.
 * @property {Boolean} shouldSaveHistory - Defines if the plugin should save the change in the undoStack
 * @property {Object} initialItem - Initial data object.
 * @property {Object} baseData - Saved data object.
 */
export default class Undo {
  /**
   * @param options — Plugin custom options.
   */
  constructor({
    editor, config = {}, onUpdate, maxLength,
  }) {
    const defaultOptions = {
      maxLength: 30,
      onUpdate() {},
      config: {
        debounceTimer: 200,
        shortcuts: {
          undo: ['CMD+Z'],
          redo: ['CMD+Y', 'CMD+SHIFT+Z'],
        },
      },
    };

    const { blocks, caret } = editor;
    const { configuration } = editor;
    const { holder, defaultBlock } = configuration;
    const defaultShortcuts = defaultOptions.config.shortcuts;
    const { shortcuts: configShortcuts } = config;
    const shortcuts = { ...defaultShortcuts, ...configShortcuts };
    const undo = Array.isArray(shortcuts.undo)
      ? shortcuts.undo
      : [shortcuts.undo];
    const redo = Array.isArray(shortcuts.redo)
      ? shortcuts.redo
      : [shortcuts.redo];
    const defaultDebounceTimer = defaultOptions.config.debounceTimer;
    const { debounceTimer = defaultDebounceTimer } = config;

    this.holder = typeof holder === 'string' ? document.getElementById(holder) : holder;
    this.editor = editor;
    this.defaultBlock = defaultBlock;
    this.blocks = blocks;
    this.caret = caret;
    this.shouldSaveHistory = true;
    this.readOnly = configuration.readOnly;
    this.maxLength = maxLength || defaultOptions.maxLength;
    this.onUpdate = onUpdate || defaultOptions.onUpdate;
    this.config = { debounceTimer, shortcuts: { undo, redo } };
    this.baseData = [];
    this.managerHistory = new ManagerHistory(this.editor);

    const observer = new Observer(
      () => this.registerChange(),
      this.holder,
      this.config.debounceTimer,
    );
    observer.setMutationObserver();

    this.setEventListeners();
    this.initialItem = null;
    this.clear();
    this.createJsonDiffPatchInstance();
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
   * Truncates the history undoStack when it excedes the limit of changes.
   *
   * @param {Object} undoStack  Changes history undoStack.
   * @param {Number} undoStack  Limit of changes recorded by the history undoStack.
   */
  truncate(undoStack, limit) {
    while (undoStack.length > limit) {
      undoStack.shift();
    }
  }

  /**
   * Initializes the undoStack when the user provides initial data.
   *
   * @param {Object} initialItem  Initial data provided by the user.
   */
  initialize(initialItem) {
    const initialData = 'blocks' in initialItem ? initialItem.blocks : initialItem;
    this.caret.setToLastBlock('end', 0);

    const firstElement = { state: initialData, caretIndex: 0 };
    this.initialItem = firstElement;
    this.baseData = initialData;
  }

  /**
   * Clears the history stacks.
   */
  clear() {
    this.undoStack = [];
    this.redoStack = [];
    this.onUpdate();
  }

  /**
   * Creates a jsondiffpatch instance
   */
  createJsonDiffPatchInstance() {
    this.jsonDiffInstance = create({
      objectHash(obj, index) {
        const objRecord = obj;

        if (typeof objRecord._id !== 'undefined') {
          return objRecord._id;
        }
        if (typeof objRecord.id !== 'undefined') {
          return objRecord.id;
        }
        if (typeof objRecord.name !== 'undefined') {
          return objRecord.name;
        }

        return `$$index:${index}`;
      },
    });
  }

  /**
   * Returns true if readOnly was toggled to true
   * @returns {Node} Indirectly shows if readOnly was set to true or false
   */
  setReadOnly() {
    const toolbox = this.holder.querySelector('.ce-toolbox');
    this.readOnly = !toolbox;
  }

  /**
   * Registers the data returned by API's save method into the history undoStack.
   */
  registerChange() {
    this.setReadOnly();
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
   * Checks if the saved data has to be added to the history undoStack.
   *
   * @param {Object} newData  New data to be saved in the history undoStack.
   * @returns {Boolean}
   */
  editorDidUpdate(newData) {
    if (!newData.length) return false;
    if (newData.length !== this.baseData.length) return true;

    return JSON.stringify(this.baseData) !== JSON.stringify(newData);
  }

  /**
   * Adds the saved data in the history undoStack and updates current position.
   */
  async save(state) {
    // With this code we get the caret position in the block
    const index = this.blocks.getCurrentBlockIndex();
    const blockCount = this.blocks.getBlocksCount();
    let indexInState = index;

    if (!state[index]) indexInState -= blockCount - state.length;
    const caretIndex = state[indexInState]
      && (state[indexInState].type === 'paragraph'
        || state[indexInState].type === 'header')
      ? this.getCaretIndex(index)
      : null;

    const lastState = this.jsonDiffInstance.diff(this.baseData, state);

    this.undoStack.push({ state: lastState, caretIndex });
    this.baseData = state;
    this.onUpdate();
  }

  /**
   * Gets the caret position.
   * @param {Number} index is the block index
   * @returns The caret position
   */
  getCaretIndex(index) {
    const blocks = this.holder.getElementsByClassName('ce-block__content');
    const caretBlock = new VanillaCaret(blocks[index].firstChild);

    return caretBlock.getPos();
  }

  /**
   * Inserts a block deleted previously
   * @param {Array} state is the current state according to this.position.
   * @param {Array} compState is the state to compare and know the deleted block.
   * @param {Number} index is the block index in state.
   */
  insertDeletedBlock(state, compState, index) {
    for (let i = 0; i < state.length; i += 1) {
      if (!compState[i] || state[i].id !== compState[i].id) {
        this.blocks.insert(state[i].type, state[i].data, {}, i, true);
        this.caret.setToBlock(index, 'end');
        break;
      }
    }
  }

  /**
   * Returns true if a block was dropped previously
   * @param {Array} state is the current state according to this.position.
   * @param {Array} compState is the state to compare and know the dropped block.
   * @returns {Boolean} true if the block was dropped
   */
  blockWasDropped(state, compState) {
    if (state.length === compState.length) {
      return state.some((block, i) => block.id !== compState[i].id);
    }
    return false;
  }

  /**
   * Returns true if the block has to be deleted because it was skipped previously.
   * @param {Array} state is the current state according to this.position.
   * @param {Array} compState is the state to compare if there was a deleted block.
   * @returns {Boolean} true if a block was inserted previously.
   */
  blockWasSkipped(state, compState) {
    return state.length !== compState.length;
  }

  /**
   * Returns true if the content in a block without the focus was modified.
   * @param {Number} index is the block index in state.
   * @param {Number} compIndex is the index to compare and know if the block was inserted previously
   * @returns true if the content in a block without the focus was modified.
   */
  contentChangedInNoFocusBlock(index, compIndex) {
    return index !== compIndex;
  }

  /**
   * Returns true if a block was deleted previously.
   * @param {Array} state is the current state according to this.position.
   * @param {Array} compState is the state to compare and know if a block was deleted.
   * @returns {Boolean} true if a block was deleted previously.
   */
  blockWasDeleted(state, compState) {
    return state.length > compState.length;
  }

  /**
   * Returns true if the content was copied.
   * @param {Array} state is the current state according to this.position.
   * @param {Array} compState is the state to compare and know if the content was copied.
   * @param {Number} index is the block index in state.
   * @returns {Boolean} true if a block was deleted previously.
   */
  contentWasCopied(state, compState, index) {
    return (
      Object.keys(state[index].data).length === 0
      && JSON.stringify(compState[index + 1]) !== JSON.stringify(state[index + 1])
    );
  }

  /**
   * Decreases the current position and update the respective block in the editor.
   */
  async undo() {
    if (this.canUndo()) {
      this.shouldSaveHistory = false;
      const { state: lastState, caretIndex } = this.undoStack.pop();

      // Add formatter to identify the type of modification
      const jsonPatch = jsonpatchFormatter.format(lastState, this.baseData);

      // Add the Undo state, caret and inverse operation in the Redo undoStack
      this.redoStack.push({ state: lastState, caretIndex, jsonPatch });

      // To build the previous state of 'baseData', removing the changes
      // specified in 'lastState'
      this.jsonDiffInstance.unpatch(this.baseData, lastState);

      // Make the add, remove or replace operation in base to jsonPatch response
      this.managerHistory.delegator(jsonPatch, 'undo');

      this.onUpdate();
    }
  }

  /**
   * Sets the caret position.
   * @param {Number} index is the block index
   * @param {Number} caretIndex is the caret position
   * @param {Array} state is the current state according to this.position.
   */
  setCaretIndex(index, caretIndex) {
    if (caretIndex && caretIndex !== -1) {
      const blocks = this.holder.getElementsByClassName('ce-block__content');
      const caretBlock = new VanillaCaret(blocks[index].firstChild);
      setTimeout(() => caretBlock.setPos(caretIndex), 50);
    } else {
      this.caret.setToBlock(index, 'end');
    }
  }

  /**
   * Inserts new block
   * @param {Array} state is the current state according to this.position.
   * @param {Number} index is the block index
   */
  async insertBlock(state, index) {
    await this.blocks.insert(
      state[index].type,
      state[index].data,
      {},
      index,
      true,
    );
  }

  /**
   * Inserts a block when is skipped and update the previous one if it changed.
   * @param {Array} prevState is the previous state according to this.position.
   * @param {Array} state is the current state according to this.position.
   * @param {Number} index is the block index.
   */
  async insertSkippedBlocks(prevState, state, index) {
    for (let i = prevState.length; i < state.length; i += 1) {
      this.insertBlock(state, i);
    }

    if (
      JSON.stringify(prevState[index - 1]) !== JSON.stringify(state[index - 1])
    ) {
      await this.updateModifiedBlock(state, index);
    }
  }

  /**
   * Updates the passed block or render the state when the content was copied.
   * @param {Array} state is the current state according to this.position.
   * @param {Number} index is the block index.
   */
  async updateModifiedBlock(state, index) {
    const block = state[index - 1];
    if (this.editor.blocks.getById(block.id)) return this.blocks.update(block.id, block.data);
    return this.blocks.render({ blocks: state });
  }

  /**
   * Increases the current position and update the respective block in the editor.
   */
  async redo() {
    if (this.canRedo()) {
      this.shouldSaveHistory = false;
      const { state: lastRedoState, caretIndex, jsonPatch } = this.redoStack.pop();

      // Restore the last redo state in the undo stack
      this.undoStack.push({ state: lastRedoState, caretIndex });

      // To build the next state of 'baseData' applying the changes contained in 'lastRedoState'
      this.jsonDiffInstance.patch(this.baseData, lastRedoState);

      // Make the add, remove or replace operation in base to jsonPatch response
      this.managerHistory.delegator(jsonPatch, 'redo');

      this.onUpdate();
    }
  }

  /**
   * Checks if the history undoStack can perform an undo action.
   *
   * @returns {Boolean}
   */
  canUndo() {
    return !this.readOnly && this.undoStack.length > 0;
  }

  /**
   * Checks if the history undoStack can perform a redo action.
   *
   * @returns {Boolean}
   */
  canRedo() {
    return !this.readOnly && this.redoStack.length > 0;
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

    const letterKey = parsedKeys.includes('shiftKey') && keys.length === 2
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
    const keysUndo = undo.map((undoShortcut) => undoShortcut.replace(/ /g, '').split('+'));
    const keysRedo = redo.map((redoShortcut) => redoShortcut.replace(/ /g, '').split('+'));

    const keysUndoParsed = keysUndo.map((keys) => this.parseKeys(keys));
    const keysRedoParsed = keysRedo.map((keys) => this.parseKeys(keys));

    const twoKeysPressed = (e, keys) => keys.length === 2 && e[keys[0]] && e.key.toLowerCase() === keys[1];
    const threeKeysPressed = (e, keys) => keys.length === 3
      && e[keys[0]]
      && e[keys[1]]
      && e.key.toLowerCase() === keys[2];

    const verifyListTwoKeysPressed = (e, keysList) => keysList.reduce(
      (result, keys) => result || twoKeysPressed(e, keys),
      false,
    );
    const verifyListThreeKeysPressed = (e, keysList) => keysList.reduce(
      (result, keys) => result || threeKeysPressed(e, keys),
      false,
    );

    const pressedKeys = (e, keys, compKeys) => {
      if (
        verifyListTwoKeysPressed(e, keys)
        && !verifyListThreeKeysPressed(e, compKeys)
      ) {
        return true;
      }
      if (verifyListThreeKeysPressed(e, keys)) {
        return true;
      }
      return false;
    };

    const handleUndo = (e) => {
      if (pressedKeys(e, keysUndoParsed, keysRedoParsed)) {
        e.preventDefault();
        this.undo();
      }
    };

    const handleRedo = (e) => {
      if (pressedKeys(e, keysRedoParsed, keysUndoParsed)) {
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
