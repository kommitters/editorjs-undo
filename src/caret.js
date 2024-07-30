/**
 * @typedef Caret
 * @property {HTMLCollection} target - Contains the HTML object to be followed
 * @description Set of functions for managing the caret position taking into account the target
*/
export default class Caret {
  /**
   * @param {HTMLCollection} target - HTML object to be followed
  */
  constructor(target) {
    this.target = target;
  }

  /**
   * Gets the caret position on the target
   * @returns {number}
  */
  getPosition() {
    this.target.focus();
    const oldRange = window.getSelection().getRangeAt(0);
    const range = oldRange.cloneRange();

    range.selectNodeContents(this.target);
    range.setEnd(oldRange.endContainer, oldRange.endOffset);

    return range.toString().length;
  }

  /**
   * Sets the caret position on the target
   * @param {number} pos - Caret position
  */
  setPosition(pos) {
    const selection = window.getSelection();
    const range = document.createRange();
    let position = pos;

    let firstNode = this.target.firstChild;

    if (firstNode === null) {
      this.target.innerHTML = '&nbsp';
      position = 0;
      firstNode = this.target.firstChild;
    }

    const content = firstNode.childNodes.length > 0 ? firstNode.firstChild : firstNode;

    position = position > content.length || position < 0 || !pos ? content.length : position;

    range.setStart(content, position);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);

    this.target.focus();
  }
}
