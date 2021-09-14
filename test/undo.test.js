import Undo from '../src/index';
import {
  initialData,
  firstChange,
  secondChange,
  newChange,
} from './fixtures/data';
import { editor, readOnlyEditor } from './fixtures/editor';

describe('Undo', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="editorjs"></div>';
    // EditorJS uses as a holder an HTMLElement instead of a query selector.
    // This has to be assigned each time that DOM is reset.
    editor.configuration.holder = document.querySelector('#editorjs');
    readOnlyEditor.configuration.holder = document.querySelector('#editorjs');
  });

  describe('Read-only mode active', () => {
    let undo;

    beforeEach(() => {
      undo = new Undo({ editor: readOnlyEditor });
    });

    it('is unable to perform an undo/redo operation', () => {
      expect(undo.canUndo()).toBe(false);
      expect(undo.canRedo()).toBe(false);
      expect(undo.registerChange()).toBeUndefined();
    });
  });

  describe('Operations without changes', () => {
    let undo;

    beforeEach(() => {
      undo = new Undo({ editor });
    });

    const intialStackData = { index: 0, state: [] };

    it('is unable to perform an undo operation in an empty stack', () => {
      expect(undo.canUndo()).toBe(false);
      expect(undo.stack[0]).toEqual(intialStackData);
    });

    it('is unable to perform a redo operation in an empty stack', () => {
      expect(undo.canRedo()).toBe(false);
      expect(undo.stack[0]).toEqual(intialStackData);
    });

    it('initializes the plugin with initial data', () => {
      undo.initialize(initialData.blocks);
      expect(undo.count()).toEqual(0);
      const { state } = undo.stack[0];
      expect(state).toEqual(initialData.blocks);
    });
  });

  describe('Operations with one change', () => {
    let undo;

    beforeEach(() => {
      undo = new Undo({ editor });
      undo.initialize(initialData.blocks);
      undo.save(firstChange.blocks);
    });

    it('registers a change in the stack', () => {
      expect(undo.count()).toEqual(1);
      expect(undo.position).toEqual(1);
      const { state } = undo.stack[1];
      expect(state).toEqual(firstChange.blocks);
    });

    it('decreases stack position when undo action is called', () => {
      undo.undo();
      expect(undo.position).toEqual(0);
      const { state } = undo.stack[undo.position];
      expect(state).toEqual(initialData.blocks);
    });

    it('increases stack position when redo action is called', () => {
      undo.redo();
      expect(undo.position).toEqual(1);
      const { state } = undo.stack[undo.position];
      expect(state).toEqual(firstChange.blocks);
    });
  });

  describe('Operations with two changes', () => {
    let undo;

    beforeEach(() => {
      undo = new Undo({ editor });
      undo.initialize(initialData.blocks);
      undo.save(firstChange.blocks);
      undo.save(secondChange.blocks);
    });

    it('performs an undo and redo operation', () => {
      undo.undo();
      undo.redo();
      expect(undo.position).toEqual(undo.count());
      const { state } = undo.stack[undo.position];
      expect(state).toEqual(secondChange.blocks);
    });

    it('performs a redo and undo operation', () => {
      undo.undo();
      undo.redo();
      undo.undo();
      expect(undo.position).toEqual(1);
      const { state } = undo.stack[undo.position];
      expect(state).toEqual(firstChange.blocks);
    });

    it('performs an undo operation and creates a new change', () => {
      undo.undo();
      undo.save(newChange.blocks);
      expect(undo.position).toEqual(undo.position);
      const { state } = undo.stack[undo.position];
      expect(state).toEqual(newChange.blocks);
    });
  });

  describe('Undo/redo events fired inside and outside Editor\'s holder', () => {
    let undo;

    beforeEach(() => {
      undo = new Undo({ editor });
      undo.initialize(initialData.blocks);
      undo.save(firstChange.blocks);
      undo.save(secondChange.blocks);
    });

    it('undo event, with default shortcut, outside Editor\'s holder has not to cause changes in Undo Plugin stack', () => {
      // Set metaKey and ctrlKey to true in order to work in Mac and other OSs.
      const keyboardEvent = new KeyboardEvent('keydown', {
        key: 'z',
        metaKey: true,
        ctrlKey: true,
      });

      document.dispatchEvent(keyboardEvent);

      expect(undo.count()).toEqual(2);
      expect(undo.position).toEqual(2);
      const { state } = undo.stack[2];
      expect(state).toEqual(secondChange.blocks);
    });

    it('undo event, with default shortcut, inside Editor\'s holder has to cause changes in Undo Plugin stack', () => {
      const keyboardEvent = new KeyboardEvent('keydown', {
        key: 'z',
        metaKey: true,
        ctrlKey: true,
      });

      editor.configuration.holder.dispatchEvent(keyboardEvent);

      expect(undo.count()).toEqual(2);
      expect(undo.position).toEqual(1);
      const { state } = undo.stack[1];
      expect(state).toEqual(firstChange.blocks);
    });

    it('undo event, with custom shortcut, inside Editor\'s holder has to cause changes in Undo Plugin stack', () => {
      undo.shortcut('ctrlKey+x', 'ctrlKey+c');
      const keyboardEvent = new KeyboardEvent('keydown', {
        key: 'x',
        metaKey: true,
        ctrlKey: true,
      });

      editor.configuration.holder.dispatchEvent(keyboardEvent);

      expect(undo.count()).toEqual(2);
      expect(undo.position).toEqual(1);
      const { state } = undo.stack[1];
      expect(state).toEqual(firstChange.blocks);
    });

    it('undo event, with default shortcut if the shortcuts has been customized, inside Editor\'s holder has not to cause changes in Undo Plugin stack', () => {
      undo.shortcut('ctrlKey+x', 'ctrlKey+c');
      const keyboardEvent = new KeyboardEvent('keydown', {
        key: 'z',
        metaKey: true,
        ctrlKey: true,
      });

      editor.configuration.holder.dispatchEvent(keyboardEvent);

      expect(undo.count()).toEqual(2);
      expect(undo.position).toEqual(2);
      const { state } = undo.stack[2];
      expect(state).toEqual(secondChange.blocks);
    });

    it('redo event, with default shortcut, outside Editor\'s holder has not to cause changes in Undo Plugin stack', () => {
      undo.undo();

      const keyboardEvent = new KeyboardEvent('keydown', {
        key: 'y',
        metaKey: true,
        ctrlKey: true,
      });

      document.dispatchEvent(keyboardEvent);

      expect(undo.count()).toEqual(2);
      expect(undo.position).toEqual(1);
      const { state } = undo.stack[1];
      expect(state).toEqual(firstChange.blocks);
    });

    it('redo event, with default shortcut, inside Editor\'s holder has to cause changes in Undo Plugin stack', () => {
      undo.undo();

      const keyboardEvent = new KeyboardEvent('keydown', {
        key: 'y',
        metaKey: true,
        ctrlKey: true,
      });

      editor.configuration.holder.dispatchEvent(keyboardEvent);

      expect(undo.count()).toEqual(2);
      expect(undo.position).toEqual(2);
      const { state } = undo.stack[2];
      expect(state).toEqual(secondChange.blocks);
    });

    it('redo event, with custom shortcut, inside Editor\'s holder has to cause changes in Undo Plugin stack', () => {
      undo.shortcut('ctrlKey+x', 'ctrlKey+c');
      undo.undo();

      const keyboardEvent = new KeyboardEvent('keydown', {
        key: 'c',
        metaKey: true,
        ctrlKey: true,
      });

      editor.configuration.holder.dispatchEvent(keyboardEvent);

      expect(undo.count()).toEqual(2);
      expect(undo.position).toEqual(2);
      const { state } = undo.stack[2];
      expect(state).toEqual(secondChange.blocks);
    });

    it('redo event, with default shortcut if the shortcuts has been customized, inside Editor\'s holder has not to cause changes in Undo Plugin stack', () => {
      undo.shortcut('ctrlKey+x', 'ctrlKey+c');
      undo.undo();
      const keyboardEvent = new KeyboardEvent('keydown', {
        key: 'y',
        metaKey: true,
        ctrlKey: true,
      });

      editor.configuration.holder.dispatchEvent(keyboardEvent);

      expect(undo.count()).toEqual(2);
      expect(undo.position).toEqual(1);
      const { state } = undo.stack[1];
      expect(state).toEqual(firstChange.blocks);
    });
  });

  describe('the holder key accept strings', () => {
    let undo;

    beforeEach(() => {
      editor.configuration.holder = 'editorjs';
      undo = new Undo({ editor });
      undo.initialize(initialData.blocks);
      undo.save(firstChange.blocks);
      undo.save(secondChange.blocks);
    });

    it('holder is assign to the correct html element', () => {
      expect(undo.holder).toBe(document.querySelector('#editorjs'));
    });

    it('performs an undo and redo operation with two changes', () => {
      undo.undo();
      undo.redo();
      expect(undo.position).toEqual(undo.count());
      const { state } = undo.stack[undo.position];
      expect(state).toEqual(secondChange.blocks);
    });
  });
});
