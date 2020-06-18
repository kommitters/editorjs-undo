import { newData } from './data';

const editor = {
  blocks: {
    save: () => new Promise((resolve) => resolve(newData)),
    render() {},
  },
};

export default editor;
