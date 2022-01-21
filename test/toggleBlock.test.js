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

    beforeEach(() => {
      toggle = toggleBock.render();
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
});
