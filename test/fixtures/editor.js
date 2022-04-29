import { firstChange } from './data';

/**
 * Mocks for Editor.js instance object.
 */
const editor = {
  blocks: {
    save: () => new Promise((resolve) => resolve(firstChange)),
    render: () => new Promise((resolve) => resolve(true)),
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
  configuration: {},
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
