module.exports = {
  env: {
    browser: true,
    es6: false,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2015,
  },
  rules: {
    'no-underscore-dangle': 'off',
    'func-names': 'off',
    'no-plusplus': 'off',
    'no-var': 'off',
    'prefer-template': 'off',
    'no-param-reassign': 'off',
    'no-multi-assign': 'off',
    'no-unused-expressions': 'off'
  },
};
