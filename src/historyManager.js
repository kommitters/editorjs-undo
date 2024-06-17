/**
 * @typedef HistoryManager
 * @description Core functions for handling the update of editor blocks based on the history log
 * @property {Object} operations - Object that contains the allowed operations and uses the action
 * that invoked the delegator as a key to define which method should use next
*/
export default class HistoryManager {
  constructor() {
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
   * @param {Array} jsonPatchElement - Formatted changes gotten between the state and baseData
   * @param {Object} blocks — API to make operations on the editor blocks
   * @description Updates blocks in the editor based on jsonpatch move operation
  */
  async move({ jsonPatchElement, blocks }) {
    // Actions to move the jsonPatchElement in the editor
  }

  /**
   * @param {Array} jsonPatchElement - Formatted changes gotten between the state and baseData
   * @param {Object} blocks — API to make operations on the editor blocks
   * @description Removes blocks from the editor based on the jsonpatch remove operation
  */
  async remove({ jsonPatchElement, blocks }) {
    // Actions to remove the jsonPatchElement from the editor
  }

  /**
   * @param {Array} jsonPatchElement - Formatted changes gotten between the state and baseData
   * @param {Object} blocks — API to make operations on the editor blocks
   * @description Updates blocks in the editor based on the jsonPatch replace operation
  */
  async replace({ jsonPatchElement, blocks }) {
    // Actions to replace the jsonPatchElement in the editor
  }

  /**
   *
   * @param {Array} jsonPatchArray - Set of formatted changes gotten between the state and baseData
   * @param {Object} blocks — API to make operations on the editor blocks
   * @param {String} actionType - Indicates the action that invoked the delegator ('undo' or 'redo')
   * @param {String} state - Last state saved to restore in the editor
   * @description Iterates over the jsonPatchArray and check what are the actionType and operation
   * to call the correct function
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
