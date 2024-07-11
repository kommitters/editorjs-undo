import Caret from './caret';

/**
 * @typedef HistoryManager
 * @property {Object} operations - Object that contains the allowed operations and uses the action
 * that invoked the delegator as a key to define which method should be used next
 * @description Core functions for handling the update of editor blocks based on the history log
*/
export default class HistoryManager {
  constructor() {
    this.operations = {
      add: this.add,
      remove: this.remove,
      move: this.move,
      replace: this.replace,
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
   * @description Updates blocks in the editor based on jsonPatch move operation
  */
  async move({ jsonPatchElement, blocks }) {
    const { path, from: fromPath } = jsonPatchElement;
    const from = path.split('/')[1];
    const to = fromPath.split('/')[1];

    await blocks.move(to, from);
  }

  /**
   * @param {Array} jsonPatchElement - Formatted changes gotten between the state and baseData
   * @param {Object} blocks — API to make operations on the editor blocks
   * @description Removes blocks from the editor based on the jsonPatch remove operation
  */
  async remove({ jsonPatchElement, blocks }) {
    const { path } = jsonPatchElement;
    const index = path.split('/')[1];

    await blocks.delete(index);
  }

  /**
   * @param {Array} jsonPatchElement - Formatted changes gotten between the state and baseData
   * @param {Object} blocks — API to make operations on the editor blocks
   * @param {Object} baseData - Copy of the saved data object.
   * @description Updates blocks in the editor based on the jsonPatch replace operation
  */
  async replace({ jsonPatchElement, blocks, baseData }) {
    const { path } = jsonPatchElement;
    const index = path.split('/')[1];

    const { id } = await blocks.getBlockByIndex(index).save();
    const { data } = baseData[index];

    await blocks.update(id, data);
  }

  /**
   *
   * @param {Array} jsonPatchArray - Set of formatted changes gotten between the state and baseData
   * @param {Object} blocks — API to make operations on the editor blocks
   * @param {Object} caret — API to send the focus to a specific block in the editor
   * @param {Object} caretInfo — Indicates which block to focus on and un which position
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
    caretInfo,
    actionType,
    state,
    baseData,
  }) {
    const restorationPromise = new Promise((resolve) => {
      jsonPatchArray.forEach(async (jsonPatchElement, index) => {
        if (typeof this.operations[jsonPatchElement.op] !== 'function') {
          throw new Error('Invalid operation.');
        }

        await this.operations[jsonPatchElement.op]({
          jsonPatchElement,
          blocks,
          actionType,
          state,
          baseData,
        });

        if (index === jsonPatchArray.length - 1) {
          resolve();
        }
      });
    });

    // Executes the block restoration and, when finished, executes the caret instructions
    restorationPromise.then(async () => {
      const { caretIndex, indexInState } = caretInfo;
      const editorBlocks = document.getElementsByClassName('ce-block__content');
      const index = indexInState >= editorBlocks.length ? indexInState - 1 : indexInState;
      const target = editorBlocks[index];
      const mainNode = target.firstChild;

      if (target === undefined || mainNode.classList.contains('inline-image')) {
        await caret.setToLastBlock('end');
      } else {
        const holder = new Caret(mainNode);
        holder.setPosition(caretIndex);
      }
    });
  }
}
