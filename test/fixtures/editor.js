const editor = {
  blocks: {
    getCurrentBlockIndex: () => 0,
    getRedactor: () => {
      const { body } = document;
      const mainContainer = body.children[0];
      const editorContainer = mainContainer.children[0];
      const redactor = editorContainer.children[0];
      return redactor;
    },
    getBlockByIndex: () => ({ id: '123id', type: 'paragraph', data: {} }),
    getBlocksCount: () => 4,
    move: (finalPosition, currentPosition) => () => {
      const redactor = editor.blocks.getRedactor();
      redactor.children[currentPosition].before(redactor.children[finalPosition]);
    },
    delete: (index) => {
      const redactor = editor.blocks.getRedactor();
      const currentBlock = redactor.children[index];
      currentBlock.remove();
    },
    insert: (block) => {
      const redactor = editor.blocks.getRedactor();
      redactor.appendChild(block);
    },
  },
  toolbar: {
    close: () => true,
  },
};

export default editor;
