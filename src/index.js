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
   * Notify core that the read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Render tool`s main Element and fill it with saved data
   *
   * @param {{data: object, api: object}}
   * data - Previously saved data
   * api - Editor.js API
   * readOnly - read-only mode status
   */
  constructor({ data, api, readOnly }) {
    this.data = {
      text: data.text || '',
      status: data.status || 'open',
      items: data.items || [],
    };
    this.api = api;
    this.wrapper = undefined;
    this.readOnly = readOnly || false;
    this.createToggleWithShortcut();
    this.nestBlock();
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
        this.resolveToggleAction();
        this.hideAndShowBlocks(originalIndex - 1);
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
  setAttributesToNewBlock(entryIndex = null) {
    const foreignKey = this.wrapper.id;
    const index = this.readOnly ? entryIndex : this.api.blocks.getCurrentBlockIndex();
    const id = crypto.randomUUID();

    const newBlock = this.api.blocks.getBlockByIndex(index);
    const { holder } = newBlock;
    const content = holder.firstChild;
    const item = content.firstChild;

    holder.setAttribute('foreignKey', foreignKey);
    holder.setAttribute('id', id);

    item.classList.add('toggle-block__item');

    if (!this.readOnly) {
      holder.addEventListener('keydown', this.extractBlock.bind(this, item));
      holder.addEventListener('keydown', this.createParagraphFromIt.bind(this));
      item.focus();
    }
  }

  /**
   * Creates a toggle block view without paragraphs
   * and sets the default content.
   */
  createToggle() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('toggle-block__selector');
    this.wrapper.id = crypto.randomUUID();

    const icon = document.createElement('span');
    const input = document.createElement('div');
    const defaultContent = document.createElement('div');

    icon.classList.add('toggle-block__icon');
    icon.innerHTML = toggleIcon;

    input.classList.add('toggle-block__input');
    input.setAttribute('contentEditable', !this.readOnly);
    input.innerHTML = this.data.text || '';

    // Events
    if (!this.readOnly) {
      // Events to create other blocks and destroy the toggle
      input.addEventListener('keyup', this.createParagraphFromToggleRoot.bind(this));
      input.addEventListener('keydown', this.removeToggle.bind(this));

      // Establishes the placeholder for the toggle root when it's empty
      input.addEventListener('keyup', this.setPlaceHolder.bind(this));
      input.setAttribute('placeholder', 'Toggle');

      // Calculates the number of toggle items
      input.addEventListener('focus', this.setDefaultContent.bind(this));
      input.addEventListener('focusout', this.setDefaultContent.bind(this));

      // Event to add a block when the default content is clicked
      defaultContent.addEventListener('click', this.clickInDefaultContent.bind(this));

      input.addEventListener('focus', this.setNestedBlockAttributes.bind(this));
    }

    defaultContent.classList.add('toggle-block__content-default');
    defaultContent.setAttribute('hidden', true);
    defaultContent.innerHTML = 'Empty toggle. Click or drop blocks inside.';

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
    this.createToggle();

    // Renders the nested blocks after the toggle root is rendered
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
    let toggleRoot;

    if (this.readOnly) {
      const redactor = document.getElementsByClassName('codex-editor__redactor')[0];
      const { children } = redactor;
      const { length } = children;

      for (let i = 0; i < length; i += 1) {
        const blockCover = children[i].firstChild;
        const blockContainer = blockCover.firstChild;
        const { id } = blockContainer;

        if (id === this.wrapper.id) {
          toggleRoot = i;
          break;
        }
      }
    } else {
      const toggle = this.wrapper.children[1];
      let currentBlock = {};

      while (currentBlock[1] !== toggle) {
        toggleRoot = this.api.blocks.getCurrentBlockIndex();
        const block = this.api.blocks.getBlockByIndex(toggleRoot);
        const { holder } = block;
        const blockCover = holder.firstChild;
        const blockContent = blockCover.firstChild;
        currentBlock = blockContent.children;

        this.api.caret.setToNextBlock('end', 0);
      }
    }
    let index = toggleRoot;
    index += this.readOnly ? 1 : 0;

    icon.addEventListener('click', () => {
      this.resolveToggleAction();
      setTimeout(() => {
        const toggleIndex = this.readOnly ? (toggleRoot - 1) : null;
        this.hideAndShowBlocks(toggleIndex);
      }, 100);
    });

    this.data.items.forEach((block) => {
      const { type, data } = block;

      index += !this.readOnly ? 1 : 0;
      this.api.blocks.insert(type, data, {}, index, true);
      this.setAttributesToNewBlock(index);
      index += this.readOnly ? 1 : 0;
    });

    this.hideAndShowBlocks(toggleRoot - 1);
  }

  /**
   * Converts the toggle status to its opposite.
   * If the toggle status is open, then now will be closed and
   * the icon will reset to rotation. Otherwise, will be open
   * and the icon will be rotated 90 degrees to the left.
   *
   * @returns {string} icon - toggle icon
   */
  resolveToggleAction() {
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
  hideAndShowBlocks(index = null) {
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

  /**
   * Adds an event in a existent button to destroy the nested blocks
   * when the toggle root is removed.
   */
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

  /**
   *
   * @param {number} toggleIndex - toggle index
   * @param {object} children - blocks inside the toggle
   */
  removeFullToggle(toggleIndex, children) {
    const blocks = children.length;

    for (let i = toggleIndex; i < toggleIndex + blocks; i += 1) {
      this.api.blocks.delete(toggleIndex);
    }
  }

  /**
   * Adds listener in the editor to create a toggle
   * through the '>' char and the 'Space' key
   */
  createToggleWithShortcut() {
    const redactor = document.activeElement;
    redactor.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        const blockContainer = document.activeElement;
        const content = blockContainer.textContent;
        const { length } = content;

        if ((content[0] === '>') && (length - 1 === 1)) {
          const blockCaller = this.api.blocks.getCurrentBlockIndex();
          this.api.blocks.insert('toggle', {}, this.api, blockCaller, true);
          this.api.blocks.delete(blockCaller + 1);

          setTimeout(() => {
            this.api.caret.setToBlock(blockCaller);
          });
        }
      }
    });
  }

  /**
   * Adds listener in the editor to nest a block
   * inside a toggle through the 'Tab' key
   */
  nestBlock() {
    const redactor = document.activeElement;
    redactor.addEventListener('keyup', (e) => {
      const blockContainer = document.activeElement;
      const currentBlock = this.api.blocks.getCurrentBlockIndex();

      if (currentBlock > 0 && !this.isPartOfAToggle(blockContainer) && e.code === 'Tab') {
        const blockCover = blockContainer.parentElement;
        const block = blockCover.parentElement;

        const previousBlock = block.previousElementSibling;
        const previousCover = previousBlock.firstChild;
        const previousContainer = previousCover.firstChild;

        if (this.isPartOfAToggle(previousContainer)) {
          const foreignId = previousBlock.getAttribute('foreignKey');
          const toggleId = previousContainer.getAttribute('id');

          let foreignKey;
          if (foreignId) {
            foreignKey = foreignId;
          } else if (toggleId) {
            foreignKey = toggleId;
          }

          block.setAttribute('will-be-a-nested-block', true);

          const toggleRoot = document.getElementById(foreignKey);
          toggleRoot.children[1].focus();
        }
      }
    });
  }

  /**
  * Sets the required attributes to convert an external block
  * of the toggle into a block inside the toggle.
   */
  setNestedBlockAttributes() {
    const blockIndex = this.api.blocks.getCurrentBlockIndex();
    const block = this.api.blocks.getBlockByIndex(blockIndex);
    const { holder } = block;
    const willBeABlock = holder.getAttribute('will-be-a-nested-block');

    if (willBeABlock) {
      holder.removeAttribute('will-be-a-nested-block');
      this.setAttributesToNewBlock(blockIndex);
      this.api.toolbar.close();
    }
  }

  /**
   * Validates if a block contains one of the classes to be
   * part of a toggle. If It has it returns 'true' (It's part
   * of a toggle), otherwise returns 'false' (It's another
   * type of block)
   *
   * @param {HTMLDivElement} block - Block to be validated
   * @returns {boolean}
   */
  isPartOfAToggle(block) {
    const classes = Array.from(block.classList);
    const answer = classes.includes('toggle-block__item') || (classes.includes('toggle-block__input') || classes.includes('toggle-block__selector'));

    return answer;
  }
}
