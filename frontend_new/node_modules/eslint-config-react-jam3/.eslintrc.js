'use strict';

module.exports = {
  parser: 'babel-eslint',

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true
    }
  },

  plugins: ['promise', 'jam3'],

  extends: ['react-app', 'plugin:prettier/recommended'],

  settings: {
    react: {
      version: 'detect'
    }
  },

  rules: {
    'jam3/forbid-methods': 2,
    'jam3/no-sanitizer-with-danger': [
      2,
      {
        wrapperName: ['sanitizer']
      }
    ],

    'prettier/prettier': 'warn',

    // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules
    'jsx-a11y/href-no-hash': 'off',

    // https://github.com/xjamundx/eslint-plugin-promise#rules
    'promise/param-names': 'error',
    'promise/no-return-wrap': 'error',

    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    'import/no-webpack-loader-syntax': 'off',
    'import/no-unresolved': ['error', { ignore: ['svg-inline-loader'] }],
    'import/named': 'error',
    'import/default': 'error',
    'import/first': 'error',
    'import/order': ['error', { groups: ['builtin', 'external', ['parent', 'sibling', 'index']] }],
    'import/no-extraneous-dependencies': [
      'warn',
      { devDependencies: true, optionalDependencies: true, peerDependencies: false }
    ],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',

    'react/sort-comp': [
      1,
      {
        order: ['static-methods', 'lifecycle', 'everything-else', 'render'],
        groups: {
          lifecycle: [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'getInitialState',
            'state',
            'getChildContext',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'componentDidUpdate',
            'componentWillUnmount',
            'componentWillAppear',
            'componentWillEnter',
            'componentWillLeave'
          ]
        }
      }
    ]
  }
};
