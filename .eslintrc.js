module.exports = {
	root: true,
	extends: ['react-union', 'prettier', 'prettier/react'],
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
		'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
		'import/no-extraneous-dependencies': [
			'error',
			{ devDependencies: ['packages/**/*.test.js', '*.js', 'rollup/*.js', 'tests/*.js'] },
		],
	},
};
