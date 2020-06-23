import { newData } from './data';

/**
 * Mocks Editor.js instance object.
 */
const editor = {
  blocks: {
    save: () => new Promise((resolve) => resolve(newData)),
    render() {},
  },
};

export default editor;
