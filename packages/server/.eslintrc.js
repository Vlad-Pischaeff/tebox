'use strict';

module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'airbnb-base/legacy'
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        'global-require': 'off',
        'func-names': 'off',
        'no-underscore-dangle': 'off',
        'no-param-reassign': 'off',
        'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
        'max-len': 'off',
        'no-continue': 'warn',
        'no-await-in-loop': 'warn',
        'no-console': 'off',
        'class-methods-use-this': 'off',
        indent: ['error', 4]
    }
};
