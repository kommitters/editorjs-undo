module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base'],

  plugins: ['jest'],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  globals: {
    document: false,
  },

  rules: {
    'class-methods-use-this': ['off'],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-param-reassign': 0,
  },
};
