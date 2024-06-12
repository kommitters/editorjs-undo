/**
 * @typedef ManagerHistory
 * @description Core functions to handle the update of editorjs blocks in base to history log
 * @property {Object} editorjs — Editor.js instance object.
 */
export default class ManagerHistory {
  /**
   * @param editorjs - Instance of editorjs to handle history
   */
  constructor(editorjs) {
    this.editorjs = editorjs;
    this.operations = {
      'add|redo': this.add,
      'add|undo': this.remove,
      'remove|redo': this.remove,
      'remove|undo': this.add,
      'replace|redo': this.replace,
      'replace|undo': this.replace,
    };
  }

  /**
   * @param {Object} jsonpatchElement
   * @description Add blocks to editorjs on base to jsonpatch add operation
  */
  async add(jsonpatchElement) {
    // Actions to restore the jsonpatchElement in the editor
  }

  /**
   * @param {Object} jsonpatchElement
   * @description Remove blocks to editorjs on base to jsonpatch remove operation
  */
  async remove(jsonpatchElement) {
    // Actions to remove the jsonpatchElement from the editor
  }

  /**
   * @param {Object} jsonpatchElement
   * @description Update blocks to editorjs on base to jsonpatch replace operation
  */
  async replace(jsonpatchElement) {
    // Actions to replace the jsonpatchElement in the editor
  }

  /**
   *
   * @param {Array} jsonpatchArray
   * @param {String} actionType
   * @description Loop the jsonpatchArray and check were the actionType and operation
   * to call the right function
   */

  delegator(jsonpatchArray, actionType) {
    jsonpatchArray.forEach(async (jsonpatchElement) => {
      if (typeof this.operations[`${jsonpatchElement.op}|${actionType}`] !== 'function') {
        throw new Error('Invalid operation.');
      }
      this.operations[`${jsonpatchElement.op}|${actionType}`](jsonpatchElement);
    });
  }
}
