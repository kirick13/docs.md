
/* eslint-env node, commonjs */

module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
		'plugin:import/recommended',
		'plugin:unicorn/recommended',
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        'no-empty': 'off',
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/no-null': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/prevent-abbreviations': 'off',
    },
};
