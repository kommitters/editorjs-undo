import { firstChange } from './data';

/**
 * Mocks Editor.js instance object.
 */
const editor = {
  blocks: {
    save: () => new Promise((resolve) => resolve(firstChange)),
    render: () => new Promise((resolve) => resolve(true)),
    getCurrentBlockIndex: () => 0,
  },
  caret: {
    setToBlock() {},
  },
  configuration: {
    holder: 'editorjs',
  },
};

export default editor;
