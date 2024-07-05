import { createDefaultBlock } from '../testHelpers';

// Mocks for Editor.js instance object
const editor = {
  blocks: {
    render: (blocks) => {
      const wrapperEditor = document.querySelector('#editorjs div.codex-editor__redactor');

      wrapperEditor.replaceChildren();

      blocks.forEach((block) => {
        const defaultBlock = createDefaultBlock(block);
        wrapperEditor.appendChild(defaultBlock);
      });
    },
    getCurrentBlockIndex: () => {
      const blocks = document.querySelector('#editorjs div.codex-editor__redactor').children;

      return blocks.length - 1;
    },
    getBlockByIndex: (index) => {
      const blocks = document.querySelector('#editorjs div.codex-editor__redactor').children;
      const searchedBlock = blocks[index];
      const blockId = searchedBlock.getAttribute('data-id');
      const blockText = searchedBlock.firstChild.firstChild.innerHTML;

      return ({
        save: () => ({
          id: blockId,
          type: 'paragraph',
          data: { text: blockText },
        }),
      });
    },
    getBlocksCount: () => 1,
    update: () => {},
    delete: () => {},
    insert: () => {},
  },
  caret: {
    setToBlock() {},
    setToLastBlock() {},
  },
  configuration: {
    defaultBlock: 'paragraph',
  },
};

const readOnlyEditor = {
  blocks: {
    getCurrentBlockIndex: () => 0,
  },
  caret: {
    setToBlock() { },
    setToLastBlock() { },
  },
  configuration: {
    readOnly: true,
  },
};

const tools = {
  undo: {
    config: {
      debounceTimer: 50,
      shortcuts: {
        undo: 'CMD+X',
        redo: 'CMD+C',
      },
    },
  },
};

export { editor, readOnlyEditor, tools };
