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
    editor,
    counter,
    patchSize,
  }) {
    // console.log(counter);
    // update the blocks
    // await editor.save();

    console.log('entró en add');

    let index = jsonPatchElement.path.split('/')[1];
    const value = actionType === 'undo' ? state[`_${index}`][0] : jsonPatchElement.value;
    console.log('index', index);
    console.log('value:', value.data);
    // const correctedIndex = index === '0' ? 1 : index;
    // console.log('index: ', correctedIndex);
    if (actionType === 'undo' && counter === 1 && patchSize > 1) {
      index -= 1;
      console.log('nuevo indice recalculado:', index);
    }
    // const val = value.data === '' ? 'algo random' : value.data;
    // console.log(val);
    // if (counter > 0) {
    //   index -= 1;
    // }
    await blocks.insert(value.type, value.data, {}, parseInt(index, 10), true);
    console.log('terminará add');
    // debugger;
    return 'en add';
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
    jsonPatchElement, blocks, editor, counter, patchSize,
  }) {
    // await editor.save();
    // Actions to remove the jsonPatchElement from the editor
    const { path } = jsonPatchElement;
    let index = path.split('/')[1];

    // editor.save().then(async (data) => {
    console.log('entró en remove');
    // console.log(data);

    // console.log('bloque a eliminar:', data.blocks[index]);

    // const editorBlocks = blocks.getBlocksCount();
    console.log('index', index);
    // while (index > editorBlocks - 1) {
    //   index -= 1;
    // }

    if (counter > 0) {
      index -= 1;
    }

    await blocks.delete(index);
    console.log('terminará remove');
    // debugger;
    return 'en remove';
    // });
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
    console.log('in replace');
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
    editor,
  }) {
    // console.log('baseDAta', baseData);
    // console.log('jsonpatharray:', jsonPatchArray);

    const patchSize = jsonPatchArray.length;

    const orderedJsonPatch = actionType === 'undo' ? this.sortUndo(jsonPatchArray) : this.sortRedo(jsonPatchArray);
    console.log('ordered', orderedJsonPatch);

    orderedJsonPatch.forEach(async (jsonPatchElement, index) => {
      console.log('operación entró', jsonPatchElement.op);
      if (typeof this.operations[`${jsonPatchElement.op}|${actionType}`] !== 'function') {
        throw new Error('Invalid operation.');
      }

      // console.log('counter antes de llamado:', index);
      this.operations[`${jsonPatchElement.op}|${actionType}`]({
        jsonPatchElement,
        blocks,
        caret,
        actionType,
        state,
        baseData,
        editor,
        counter: index,
        patchSize,
      }).then((x) => console.log(`terminó el ${jsonPatchElement.op} ${actionType}: ${x} `));
    });
  }

  sortUndo(array) {
    return array.sort((a, b) => a.op > b.op);
  }

  sortRedo(array) {
    return array.sort((a, b) => a.op < b.op);
  }
}
