export function startDocument() {
  document.body.innerHTML = '';
  const editorRedactor = document.createElement('div');
  editorRedactor.classList.add('codex-editor__redactor');

  const codexEditor = document.createElement('div');
  codexEditor.classList.add('codex-editor');
  codexEditor.appendChild(editorRedactor);

  const editorJS = document.createElement('div');
  editorJS.setAttribute('id', 'editorjs');
  editorJS.appendChild(codexEditor);

  document.body.appendChild(editorJS);
}

export function createDefaultBlock(block) {
  const newBlock = document.createElement('div');
  newBlock.classList.add('ce-block');
  newBlock.setAttribute('data-id', block.id);

  const content = document.createElement('div');
  content.classList.add('ce-block__content');

  const paragraph = document.createElement('div');
  paragraph.classList.add('ce-paragraph', 'cdx-block');
  paragraph.contentEditable = true;
  paragraph.textContent = block.data.text;

  content.appendChild(paragraph);
  newBlock.appendChild(content);

  return newBlock;
}

export function setFocus(target, pos) {
  const selection = window.getSelection();
  const range = document.createRange();

  const content = target.firstChild;
  let position = pos || content.length;
  position = pos > content.length ? content.length : pos;

  range.setStart(content, position);
  range.collapse(true);

  selection.removeAllRanges();
  selection.addRange(range);

  target.focus();
}
