
module.exports = {
	root: true,
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: 'module',
		requireConfigFile: false,
	},
	env: {
		es2022: true,
		browser: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'xo',
		'plugin:import/recommended',
		'plugin:jsdoc/recommended',
		'plugin:promise/recommended',
		'plugin:unicorn/recommended',
		'plugin:node/recommended',
	],
	plugins: [
		'import',
		// 'jsdoc',
		'promise',
		'unicorn',
		'node',
	],
	ignorePatterns: [
		'dist/**/*',
	],
	globals: {
		Bun: 'readonly',
	},
	rules: {
		'arrow-body-style': [
			'error',
			'as-needed',
			{
				requireReturnForObjectLiteral: true,
			},
		],
		'array-bracket-spacing': [
			'warn',
			'always',
			{
				arraysInArrays: false,
				objectsInArrays: false,
			},
		],
		'arrow-parens': [
			'warn',
			'always',
		],
		'brace-style': [
			'error',
			'stroustrup',
		],
		'camelcase': 'off',
		'capitalized-comments': 'off',
		'comma-dangle': [
			'warn',
			'always-multiline',
		],
		'func-names': 'off',
		'import/extensions': [
			'error',
			'always',
		],
		'import/order': [
			'error',
			{
				groups: [
					[
						'builtin',
						'external',
					],
					'internal',
					'parent',
					'sibling',
				],
			},
		],
		'indent': [
			'error',
			'tab',
			{
				ImportDeclaration: 'off',
				SwitchCase: 1,
			},
		],
		'jsdoc/require-jsdoc': 'warn', // FIXME:
		'new-cap': [
			'error',
			{
				newIsCap: true,
				capIsNew: true,
				properties: false,
			},
		],
		'no-multi-spaces': [
			'error',
			{
				exceptions: {
					Property: true,
					ImportDeclaration: true,
				},
			},
		],
		'no-multiple-empty-lines': 'warn',
		'no-promise-executor-return': 'off',
		'no-trailing-spaces': 'warn',
		'no-unused-vars': 'warn',
		'node/no-missing-import': 'off',
		'node/no-unpublished-import': 'off',
		'object-curly-spacing': [
			'warn',
			'always',
			{
				arraysInObjects: true,
				objectsInObjects: true,
			},
		],
		'padding-line-between-statements': [
			'error',
			{
				blankLine: 'never',
				prev: 'case',
				next: 'break',
			},
		],
		'quote-props': [
			'error',
			'consistent-as-needed',
			{
				numbers: true,
			},
		],
		'quotes': [
			'error',
			'single',
		],
		'radix': [
			'warn',
			'as-needed',
		],
		'unicorn/no-null': 'off',
		'unicorn/numeric-separators-style': [
			'warn',
			{
				onlyIfContainsSeparator: true,
			},
		],
		'unicorn/prefer-ternary': 'off',
		'unicorn/prevent-abbreviations': [
			'error',
			{
				allowList: {
					args: true,
					env: true,
					fn: true,
				},
			},
		],
		'unicorn/switch-case-braces': [
			'warn',
			'avoid',
		],
		'node/no-unsupported-features/es-syntax': 'off',
	},
};
