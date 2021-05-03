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
});
