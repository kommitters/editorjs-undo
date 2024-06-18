/**
 * @typedef HistoryManager
 * @property {Object} operations - Object that contains the allowed operations and uses the action
 * that invoked the delegator as a key to define which method should be used next
 * @description Core functions for handling the update of editor blocks based on the history log
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
   *
   * @param {Array} jsonPatchElement - Formatted changes gotten between the state and baseData
   * @param {Object} blocks — API to make operations on the editor blocks
   * @param {Object} caret — API to send the focus to a specific block in the editor
   * @param {String} actionType - Indicates the action that invoked the delegator ('undo' or 'redo')
   * @param {String} state - Last state saved to restore in the editor
   * @description Adds blocks in the editor based on the jsonPatch add operation
  */
  async add({
    jsonPatchElement,
    blocks,
    caret,
    actionType,
    state,
  }) {
    const index = jsonPatchElement.path.split('/')[1];
    const value = actionType === 'undo' ? state[`_${index}`][0] : jsonPatchElement.value;
    const correctedIndex = index === '0' ? parseInt(index, 2) : index;

    // console.log('data add:', value);

    await blocks.insert(value.type, value.data, {}, correctedIndex, true);
    await caret.setToBlock(index, 'end');
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
    const { path } = jsonPatchElement;
    const index = path.split('/')[1];

    await blocks.delete(index);
  }

  /**
   * @param {Array} jsonPatchElement - Formatted changes gotten between the state and baseData
   * @param {Object} blocks — API to make operations on the editor blocks
   * @param {Object} caret — API to send the focus to a specific block in the editor
   * @description Updates blocks in the editor based on the jsonPatch replace operation
  */
  async replace({
    jsonPatchElement, blocks, caret, baseData,
  }) {
    // Actions to replace the jsonPatchElement in the editor
    const { path } = jsonPatchElement;
    const index = path.split('/')[1];

    const { id, data } = await blocks.getBlockByIndex(index).save();
    const { data: oldData } = baseData[index];
    const updatedData = Object.assign(data, oldData);
    // console.log('data replace:', updatedData);

    await blocks.update(id, updatedData);
    await caret.setToBlock(index, 'end');
  }

  /**
   *
   * @param {Array} jsonPatchArray - Set of formatted changes gotten between the state and baseData
   * @param {Object} blocks — API to make operations on the editor blocks
   * @param {Object} caret — API to send the focus to a specific block in the editor
   * @param {String} actionType - Indicates the action that invoked the delegator ('undo' or 'redo')
   * @param {String} state - Last state saved to restore in the editor
   * @description Iterates over the jsonPatchArray and check what are the actionType and operation
   * to call the correct function
   */

  async delegator({
    jsonPatchArray,
    blocks,
    caret,
    actionType,
    state,
    baseData,
  }) {
    // console.log('baseDAta', baseData);
    // console.log('jsonpatharray:', jsonPatchArray);

    jsonPatchArray.forEach(async (jsonPatchElement) => {
      if (typeof this.operations[`${jsonPatchElement.op}|${actionType}`] !== 'function') {
        throw new Error('Invalid operation.');
      }

      await this.operations[`${jsonPatchElement.op}|${actionType}`]({
        jsonPatchElement,
        blocks,
        caret,
        actionType,
        state,
        baseData,
      });
    });
  }
}
