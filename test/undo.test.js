/**
 * @jest-environment jsdom
 */
import Undo from '../src/index';
import { startDocument, setFocus } from './testHelpers';
import { editor, readOnlyEditor, tools } from './fixtures/editor';

// Mocks user provided initial data.
const initialData = {
  blocks: [{ id: 'abk2', type: 'paragraph', data: { text: 'First paragraph' } }],
};

// Mocks first data to be recorded at the history stack.
const firstChange = {
  blocks: [
    { id: 'abk2', type: 'paragraph', data: { text: 'First paragraph' } },
    { id: 'zyl9', type: 'paragraph', data: { text: 'Second paragraph' } },
  ],
  diff: { 1: [{ type: 'paragraph', data: { text: 'Second paragraph' } }], _t: 'a' },
  formattedChange: [
    {
      op: 'replace',
      path: '/1',
      value: { id: 'zyl9', type: 'paragraph', data: { text: 'Second paragraph' } },
    },
  ],
  reverse: { _t: 'a', _1: [{ id: 'zyl9', type: 'paragraph', data: { text: 'Second paragraph' } }, 0, 0] },
  formattedReverse: [{ op: 'remove', path: '/1' }],
};

jest.mock('jsondiffpatch', () => ({
  create: () => ({
    diff: (_baseData, state) => {
      if (state === firstChange.blocks) {
        return firstChange.diff;
      }
      return undefined;
    },
    reverse: (lastState) => {
      if (lastState === firstChange.diff) {
        return firstChange.reverse;
      }
      return undefined;
    },
  }),
}));

jest.mock('jsondiffpatch/formatters/jsonpatch', () => ({
  format: (lastState) => {
    switch (lastState) {
      case firstChange.diff:
        return firstChange.formattedChange;

      case firstChange.reverse:
        return firstChange.formattedReverse;

      default:
        return undefined;
    }
  },
}));

jest.mock('json-joy/lib/json-patch', () => ({
  applyPatch: (baseData, jsonPatch) => {
    switch (jsonPatch) {
      case firstChange.formattedReverse:
        return { doc: initialData.blocks };

      case firstChange.formattedChange:
        return { doc: firstChange.blocks };

      default:
        return { doc: baseData };
    }
  },
}));

describe('Undo', () => {
  beforeEach(() => {
    startDocument();
    const holder = document.querySelector('#editorjs');
    editor.configuration.holder = holder;
    readOnlyEditor.configuration.holder = holder;
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

  describe('Custom debounce timer provided', () => {
    let undo;

    beforeEach(() => {
      const { config } = tools.undo;
      undo = new Undo({ editor, config });
    });

    it('is configured with a custom debounce timer', () => {
      const { debounceTimer } = tools.undo.config;
      expect(undo.config.debounceTimer).toEqual(debounceTimer);
    });
  });

  describe('Operations without changes', () => {
    let undo;

    beforeEach(() => {
      undo = new Undo({ editor });
    });

    it('is unable to perform an undo operation in an empty stack', () => {
      expect(undo.canUndo()).toBe(false);
      expect(undo.undoStack).toEqual([]);
    });

    it('is unable to perform a redo operation in an empty stack', () => {
      expect(undo.canRedo()).toBe(false);
      expect(undo.redoStack).toEqual([]);
    });

    it('initializes the plugin with initial data', () => {
      undo.initialize(initialData.blocks);
      const { baseData, undoStack } = undo;

      expect(undoStack).toEqual([]);
      expect(baseData).toEqual(initialData.blocks);
    });
  });

  describe('Operations with one change', () => {
    let undo;

    beforeEach(() => {
      // Editor initialization
      undo = new Undo({ editor });
      undo.initialize(initialData.blocks);

      // Apply the change
      editor.blocks.render(firstChange.blocks);
      const renderedBlocks = document.querySelectorAll('.ce-block__content');
      const countBlocks = renderedBlocks.length;
      const target = renderedBlocks[countBlocks - 1];
      setFocus(target.firstChild);

      // Save the change
      undo.save(firstChange.blocks);
    });

    it('registers a change in the stack', () => {
      const { state, caret } = undo.undoStack[0];
      const insertedText = firstChange.diff[1][0].data.text;

      expect(undo.undoStack.length).toEqual(1);
      expect(state).toEqual(firstChange.diff);
      expect(caret.caretIndex).toEqual(insertedText.length - 1);
    });

    it('removes the state from undoStack and inserts it in redoStack when undo action is called', () => {
      const { state: undoState, caret: undoCaret } = undo.undoStack[0];
      const { text } = firstChange.reverse._1[0].data;

      undo.undo();

      const { state: redoState, caret: redoCaret } = undo.redoStack[0];

      expect(undo.undoStack.length).toEqual(0);
      expect(undo.redoStack.length).toEqual(1);
      expect(redoState).toEqual(firstChange.diff);
      expect(redoCaret.caretIndex).toEqual(text.length - 1);
      expect(undo.baseData).toEqual(initialData.blocks);
      expect(undoState).toEqual(redoState);
      expect(undoCaret).toEqual(redoCaret);
    });

    it('removes the state from redoStack and inserts it in undoStack when redo action is called', () => {
      const { state: previousState, caret: perviousCaret } = undo.undoStack[0];
      const { text } = firstChange.diff[1][0].data;

      undo.undo();

      const { state: redoState, caret: redoCaret } = undo.redoStack[0];

      expect(undo.undoStack.length).toEqual(0);
      expect(undo.redoStack.length).toEqual(1);
      expect(redoState).toEqual(firstChange.diff);
      expect(redoCaret.caretIndex).toEqual(text.length - 1);
      expect(undo.baseData).toEqual(initialData.blocks);
      expect(previousState).toEqual(redoState);
      expect(perviousCaret).toEqual(redoCaret);

      undo.redo();

      const { state: nextState, caret: nextCaret } = undo.undoStack[0];

      expect(undo.undoStack.length).toEqual(1);
      expect(undo.redoStack.length).toEqual(0);
      expect(nextState).toEqual(firstChange.diff);
      expect(nextCaret.caretIndex).toEqual(text.length - 1);
      expect(redoState).toEqual(nextState);
      expect(redoCaret).toEqual(nextCaret);
      expect(undo.baseData).toEqual(firstChange.blocks);
      expect(previousState).toEqual(nextState);
      expect(perviousCaret).toEqual(nextCaret);
    });
  });
});
