export function getHiddenAttribute(redactor) {
  const children = redactor.querySelectorAll('div[hidden="true"]');
  return children.length - 1;
}

export function createParagraph(toggleBlock, data) {
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
  paragraph.textContent = data;

  content.appendChild(paragraph);
  newBlock.appendChild(content);

  return newBlock;
}

export function generateFullToggle(toggleBlock) {
  const answer = [];
  let newBlock;

  answer.push(toggleBlock.render());

  toggleBlock.data.items.forEach((item) => {
    newBlock = createParagraph(toggleBlock, item.data);
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
