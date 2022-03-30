export function getHiddenAttribute(redactor) {
  const children = redactor.querySelectorAll('div[hidden="true"]');
  return children.length - 1;
}

export function createNestedBlock(toggleBlock, data) {
  const newBlock = document.createElement('div');
  newBlock.classList.add('ce-block');
  newBlock.setAttribute('foreignKey', toggleBlock.wrapper.id);
  newBlock.setAttribute('id', crypto.randomUUID());

  if (toggleBlock.data.status === 'closed') {
    newBlock.setAttribute('hidden', true);
  }

  const content = document.createElement('div');
  content.classList.add('ce-block__content');

  const paragraph = document.createElement('div');
  paragraph.classList.add('ce-paragraph', 'cdx-block', 'toggle-block__item');
  paragraph.contentEditable = true;
  paragraph.textContent = data.text;

  content.appendChild(paragraph);
  newBlock.appendChild(content);

  return newBlock;
}

export function generateFullToggle(toggleBlock) {
  const answer = [];
  let newBlock;

  answer.push(toggleBlock.render());

  toggleBlock.data.items.forEach((item) => {
    newBlock = createNestedBlock(toggleBlock, item.data);
    answer.push(newBlock);
  });

  return answer;
}

export function destroyFullToggle(redactor, toggleIndex, blocks) {
  // Destroys the toggle root
  const toggleRoot = redactor.children[toggleIndex];
  toggleRoot.remove();

  // Destroys each block inside the toggle
  for (let i = toggleIndex; i < toggleIndex + blocks; i += 1) {
    const currentBlock = redactor.children[toggleIndex];
    currentBlock.remove();
  }
}

export function createDefaultBlock(data) {
  const newBlock = document.createElement('div');
  newBlock.classList.add('ce-block');

  const content = document.createElement('div');
  content.classList.add('ce-block__content');

  const paragraph = document.createElement('div');
  paragraph.classList.add('ce-paragraph', 'cdx-block');
  paragraph.contentEditable = true;
  paragraph.textContent = data.text;

  content.appendChild(paragraph);
  newBlock.appendChild(content);

  return newBlock;
}

export function extractionBlock(toggleBlock, redactor, toggleIndex) {
  const currentBlock = redactor.children[toggleIndex];
  const { items } = toggleBlock.data;
  const { data } = items[toggleIndex - 1];
  const extractedBlock = createDefaultBlock(data);

  currentBlock.remove();
  redactor.appendChild(extractedBlock);
}

export function createToggle(e, editor, toggleBlock) {
  if (e.key === 'Space') {
    const blockContainer = document.activeElement;
    const content = blockContainer.textContent;
    const { length } = content;

    if (content[30] === '>' && (length === 50)) {
      const invocatorBlock = editor.blocks.getCurrentBlockIndex();
      toggleBlock.render();

      editor.blocks.insert(toggleBlock.wrapper);
      editor.blocks.delete(invocatorBlock);
    }
  }
}

export function getEditorElements() {
  const { body } = document;
  const mainContainer = body.children[0];
  const editorContainer = mainContainer.children[0];
  const redactor = editorContainer.children[0];
  const toggle = redactor.children[0];
  const classes = toggle.classList;

  return [redactor, classes];
}

function isPartOfAToggle(block) {
  const classes = Array.from(block.classList);
  const answer = classes.includes('toggle-block__item') || (classes.includes('toggle-block__input') || classes.includes('toggle-block__selector'));

  return answer;
}

export function nestBlock(e) {
  if (e.key === 'Tab') {
    const { body } = document;
    const mainContainer = body.children[0];
    const editorContainer = mainContainer.children[0];
    const redactor = editorContainer.children[0];
    const [toggle, block] = redactor.children;

    if (isPartOfAToggle(toggle)) {
      const cover = block.firstChild;
      const content = cover.firstChild;

      block.setAttribute('foreignKey', toggle.id);
      block.setAttribute('id', crypto.randomUUID());

      content.classList.add('toggle-block__item');
    }
  }
}
