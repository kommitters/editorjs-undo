module.exports = {
  extends: 'airbnb-base',
  rules: {
    'class-methods-use-this': ['off'],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
  },
  env: {
    browser: true,
  },
};
