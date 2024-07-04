/**
 * @jest-environment jsdom
 */
import Undo from '../src/index';
import { editor, readOnlyEditor, tools } from './fixtures/editor';

// Mocks user provided initial data.
const initialData = {
  blocks: [{ id: 'abk2', type: 'paragraph', data: { text: 'First paragraph' } }],
};

jest.mock('jsondiffpatch', () => ({ create: jest.fn() }));
jest.mock('jsondiffpatch/formatters/jsonpatch', () => jest.fn());

describe('Undo', () => {

});
