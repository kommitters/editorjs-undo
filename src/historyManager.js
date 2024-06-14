/**
 * @typedef HistoryManager
 * @description Core functions to handle the update of editorjs blocks based on history log
 * @property {Object} editor — Editor.js instance object.
 */
export default class HistoryManager {
  constructor(editor) {
    this.editor = editor;
    this.operations = {
      'add|redo': this.add,
      'add|undo': this.remove,
      'move|redo': this.move,
      'move|undo': this.move,
      'remove|redo': this.remove,
      'remove|undo': this.add,
      'replace|redo': this.replace,
      'replace|undo': this.replace,
    };
  }

  /**
   * @param {Object} jsonPatchElement
   * @description Add blocks in the editor based on the jsonPatch add operation
  */
  async add(jsonPatchElement) {
    // Actions to restore the jsonPatchElement in the editor
  }

  /**
   * @param {Object} jsonPatchElement
   * @description Update blocks in the editor based on the jsonpatch move operation
  */
  async move(jsonPatchElement) {
    // Actions to move the jsonPatchElement in the editor
  }

  /**
   * @param {Object} jsonPatchElement
   * @description Remove blocks from the editor based on the jsonpatch remove operation
  */
  async remove(jsonPatchElement) {
    // Actions to remove the jsonPatchElement from the editor
  }

  /**
   * @param {Object} jsonPatchElement
   * @description Update blocks in the editor based on the jsonPatch replace operation
  */
  async replace(jsonPatchElement) {
    // Actions to replace the jsonPatchElement in the editor
  }

  /**
   *
   * @param {Array} jsonPatchArray
   * @param {String} actionType
   * @description Iterate on the jsonPatchArray and check what are the actionType and operation
   * to call the right function
   */

  delegator(jsonPatchArray, actionType) {
    jsonPatchArray.forEach(async (jsonPatchElement) => {
      if (typeof this.operations[`${jsonPatchElement.op}|${actionType}`] !== 'function') {
        throw new Error('Invalid operation.');
      }
      this.operations[`${jsonPatchElement.op}|${actionType}`](jsonPatchElement);
    });
  }
}
