import VanillaCaret from "vanilla-caret-js";
import Observer from "./observer";

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
  constructor({ editor, config = {}, onUpdate, maxLength }) {
    const defaultOptions = {
      maxLength: 30,
      onUpdate() {},
      config: {
        debounceTimer: 200,
        shortcuts: {
          undo: "CMD+Z",
          redo: "CMD+Y",
        },
      },
    };

    const { blocks, caret } = editor;
    const { configuration } = editor;
    const { holder } = configuration;
    const defaultShortcuts = defaultOptions.config.shortcuts;
    const { shortcuts = defaultShortcuts } = config;
    const defaultDebounceTimer = defaultOptions.config.debounceTimer;
    const { debounceTimer = defaultDebounceTimer } = config;

    this.holder =
      typeof holder === "string" ? document.getElementById(holder) : holder;
    this.editor = editor;
    this.blocks = blocks;
    this.caret = caret;
    this.shouldSaveHistory = true;
    this.readOnly = configuration.readOnly;
    this.maxLength = maxLength || defaultOptions.maxLength;
    this.onUpdate = onUpdate || defaultOptions.onUpdate;
    this.config = { debounceTimer, shortcuts };

    const observer = new Observer(
      () => this.registerChange(),
      this.holder,
      this.config.debounceTimer
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
    const initialData =
      "blocks" in initialItem ? initialItem.blocks : initialItem;
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
      : [{ index: 0, state: [{ type: "paragraph", data: { text: "" } }] }];
    this.position = 0;
    this.onUpdate();
  }

  /**
   * returns true if readOnly was toggled to true
   * @returns {Node} Indirectly shows if readOnly was set to true or false
   */
  setReadOnly() {
    const toolbox = document.querySelector(".ce-toolbox");
    this.readOnly = !toolbox;
  }

  /**
   * Registers the data returned by API's save method into the history stack.
   */
  registerChange() {
    this.setReadOnly();
    if (!this.readOnly) {
      if (this.editor && this.editor.save && this.shouldSaveHistory) {
        this.editor.save().then((savedData) => {
          if (this.editorDidUpdate(savedData.blocks))
            this.save(savedData.blocks);
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

    const index = this.blocks.getCurrentBlockIndex();
    const blockCount = this.blocks.getBlocksCount();
    let indexInState = index;

    if (!state[index]) indexInState -= blockCount - state.length;
    const caretIndex =
      state[indexInState].type === "paragraph" ||
      state[indexInState].type === "header"
        ? this.getCaretIndex(index)
        : null;
    this.stack.push({ index: indexInState, state, caretIndex });
    this.position += 1;
    this.onUpdate();
  }

  /**
   * get the caret position.
   * @param {Number} index is the block index
   * @returns The caret position
   */
  getCaretIndex(index) {
    const blocks = document.getElementsByClassName("ce-block__content");
    const caretBlock = new VanillaCaret(blocks[index].firstChild);

    return caretBlock.getPos();
  }

  /**
   * insert a block deleted previously
   * @param {Array} state is the current state according to this.position.
   * @param {Array} compState is the state to compare and know the deleted block.
   * @param {Number} index is the block index in state.
   */
  insertDeletedBlock(state, compState, index) {
    for (let i = 0; i < state.length; i += 1) {
      if (!compState[i] || state[i].id !== compState[i].id) {
        this.blocks.insert(state[i].type, state[i].data, {}, i, true);
        this.caret.setToBlock(index, "end");
        break;
      }
    }
  }

  /**
   * return true if a block was dropped previously
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
   * return true if the block has to be deleted becuase it was skipped previously.
   * @param {Number} index is the block index in state.
   * @param {Number} compIndex is the index to compare and know if the block was inserted previously
   * @param {Array} state is the current state according to this.position.
   * @param {Array} compState is the stato to compare if there was a deleted block.
   * @returns {Boolean} true if a block was inserted previously.
   */
  blockWasSkipped(index, compIndex, state, compState) {
    return index < compIndex && state.length !== compState.length;
  }

  /**
   * return true if the content in a block without the focus was modified.
   * @param {Number} index is the block index in state.
   * @param {Number} compIndex is the index to compare and know if the block was inserted previously
   * @returns true if the content in a block without the focus was modified.
   */
  contentChangedInNoFocusBlock(index, compIndex) {
    return index !== compIndex;
  }

  /**
   * returns true if a block was deleted previously.
   * @param {Array} state is the current state according to this.position.
   * @param {Array} compState is the state to compare and know if a block was deleted.
   * @returns {Boolean} true if a block was deleted previously.
   */
  blockWasDeleted(state, compState) {
    return state.length > compState.length;
  }

  /**
   * Decreases the current position and update the respective block in the editor.
   */
  undo() {
    if (this.canUndo() && this.position >= 0) {
      this.position -= 1;
      this.shouldSaveHistory = false;
      let { index } = this.stack[(this.position)];
      const { state, caretIndex } = this.stack[this.position];
      const { index: nextIndex, state: nextState } =
        this.stack[this.position];
      this.onUpdate();
      const blockCount = this.blocks.getBlocksCount();

      if (!state[index]) {
        index -= 1;
        this.stack[this.position].index = index;
      }

      if (this.blockWasDeleted(state, nextState)) {
        this.insertDeletedBlock(state, nextState, index);
      } else if (this.blockWasSkipped(index, nextIndex, state, nextState)) {
        this.blocks.delete();
        this.caret.setToBlock(index, "end");
      } else if (blockCount > state.length) {
        this.blocks
          .render({ blocks: state })
          .then(() => this.setCaretIndex(index, caretIndex));
      } else if (this.blockWasDropped(state, nextState)) {
        this.blocks
          .render({ blocks: state })
          .then(() => this.caret.setToBlock(index, "end"));
      } else if (this.contentChangedInNoFocusBlock(index, nextIndex)) {
        const { id } = this.blocks.getBlockByIndex(nextIndex);

        this.blocks.update(id, state[nextIndex].data);
        this.setCaretIndex(index, caretIndex);
      }

      const block = this.blocks.getBlockByIndex(index);
      if (block) {
        this.blocks.update(block.id, state[index].data);
        this.setCaretIndex(index, caretIndex);
      }
    }
  }

  /**
   * Set the caret position.
   * @param {Number} index is the block index
   * @param {Number} caretIndex is the caret position
   * @param {Array} state is the current state according to this.position.
   */
  setCaretIndex(index, caretIndex) {
    if (caretIndex && caretIndex !== -1) {
      const blocks = document.getElementsByClassName("ce-block__content");
      const caretBlock = new VanillaCaret(blocks[index].firstChild);

      caretBlock.setPos(caretIndex);
    } else {
      this.caret.setToBlock(index, "end");
    }
  }

  /**
   * Insert new block
   * @param {Array} state is the current state according to this.position.
   * @param {Number} index is the block index
   */
  insertBlock(state, index) {
    this.blocks.insert(
      state[index].type,
      state[index].data,
      {},
      index,
      true,
    );
  }

  /**
   * Insert a block when is skipped
   * @param {Number} prevStateLength is the previous state according to this.position.
   * @param {Array} state is the current state according to this.position.
   * @returns 
   */
  insertSkippedBlocks(prevStateLength, state) {
    for (let i = prevStateLength; i < state.length; i += 1) {
      this.insertBlock(state, i);
    }
  }

  /**
   * Increases the current position and update the respective block in the editor.
   */
  redo() {
    if (this.canRedo()) {
      this.position += 1;
      this.shouldSaveHistory = false;
      const { index, state, caretIndex } = this.stack[(this.position)];
      const { index: prevIndex, state: prevState } =
        this.stack[this.position - 1];

      if (this.blockWasDeleted(prevState, state)) {
        this.blocks.delete();
        this.caret.setToBlock(index, "end");
      } else if (this.blockWasSkipped(prevIndex, index, state, prevState)) {
        this.insertSkippedBlocks(prevState.length, state);
        this.caret.setToBlock(index, 'end');
      } else if (this.blockWasDropped(state, prevState) && this.position !== 1) {
        this.blocks
          .render({ blocks: state })
          .then(() => this.caret.setToBlock(index, "end"));
      }

      this.onUpdate();
      const block = this.blocks.getBlockByIndex(index);
      if (block) {
        this.blocks.update(block.id, state[index].data);
        this.setCaretIndex(index, caretIndex);
      }
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
      CMD: /(Mac)/i.test(navigator.platform) ? "metaKey" : "ctrlKey",
      ALT: "altKey",
      SHIFT: "shiftKey",
    };
    const parsedKeys = keys.slice(0, -1).map((key) => specialKeys[key]);

    const letterKey =
      parsedKeys.includes("shiftKey") && keys.length === 2
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
    const keysUndo = undo.replace(/ /g, "").split("+");
    const keysRedo = redo.replace(/ /g, "").split("+");

    const keysUndoParsed = this.parseKeys(keysUndo);
    const keysRedoParsed = this.parseKeys(keysRedo);

    const twoKeysPressed = (e, keys) =>
      keys.length === 2 && e[keys[0]] && e.key === keys[1];
    const threeKeysPressed = (e, keys) =>
      keys.length === 3 && e[keys[0]] && e[keys[1]] && e.key === keys[2];

    const pressedKeys = (e, keys, compKeys) => {
      if (twoKeysPressed(e, keys) && !threeKeysPressed(e, compKeys)) {
        return true;
      }
      if (threeKeysPressed(e, keys)) {
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
      holder.removeEventListener("keydown", handleUndo);
      holder.removeEventListener("keydown", handleRedo);
    };

    holder.addEventListener("keydown", handleUndo);
    holder.addEventListener("keydown", handleRedo);
    holder.addEventListener("destroy", handleDestroy);
  }
}
