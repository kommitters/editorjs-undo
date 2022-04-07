import ToggleBlock from '../src';
import createToggleBlock from './fixtures/toggle';
import editor from './fixtures/editor';
import data from './fixtures/toolData';
import {
  getHiddenAttribute, generateFullToggle, createNestedBlock, destroyFullToggle,
  extractionBlock, createDefaultBlock, createToggle, getEditorElements, nestBlock,
} from './testHelpers';

global.crypto = require('crypto');

describe('ToggleBlock', () => {
  let toggleBlock;

  beforeEach(() => {
    document.body.innerHTML = `
    <div id="editorjs">
      <div class="codex-editor">
        <div class="codex-editor__redactor">
        </div>  
      </div>
    </div>
    `;

    toggleBlock = createToggleBlock(data[0]);
    toggleBlock.data.status = 'closed';
    toggleBlock.data.items = 3;
  });

  describe('validates toggle components', () => {
    let toggle;

    beforeEach(() => {
      toggle = toggleBlock.render();
    });

    it('validates toggle class', () => {
      expect(toggle).toHaveClass('toggle-block__selector');
    });

    it('validates toggle input', () => {
      const input = toggle.querySelector('div');
      expect(input).toHaveClass('toggle-block__input');
    });

    it('validates toggle icon', () => {
      const icon = toggle.querySelector('span');
      expect(icon).toHaveClass('toggle-block__icon');
    });
  });

  describe('validates the render method', () => {
    let redactor;
    let hiddenAttributes;
    let toggle;

    beforeEach(() => {
      redactor = document.querySelector('div.codex-editor__redactor');
      hiddenAttributes = 0;
    });

    it('when a toggle status is closed', () => {
      toggle = generateFullToggle(toggleBlock, data);
      toggle.forEach((block) => redactor.appendChild(block));

      const children = redactor.querySelectorAll(`div[foreignKey="${toggleBlock.wrapper.id}"]`).length;

      hiddenAttributes = getHiddenAttribute(redactor, toggleBlock);

      expect(toggleBlock.data.items).toEqual(children);
      expect(hiddenAttributes).toEqual(children);
    });

    it('when a toggle status is open', () => {
      toggleBlock.data.status = 'open';
      toggle = generateFullToggle(toggleBlock, data);
      toggle.forEach((block) => redactor.appendChild(block));
      hiddenAttributes = getHiddenAttribute(redactor, toggleBlock);

      expect(toggleBlock.data.status).toEqual('open');
      expect(toggleBlock.data.items.length).not.toEqual(0);
      expect(hiddenAttributes).toEqual(0);
    });
  });

  describe('validates paragraph deletion from itself', () => {
    let redactor;
    let toggle;

    beforeEach(() => {
      redactor = document.querySelector('div.codex-editor__redactor');
      toggle = generateFullToggle(toggleBlock, data);
      toggle.forEach((block) => redactor.appendChild(block));
    });

    it('when the current paragraph is the first', () => {
      const currentParagraph = redactor.children[1];
      redactor.removeChild(currentParagraph);

      expect(currentParagraph).not.toEqual(redactor.children[1]);
    });

    it('when the current paragraph is the last', () => {
      const currentParagraph = redactor.lastChild;
      redactor.removeChild(currentParagraph);

      expect(currentParagraph).not.toEqual(redactor.lastChild);
    });
  });

  describe('validates paragraph insertion from another', () => {
    let redactor;
    let toggle;

    beforeEach(() => {
      redactor = document.querySelector('div.codex-editor__redactor');
      toggle = generateFullToggle(toggleBlock, data);
      toggle.forEach((block) => redactor.appendChild(block));
    });

    it('when the current paragraph is the first', () => {
      const currentParagraph = redactor.children[1];
      const next = currentParagraph.nextSibling;
      const paragraph = createNestedBlock(toggleBlock, { text: 'Inserted paragraph' });

      redactor.insertBefore(paragraph, next);

      expect(next).not.toEqual(redactor.children[2]);
      expect(currentParagraph.nextSibling.textContent).toEqual('Inserted paragraph');
    });

    it('when the current paragraph is the last', () => {
      const lastParagraph = redactor.lastChild;
      const last = lastParagraph.nextSibling;
      const paragraph = createNestedBlock(toggleBlock, { text: 'Last inserted paragraph' });

      redactor.appendChild(paragraph);

      expect(lastParagraph).not.toEqual(redactor.lastChild);
      expect(last).toBe(null);
      expect(redactor.lastChild.textContent).toEqual('Last inserted paragraph');
    });
  });

  describe('validates paragraph insertion from the toggle root', () => {
    let redactor;
    let toggle;

    beforeEach(() => {
      redactor = document.querySelector('div.codex-editor__redactor');
    });

    it('when the toggle has other paragraphs', () => {
      toggle = generateFullToggle(toggleBlock, data);
      toggle.forEach((block) => redactor.appendChild(block));

      const firstChild = redactor.children[1];
      const paragraph = createNestedBlock(toggleBlock, { text: 'New paragraph' });

      redactor.insertBefore(paragraph, firstChild);

      expect(firstChild).not.toEqual(redactor.children[1]);
      expect(redactor.children[1].textContent).toEqual('New paragraph');
    });

    it('when the toggle is empty', () => {
      toggleBlock.data.items = 0;
      redactor.appendChild(toggleBlock.render());

      const paragraph = createNestedBlock(toggleBlock, { text: 'Last inserted paragraph' });

      redactor.appendChild(paragraph);

      expect(redactor.children[1]).toEqual(redactor.lastChild);
      expect(redactor.lastChild.textContent).toEqual('Last inserted paragraph');
    });
  });

  describe('validates complete toggle removal', () => {
    let redactor;
    let toggle;

    beforeEach(() => {
      redactor = document.querySelector('div.codex-editor__redactor');
      toggle = generateFullToggle(toggleBlock, data);
      toggle.forEach((block) => redactor.appendChild(block));
    });

    it('when the toggle has the first position in the document', () => {
      const children = toggle.length - 1;

      destroyFullToggle(redactor, 0, children);

      expect(redactor.children.length).toBe(0);
    });

    it('when the toggle is not the first element in the document', () => {
      // Insert new toggle in the document
      const newToggle = generateFullToggle(toggleBlock, data);
      newToggle.forEach((block) => redactor.appendChild(block));

      const children = newToggle.length - 1;

      destroyFullToggle(redactor, 4, children);

      expect(redactor.children.length).toBe(4);
    });
  });

  describe('extraction block', () => {
    let redactor;
    let toggle;

    beforeEach(() => {
      redactor = document.querySelector('div.codex-editor__redactor');
      toggle = generateFullToggle(toggleBlock, data);
      toggle.forEach((block) => redactor.appendChild(block));
    });

    it('Extract the first block into the toggle', () => {
      const children = document.querySelectorAll(`div[foreignKey="${toggleBlock.wrapper.id}"]`);
      extractionBlock(toggleBlock, redactor, 1);

      expect(redactor.children.length).toBe(4);
      expect(children.length).toBe(3);
    });
  });

  describe('validates read-only mode', () => {
    let toggleBlockReadyOnly;

    it('when is enable', () => {
      toggleBlockReadyOnly = new ToggleBlock({ data, api: {}, readOnly: true });
      toggleBlockReadyOnly.render();

      const { children } = toggleBlockReadyOnly.wrapper;
      const contentEditable = children[1].getAttribute('contentEditable');

      expect(contentEditable).toBe('false');
    });

    it('when is disabled', () => {
      toggleBlock = new ToggleBlock({ data, api: {}, readOnly: false });
      toggleBlock.render();

      const { children } = toggleBlock.wrapper;
      const contentEditable = children[1].getAttribute('contentEditable');

      expect(contentEditable).toBe('true');
    });
  });

  describe('validates shortcut to create a toggle', () => {
    let keyboardEvent;

    beforeEach(() => {
      keyboardEvent = new KeyboardEvent('keyup', {
        key: 'Space',
      });
    });

    it('when the block has the required data', () => {
      const block = createDefaultBlock({ text: '>' });
      editor.blocks.insert(block);

      block.addEventListener('keyup', (e) => {
        createToggle(e, editor, toggleBlock);
      });

      block.dispatchEvent(keyboardEvent);

      const [redactor, classes] = getEditorElements();

      expect(classes[0]).toBe('toggle-block__selector');
      expect(redactor.children.length).toBe(1);
    });

    it('when the block has not the required data', () => {
      const block = createDefaultBlock({ text: '' });
      editor.blocks.insert(block);

      block.addEventListener('keyup', (e) => {
        createToggle(e, editor, toggleBlock);
      });

      block.dispatchEvent(keyboardEvent);

      const [redactor, classes] = getEditorElements();

      expect(classes[0]).not.toBe('toggle-block__selector');
      expect(redactor.children.length).toBe(1);
    });
  });

  describe('validates shortcut to nest a block inside a toggle', () => {
    let keyboardEvent;

    beforeEach(() => {
      keyboardEvent = new KeyboardEvent('keyup', {
        key: 'Tab',
      });
    });

    it('when the block is next to a toggle block', () => {
      const block = createDefaultBlock({ text: 'Block to be nested' });
      editor.blocks.insert(toggleBlock.render());
      editor.blocks.insert(block);

      block.addEventListener('keyup', (e) => {
        nestBlock(e, toggleBlock);
      });

      block.dispatchEvent(keyboardEvent);

      const cover = block.firstChild;
      const content = cover.firstChild;
      const classes = Array.from(content.classList);
      const foreignId = block.getAttribute('foreignKey');
      const { id } = toggleBlock.wrapper;

      expect(classes.includes('toggle-block__item')).toBe(true);
      expect(foreignId).toEqual(id);
    });

    it('when toggle block is not before the block', () => {
      const firstBlock = createDefaultBlock({ text: 'Block to be nested' });
      const block = createDefaultBlock({ text: 'Block to be nested' });
      editor.blocks.insert(firstBlock);
      editor.blocks.insert(block);

      block.addEventListener('keyup', (e) => {
        nestBlock(e, toggleBlock);
      });

      block.dispatchEvent(keyboardEvent);

      const cover = block.firstChild;
      const content = cover.firstChild;
      const classes = Array.from(content.classList);
      const foreignId = block.getAttribute('foreignKey');

      expect(classes.includes('toggle-block__item')).toBe(false);
      expect(foreignId).toBeNull();
    });
  });
});
