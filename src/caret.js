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
    const oldRange = document.getSelection().getRangeAt(0);
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

    if (this.target.firstChild === null) {
      this.target.innerHTML = '&nbsp';
      position = 0;
    }

    const content = this.target.firstChild;
    position = position > content.length ? content.length : position;

    range.setStart(content, position);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);

    this.target.focus();
  }
}
