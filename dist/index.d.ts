import type EditorJS from '@editorjs/editorjs';
interface EditorJSUndoOptions {
    editor: EditorJS;
    maxLength: number;
    onUpdate: Function;
}
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
    private editor;
    private initialItem;
    private maxLength;
    private position;
    private shouldSaveHistory;
    private stack;
    private onUpdate;
    /**
     * @param options — Plugin custom options.
     */
    constructor(options: EditorJSUndoOptions);
    /**
     * Truncates the history stack when it excedes the limit of changes.
     *
     * @param {Object} stack  Changes history stack.
     * @param {Number} stack  Limit of changes recorded by the history stack.
     */
    private truncate;
    /**
     * Initializes the stack when the user provides initial data.
     *
     * @param {Object} initialItem  Initial data provided by the user.
     */
    initialize(initialItem: any): void;
    /**
     * Clears the history stack.
     */
    private clear;
    /**
     * Registers the data returned by API's save method into the history stack.
     */
    private registerChange;
    /**
     * Checks if the saved data has to be added to the history stack.
     *
     * @param {Object} newData  New data to be saved in the history stack.
     * @returns {Boolean}
     */
    private editorDidUpdate;
    /**
     * Adds the saved data in the history stack and updates current position.
     */
    private save;
    /**
     * Decreases the current position and renders the data in the editor.
     */
    private undo;
    /**
     * Increases the current position and renders the data in the editor.
     */
    private redo;
    /**
     * Checks if the history stack can perform an undo action.
     *
     * @returns {Boolean}
     */
    private canUndo;
    /**
     * Checks if the history stack can perform a redo action.
     *
     * @returns {Boolean}
     */
    private canRedo;
    /**
     * Returns the number of changes recorded in the history stack.
     *
     * @returns {Number}
     */
    private count;
    /**
     * Sets events listeners to allow keyboard actions support.
     */
    private setEventListeners;
}
export { EditorJSUndoOptions };
