// Mocks user provided initial data
const initialData = {
  blocks: [{ id: 'abk2', type: 'paragraph', data: { text: 'First paragraph' } }],
};

// Mocks first data to be recorded at the history stack
const firstChange = {
  blocks: [
    { id: 'abk2', type: 'paragraph', data: { text: 'First paragraph' } },
    { id: 'zyl9', type: 'paragraph', data: { text: 'Second paragraph' } },
  ],
  diff: { 1: [{ id: 'zyl9', type: 'paragraph', data: { text: 'Second paragraph' } }], _t: 'a' },
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

// Mocks second data to be recorded at the history stack
const secondChange = {
  blocks: [
    { id: 'abk2', type: 'paragraph', data: { text: 'First paragraph' } },
    { id: 'zyl9', type: 'paragraph', data: { text: 'Modified paragraph' } },
    { id: 'it69o', type: 'paragraph', data: { text: 'Third paragraph' } },
  ],
  diff: {
    1: { data: { text: ['Second paragraph', 'Modified paragraph'] } },
    2: [{ id: 'it69o', type: 'paragraph', data: { text: 'Third paragraph' } }],
    _t: 'a',
  },
  formattedChange: [
    { op: 'replace', path: '/1/data/text', value: 'Modified paragraph' },
    {
      op: 'add',
      path: '/2',
      value: { id: 'it69o', type: 'paragraph', data: { text: 'Third paragraph' } },
    },
  ],
  reverse: {
    1: { data: { text: ['Modified paragraph', 'Second paragraph'] } },
    _t: 'a',
    _2: [
      { id: 'it69o', type: 'paragraph', data: { text: 'Third paragraph' } }, 0, 0],
  },
  formattedReverse: [
    { op: 'remove', path: '/2' },
    { op: 'replace', path: '/1/data/text', value: 'Second paragraph' },
  ],
};

export {
  initialData,
  firstChange,
  secondChange,
};
