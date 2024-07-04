/**
 * @jest-environment jsdom
 */
import Undo from '../src/index';
import { editor, readOnlyEditor, tools } from './fixtures/editor';

jest.mock('jsondiffpatch', () => ({ create: jest.fn() }));
jest.mock('jsondiffpatch/formatters/jsonpatch', () => jest.fn());

describe('Undo', () => {

});
