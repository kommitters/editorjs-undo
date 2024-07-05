/**
 * @jest-environment jsdom
 */
import Undo from '../src/index';
import { initialData, firstChange, secondChange } from './fixtures/data';
import { startDocument, setFocus } from './testHelpers';
import { editor, readOnlyEditor, tools } from './fixtures/editor';

const revolveDiff = (state) => {
  switch (state) {
    case firstChange.blocks:
      return firstChange.diff;

    case secondChange.blocks:
      return secondChange.diff;

    default:
      return undefined;
  }
};

const revolveReverse = (lastState) => {
  switch (lastState) {
    case firstChange.diff:
      return firstChange.reverse;

    case secondChange.diff:
      return secondChange.reverse;

    default:
      return undefined;
  }
};

const resolveFormat = (lastState) => {
  switch (lastState) {
    case firstChange.diff:
      return firstChange.formattedChange;

    case firstChange.reverse:
      return firstChange.formattedReverse;

    case secondChange.diff:
      return secondChange.formattedChange;

    case secondChange.reverse:
      return secondChange.formattedReverse;

    default:
      return undefined;
  }
};

const resolveApplyPatch = (baseData, jsonPatch) => {
  switch (jsonPatch) {
    case firstChange.formattedReverse:
      return { doc: initialData.blocks };

    case firstChange.formattedChange:
      return { doc: firstChange.blocks };

    case secondChange.formattedReverse:
      return { doc: firstChange.blocks };

    case secondChange.formattedChange:
      return { doc: secondChange.blocks };

    default:
      return { doc: baseData };
  }
};

jest.mock('jsondiffpatch', () => ({
  create: () => ({
    diff: (_baseData, state) => revolveDiff(state),
    reverse: (lastState) => revolveReverse(lastState),
  }),
}));

jest.mock('jsondiffpatch/formatters/jsonpatch', () => ({
  format: (lastState) => resolveFormat(lastState),
}));

