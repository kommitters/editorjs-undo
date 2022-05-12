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
      items: data.items || 0,
    };
    this.itemsId = [];
    this.api = api;
    this.wrapper = undefined;
    this.readOnly = readOnly || false;
    this.addListeners();
    this.addSupportForUndoAndRedoActions();
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
      const currentPosition = document.getSelection().focusOffset;
      const originalIndex = this.api.blocks.getCurrentBlockIndex();
      const block = this.api.blocks.getBlockByIndex(originalIndex);
      const { holder } = block;
      const blockCover = holder.firstChild;
      const blockContent = blockCover.firstChild;
      const content = blockContent.children[1].innerHTML;

      const breakLine = content.indexOf('<br>');
      const end = breakLine === -1 ? content.length : breakLine;

      if (this.data.status === 'closed') {
        this.resolveToggleAction();
        this.hideAndShowBlocks(originalIndex);
      }

      const newText = content.slice(end + 4, currentPosition.focusOffset);
      blockContent.children[1].innerHTML = content.slice(currentPosition.focusOffset, end);

      this.api.blocks.insert('paragraph', { text: newText }, {}, originalIndex + 1, 1);
      this.setAttributesToNewBlock();
    }
  }

  /**
   * Calls the method to add the required properties to the new block.
   */
  createParagraphFromIt() {
    this.setAttributesToNewBlock();
  }

  /**
   * Gets the index of the new block, then assigns the required properties,
   * and finally sends the focus.
   */
  setAttributesToNewBlock(entryIndex = null) {
    const foreignKey = this.wrapper.id;
    const index = entryIndex === null ? this.api.blocks.getCurrentBlockIndex() : entryIndex;
    const id = crypto.randomUUID();

    const newBlock = this.api.blocks.getBlockByIndex(index);

    if (!this.itemsId.includes(newBlock.id)) {
      this.itemsId.splice(index - 1, 0, newBlock.id);
    }

    const { holder } = newBlock;
    const content = holder.firstChild;
    const item = content.firstChild;

    holder.setAttribute('foreignKey', foreignKey);
    holder.setAttribute('id', id);

    holder.classList.add('toggle-block__item');

    if (!this.readOnly) {
      holder.onkeydown = this.setEventsToNestedBlock.bind(this);
      item.focus();
    }
  }

  /**
   * Sets the events to be listened through the holder
   * in a nested block.
   *
   * @param {KeyboardEvent} e - key down event
   */
  setEventsToNestedBlock(e) {
    if (e.code === 'Enter') {
      this.createParagraphFromIt();
    } else {
      const indexBlock = this.api.blocks.getCurrentBlockIndex();
      const nestedBlock = this.api.blocks.getBlockByIndex(indexBlock);
      const { holder } = nestedBlock;

      if (e.code === 'Tab' && e.shiftKey) {
        this.extractBlock(indexBlock);
      }
      if (e.code === 'Backspace') {
        const cursorPosition = document.getSelection().focusOffset;
        this.removeBlock(holder, nestedBlock.id, cursorPosition);
      }
    }
  }

  /**
   * When a nested block is removed, the 'items' attribute
   * is updated, subtracting from it an unit.
   * @param {string} id - block identifier
   */
  removeBlock(holder, id, cursorPosition) {
    if (cursorPosition === 0) {
      const currentBlock = holder.nextSibling;
      const blockCover = currentBlock.firstChild;
      const blockContent = blockCover.firstChild;
      const oldContent = blockContent.innerHTML;

      const toggleCover = holder.firstChild;
      const toggleContent = toggleCover.firstChild;

      toggleContent.children[1].innerHTML += oldContent;

      const position = this.itemsId.indexOf(id);
      this.itemsId.splice(position, 1);

      const togglePosition = this.api.blocks.getCurrentBlockIndex();
      this.api.blocks.delete(togglePosition + 1);
    }
  }

  /**
   * Removes all properties of a nested block.
   *
   * @param {number} destiny - block position
   */
  removeAttributesFromNewBlock(destiny) {
    const newBlock = this.api.blocks.getBlockByIndex(destiny);
    const { holder } = newBlock;

    if (!this.itemsId.includes(newBlock.id)) {
      const i = this.itemsId.indexOf(newBlock.id);
      this.itemsId.splice(i, 1);
    }

    holder.removeAttribute('foreignKey');
    holder.removeAttribute('id');
    holder.onkeydown = {};
    holder.onkeyup = {};
    holder.classList.remove('toggle-block__item');
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

      // Sets the focus at the end of the text when a nested block is deleted with the backspace key
      input.addEventListener('focusin', () => this.setFocusToggleRootAtTheEnd());

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

    defaultContent.classList.add('toggle-block__content-default', 'toggle-block__hidden');
    defaultContent.innerHTML = 'Empty toggle. Click or drop blocks inside.';

    this.wrapper.appendChild(icon);
    this.wrapper.appendChild(input);
    this.wrapper.appendChild(defaultContent);
  }

  /**
   * Sets the focus at the end of the toggle root when
   * a nested block is deleted through the backspace key.
   */
  setFocusToggleRootAtTheEnd() {
    const toggle = document.activeElement;
    const selection = window.getSelection();
    const range = document.createRange();

    selection.removeAllRanges();
    range.selectNodeContents(toggle);
    range.collapse(false);
    selection.addRange(range);
    toggle.focus();
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
   * so sets the 'block__hidden tag' in the default content,
   * otherwise it removes it.
   */
  setDefaultContent() {
    const children = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);
    const { firstChild, lastChild } = this.wrapper;
    const { status } = this.data;
    const value = (children.length > 0 || status === 'closed');

    lastChild.classList.toggle('toggle-block__hidden', value);
    firstChild.style.color = (children.length === 0) ? 'gray' : 'black';
  }

  /**
   * Deletes the toggle structure and converts the main text and the nested blocks
   * in regular blocks.
   *
   * @param {KeyboardEvent} e - key down event
   */
  removeToggle(e) {
    if (e.code === 'Backspace') {
      const { children } = this.wrapper;
      const content = children[1].innerHTML;

      const cursorPosition = document.getSelection();

      if (cursorPosition.focusOffset === 0) {
        const index = this.api.blocks.getCurrentBlockIndex();
        const breakLine = content.indexOf('<br>');
        const end = breakLine === -1 ? content.length : breakLine;
        const blocks = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);

        for (let i = 1; i < blocks.length + 1; i += 1) {
          this.removeAttributesFromNewBlock(index + i);
        }

        this.api.blocks.delete(index);
        this.api.blocks.insert('paragraph', { text: content.slice(0, end) }, {}, index, 1);
        this.api.caret.setToBlock(index);
      }
    }
  }

  /**
   * Extracts a nested block from a toggle
   * with 'shift + tab' combination
   *
   * @param {HTMLDivElement} entryIndex - block index
   */
  extractBlock(entryIndex) {
    const toggle = this.wrapper.children[1];

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

    const items = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);
    const destiny = index + items.length;

    this.api.caret.setToBlock(entryIndex);

    if (items.length > 1) {
      this.api.blocks.move(destiny);
    }

    setTimeout(() => this.removeAttributesFromNewBlock(destiny), 200);
    this.api.toolbar.close();
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
    setTimeout(() => this.renderItems());

    // Adds initial transition for the icon
    setTimeout(() => this.setInitialTransition());

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
    svg.style.transition = '0.1s';
    svg.style.transform = `rotate(${status === 'closed' ? 0 : 90}deg)`;
  }

  /**
   * Renders the items view and assigns the properties required to look
   * like a block inside the toggle.
   */
  renderItems() {
    const blocksInEditor = this.api.blocks.getBlocksCount();
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

    if (toggleRoot + this.data.items < blocksInEditor) {
      for (let i = toggleRoot + 1, j = 0; i <= toggleRoot + this.data.items; i += 1) {
        const block = this.api.blocks.getBlockByIndex(i);
        const { holder } = block;
        const cover = holder.firstChild;
        const content = cover.firstChild;

        if (!this.isPartOfAToggle(content)) {
          this.setAttributesToNewBlock(i);
          j += 1;
        } else {
          this.data.items = j;
          break;
        }
      }
    } else {
      this.data.items = 0;
    }

    icon.addEventListener('click', () => {
      this.resolveToggleAction();
      setTimeout(() => {
        const toggleIndex = this.readOnly ? toggleRoot : null;
        this.hideAndShowBlocks(toggleIndex);
      });
    });

    this.hideAndShowBlocks(toggleRoot);
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
  }

  /**
   * Hides and shows the toggle paragraphs or the default content.
   * If the toggle status is closed, the added value to the hidden attribute
   * in the container paragraph is 'true', otherwise is 'false'.
   *
   * @param {number} index - toggle index
   */
  hideAndShowBlocks(index = null) {
    const value = (this.data.status === 'closed');
    const children = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);
    const { length } = children;

    let toggleIndex = index === null ? this.api.blocks.getCurrentBlockIndex() : index;

    if (length > 0) {
      for (let i = 0; i < length; i += 1) {
        const { holder } = this.api.blocks.getBlockByIndex(toggleIndex += 1);
        holder.hidden = value;
      }
    } else {
      const { lastChild } = this.wrapper;
      lastChild.classList.toggle('toggle-block__hidden', value);
    }
  }

  /**
   * Extracts Tool's data from the view
   * @param {HTMLDivElement} blockContent - Toggle tools rendered view
   * @returns {ToggleBlockData} - saved data
   */
  save(blockContent) {
    const { children } = blockContent;
    const caption = children[1].innerHTML;
    const blocks = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);

    return Object.assign(this.data, {
      text: caption,
      items: blocks.length,
    });
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
    const listChildren = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);

    for (let i = 0; i < listChildren.length; i += 1) {
      listChildren[i].classList.add('ce-block--selected');
    }

    setTimeout(() => {
      const deleteButton = options.getElementsByClassName('ce-settings__button--delete')[0];
      deleteButton.addEventListener('click', () => {
        const classesList = deleteButton.classList;
        const classes = Object.values(classesList);

        if (classes.indexOf('clicked-to-destroy-toggle') === -1) {
          deleteButton.classList.add('clicked-to-destroy-toggle');
        } else {
          this.removeFullToggle(toggleIndex);
        }
      });
    });
  }

  /**
   * Removes a toggle root and its nested blocks.
   *
   * @param {number} toggleIndex - toggle index
   */
  removeFullToggle(toggleIndex) {
    const children = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);
    const { length } = children;

    for (let i = toggleIndex; i < toggleIndex + length; i += 1) {
      this.api.blocks.delete(toggleIndex);
    }
  }

  /**
   * Adds the required listeners to call the toggle shortcuts
   * on the editor.
   */
  addListeners() {
    if (!this.readOnly) {
      const redactor = document.activeElement;
      redactor.addEventListener('keyup', (e) => {
        const blockContainer = document.activeElement;
        const currentBlock = this.api.blocks.getCurrentBlockIndex();

        const blockCover = blockContainer.parentElement;
        const block = blockCover.parentElement;

        if (e.code === 'Space') {
          this.createToggleWithShortcut(blockContainer);
        } else if (currentBlock > 0 && !(this.isPartOfAToggle(blockContainer) || this.isPartOfAToggle(block)) && e.code === 'Tab') {
          this.nestBlock(blockContainer);
        }
      });
    }
  }

  /**
   * Adds mutation observer to restore the item attributes
   * when the undo action is executed and they're lost.
   */
  addSupportForUndoAndRedoActions() {
    if (!this.readOnly) {
      const target = document.querySelector('div.codex-editor__redactor');

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            setTimeout(this.restoreItemAttributes.bind(this, mutation));
          }
        });
      });

      const config = { attributes: true, childList: true, characterData: true };

      observer.observe(target, config);
    }
  }

  /**
   * Restores the item attributes to nested blocks.
   *
   * @param {HTMLDivElement} mutation - Html element removed or inserted
   */
  restoreItemAttributes(mutation) {
    if (this.wrapper !== undefined) {
      const index = this.api.blocks.getCurrentBlockIndex();
      const block = this.api.blocks.getBlockByIndex(index);
      const { holder } = block;
      const currentBlockValidation = !this.isPartOfAToggle(holder);
      const mutatedBlock = mutation.removedNodes[0];

      if (this.itemsId.includes(block.id) && currentBlockValidation) {
        this.setAttributesToNewBlock(index);
      } else if (mutatedBlock && this.isPartOfAToggle(mutatedBlock) && currentBlockValidation) {
        const blockCover = holder.firstChild;
        const blockContainer = blockCover.firstChild;

        if (!this.isPartOfAToggle(blockContainer)) {
          this.setAttributesToNewBlock(index);
          this.itemsId[index] = block.id;
        }
      }
    }
  }

  /**
   * Creates a toggle through the '>' char and the 'Space' key
   */
  createToggleWithShortcut(blockContainer) {
    const content = blockContainer.textContent;

    if ((content[0] === '>') && !this.isPartOfAToggle(blockContainer)) {
      const blockCaller = this.api.blocks.getCurrentBlockIndex();

      this.api.blocks.insert('toggle', { text: content.slice(2) }, this.api, blockCaller, true);
      this.api.blocks.delete(blockCaller + 1);
      this.api.caret.setToBlock(blockCaller);
    }
  }

  /**
   * Nests a block inside a toggle through the 'Tab' key
   */
  nestBlock(blockContainer) {
    const blockCover = blockContainer.parentElement;
    const block = blockCover.parentElement;

    const previousBlock = block.previousElementSibling;
    const previousCover = previousBlock.firstChild;
    const previousContainer = previousCover.firstChild;

    if (this.isPartOfAToggle(previousContainer) || this.isPartOfAToggle(previousBlock)) {
      const foreignId = previousBlock.getAttribute('foreignKey');
      const toggleId = previousContainer.getAttribute('id');
      const foreignKey = foreignId || toggleId;

      block.setAttribute('will-be-a-nested-block', true);

      const toggleRoot = document.getElementById(foreignKey);
      toggleRoot.children[1].focus();
    }
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
