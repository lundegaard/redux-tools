import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
	cjs: [
		commonjs({
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
		}),
	],
	terser: [
		terser({
			compress: {
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				warnings: false,
			},
		}),
	],
};
