import './index.css';
import toggleIconPrimary from '../assets/toggleIcon.svg';

export default class ToggleBlock {
  static get toolbox() {
    return {
      title: 'Toggle',
      icon: toggleIconPrimary,
    };
  }

  constructor({ data }) {
    this.data = {
      text: data.text || '',
    };

    this.wrapper = undefined;
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('toggle-block');
    this.wrapper.innerHTML = toggleIconPrimary;

    const input = document.createElement('div');

    input.classList.add('toggle-input');
    input.contentEditable = true;
    input.innerHTML = this.data.text || '';

    this.wrapper.appendChild(input);

    return this.wrapper;
  }

  save(blockContent) {
    const caption = blockContent.querySelector('div');
    return Object.assign(this.data, {
      text: caption.innerHTML,
    });
  }

  validate(savedData) {
    if (!savedData.text.trim()) {
      return false;
    }
    return true;
  }
}
