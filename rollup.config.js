import path from 'path';

import autoExternal from 'rollup-plugin-auto-external';
import replace from 'rollup-plugin-replace';

import * as plugins from './rollup/plugins';
import { getGlobalName, getFileName } from './rollup/utils';

const { LERNA_PACKAGE_NAME } = process.env;
const PACKAGE_ROOT_PATH = process.cwd();
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, 'src/index.js');

// NOTE: Packages which are meant to be "plug and play" for prototyping using unpkg.
const presets = ['@redux-tools/react'];

// NOTE: Only add globals which must be loaded manually when prototyping with a preset.
const globals = {
	react: 'React',
	'react-dom': 'ReactDOM',
	'react-redux': 'ReactRedux',
	redux: 'Redux',
};

const globalName = getGlobalName(LERNA_PACKAGE_NAME);
const fileName = getFileName(LERNA_PACKAGE_NAME);

export default [
	// NOTE: CJS
	{
		input: INPUT_FILE,
		output: {
			file: path.join(PACKAGE_ROOT_PATH, 'lib', `${fileName}.js`),
			format: 'cjs',
			indent: false,
		},
		// HACK: Necessary, because `autoExternal` plugin does not handle deep imports.
		// https://github.com/stevenbenisek/rollup-plugin-auto-external/issues/7
		external: ['rxjs/operators'],
		plugins: [autoExternal(), plugins.nodeResolve, plugins.babel, plugins.cjs],
	},

	// NOTE: ES
	{
		input: INPUT_FILE,
		output: {
			file: path.join(PACKAGE_ROOT_PATH, 'es', `${fileName}.js`),
			format: 'es',
			indent: false,
		},
		// HACK: Necessary, because `autoExternal` plugin does not handle deep imports.
		// https://github.com/stevenbenisek/rollup-plugin-auto-external/issues/7
		external: ['rxjs/operators'],
		plugins: [autoExternal(), plugins.nodeResolve, plugins.babel, plugins.cjs],
	},

	// NOTE: Only build UMD for the presets.
	// The individual packages are not meant to be used with UMD.
	...(presets.includes(LERNA_PACKAGE_NAME)
		? [
				// NOTE: UMD Development
				{
					input: INPUT_FILE,
					external: Object.keys(globals),
					output: {
						file: path.join(PACKAGE_ROOT_PATH, 'dist', `${fileName}.js`),
						format: 'umd',
						name: globalName,
						indent: false,
						globals,
					},
					plugins: [
						replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
						plugins.nodeResolve,
						plugins.babel,
						plugins.cjs,
					],
				},

				// NOTE: UMD Production
				{
					input: INPUT_FILE,
					external: Object.keys(globals),
					output: {
						file: path.join(PACKAGE_ROOT_PATH, 'dist', `${fileName}.min.js`),
						format: 'umd',
						name: globalName,
						indent: false,
						globals,
					},
					plugins: [
						replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
						plugins.nodeResolve,
						plugins.babel,
						plugins.cjs,
						plugins.terser,
					],
				},
		  ]
		: []),
];
