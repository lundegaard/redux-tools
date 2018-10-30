import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

import path from 'path';
import { o, map, fromPairs } from 'ramda';

import invariant from 'invariant';
import parts from './rollup/parts';
import { getGlobalName, getFileName, getPeers } from './rollup/utils';

const { LERNA_PACKAGE_NAME, LERNA_ROOT_PATH, NODE_ENV } = process.env;
const PACKAGE_ROOT_PATH = process.cwd();
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, 'src/index.js');

const globalsMapping = {
	react: 'React',
	'react-dom': 'ReactDOM',
	'@redux-tools/actions': 'ReduxToolsActions',
	'@redux-tools/extensible-store': 'ReduxToolsExtensibleStore',
	'@redux-tools/extensible-store-react': 'ReduxToolsExtensibleStoreReact',
	'@redux-tools/utils': 'ReduxToolsUtils',
	'react-redux': 'ReactRedux',
	redux: 'Redux',
	'redux-observable': 'ReduxObservable',
	rxjs: 'rxjs',
	'react-union': 'ReactUnion',
	ramda: 'R',
	'ramda-extension': 'R_',
};

const getGlobals = o(
	fromPairs,
	map(x => {
		invariant(globalsMapping[x], `Missing global name for ${x}`);

		return [x, globalsMapping[x]];
	})
);

// eslint-disable-next-line import/no-dynamic-require
const peers = getPeers(require(`${PACKAGE_ROOT_PATH}/package.json`));
const globals = getGlobals(peers);

const commonConfig = {
	external: peers,
	input: INPUT_FILE,
};

const globalName = getGlobalName(LERNA_PACKAGE_NAME);
const fileName = getFileName(LERNA_PACKAGE_NAME);

export default [
	// CJS
	{
		...commonConfig,
		output: {
			file: path.join(PACKAGE_ROOT_PATH, 'lib', `${fileName}.js`),
			format: 'cjs',
			indent: false,
			globals,
		},
		plugins: [
			nodeResolve({
				jsnext: true,
			}),
			babel({
				cwd: LERNA_ROOT_PATH,
				runtimeHelpers: true,
			}),
			...parts.cjs,
		],
	},
	// ES
	{
		...commonConfig,
		output: {
			file: path.join(PACKAGE_ROOT_PATH, 'es', `${fileName}.js`),
			format: 'es',
			indent: false,
			globals,
		},
		plugins: [
			nodeResolve({
				jsnext: true,
			}),
			babel({
				cwd: LERNA_ROOT_PATH,
				runtimeHelpers: true,
			}),
			...parts.cjs,
		],
	},
	// UMD Development
	{
		...commonConfig,
		output: {
			file: path.join(PACKAGE_ROOT_PATH, 'dist', `${fileName}.js`),
			format: 'umd',
			name: globalName,
			indent: false,
			globals,
		},
		plugins: [
			nodeResolve({
				jsnext: true,
			}),
			babel({
				cwd: LERNA_ROOT_PATH,
				exclude: '**/node_modules/**',
				runtimeHelpers: true,
			}),
			replace({
				'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
			}),
			...parts.cjs,
		],
	},

	// UMD Production
	{
		...commonConfig,
		output: {
			file: path.join(PACKAGE_ROOT_PATH, 'dist', `${fileName}.min.js`),
			format: 'umd',
			name: globalName,
			indent: false,
			globals,
		},
		plugins: [
			nodeResolve({
				jsnext: true,
			}),
			babel({
				cwd: LERNA_ROOT_PATH,
				exclude: '**/node_modules/**',
				runtimeHelpers: true,
			}),
			replace({
				'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
			}),
			...parts.cjs,
			...parts.terser,
		],
	},
];
