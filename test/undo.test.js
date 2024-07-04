/**
 * @jest-environment jsdom
 */
import Undo from '../src/index';
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

describe('Undo', () => {

});
