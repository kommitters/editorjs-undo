import './index.css';
import toggleIconClosed from '../assets/toggleIconClosed.svg';
import toggleIconOpen from '../assets/toggleIconOpen.svg';

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
      icon: toggleIconClosed,
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
      status: data.status || 'closed',
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
   * After inserts a new block after the toggle index and the new block
   * gets the focus.
   *
   * @param {KeyboardEvent} e - key down event
   */
  createParagraphFromToggleRoot(e) {
    if (e.code === 'Enter') {
      const originalIndex = this.api.blocks.getCurrentBlockIndex();

      if (this.data.status === 'closed') {
        const children = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);
        const icon = this.wrapper.firstChild;

        icon.innerHTML = this._resolveToggleAction();
        this._hideAndShowBlocks(originalIndex - 1, children.length);
      }

      const foreignKey = this.wrapper.id;
      const index = originalIndex + 1;
      const id = crypto.randomUUID();

      this.api.blocks.insert();

      const newBlock = this.api.blocks.getBlockByIndex(index);
      const { holder } = newBlock;
      const content = holder.firstChild;
      const item = content.firstChild;

      holder.addEventListener('keydown', this.createParagraphFromIt.bind(this));
      holder.setAttribute('foreignKey', foreignKey);
      holder.setAttribute('id', id);

      item.classList.add('toggle-block__item');
      item.focus();
    }
  }

  /**
   * First it gets the index of the inserted block.
   *
   * After get the full block to manipulate it.
   *
   * After sends the properties required to identify it as a toggle item,
   * and finally sends the focus again to the new block.
   *
   * @param {KeyboardEvent} e - key down event
   */
  createParagraphFromIt(e) {
    if (e.code === 'Enter') {
      const index = this.api.blocks.getCurrentBlockIndex();
      const newBlock = this.api.blocks.getBlockByIndex(index);
      const id = crypto.randomUUID();
      const { holder } = newBlock;
      const content = holder.firstChild;
      const item = content.firstChild;

      holder.addEventListener('keydown', this.createParagraphFromIt.bind(this));
      holder.setAttribute('foreignKey', this.wrapper.id);
      holder.setAttribute('id', id);

      item.classList.add('toggle-block__item');
      item.focus();
    }
  }

  /**
   * Creates a toggle block view without paragraphs
   */
  _createToggle() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('toggle-block__selector');
    this.wrapper.id = crypto.randomUUID();

    const icon = document.createElement('span');

    icon.classList.add('toggle-block__icon');
    icon.innerHTML = this.data.status === 'closed' ? toggleIconClosed : toggleIconOpen;

    const input = document.createElement('div');

    input.classList.add('toggle-block__input');
    input.contentEditable = true;
    input.addEventListener('keyup', this.createParagraphFromToggleRoot.bind(this));
    input.innerHTML = this.data.text || '';

    this.wrapper.appendChild(icon);
    this.wrapper.appendChild(input);
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

    return this.wrapper;
  }

  /**
   * Renders the items view and assigns the properties required to look
   * like a block inside the toggle.
   */
  renderItems() {
    const originalIndex = this.api.blocks.getCurrentBlockIndex();
    const icon = this.wrapper.firstChild;
    const foreignKey = this.wrapper.id;
    const editorBlocks = this.api.blocks.getBlocksCount();
    let index = editorBlocks > 1 ? originalIndex + 1 : originalIndex;

    icon.addEventListener('click', () => {
      const children = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);

      icon.innerHTML = this._resolveToggleAction();
      this._hideAndShowBlocksClicking(children.length);
    });

    this.data.items.forEach((block) => {
      const { type, data } = block;

      this.api.blocks.insert(type, data, {}, index += 1, true);

      const newBlock = this.api.blocks.getBlockByIndex(index);
      const { holder } = newBlock;
      const content = holder.firstChild;
      const item = content.firstChild;

      holder.addEventListener('keydown', this.createParagraphFromIt.bind(this));
      holder.setAttribute('foreignKey', foreignKey);
      holder.setAttribute('id', crypto.randomUUID());

      item.classList.add('toggle-block__item');
    });

    if (editorBlocks > 1) {
      this._hideAndShowBlocks(originalIndex, this.data.items.length);
    } else {
      this._hideAndShowBlocks(originalIndex - 1, this.data.items.length);
    }
  }

  /**
   * Converts the toggle status to its opposite, including its icon.
   * If the toggle status is open, then now will be closed and its icon
   * will be the right arrow (toggleIconClosed). Otherwise, will be open
   * and its icon will be the down arrow (toggleIconOpen).
   *
   * @returns {string} icon - toggle icon
   */
  _resolveToggleAction() {
    let icon = toggleIconClosed;

    if (this.data.status === 'closed') {
      icon = toggleIconOpen;
      this.data.status = 'open';
    } else {
      this.data.status = 'closed';
    }

    return icon;
  }

  /**
   * Hides and shows the toggle items.
   * It's called when is required to render saved data or creating new blocks
   * inside the toggle.
   *
   * @param {number} index - toggle index
   * @param {array} items - toggle items
   */
  _hideAndShowBlocks(index, items) {
    const toggleIndex = index + 1;
    this._iterateOnItems(items, toggleIndex);
  }

  /**
   * Hides and shows the toggle items.
   * It's called when is required to render the toggle items
   * clicking the toggle icon
   *
   * @param {array} items - toggle items
   */
  _hideAndShowBlocksClicking(items) {
    const toggleIndex = this.api.blocks.getCurrentBlockIndex();
    this._iterateOnItems(items, toggleIndex);
  }

  /**
   * Hides and shows the toggle paragraphs.
   * If the toggle status is closed, the hidden attribute is added
   * to the container paragraph. Otherwise, the hidden attribute is
   * removed.
   *
   * @param {array} items - toggle items
   * @param {number} toggleIndex - toggle index
   */
  _iterateOnItems(items, toggleIndex) {
    let index = toggleIndex;
    if (this.data.status === 'closed') {
      for (let i = 0; i < items; i += 1) {
        this.api.blocks.getBlockByIndex(index += 1).holder.setAttribute('hidden', true);
      }
    } else {
      for (let i = 0; i < items; i += 1) {
        this.api.blocks.getBlockByIndex(index += 1).holder.removeAttribute('hidden');
      }
    }
  }

  /**
   * Extracts Tool's data from the view
   * @param {HTMLDivElement} blockContent - Toggle tools rendered view
   * @returns {ToggleBlockData} - saved data
   */
  save(blockContent) {
    const caption = blockContent.textContent;
    const blocks = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);
    const items = [];

    blocks.forEach((block) => {
      items.push({ type: 'paragraph', data: { text: block.textContent } });
    });

    return Object.assign(this.data, {
      text: caption,
      items: [...items],
    });
  }

  /**
   * Validates Toggle block data
   * @param {object} savedData - Data received after saving
   * @returns {boolean} false if saved data isn't correct, otherwise true
   */
  validate(savedData) {
    for (let i = 0; i < savedData.items.length; i += 1) {
      if (savedData.items[i].type === undefined || savedData.items[i].data === undefined) {
        return false;
      }
    }

    return true;
  }
}
