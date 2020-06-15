export default class DataHistory {
  constructor(options) {
    const defaultOptions = {
      maxLength: 30,
      onUpdate() {},
    };

    this.editor = options.editor;
    this.shouldSaveHistory = true;

    this.maxLength = options.maxLength
      ? options.maxLength
      : defaultOptions.maxLength;
    this.onUpdate = options.onUpdate
      ? options.onUpdate
      : defaultOptions.onUpdate;

    this.setEventListeners();
    this.initialItem = null;
    this.clear();
  }

  truncate(stack, limit) {
    while (stack.length > limit) {
      stack.shift();
    }
  }

  initialize(initialItem) {
    this.stack[0] = initialItem;
    this.initialItem = initialItem;
  }

  clear() {
    this.stack = [this.initialItem];
    this.position = 0;
    this.onUpdate();
  }

  registerChange() {
    if (this.shouldSaveHistory) {
      this.editor.save().then((savedData) => {
        if (this.editorDidUpdate(savedData.blocks)) this.save(savedData.blocks);
      });
    }
    this.shouldSaveHistory = true;
  }

  editorDidUpdate(newData) {
    if (!this.count() && !this.initialItem) return true;

    const currentData = this.stack[this.position];
    if (newData.length !== currentData.length) return true;

    return Object.keys(currentData).some(
      (key) => this.blockDidChange(currentData[key], newData[key]),
    );
  }

  blockDidChange(currentBlock, newBlock) {
    if (currentBlock.type !== newBlock.type) return true;

    return Object.keys(currentBlock.data).some(
      (key) => typeof currentBlock.data[key] !== 'object' && currentBlock.data[key] !== newBlock.data[key],
    );
  }

  save(current) {
    if (this.position >= this.maxLength) {
      this.truncate(this.stack, this.maxLength);
    }
    this.position = Math.min(this.position, this.stack.length - 1);

    this.stack = this.stack.slice(0, this.position + 1);
    this.stack.push(current);
    this.position += 1;
    this.onUpdate();
  }

  undo() {
    this.shouldSaveHistory = false;
    if (this.canUndo()) {
      const item = this.stack[(this.position -= 1)];
      this.onUpdate();

      this.editor.blocks.render({ blocks: item });
    }
  }

  redo() {
    this.shouldSaveHistory = false;
    if (this.canRedo()) {
      const item = this.stack[(this.position += 1)];
      this.onUpdate();

      this.editor.blocks.render({ blocks: item });
    }
  }

  canUndo() {
    return this.position > 0;
  }

  canRedo() {
    return this.position < this.count();
  }

  count() {
    return this.stack.length - 1; // -1 because of initial item
  }

  setEventListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        this.undo();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        this.redo();
      }
    });
  }
}
