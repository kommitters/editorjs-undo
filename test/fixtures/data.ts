/**
 * Mocks user provided initial data.
 */
const initialData = {
  blocks: [{ type: 'paragraph', data: { text: 'First paragraph' } }],
};

/**
 * Mocks first data to be recorded at the history stack.
 */
const firstChange = {
  blocks: [
    { type: 'paragraph', data: { text: 'First paragraph' } },
    { type: 'paragraph', data: { text: 'Second paragraph' } },
  ],
};

/**
 * Mocks second data to be recorded at the history stack.
 */
const secondChange = {
  blocks: [
    { type: 'paragraph', data: { text: 'First paragraph' } },
    { type: 'paragraph', data: { text: 'Second paragraph' } },
    { type: 'paragraph', data: { text: 'Third paragraph' } },
  ],
};

/**
 * Mocks new data to be recorded at the history stack.
 */
const newChange = {
  blocks: [
    { type: 'paragraph', data: { text: 'First paragraph' } },
    { type: 'paragraph', data: { text: 'Second paragraph' } },
    { type: 'paragraph', data: { text: 'New paragraph' } },
  ],
};

export { initialData, firstChange, secondChange, newChange };
