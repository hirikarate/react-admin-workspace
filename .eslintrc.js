module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: [
		'google',
		'plugin:react/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			'jsx': true,
		},
		ecmaVersion: 2021,
		sourceType: 'module',
		tsconfigRootDir: __dirname,
		project: './tsconfig.json',
	},
	plugins: [
		'react',
		'@typescript-eslint',
	],
	rules: {
		'arrow-spacing': ['error', { before: true, after: true }],
		'brace-style': ['error', 'stroustrup'],
		'comma-dangle': ['error', 'always-multiline'],
		'eqeqeq': ['error', 'smart'],
		'indent': ['error', 'tab', { SwitchCase: 1 }],
		'no-tabs': 'off',
		'object-curly-spacing': ['error', 'always'],
		'quotes': ['error', 'single', { avoidEscape: true }],
		'quote-props': 'off',
		'linebreak-style': 'off',
		'max-len': [
			'error',
			{
				code: 150,
				ignoreComments: true,
				ignoreTrailingComments: true,
				ignoreUrls: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
			},
		],
		'require-jsdoc': 'off',
		'semi': ['error', 'always'],
		'import/first': 'error',
		'import/newline-after-import': ['error', { count: 2 }],
		'import/no-cycle': ['error', { maxDepth: 5 }],
		'import/no-self-import': 'error',
		'import/no-unresolved': 'off',
		'import/no-anonymous-default-export': 0,
		'import/namespace': 'off',
		'import/order': ['error', { 'newlines-between': 'always' }],
		'react/display-name': 'off',
		'react/prop-types': 'off',
	},
	overrides: [{
		files: ['**/*.ts', '**/*.tsx'],
		parserOptions: {
			ecmaFeatures: {
				'jsx': true,
			},
			ecmaVersion: 2021,
		},
		extends: [
			'plugin:@typescript-eslint/eslint-recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:import/typescript',
		],
		rules: {
			'@typescript-eslint/ban-types': 0,
			'indent': 'off',
			'@typescript-eslint/indent': ['error', 'tab', { SwitchCase: 1 }],
			'no-shadow': 'off',
			'@typescript-eslint/no-shadow': ['error', { builtinGlobals: true, hoist: 'all' }],
			'@typescript-eslint/member-delimiter-style': ['error', {
				multiline: {
					delimiter: 'comma',
					requireLast: true,
				},
				singleline: {
					delimiter: 'comma',
					requireLast: true,
				},
				overrides: {
					interface: {
						multiline: {
							delimiter: 'semi',
							requireLast: true,
						},
					},
				},
			}],
			'quotes': 'off',
			'@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],
			'semi': 'off',
			'@typescript-eslint/semi': ['error', 'always'],
		},
	}],
};
