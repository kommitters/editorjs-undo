import { UndoSettings } from '../../src';

export const tools: { undo: { config: UndoSettings } } = {
  undo: {
    config: {
      debounceTimer: 100,
      shortcuts: {
        undo: 'CMD+X',
        redo: 'CMD+C',
      },
    },
  },
};
