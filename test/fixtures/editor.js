import { firstChange } from './data';

/**
 * Mocks for Editor.js instance object.
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

export { editor, readOnlyEditor };
