import createToggleBlock from './fixtures/toggle';
import data from './fixtures/toolData';
import getHiddenAttribute from './testHelpers';

global.crypto = require('crypto');

describe('ToggleBlock', () => {
  let toggleBlock;

  beforeEach(() => {
    toggleBlock = createToggleBlock(data);
  });

  describe('validates data', () => {
    it('when the data is valid with toggle text and items', () => {
      expect(toggleBlock.validate(data)).toBe(true);
    });

    it('when the data is valid without toggle text and items', () => {
      expect(toggleBlock.validate({ text: '', status: 'open', items: [] })).toBe(false);
    });

    it('when the data is valid without toggle text but with toggle items', () => {
      expect(toggleBlock.validate({ text: '', status: 'open', items: ['First line'] })).toBe(true);
    });

    it('when the data is valid with toggle text but without toggle items', () => {
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

  describe('validates paragraph insertion', () => {
    let toggle;

    it('when a toggle status is closed', () => {
      toggle = toggleBlock.render();
      const entryStatus = toggleBlock.data.status;
      toggleBlock.insertParagraph('the latest paragraph');

      expect(entryStatus).toBe('closed');
      expect(toggleBlock.data.status).toEqual('open');
      expect(toggle.lastChild).toHaveClass('toggle-block__paragraph');
      expect(toggle.lastChild.innerHTML).toEqual('the latest paragraph');
    });

    it('when a toggle status is open', () => {
      toggleBlock.data.status = 'open';
      toggle = toggleBlock.render();
      toggleBlock.insertParagraph('the latest paragraph of the open toggle');

      expect(toggleBlock.data.status).toEqual('open');
      expect(toggle.lastChild).toHaveClass('toggle-block__paragraph');
      expect(toggle.lastChild.innerHTML).toEqual('the latest paragraph of the open toggle');
    });
  });

  describe('validates the render method', () => {
    let toggle;
    let children;
    let hiddenAttributes;

    beforeEach(() => {
      hiddenAttributes = 0;
    });

    it('when a toggle status is closed', () => {
      toggle = toggleBlock.render();
      children = toggle.children;
      hiddenAttributes = getHiddenAttribute(children);

      expect(hiddenAttributes).toEqual(children.length - 2);
      expect(toggleBlock.data.status).toEqual('closed');
    });

    it('when a toggle status is open', () => {
      toggleBlock.data.status = 'open';
      toggle = toggleBlock.render();
      children = toggle.children;
      hiddenAttributes = getHiddenAttribute(children);

      expect(hiddenAttributes).toEqual(0);
      expect(toggleBlock.data.status).toEqual('open');
    });
  });

  describe('validates paragraph deletion', () => {
    let penultimateParagraph;
    let paragraphs;

    beforeEach(() => {
      paragraphs = toggleBlock.data.items.length;
      penultimateParagraph = toggleBlock.data.items[paragraphs - 2];
    });

    it('when a toggle status is closed', () => {
      toggleBlock.render();

      const entryStatus = toggleBlock.data.status;
      const lastParagraph = toggleBlock.data.items[paragraphs - 1];

      toggleBlock.removeParagraph();

      paragraphs -= 1;

      expect(entryStatus).toEqual('closed');
      expect(toggleBlock.data.status).toEqual('closed');
      expect(penultimateParagraph).not.toEqual(lastParagraph);
      expect(penultimateParagraph).toEqual(toggleBlock.data.items[paragraphs - 1]);
    });

    it('when a toggle status is open', () => {
      toggleBlock.data.status = 'open';
      toggleBlock.render();

      const lastParagraph = toggleBlock.data.items[paragraphs - 1];

      toggleBlock.removeParagraph();

      paragraphs -= 1;

      expect(toggleBlock.data.status).toEqual('open');
      expect(penultimateParagraph).not.toEqual(lastParagraph);
      expect(penultimateParagraph).toEqual(toggleBlock.data.items[paragraphs - 1]);
    });
  });

  describe('validates paragraph deletion from itself', () => {
    let toggle;

    beforeEach(() => {
      toggleBlock.render();
      toggle = toggleBlock.wrapper;
    });

    it('when the current paragraph is the first', () => {
      const currentParagraph = toggle.children[2];
      toggle.children[2].remove();

      expect(currentParagraph).not.toEqual(toggle.children[2]);
    });

    it('when the current paragraph is the last', () => {
      const currentParagraph = toggle.lastChild;
      toggle.lastChild.remove();

      expect(currentParagraph).not.toEqual(toggle.lastChild);
    });
  });

  describe('validates paragraph insertion from another', () => {
    let toggle;

    beforeEach(() => {
      toggleBlock.render();
      toggle = toggleBlock.wrapper;
    });

    it('when the current paragraph is the first', () => {
      const currentParagraph = toggle.children[2];
      const next = currentParagraph.nextSibling;
      const paragraph = toggleBlock.createParagraph('Inserted paragraph');

      toggleBlock.wrapper.insertBefore(paragraph, next);

      expect(next).not.toEqual(toggle.children[3]);
      expect(currentParagraph.nextSibling.innerHTML).toEqual('Inserted paragraph');
    });

    it('when the current paragraph is the last', () => {
      const lastParagraph = toggle.lastChild;
      const last = lastParagraph.nextSibling;
      toggleBlock.insertParagraph('Last inserted paragraph');

      expect(lastParagraph).not.toEqual(toggle.lastChildren);
      expect(last).toBe(null);
      expect(toggle.lastChild.innerHTML).toEqual('Last inserted paragraph');
    });
  });

  describe('validates paragraph insertion from the toggle root', () => {
    let toggle;

    beforeEach(() => {
      toggleBlock.render();
      toggle = toggleBlock.wrapper;
    });

    it('when the toggle has other paragraphs', () => {
      const firstChild = toggle.children[2];
      const paragraph = toggleBlock.createParagraph('New paragraph');

      toggle.insertBefore(paragraph, firstChild);

      expect(firstChild).not.toEqual(toggle.children[2]);
      expect(toggle.children[2].innerHTML).toEqual('New paragraph');
    });

    it('when the toggle is empty', () => {
      toggleBlock.data.items = [];
      toggleBlock.render();

      const newToggle = toggleBlock.wrapper;

      toggleBlock.insertParagraph('Last inserted paragraph');

      expect(newToggle.children[2]).toEqual(newToggle.lastChild);
      expect(newToggle.lastChild.innerHTML).toEqual('Last inserted paragraph');
    });
  });
});
