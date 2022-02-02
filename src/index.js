import './index.css';
import toggleIconPrimary from '../assets/toggleIcon.svg';
import toggleIconSecundary from '../assets/toggleIconSecundary.svg';
import insertParagraphIcon from '../assets/insertParagraphIcon.svg';
import removeParagraphIcon from '../assets/removeParagraphIcon.svg';

/**
 * ToggleBlock for the Editor.js
 * Creates a toggle and paragraphs can be saved in it.
 * Requires no server-side uploader.
 *
 * @typedef {object} ToggleBlockData
 * @description Tool's input and output data format
 * @property {string} text - toggle text
 * @property {string} status - toggle status
 * @property {array} items - toggle paragraphs
 */

export default class ToggleBlock {
  /**
   * Icon and title for displaying at the Toolbox
   * @returns {{tittle: string, icon: string}}
   */
  static get toolbox() {
    return {
      title: 'Toggle',
      icon: toggleIconPrimary,
    };
  }

  /**
   * Disables the creation of new editorjs blocks by pressing
   * 'enter' when in a toggle block.
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * Render tool`s main Element and fill it with saved data
   * @param {{data: object}}
   * data - Previously saved data
   */
  constructor({ data }) {
    this.data = {
      text: data.text || '',
      status: data.status || 'closed',
      items: data.items || [],
    };

    this.wrapper = undefined;
  }

  /**
   * First checks the status of a toggle, if this is 'closed' then open it.
   *
   * After checks if a toggle has paragraphs, if so, insert a new one as the first
   * child and move the others to the end, otherwise just insert a new paragraph.
   *
   * @param {KeyboardEvent} e - key down event
   */
  createParagraphFromToggleRoot(e) {
    if (e.code === 'Enter') {
      if (this.data.status === 'closed') {
        this.wrapper.firstChild.innerHTML = this._resolveToggleAction();
        this._hideAndShowParagraphs();
      }

      const firstChild = this.wrapper.children[1];
      const paragraph = this.createParagraph();

      firstChild.after(paragraph);
      paragraph.focus();
    }
  }

  /**
   * First checks if the event code is 'Backspace' or 'Enter'.
   *
   * In the first case, if the paragraph text is totally deleted and
   * 'Backspace' is pressed again, the paragraph too is deleted and
   * the focus is sent to the previous element at the end of its content.
   *
   * In the second case, a paragraph is created and it's inserted
   * after the paragraph that triggers the event.
   *
   * @param {string} paragraphId - paragraph identifier
   * @param {KeyboardEvent} e - key down event
   */
  createAndRemoveParagraphFromIt(paragraphId, e) {
    const currentParagraph = document.getElementById(paragraphId);
    const text = currentParagraph.innerHTML;

    switch (e.code) {
      case 'Backspace': {
        if (text.length === 0) {
          const previous = currentParagraph.previousSibling;

          currentParagraph.remove();
          previous.innerHTML += '.';

          const selection = window.getSelection();
          const range = document.createRange();

          selection.removeAllRanges();
          range.selectNodeContents(previous);
          range.collapse(false);
          selection.addRange(range);
          previous.focus();
        }
        break;
      }

      case 'Enter': {
        const paragraph = this.createParagraph();

        currentParagraph.after(paragraph);
        paragraph.focus();
        break;
      }

      default:
        break;
    }
  }

  /**
   * Creates a toggle block view without paragraphs
   */
  _createToggle() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('toggle-block__selector');

    const icon = document.createElement('span');
    icon.classList.add('toggle-block__icon');
    icon.innerHTML = this.data.status === 'closed' ? toggleIconPrimary : toggleIconSecundary;

    icon.addEventListener('click', () => {
      icon.innerHTML = this._resolveToggleAction();
      this._hideAndShowParagraphs();
    });

    const input = document.createElement('div');

    input.classList.add('toggle-block__input');
    input.contentEditable = true;
    input.addEventListener('keydown', this.createParagraphFromToggleRoot.bind(this));
    input.innerHTML = this.data.text || '';

