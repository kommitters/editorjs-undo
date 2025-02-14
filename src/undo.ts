import type EditorJS from '@editorjs/editorjs';

import deepEqual from 'deep-equal';
import VanillaCaret from 'vanilla-caret-js';
import Observer from './observer';
import { EditorJsReady } from './types';
import { OutputBlockData, OutputData } from '@editorjs/editorjs';
import { Blocks, Caret } from '@editorjs/editorjs/types/api';

export type UndoConfig = {
  debounceTimer: number;
  shortcuts: {
    redo: string[];
    undo: string[];
  };
};

export type UndoSettings = {
  debounceTimer?: number;
  shortcuts?: {
    redo?: string[] | string;
    undo?: string[] | string;
  };
};

type SpecialKeys = 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey';

interface StackStated {
  caretIndex?: null | number;
  index: number;
  state: OutputBlockData[];
}

export type UndoConstructor = {
  config?: UndoSettings;
  maxLength?: number;
  onUpdate?: () => void;
  editor: EditorJS;
};

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
  blocks: Blocks;
  caret: Caret;
  config: UndoConfig;
  defaultBlock: string | undefined;
  editor: EditorJsReady;
  holder: HTMLElement | null | undefined;
  initialItem: null | StackStated;
  maxLength: number;
  onUpdate: () => void;
  position = 0;
  readOnly: boolean | undefined;
  shouldSaveHistory: boolean;
  stack: StackStated[] = [];

  /**
   * @param options — Plugin custom options.
   */
  constructor({ editor, config = {}, onUpdate, maxLength }: UndoConstructor) {
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

    const editorTyped = editor as EditorJsReady;

    const { blocks, caret } = editorTyped;
    const { configuration } = editorTyped;
    const { holder, defaultBlock } = configuration;
    const defaultShortcuts = defaultOptions.config.shortcuts;
    const { shortcuts: configShortcuts } = config;
    const shortcuts = { ...defaultShortcuts, ...configShortcuts };
    const undo = Array.isArray(shortcuts.undo)
      ? (shortcuts.undo as string[])
      : [shortcuts.undo];
    const redo = Array.isArray(shortcuts.redo)
      ? (shortcuts.redo as string[])
      : [shortcuts.redo];
    const defaultDebounceTimer = defaultOptions.config.debounceTimer;
    const { debounceTimer = defaultDebounceTimer } = config;

    this.holder =
      typeof holder === 'string' ? document.getElementById(holder) : holder;
    this.editor = editorTyped;
    this.defaultBlock = defaultBlock;
    this.blocks = blocks;
    this.caret = caret;
    this.shouldSaveHistory = true;
    this.readOnly = configuration.readOnly;
    this.maxLength = maxLength || defaultOptions.maxLength;
    this.onUpdate = onUpdate || defaultOptions.onUpdate;

    this.config = { debounceTimer, shortcuts: { undo, redo } };

    if (this.holder) {
      const observer = new Observer(
        () => this.registerChange(),
        this.holder,
        this.config.debounceTimer
      );
      observer.setMutationObserver();
    }

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
  truncate(stack: StackStated[], limit: number) {
    while (stack.length > limit) {
      stack.shift();
    }
  }

  /**
   * Initializes the stack when the user provides initial data.
   *
   * @param {Object} initialItem  Initial data provided by the user.
   */
  initialize(initialItem: OutputData | OutputBlockData[]) {
    const initialData =
      'blocks' in initialItem ? initialItem.blocks : initialItem;
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
      : [
          {
            index: 0,
            state: [{ type: this.defaultBlock, data: {} }],
          } as StackStated,
        ];
    this.position = 0;
    this.onUpdate();
  }

  /**
   * Returns true if readOnly was toggled to true
   * @returns {Node} Indirectly shows if readOnly was set to true or false
   */
  setReadOnly() {
    const toolbox = this.holder?.querySelector('.ce-toolbox');
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
  editorDidUpdate(newData: OutputBlockData[]) {
    const { state } = this.stack[this.position];
    if (!newData.length) return false;
    if (newData.length !== state.length) return true;

    return JSON.stringify(state) !== JSON.stringify(newData);
  }

  /**
   * Adds the saved data in the history stack and updates current position.
   */
  save(state: OutputBlockData[]) {
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
      state[indexInState] &&
      (state[indexInState].type === 'paragraph' ||
        state[indexInState].type === 'header')
        ? this.getCaretIndex(index)
        : null;
    this.stack.push({ index: indexInState, state, caretIndex });

    this.position += 1;
    this.onUpdate();
  }

  /**
   * Gets the caret position.
   * @param {Number} index is the block index
   * @returns The caret position
   */
  getCaretIndex(index: number) {
    const blocks = this.holder?.getElementsByClassName('ce-block__content');
    if (blocks) {
      const caretBlock = new VanillaCaret(blocks[index].firstChild);
      return caretBlock.getPos();
    }
    return null;
  }

  /**
   * Decreases the current position and update the respective block in the editor.
   */
  async undo() {
    if (this.canUndo()) {
      const { state: currentState } = this.stack[this.position];

      this.position -= 1;
      this.shouldSaveHistory = false;
      const { caretIndex, index, state: prevState } = this.stack[this.position];

      await this.switchState(prevState, currentState);
      this.onUpdate();

      const block = this.blocks.getBlockByIndex(index);
      if (block) {
        if (caretIndex) this.setCaretIndex(index, caretIndex);
        else this.caret.setToBlock(index, 'end');
      }
    }
  }

  /**
   * Sets the caret position.
   * @param {Number} index is the block index
   * @param {Number} caretIndex is the caret position
   * @param {Array} state is the current state according to this.position.
   */
  setCaretIndex(index: number, caretIndex: number) {
    const blocks = this.holder?.getElementsByClassName('ce-block__content');
    if (caretIndex && caretIndex !== -1 && blocks) {
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
  insertBlock(state: OutputBlockData[], index: number) {
    this.blocks.insert(state[index].type, state[index].data, {}, index, true);
  }

  /**
   * Updates the passed block or render the state when the content was copied.
   * @param {Array} state is the current state according to this.position.
   * @param {Number} index is the block index.
   */
  async updateModifiedBlock(state: OutputBlockData[], index: number) {
    const block = state[index];
    if (block.id && this.editor.blocks.getById(block.id))
      return this.blocks.update(block.id, block.data);
    return this.blocks.render({ blocks: state });
  }

  /**
   * Increases the current position and update the respective block in the editor.
   */
  async redo() {
    if (this.canRedo()) {
      this.position += 1;
      this.shouldSaveHistory = false;
      const { caretIndex, index, state: nextState } = this.stack[this.position];
      const { state: currentState } = this.stack[this.position - 1];

      await this.switchState(nextState, currentState);
      this.onUpdate();

      const block = this.blocks.getBlockByIndex(index);
      if (block) {
        if (caretIndex) this.setCaretIndex(index, caretIndex);
        else this.caret.setToBlock(index, 'end');
      }
    }
  }

  async switchState(
    stateToApply: OutputBlockData[],
    stateToCompare: OutputBlockData[]
  ) {
    stateToCompare
      .reduce<number[]>(
        (acc, x, idx) =>
          stateToApply.find((y) => y.id === x.id) ? acc : [...acc, idx],
        []
      )
      .sort((a, b) => b - a)
      .forEach((i) => this.blocks.delete(i));

    stateToApply
      .reduce<number[]>(
        (acc, x, idx) =>
          stateToCompare.find((y) => y.id === x.id) ? acc : [...acc, idx],
        []
      )
      .forEach((i) => this.insertBlock(stateToApply, i));

    const idxToUpdate = stateToApply.reduce<number[]>((acc, x, idxNew) => {
      const idx = stateToCompare.findIndex((y) => y.id === x.id);
      return idx > -1 && !deepEqual(x, stateToCompare[idx])
        ? [...acc, idxNew]
        : acc;
    }, []);

    await Promise.all(
      idxToUpdate.map(async (idx) => {
        const rendered = await this.updateModifiedBlock(stateToApply, idx);
        return rendered;
      })
    );
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

  parseKeys(keys: string[]) {
    const specialKeys: Record<string, SpecialKeys> = {
      CMD: /(Mac)/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey',
      ALT: 'altKey',
      SHIFT: 'shiftKey',
    };
    const parsedKeys: string[] = keys
      .slice(0, -1)
      .map((key) => specialKeys[key]);

    const letterKey =
      parsedKeys.includes('shiftKey') && keys.length === 2
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
    const { redo, undo } = shortcuts;
    const keysUndo = undo.map((undoShortcut) =>
      undoShortcut.replace(/ /g, '').split('+')
    );
    const keysRedo = redo.map((redoShortcut) =>
      redoShortcut.replace(/ /g, '').split('+')
    );

    const keysUndoParsed = keysUndo.map((keys) => this.parseKeys(keys));
    const keysRedoParsed = keysRedo.map((keys) => this.parseKeys(keys));

    const twoKeysPressed = (e: KeyboardEvent, keys: string[]) =>
      keys.length === 2 &&
      e[keys[0] as SpecialKeys] &&
      e.key.toLowerCase() === keys[1];
    const threeKeysPressed = (e: KeyboardEvent, keys: string[]) =>
      keys.length === 3 &&
      e[keys[0] as SpecialKeys] &&
      e[keys[1] as SpecialKeys] &&
      e.key.toLowerCase() === keys[2];

    const verifyListTwoKeysPressed = (e: KeyboardEvent, keysList: string[][]) =>
      keysList.reduce(
        (result, keys) => result || twoKeysPressed(e, keys),
        false
      );
    const verifyListThreeKeysPressed = (
      e: KeyboardEvent,
      keysList: string[][]
    ) =>
      keysList.reduce(
        (result, keys) => result || threeKeysPressed(e, keys),
        false
      );

    const pressedKeys = (
      e: KeyboardEvent,
      keys: string[][],
      compKeys: string[][]
    ) => {
      if (
        verifyListTwoKeysPressed(e, keys) &&
        !verifyListThreeKeysPressed(e, compKeys)
      ) {
        return true;
      }
      if (verifyListThreeKeysPressed(e, keys)) {
        return true;
      }
      return false;
    };

    const handleUndo = (e: KeyboardEvent) => {
      if (pressedKeys(e, keysUndoParsed, keysRedoParsed)) {
        e.preventDefault();
        void this.undo();
      }
    };

    const handleRedo = (e: KeyboardEvent) => {
      if (pressedKeys(e, keysRedoParsed, keysUndoParsed)) {
        e.preventDefault();
        void this.redo();
      }
    };

    if (holder) {
      const handleDestroy = () => {
        holder.removeEventListener('keydown', handleUndo);
        holder.removeEventListener('keydown', handleRedo);
      };

      holder.addEventListener('keydown', handleUndo);
      holder.addEventListener('keydown', handleRedo);
      holder.addEventListener('destroy', handleDestroy);
    }
  }
}
