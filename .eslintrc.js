module.exports = {
	root: true,
	extends: ['react-union', 'prettier', 'prettier/react'],
	plugins: ['react-hooks'],
	rules: {
		'padding-line-between-statements': [
			'error',
			{
				blankLine: 'always',
				prev: ['block', 'block-like', 'export', 'import', 'multiline-expression'],
				next: '*',
			},
			{
				blankLine: 'always',
				prev: '*',
				next: ['block', 'block-like', 'export', 'import', 'return', 'throw'],
			},
			{
				blankLine: 'any',
				prev: ['export', 'import'],
				next: ['export', 'import'],
			},
			{
				blankLine: 'never',
				prev: 'case',
				next: '*',
			},
		],
		// NOTE: Sadly, `sort-imports` is not really compatible with `import/order`.
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				pathGroups: [
					{
						pattern: '@redux-tools/**',
						group: 'external',
						position: 'after',
					},
				],
				pathGroupsExcludedImportTypes: ['builtin'],
				alphabetize: {
					order: 'asc',
					caseInsensitive: false,
				},
			},
		],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
		'import/no-extraneous-dependencies': [
			'error',
			{ devDependencies: ['packages/**/*.test.js', '*.js', 'rollup/*.js', 'tests/*.js'] },
		],
		// TODO: Look at `common-tags` to solve indentation issues with multiline template strings.
		'prefer-template': 'off',
	},
};
