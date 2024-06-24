import { applyPatch } from 'json-joy/lib/json-patch';
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
      'add|undo': this.add,
      'move|redo': this.move,
      'move|undo': this.move,
      'remove|redo': this.remove,
      'remove|undo': this.remove,
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
    editor,
    counter,
  }) {
    // update the blocks
    console.log('entró en add');
    console.log(state);

    let index = jsonPatchElement.path.split('/')[1];
    const value = actionType === 'undo' ? state[`_${index}`][0] : jsonPatchElement.value;
    console.log(value)

    await blocks.insert(value.type, value.data, {}, parseInt(index, 10), false);
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
  async remove({
    jsonPatchElement, blocks, editor, counter,
  }) {
    console.log('entró en remove');
    // Actions to remove the jsonPatchElement from the editor
    console.log("jsonPatchElement", jsonPatchElement);
    const { path } = jsonPatchElement;
    console.log("path", path)
    let index = path.split('/')[1];
    console.log("idnex", index)

    await blocks.delete(index, 10)
    console.log("luego delete")
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
    // await editor.save();
    // Actions to replace the jsonPatchElement in the editor
    console.log('entró en replace');
    // Actions to remove the jsonPatchElement from the editor
    console.log("jsonPatchElement", jsonPatchElement);
    const { path } = jsonPatchElement;
    const index = path.split('/')[1];

    const { id, data } = await blocks.getBlockByIndex(index).save();
    console.log("llega despues de data")
    const { data: oldData } = baseData[index];
    const updatedData = Object.assign(data, oldData);
    console.log("llega despues de assign")
    // console.log('data replace:', updatedData);

    await blocks.update(id, updatedData);
    console.log("llega despues de update")
    await caret.setToBlock(index, 'end');
    console.log("llega despues de caret")
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
    editor,
    jsonDiffInstance,
    jsonPatchFormatter,
  }) {
    // const orderedJsonPatch = actionType === 'undo' ? this.sortUndo(jsonPatchArray) : this.sortRedo(jsonPatchArray);

    console.log(jsonPatchArray);
    jsonPatchArray.forEach(async (jsonPatchElement, index) => {
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
        editor,
        counter: index,
      })

      });
  }
}