    this.wrapper.appendChild(icon);
    this.wrapper.appendChild(input);
  }

  /**
   * Renders Tool's view
   * @returns {HTMLDivElement}
   */
  render() {
    this._createToggle();
    this.data.items.forEach((item) => {
      this._renderParagraph(item);
    });

    return this.wrapper;
  }

  /**
   * Extracts Tool's data from the view
   * @param {HTMLDivElement} blockContent - Toggle tools rendered view
   * @returns {ToggleBlockData} - saved data
   */
  save(blockContent) {
    const caption = blockContent.querySelector('div');
    const paragraphs = blockContent.querySelectorAll('.toggle-block__paragraph');
    const items = [];

    paragraphs.forEach((item) => items.push(item.innerHTML));

    return Object.assign(this.data, {
      text: caption.innerHTML,
      items: [...items],
    });
  }

  /**
   * Validates Toggle block data
   * @param {object} savedData - Data received after saving
   * @returns {boolean} false if saved data isn't correct, otherwise true
   */
  validate(savedData) {
    let validItems = false;

    for (let i = 0; i < savedData.items.length; i += 1) {
      if (savedData.items[i].trim()) {
        validItems = true;
        break;
      }
    }

    if (validItems || savedData.text.trim()) {
      return true;
    }
    return false;
  }

  /**
   * Makes buttons with tunes
   * @returns {HTMLDivElement}
   */
  renderSettings() {
    const settings = [
      {
        name: 'insertParagraph',
        icon: insertParagraphIcon,
      },
      {
        name: 'removeParagraph',
        icon: removeParagraphIcon,
      },
    ];
    const wrapper = document.createElement('div');

    settings.forEach((tune) => {
      const button = document.createElement('div');

      button.classList.add('cdx-settings-button');
      button.innerHTML = tune.icon;

      button.addEventListener('click', () => {
        if (tune.name === 'insertParagraph') {
          this.insertParagraph();
        } else {
          this.removeParagraph();
        }
      });

      wrapper.appendChild(button);
    });

    return wrapper;
  }

  /**
   * First saves the current toggle status. After, calls the method to insert
   * a paragraph, as this leaves the toggle open, asks if the toggle status
   * before calling the method is different from the current status, if it's,
   * it executes some instructions to collapse the toggle and return its
   * original status.
   *
   * @param {string} paragraph - paragraph text
   */
  _renderParagraph(paragraph = '') {
    const currenStatus = this.data.status;

    this.insertParagraph(paragraph);

    if (currenStatus !== this.data.status) {
      this.wrapper.firstChild.innerHTML = this._resolveToggleAction();
      this._hideAndShowParagraphs();
    }
  }

  /**
   * First checks the status of a toggle, if this is 'closed' then open it.
   * After, calls the method to create a paragraph and the result is inserted
   * as a toggle child.
   *
   * @param {string} text - paragraph text
   */
  insertParagraph(text = '') {
    if (this.data.status === 'closed') {
      this.wrapper.firstChild.innerHTML = this._resolveToggleAction();
      this._hideAndShowParagraphs();
    }

    const paragraph = this.createParagraph(text);

    this.wrapper.appendChild(paragraph);
  }

  /**
   * * Creates a paragraph view
   * @param {string} content - paragraph text
   * @returns {HTMLDivElement}
   */
  createParagraph(content = '') {
    const newParagraph = document.createElement('div');

    newParagraph.classList.add('toggle-block__paragraph');
    newParagraph.setAttribute('id', crypto.randomUUID());
    newParagraph.addEventListener('keydown', this.createAndRemoveParagraphFromIt.bind(this, newParagraph.id));
    newParagraph.contentEditable = true;
    newParagraph.innerHTML = content || '';

    return newParagraph;
  }

  /**
   * Removes the last toggle paragraph
   */
  removeParagraph() {
    const paragraph = this.wrapper.lastChild;
    if (paragraph.classList.value === 'toggle-block__paragraph') {
      paragraph.remove();
    }
  }

  /**
   * Converts the toggle status to its opposite, including its icon.
   * If the toggle status is open, then now will be closed and its icon
   * will be the main. Otherwise, will be open and its icon will be the
   * secundary.
   *
   * @returns {string} icon - toggle icon
   */
  _resolveToggleAction() {
    let icon = toggleIconPrimary;

    if (this.data.status === 'closed') {
      icon = toggleIconSecundary;
      this.data.status = 'open';
    } else {
      this.data.status = 'closed';
    }

    return icon;
  }

  /**
   * Hides and shows the toggle paragraphs.
   * If the toggle status is closed, the hidden attribute is added
   * to the container paragraph. Otherwise, the hidden attribute is
   * removed.
   */
  _hideAndShowParagraphs() {
    if (this.data.status === 'closed') {
      for (let i = 2; i < this.wrapper.children.length; i += 1) {
        this.wrapper.children[i].setAttribute('hidden', true);
      }
    } else {
      for (let i = 2; i < this.wrapper.children.length; i += 1) {
        this.wrapper.children[i].removeAttribute('hidden');
      }
    }
  }
}
