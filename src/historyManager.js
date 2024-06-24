/**
 * @typedef HistoryManager
 * @property {Object} operations - Object that contains the allowed operations and uses the action
 * that invoked the delegator as a key to define which method should be used next
 * @description Core functions for handling the update of editor blocks based on the history log
*/
export default class HistoryManager {
  constructor() {
    this.operations = {
      'add': this.add,
      'remove': this.remove,
      'move': this.move,
      'replace': this.replace,
    };
  }

  /**
   *
   * @param {Array} jsonPatchElement - Formatted changes gotten between the state and baseData
   * @param {Object} blocks — API to make operations on the editor blocks
   * @param {String} actionType - Indicates the action that invoked the delegator ('undo' or 'redo')
   * @param {String} state - Last state saved to restore in the editor
   * @description Adds blocks in the editor based on the jsonPatch add operation
  */
  async add({
    jsonPatchElement,
    blocks,
    actionType,
    state,
  }) {
    const index = jsonPatchElement.path.split('/')[1];
    const value = actionType === 'undo' ? state[`_${index}`][0] : jsonPatchElement.value;

    await blocks.insert(value.type, value.data, {}, parseInt(index, 10), true);
  }

  /**
   * @param {Array} jsonPatchElement - Formatted changes gotten between the state and baseData
   * @param {Object} blocks — API to make operations on the editor blocks
   * @param {Object} caret — API to send the focus to a specific block in the editor
   * @param {String} actionType - Indicates the action that invoked the delegator ('undo' or 'redo')
   * @description Updates blocks in the editor based on jsonpatch move operation
  */
  async move({
    jsonPatchElement,
    blocks,
    caret,
    actionType,
  }) {
    const { path, from: fromPath } = jsonPatchElement;
    const from = path.split('/')[1];
    const to = fromPath.split('/')[1];
    const focus = actionType === 'undo' ? to - 1 : to;

    await blocks.move(to, from);
    await caret.setToBlock(focus, 'end');
  }

  /**
   * @param {Array} jsonPatchElement - Formatted changes gotten between the state and baseData
   * @param {Object} blocks — API to make operations on the editor blocks
   * @description Removes blocks from the editor based on the jsonpatch remove operation
  */
  async remove({ jsonPatchElement, blocks }) {
    const { path } = jsonPatchElement;
    const index = path.split('/')[1];

    await blocks.delete(index);
  }

  /**
   * @param {Array} jsonPatchElement - Formatted changes gotten between the state and baseData
   * @param {Object} blocks — API to make operations on the editor blocks
   * @param {Object} caret — API to send the focus to a specific block in the editor
   * @param {Object} baseData - Copy of the saved data object.
   * @description Updates blocks in the editor based on the jsonPatch replace operation
  */
  async replace({
    jsonPatchElement,
    blocks,
    caret,
    baseData,
  }) {
    const { path } = jsonPatchElement;
    const index = path.split('/')[1];

    const { id, data } = await blocks.getBlockByIndex(index).save();
    const { data: oldData } = baseData[index];
    const updatedData = Object.assign(data, oldData);

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
   * @param {Object} baseData - Copy of the saved data object.
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
    jsonPatchArray.forEach(async (jsonPatchElement) => {
      if (typeof this.operations[jsonPatchElement.op] !== 'function') {
        throw new Error('Invalid operation.');
      }

      await this.operations[jsonPatchElement.op]({
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
