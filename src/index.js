import './index.css';
import toggleIconPrimary from '../assets/toggleIcon.svg';
import toggleIconSecundary from '../assets/toggleIconSecundary.svg';

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
      status: data.status || 'closed',
    };

    this.wrapper = undefined;
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('toggle-block__selector');

    const icon = document.createElement('span');
    icon.classList.add('toggle-block__icon');
    icon.innerHTML = toggleIconPrimary;

    icon.addEventListener('click', () => {
      if (this.data.status === 'closed') {
        icon.innerHTML = toggleIconSecundary;
        this.data.status = 'opened';
      } else {
        icon.innerHTML = toggleIconPrimary;
        this.data.status = 'closed';
      }
    });

    const input = document.createElement('div');

    input.classList.add('toggle-block__input');
    input.contentEditable = true;
    input.innerHTML = this.data.text || '';

    this.wrapper.appendChild(icon);
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
