import babelPlugin from 'rollup-plugin-babel';
import cjsPlugin from 'rollup-plugin-commonjs';
import nodeResolvePlugin from 'rollup-plugin-node-resolve';
import { terser as terserPlugin } from 'rollup-plugin-terser';

const { LERNA_ROOT_PATH } = process.env;

export const cjs = cjsPlugin({
	include: /node_modules/,
	namedExports: {
		'../../node_modules/react/index.js': [
			'Children',
			'Component',
			'createElement',
			'createContext',
		],
		'../../node_modules/react-is/index.js': ['isValidElementType'],
	},
});

export const terser = terserPlugin({
	compress: {
		pure_getters: true,
		unsafe: true,
		unsafe_comps: true,
		warnings: false,
	},
});

export const nodeResolve = nodeResolvePlugin();

export const babel = babelPlugin({
	cwd: LERNA_ROOT_PATH,
	runtimeHelpers: true,
});