jest.mock('json-joy/lib/json-patch', () => ({
  applyPatch: (baseData, jsonPatch) => resolveApplyPatch(baseData, jsonPatch),
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

    it('registers a change in the undoStack', () => {
      const { state, caret } = undo.undoStack[0];
      const insertedText = firstChange.diff[1][0].data.text;

      expect(undo.undoStack.length).toEqual(1);
      expect(state).toEqual(firstChange.diff);
      expect(caret.caretIndex).toEqual(insertedText.length - 1);
      expect(undo.baseData).toEqual(firstChange.blocks);
    });

    it('removes the state from undoStack and inserts it in redoStack when undo action is called', () => {
      // Status when one change was applied but no redo or undo action has been performed
      const { state: undoState, caret: undoCaret } = undo.undoStack[0];
      const { text } = firstChange.reverse._1[0].data;

      // Status when an undo action has been performed
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
      // Status when one change was applied but no redo or undo action has been performed
      const { state: previousState, caret: previousCaret } = undo.undoStack[0];
      const { text } = firstChange.diff[1][0].data;

      // Status when an undo action has been performed
      undo.undo();

      const { state: redoState, caret: redoCaret } = undo.redoStack[0];

      // Status when an redo action has been performed
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
      expect(previousCaret).toEqual(nextCaret);
    });
  });

  describe('Operations with two changes', () => {
    let undo;

    beforeEach(() => {
      undo = new Undo({ editor });
      undo.initialize(initialData.blocks);

      // Apply the first change
      editor.blocks.render(firstChange.blocks);
      let renderedBlocks = document.querySelectorAll('.ce-block__content');
      let countBlocks = renderedBlocks.length;
      let target = renderedBlocks[countBlocks - 1];
      setFocus(target.firstChild);

      // Save the first change
      undo.save(firstChange.blocks);

      // Apply the second change
      editor.blocks.render(secondChange.blocks);
      renderedBlocks = document.querySelectorAll('.ce-block__content');
      countBlocks = renderedBlocks.length;
      target = renderedBlocks[countBlocks - 1];
      setFocus(target.firstChild);

      // Save the second change
      undo.save(secondChange.blocks);
    });

    it('registers two changes in the undoStack', () => {
      const { text: secondText } = secondChange.diff[2][0].data;
      const { text: firstText } = firstChange.diff[1][0].data;

      expect(undo.undoStack.length).toEqual(2);
      expect(undo.redoStack.length).toEqual(0);
      expect(undo.undoStack[1].state).toEqual(secondChange.diff);
      expect(undo.undoStack[0].state).toEqual(firstChange.diff);
      expect(undo.undoStack[1].caret.caretIndex).toEqual(secondText.length - 1);
      expect(undo.undoStack[0].caret.caretIndex).toEqual(firstText.length - 1);
      expect(undo.baseData).toEqual(secondChange.blocks);
    });

    it('removes one state from undoStack and inserts it in redoStack when undo action is called', () => {
      // Status when two changes were applied but no redo or undo action has been performed
      const { length: previousLength } = undo.undoStack;
      const { state: previousState, caret: previousCaret } = undo.undoStack[previousLength - 1];
      const { text } = secondChange.diff[2][0].data;

      // Status when an undo action has been performed
      undo.undo();

      const { length: redoLength } = undo.redoStack;
      const { state: redoState, caret: redoCaret } = undo.redoStack[redoLength - 1];

      expect(redoLength).toBe(1);
      expect(undo.undoStack.length).toBe(1);
      expect(redoState).toEqual(secondChange.diff);
      expect(redoCaret.caretIndex).toEqual(text.length - 1);
      expect(redoState).toEqual(previousState);
      expect(redoCaret).toEqual(previousCaret);
      expect(undo.baseData).toEqual(firstChange.blocks);
    });

    it('removes one state from redoStack and inserts it in undoStack when redo action is called', () => {
      // Status when two changes were applied but no redo or undo action has been performed
      const { length: previousLength } = undo.undoStack;
      const { state: previousState, caret: previousCaret } = undo.undoStack[previousLength - 1];

      // Status when an undo action has been performed
      undo.undo();

      const { length: redoLength } = undo.redoStack;
      const { state: redoState, caret: redoCaret } = undo.redoStack[redoLength - 1];

      // Status when an redo action has been performed
      undo.redo();

      const { length: undoLength } = undo.undoStack;
      const { state: nextState, caret: nextCaret } = undo.undoStack[undoLength - 1];

      expect(undoLength).toBe(2);
      expect(undo.redoStack.length).toBe(0);
      expect(undo.undoStack[0].state).toEqual(firstChange.diff);
      expect(nextState).toEqual(secondChange.diff);
      expect(nextState).toEqual(redoState);
      expect(nextCaret).toEqual(redoCaret);
      expect(nextState).toEqual(previousState);
      expect(nextCaret).toEqual(previousCaret);
      expect(undo.baseData).toEqual(secondChange.blocks);
    });
  });

  describe('Undo/redo events fired with default shortcuts', () => {
    let undo;

    beforeEach(() => {
      undo = new Undo({ editor });
      undo.initialize(initialData.blocks);

      // Apply the first change
      editor.blocks.render(firstChange.blocks);
      let renderedBlocks = document.querySelectorAll('.ce-block__content');
      let countBlocks = renderedBlocks.length;
      let target = renderedBlocks[countBlocks - 1];
      setFocus(target.firstChild);

      // Save the first change
      undo.save(firstChange.blocks);

      // Apply the second change
      editor.blocks.render(secondChange.blocks);
      renderedBlocks = document.querySelectorAll('.ce-block__content');
      countBlocks = renderedBlocks.length;
      target = renderedBlocks[countBlocks - 1];
      setFocus(target.firstChild);

      // Save the second change
      undo.save(secondChange.blocks);
    });

    it('dispatches an undo event outside Editor\'s holder but hasn\'t to cause changes in the stacks', () => {
      // Set metaKey and ctrlKey to true in order to work in Mac and other OSs.
      const keyboardEvent = new KeyboardEvent('keydown', {
        key: 'z',
        metaKey: true,
        ctrlKey: true,
      });

      document.dispatchEvent(keyboardEvent);

      expect(undo.undoStack.length).toEqual(2);
      expect(undo.redoStack.length).toEqual(0);
      expect(undo.undoStack[1].state).toEqual(secondChange.diff);
      expect(undo.undoStack[0].state).toEqual(firstChange.diff);
      expect(undo.baseData).toEqual(secondChange.blocks);
    });

    it('dispatches an undo event inside Editor\'s holder and has to cause changes in the stacks', () => {
      const keyboardEvent = new KeyboardEvent('keydown', {
        key: 'z',
        metaKey: true,
        ctrlKey: true,
      });

      editor.configuration.holder.dispatchEvent(keyboardEvent);

      expect(undo.undoStack.length).toEqual(1);
      expect(undo.redoStack.length).toEqual(1);
      expect(undo.undoStack[0].state).toEqual(firstChange.diff);
      expect(undo.redoStack[0].state).toEqual(secondChange.diff);
      expect(undo.baseData).toEqual(firstChange.blocks);
    });

    it('dispatches a redo event (CMD+Y) outside Editor\'s holder but hasn\'t to cause changes in the stacks', () => {
      undo.undo();

      const keyboardEvent = new KeyboardEvent('keydown', {
        key: 'y',
        metaKey: true,
        ctrlKey: true,
      });

      document.dispatchEvent(keyboardEvent);

      expect(undo.undoStack.length).toEqual(1);
      expect(undo.redoStack.length).toEqual(1);
      expect(undo.undoStack[0].state).toEqual(firstChange.diff);
      expect(undo.redoStack[0].state).toEqual(secondChange.diff);
      expect(undo.baseData).toEqual(firstChange.blocks);
    });

    it('dispatches a redo event (CMD+Y) outside Editor\'s holder and has to cause changes in the stacks', () => {
      undo.undo();

      const keyboardEvent = new KeyboardEvent('keydown', {
        key: 'y',
        shiftKey: true,
        metaKey: true,
        ctrlKey: true,
      });

      editor.configuration.holder.dispatchEvent(keyboardEvent);

      expect(undo.undoStack.length).toEqual(2);
      expect(undo.redoStack.length).toEqual(0);
      expect(undo.undoStack[0].state).toEqual(firstChange.diff);
      expect(undo.undoStack[1].state).toEqual(secondChange.diff);
      expect(undo.baseData).toEqual(secondChange.blocks);
    });
  });
});
