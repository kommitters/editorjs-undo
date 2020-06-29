import { firstChange } from './data';

/**
 * Mocks Editor.js instance object.
 */
const editor = {
  blocks: {
    save: () => new Promise((resolve) => resolve(firstChange)),
    render() {},
  },
  configuration: {
    holder: 'editorjs',
  },
};

export default editor;
