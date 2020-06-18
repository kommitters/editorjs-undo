import DataHistory from '../src/index';
import { initialData, newData } from './fixtures/data';
import editor from './fixtures/editor';

const dataHistory = new DataHistory({ editor });

describe('DataHistory', () => {
  it('is unable to perform an undo operation in an empty stack', () => {
    expect(dataHistory.canUndo()).toBe(false);
    expect(dataHistory.stack[0]).toBeNull();
  });

  it('is unable to perform a redo operation in an empty stack', () => {
    expect(dataHistory.canRedo()).toBe(false);
    expect(dataHistory.stack[0]).toBeNull();
  });

  it('initializes the plugin with initial data', () => {
    dataHistory.initialize(initialData.blocks);
    expect(dataHistory.count()).toEqual(0);
    expect(dataHistory.stack[0]).toEqual(initialData.blocks);
  });

  it('registers a change in the stack', () => {
    dataHistory.save(newData.blocks);
    expect(dataHistory.count()).toEqual(1);
    expect(dataHistory.position).toEqual(1);
    expect(dataHistory.stack[1]).toEqual(newData.blocks);
  });

  it('decreases stack position when undo action is called', () => {
    dataHistory.undo();
    expect(dataHistory.position).toEqual(0);
    expect(dataHistory.stack[dataHistory.position]).toEqual(initialData.blocks);
  });

  it('increases stack position when redo action is called', () => {
    dataHistory.redo();
    expect(dataHistory.position).toEqual(1);
    expect(dataHistory.stack[dataHistory.position]).toEqual(newData.blocks);
  });
});
