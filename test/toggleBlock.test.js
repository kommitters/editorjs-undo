import createToggleBlock from './fixtures/toggle';
import data from './fixtures/toolData';

describe('ToggleBlock', () => {
  let toggleBock;

  beforeEach(() => {
    toggleBock = createToggleBlock(data);
  });

  describe('validates data', () => {
    it('return true if data is valid', () => {
      expect(toggleBock.validate(data)).toBe(true);
    });

    it('return false if data is not valid', () => {
      expect(toggleBock.validate({ text: '' })).toBe(false);
    });
  });

  describe('validates toggle components', () => {
    let toggle;
    let input;

    beforeEach(() => {
      toggle = toggleBock.render();
      input = toggle.querySelector('div');
    });

    it('validates toggle class', () => {
      expect(toggle).toHaveClass('toggle-block');
    });

    it('validates toggle input', () => {
      expect(input).toHaveClass('toggle-input');
    });

    it('validates toggle icon as first element within the toggle-block', () => {
      const { firstChild, lastChild } = toggle;
      const icon = firstChild !== lastChild && input === lastChild;

      expect(icon).toBe(true);
    });
  });
});
