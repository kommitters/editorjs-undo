import { default as EditorJS, OutputBlockData, OutputData } from '@editorjs/editorjs';
import { EditorJsReady } from './types';
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
    position: number;
    readOnly: boolean | undefined;
    shouldSaveHistory: boolean;
    stack: StackStated[];
    /**
     * @param options — Plugin custom options.
     */
    constructor({ editor, config, onUpdate, maxLength, }: UndoConstructor);
    /**
     * Notify core that read-only mode is suppoorted
     *
     * @returns {boolean}
     */
    static get isReadOnlySupported(): boolean;
    /**
     * Truncates the history stack when it excedes the limit of changes.
     *
     * @param {Object} stack  Changes history stack.
     * @param {Number} stack  Limit of changes recorded by the history stack.
     */
    truncate(stack: StackStated[], limit: number): void;
    /**
     * Initializes the stack when the user provides initial data.
     *
     * @param {Object} initialItem  Initial data provided by the user.
     */
    initialize(initialItem: OutputData | OutputBlockData[]): void;
    /**
     * Clears the history stack.
     */
    clear(): void;
    /**
     * Returns true if readOnly was toggled to true
     * @returns {Node} Indirectly shows if readOnly was set to true or false
     */
    setReadOnly(): void;
    /**
     * Registers the data returned by API's save method into the history stack.
     */
    registerChange(): void;
    /**
     * Checks if the saved data has to be added to the history stack.
     *
     * @param {Object} newData  New data to be saved in the history stack.
     * @returns {Boolean}
     */
    editorDidUpdate(newData: OutputBlockData[]): boolean;
    /**
     * Adds the saved data in the history stack and updates current position.
     */
    save(state: OutputBlockData[]): void;
    /**
     * Gets the caret position.
     * @param {Number} index is the block index
     * @returns The caret position
     */
    getCaretIndex(index: number): number | null;
    /**
     * Decreases the current position and update the respective block in the editor.
     */
    undo(): Promise<void>;
    /**
     * Sets the caret position.
     * @param {Number} index is the block index
     * @param {Number} caretIndex is the caret position
     * @param {Array} state is the current state according to this.position.
     */
    setCaretIndex(index: number, caretIndex: number): void;
    /**
     * Inserts new block
     * @param {Array} state is the current state according to this.position.
     * @param {Number} index is the block index
     */
    insertBlock(state: OutputBlockData[], index: number): void;
    /**
     * Updates the passed block or render the state when the content was copied.
     * @param {Array} state is the current state according to this.position.
     * @param {Number} index is the block index.
     */
    updateModifiedBlock(state: OutputBlockData[], index: number): Promise<void | import('@editorjs/editorjs').BlockAPI>;
    /**
     * Increases the current position and update the respective block in the editor.
     */
    redo(): Promise<void>;
    switchState(stateToApply: OutputBlockData[], stateToCompare: OutputBlockData[]): Promise<void>;
    /**
     * Checks if the history stack can perform an undo action.
     *
     * @returns {Boolean}
     */
    canUndo(): boolean;
    /**
     * Checks if the history stack can perform a redo action.
     *
     * @returns {Boolean}
     */
    canRedo(): boolean;
    /**
     * Returns the number of changes recorded in the history stack.
     *
     * @returns {Number}
     */
    count(): number;
    /**
     * Parses the keys passed in the shortcut property to accept CMD,ALT and SHIFT
     *
     * @param {Array} keys are the keys passed in shortcuts in config
     * @returns {Array}
     */
    parseKeys(keys: string[]): string[];
    /**
     * Sets events listeners to allow keyboard actions support
     */
    setEventListeners(): void;
}
export {};
