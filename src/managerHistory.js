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
      switch (`${jsonpatchElement.op}|${actionType}`) {
        case 'add|undo':
          await this.remove(jsonpatchElement);
          break;
        case 'add|redo':
          await this.add(jsonpatchElement);
          break;

        case 'remove|undo':
          await this.add(jsonpatchElement);
          break;
        case 'remove|redo':
          await this.remove(jsonpatchElement);
          break;

        case 'replace|redo':
        case 'replace|undo':
          await this.replace(jsonpatchElement);
          break;

        default:
          throw new Error('Invalid action.');
      }
    });
  }
}
