import { firstChange } from './data';
import { createDefaultBlock } from '../testHelpers';

/**
 * Mocks for Editor.js instance object.
 */
const editor = {
  blocks: {
    save: () => new Promise((resolve) => resolve(firstChange)),
    render: (blocks) => {
      const wrapperEditor = document.querySelector('#editorjs div.codex-editor__redactor');

      blocks.forEach((block) => {
        const defaultBlock = createDefaultBlock(block);
        wrapperEditor.appendChild(defaultBlock);
      });
    },
    getCurrentBlockIndex: () => 0,
    getBlockByIndex: () => ({ id: '123id', type: 'paragraph', data: {} }),
    getBlocksCount: () => 1,
    update: () => {},
    delete: () => {},
    insert: () => {},
  },
  caret: {
    setToBlock() {},
  },
  configuration: {
    defaultBlock: 'paragraph',
  },
};

const readOnlyEditor = {
  blocks: {
    save: () => new Promise((resolve) => resolve(firstChange)),
    render: () => new Promise((resolve) => resolve(true)),
    getCurrentBlockIndex: () => 0,
  },
  caret: {
    setToBlock() {},
  },
  configuration: {
    readOnly: true,
  },
};

const tools = {
  undo: {
    config: {
      debounceTimer: 100,
      shortcuts: {
        undo: 'CMD+X',
        redo: 'CMD+C',
      },
    },
  },
};

export { editor, readOnlyEditor, tools };
