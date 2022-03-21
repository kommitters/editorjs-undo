import createToggleBlock from './fixtures/toggle';
import data from './fixtures/toolData';
import {
  getHiddenAttribute, generateFullToggle, createParagraph, destroyFullToggle,
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

    toggleBlock = createToggleBlock(data);
  });

  describe('validates data', () => {
    it('when the data is valid with items', () => {
      expect(toggleBlock.validate(data)).toBe(true);
    });

    it('when the toggle has no valid items', () => {
      expect(toggleBlock.validate({ text: '', status: 'open', items: [{}] })).toBe(false);
    });

    it('when the data is valid with a empty item', () => {
      expect(toggleBlock.validate({ text: '', status: 'open', items: [{ type: 'paragraph', data: {} }] })).toBe(true);
    });

    it('when the data is valid without toggle items', () => {
      expect(toggleBlock.validate({ text: 'Text in the line', status: 'open', items: [] })).toBe(true);
    });
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
      toggle = generateFullToggle(toggleBlock);
      toggle.forEach((block) => redactor.appendChild(block));
      const children = redactor.querySelectorAll(`div[foreignKey="${toggleBlock.wrapper.id}"]`).length;
      hiddenAttributes = getHiddenAttribute(redactor, toggleBlock);

      expect(toggleBlock.data.status).toEqual('closed');
      expect(toggleBlock.data.items.length).toEqual(children);
      expect(hiddenAttributes).toEqual(children);
    });

    it('when a toggle status is open', () => {
      toggleBlock.data.status = 'open';
      toggle = generateFullToggle(toggleBlock);
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
      toggle = generateFullToggle(toggleBlock);
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
      toggle = generateFullToggle(toggleBlock);
      toggle.forEach((block) => redactor.appendChild(block));
    });

    it('when the current paragraph is the first', () => {
      const currentParagraph = redactor.children[1];
      const next = currentParagraph.nextSibling;
      const paragraph = createParagraph(toggleBlock, 'Inserted paragraph');

      redactor.insertBefore(paragraph, next);

      expect(next).not.toEqual(redactor.children[2]);
      expect(currentParagraph.nextSibling.textContent).toEqual('Inserted paragraph');
    });

    it('when the current paragraph is the last', () => {
      const lastParagraph = redactor.lastChild;
      const last = lastParagraph.nextSibling;
      const paragraph = createParagraph(toggleBlock, 'Last inserted paragraph');

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
      toggle = generateFullToggle(toggleBlock);
      toggle.forEach((block) => redactor.appendChild(block));

      const firstChild = redactor.children[1];
      const paragraph = createParagraph(toggleBlock, 'New paragraph');

      redactor.insertBefore(paragraph, firstChild);

      expect(firstChild).not.toEqual(redactor.children[1]);
      expect(redactor.children[1].textContent).toEqual('New paragraph');
    });

    it('when the toggle is empty', () => {
      toggleBlock.data.items = [];
      toggle = generateFullToggle(toggleBlock);
      toggle.forEach((block) => redactor.appendChild(block));

      const paragraph = createParagraph(toggleBlock, 'Last inserted paragraph');

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
      toggle = generateFullToggle(toggleBlock);
      toggle.forEach((block) => redactor.appendChild(block));
    });

    it('when the toggle has the first position in the document', () => {
      const children = toggle.length - 1;

      destroyFullToggle(redactor, 0, children);

      expect(redactor.children.length).toBe(0);
    });

    it('when the toggle is not the first element in the document', () => {
      // Insert new toggle in the document
      const newToggle = generateFullToggle(toggleBlock);
      newToggle.forEach((block) => redactor.appendChild(block));

      const children = newToggle.length - 1;

      destroyFullToggle(redactor, 4, children);

      expect(redactor.children.length).toBe(4);
    });
  });
});
