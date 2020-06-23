/**
 * Mocks user provided initial data.
 */
const initialData = {
  blocks: [{ type: 'paragraph', data: { text: 'First paragraph' } }],
};

/**
 * Mocks new data to be recorded at the history stack.
 */
const newData = {
  blocks: [
    { type: 'paragraph', data: { text: 'First paragraph' } },
    { type: 'paragraph', data: { text: 'Second paragraph' } },
  ],
};

export { initialData, newData };
