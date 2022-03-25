import './index.css';
import toggleIcon from '../assets/toggleIcon.svg';

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
      icon: toggleIcon,
    };
  }

  /**
   * Disables the creation of new EditorJS blocks by pressing
   * 'enter' when in a toggle block.
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * Render tool`s main Element and fill it with saved data
   *
   * @param {{data: object, api: object}}
   * data - Previously saved data
   * api - Editor.js API
   */
  constructor({ data, api }) {
    this.data = {
      text: data.text || '',
      status: data.status || 'open',
      items: data.items || [],
    };
    this.api = api;
    this.wrapper = undefined;
  }

  /**
   * First it gets the toggle index.
   *
   * After checks the toggle status, if this is 'closed' then open it.
   *
   * After inserts a new block after the toggle index and the a method
   * is called to add the required properties to the new block.
   * gets the focus.
   *
   * @param {KeyboardEvent} e - key up event
   */
  createParagraphFromToggleRoot(e) {
    if (e.code === 'Enter') {
      const originalIndex = this.api.blocks.getCurrentBlockIndex();

      if (this.data.status === 'closed') {
        this._resolveToggleAction();
        this._hideAndShowBlocks(originalIndex - 1);
      }

      setTimeout(() => {
        this.api.blocks.insert();
        this.setAttributesToNewBlock();
      }, 100);
    }
  }

  /**
   * Calls the method to add the required properties to the new block.
   *
   * @param {KeyboardEvent} e - key down event
   */
  createParagraphFromIt(e) {
    if (e.code === 'Enter') this.setAttributesToNewBlock();
  }

  /**
   * Gets the index of the new block, then assigns the required properties,
   * and finally sends the focus.
   */
  setAttributesToNewBlock() {
    const foreignKey = this.wrapper.id;
    const index = this.api.blocks.getCurrentBlockIndex();
    const id = crypto.randomUUID();

    const newBlock = this.api.blocks.getBlockByIndex(index);
    const { holder } = newBlock;
    const content = holder.firstChild;
    const item = content.firstChild;

    holder.addEventListener('keydown', this.createParagraphFromIt.bind(this));
    holder.setAttribute('foreignKey', foreignKey);
    holder.setAttribute('id', id);

    holder.addEventListener('keydown', this.extractBlock.bind(this, item));

    item.classList.add('toggle-block__item');
    item.focus();
  }

  /**
   * Creates a toggle block view without paragraphs
   * and sets the default content.
   */
  _createToggle() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('toggle-block__selector');
    this.wrapper.id = crypto.randomUUID();

    const icon = document.createElement('span');
    const input = document.createElement('div');
    const defaultContent = document.createElement('div');

    icon.classList.add('toggle-block__icon');
    icon.innerHTML = toggleIcon;

    input.classList.add('toggle-block__input');
    input.contentEditable = true;
    input.innerHTML = this.data.text || '';

    // Events to create other blocks and destroy the toggle
    input.addEventListener('keyup', this.createParagraphFromToggleRoot.bind(this));
    input.addEventListener('keydown', this.removeToggle.bind(this));

    // Establishes the placeholder for the toggle root when it's empty
    input.addEventListener('keyup', this.setPlaceHolder.bind(this));
    input.setAttribute('placeholder', 'Toggle');

    // Calculates the number of toggle items
    input.addEventListener('focus', this.setDefaultContent.bind(this));
    input.addEventListener('focusout', this.setDefaultContent.bind(this));

    defaultContent.classList.add('toggle-block__content-default');
    defaultContent.setAttribute('hidden', true);
    defaultContent.innerHTML = 'Empty toggle. Click or drop blocks inside.';
    defaultContent.addEventListener('click', this.clickInDefaultContent.bind(this));

    this.wrapper.appendChild(icon);
    this.wrapper.appendChild(input);
    this.wrapper.appendChild(defaultContent);
  }

  /**
   * Adds the actions to do when the default content is clicked.
   */
  clickInDefaultContent() {
    this.api.blocks.insert();
    this.setAttributesToNewBlock();
    this.setDefaultContent();
  }

  /**
   * Sets the default content. If the toggle has no other blocks inside it,
   * so sets the value 'false' for the hidden tag in the default content,
   * otherwise sets the value 'true'.
   */
  setDefaultContent() {
    const children = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);
    const { firstChild, lastChild } = this.wrapper;
    const { status } = this.data;
    const value = (children.length > 0 || status === 'closed');

    lastChild.hidden = value;
    firstChild.style.color = (children.length === 0) ? 'gray' : 'black';
  }

  /**
   * If the toggle root is empty and the key event received is 'backspace'
   * the toggle root is removed.
   *
   * @param {KeyboardEvent} e - key down event
   */
  removeToggle(e) {
    if (e.code === 'Backspace') {
      const { children } = this.wrapper;
      const { length } = children[1].textContent;

      if (length === 0) {
        const index = this.api.blocks.getCurrentBlockIndex();
        const blocks = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);

        this.api.blocks.delete(index);
        this.removeFullToggle(index, blocks);
      }
    }
  }

  /**
   * this method extract a single block with shift + tab combination
   *
   * @param {Object} item
   * @param {KeyboardEvent} e
   */
  extractBlock(item, e) {
    if (e.code === 'Tab' && e.shiftKey) {
      const indexBlock = this.api.blocks.getCurrentBlockIndex();
      const toggle = this.wrapper.children[1];
      const children = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);
      const { length } = children;

      let currentBlock = {};
      let index;

      while (currentBlock[1] !== toggle) {
        this.api.caret.setToPreviousBlock('end', 0);
        index = this.api.blocks.getCurrentBlockIndex();

        const block = this.api.blocks.getBlockByIndex(index);
        const { holder } = block;
        const blockCover = holder.firstChild;
        const blockContent = blockCover.firstChild;
        currentBlock = blockContent.children;
      }

      this.api.blocks.delete(indexBlock);
      this.api.blocks.insert('paragraph', { text: item.textContent }, {}, index + length, true);
    }
  }

  /**
   * If the toggle root is empty and the key event received is 'backspace'
   * or 'enter', its content is cleared so that the visible placeholder
   * is set through the css.
   *
   * @param {KeyboardEvent} e - key up event
   */
  setPlaceHolder(e) {
    if (e.code === 'Backspace' || e.code === 'Enter') {
      const { children } = this.wrapper;
      const { length } = children[1].textContent;

      if (length === 0) children[1].textContent = '';
    }
  }

  /**
   * Renders Tool's view.
   * First renders the toggle root, and immediately
   * renders its items as new blocks under the root.
   *
   * @returns {HTMLDivElement}
   */
  render() {
    this._createToggle();
    setTimeout(this.renderItems.bind(this));

    // Adds initial transition for the icon
    setTimeout(this.setInitialTransition.bind(this));

    return this.wrapper;
  }

  /**
   * Adds the initial status for the icon, and establishes
   * the delay for the transition displayed when the icon
   * is clicked.
   */
  setInitialTransition() {
    const { status } = this.data;
    const icon = this.wrapper.firstChild;
    const svg = icon.firstChild;
    svg.style.transition = '0.5s';
    svg.style.transform = `rotate(${status === 'closed' ? 0 : 90}deg)`;
  }

  /**
   * Renders the items view and assigns the properties required to look
   * like a block inside the toggle.
   */
  renderItems() {
    const icon = this.wrapper.firstChild;
    const editorBlocks = this.api.blocks.getBlocksCount();

    let originalIndex = this.api.blocks.getCurrentBlockIndex();
    let index = (editorBlocks > 1) ? originalIndex + 1 : originalIndex;

    icon.addEventListener('click', () => {
      this._resolveToggleAction();
      setTimeout(() => {
        this._hideAndShowBlocks();
      }, 100);
    });

    this.data.items.forEach((block) => {
      const { type, data } = block;
      this.api.blocks.insert(type, data, {}, index += 1, true);
      this.setAttributesToNewBlock();
    });

    originalIndex -= (editorBlocks > 1) ? 0 : 1;
    this._hideAndShowBlocks(originalIndex);
  }

  /**
   * Converts the toggle status to its opposite.
   * If the toggle status is open, then now will be closed and
   * the icon will reset to rotation. Otherwise, will be open
   * and the icon will be rotated 90 degrees to the left.
   *
   * @returns {string} icon - toggle icon
   */
  _resolveToggleAction() {
    const icon = this.wrapper.firstChild;
    const svg = icon.firstChild;

    if (this.data.status === 'closed') {
      this.data.status = 'open';
      svg.style.transform = 'rotate(90deg)';
    } else {
      this.data.status = 'closed';
      svg.style.transform = 'rotate(0deg)';
    }

    return icon;
  }

  /**
   * Hides and shows the toggle paragraphs or the default content.
   * If the toggle status is closed, the added value to the hidden attribute
   * in the container paragraph is 'true', otherwise is 'false'.
   *
   * @param {number} index - toggle index
   */
  _hideAndShowBlocks(index = null) {
    const children = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);
    const items = children.length;
    const value = (this.data.status === 'closed');

    let toggleIndex = index === null ? this.api.blocks.getCurrentBlockIndex() : index + 1;

    if (items > 0) {
      for (let i = 0; i < items; i += 1) {
        const { holder } = this.api.blocks.getBlockByIndex(toggleIndex += 1);
        holder.hidden = value;
      }
    } else {
      const { lastChild } = this.wrapper;
      lastChild.hidden = value;
    }
  }

  /**
   * Extracts Tool's data from the view
   * @param {HTMLDivElement} blockContent - Toggle tools rendered view
   * @returns {ToggleBlockData} - saved data
   */
  save(blockContent) {
    const { children } = blockContent;
    const caption = children[1].textContent;
    const blocks = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);
    const items = [];

    blocks.forEach((block) => {
      items.push({ type: 'paragraph', data: { text: block.textContent } });

      // Attributes and classes to restore the block later.
      const wrap = block.firstChild;
      const mainContainer = wrap.firstChild;

      mainContainer.setAttribute('oldValue', block.textContent);
      mainContainer.textContent = '';
    });

    setTimeout(() => { this.restoreBlocks(); });

    return Object.assign(this.data, {
      text: caption,
      items: [...items],
    });
  }

  /**
   * Gets the nested blocks and restores their original content
   * after the save method is executed.
   */
  restoreBlocks() {
    const blocks = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);
    const { length } = blocks;

    for (let i = 0; i < length; i += 1) {
      const block = blocks[i];
      const wrap = block.firstChild;
      const mainContainer = wrap.firstChild;
      const content = mainContainer.getAttribute('oldValue');

      mainContainer.textContent = content;
      mainContainer.removeAttribute('oldValue');
    }
  }

  /**
   * Validates Toggle block data
   * @param {object} savedData - Data received after saving
   * @returns {boolean} false if saved data isn't correct, otherwise true
   */
  validate(savedData) {
    const { items } = savedData;

    for (let i = 0; i < items.length; i += 1) {
      if (items[i].type === undefined || items[i].data === undefined) {
        return false;
      }
    }

    return true;
  }

  renderSettings() {
    const settingsBar = document.getElementsByClassName('ce-settings--opened');
    const optionsContainer = settingsBar[0];
    const options = optionsContainer.lastChild;
    const toggleIndex = this.api.blocks.getCurrentBlockIndex();
    const children = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);

    setTimeout(() => {
      const deleteButton = options.getElementsByClassName('ce-settings__button--delete')[0];
      deleteButton.addEventListener('click', () => {
        const classesList = deleteButton.classList;
        const classes = Object.values(classesList);

        if (classes.indexOf('clicked-to-destroy-toggle') === -1) {
          deleteButton.classList.add('clicked-to-destroy-toggle');
        } else {
          this.removeFullToggle(toggleIndex, children);
        }
      });
    });
  }

  removeFullToggle(toggleIndex, children) {
    const blocks = children.length;

    for (let i = toggleIndex; i < toggleIndex + blocks; i += 1) {
      this.api.blocks.delete(toggleIndex);
    }
  }
}
