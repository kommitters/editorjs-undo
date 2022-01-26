import createToggleBlock from './fixtures/toggle';
import data from './fixtures/toolData';
import getHiddenAttribute from './testHelpers';

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
});
