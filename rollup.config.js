import replace from 'rollup-plugin-replace';
import autoExternal from 'rollup-plugin-auto-external';
import path from 'path';

import * as plugins from './rollup/plugins';
import { getGlobalName, getFileName } from './rollup/utils';

const { LERNA_PACKAGE_NAME } = process.env;
const PACKAGE_ROOT_PATH = process.cwd();
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, 'src/index.js');

const globals = {
	'@redux-tools/actions': 'ReduxToolsActions',
	'@redux-tools/epics': 'ReduxToolsEpics',
	'@redux-tools/epics-react': 'ReduxToolsEpicsReact',
	'@redux-tools/injectors': 'ReduxToolsInjectors',
	'@redux-tools/injectors-react': 'ReduxToolsInjectorsReact',
	'@redux-tools/middleware': 'ReduxToolsMiddleware',
	'@redux-tools/middleware-react': 'ReduxToolsMiddlewareReact',
	'@redux-tools/namespaces': 'ReduxToolsNamespaces',
	'@redux-tools/reducers': 'ReduxToolsReducers',
	'@redux-tools/reducers-react': 'ReduxToolsReducersReact',
	'@redux-tools/stream-creators': 'ReduxToolsStreamCreators',
	'@redux-tools/utils': 'ReduxToolsUtils',
	'hoist-non-react-statics': 'HoistNonReactStatics',
	invariant: 'invariant',
	'prop-types': 'PropTypes',
	ramda: 'R',
	'ramda-extension': 'R_',
	react: 'React',
	'react-dom': 'ReactDOM',
	'react-redux': 'ReactRedux',
	'react-union': 'ReactUnion',
	redux: 'Redux',
	'redux-observable': 'ReduxObservable',
	rxjs: 'rxjs',
	'rxjs/operators': 'Rx.Operators',
};

const globalName = getGlobalName(LERNA_PACKAGE_NAME);
const fileName = getFileName(LERNA_PACKAGE_NAME);

export default [
	// CJS
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

	// ES
	{
		input: INPUT_FILE,
		output: {
			file: path.join(PACKAGE_ROOT_PATH, 'es', `${fileName}.js`),
			format: 'es',
			indent: false,
		},
		external: ['rxjs/operators'],
		plugins: [autoExternal(), plugins.nodeResolve, plugins.babel, plugins.cjs],
	},

	// UMD Development
	{
		input: INPUT_FILE,
		output: {
			file: path.join(PACKAGE_ROOT_PATH, 'dist', `${fileName}.js`),
			format: 'umd',
			name: globalName,
			indent: false,
			globals,
		},
		external: ['rxjs/operators'],
		plugins: [
			autoExternal(),
			replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
			plugins.nodeResolve,
			plugins.babel,
			plugins.cjs,
		],
	},

	// UMD Production
	{
		input: INPUT_FILE,
		output: {
			file: path.join(PACKAGE_ROOT_PATH, 'dist', `${fileName}.min.js`),
			format: 'umd',
			name: globalName,
			indent: false,
			globals,
		},
		external: ['rxjs/operators'],
		plugins: [
			autoExternal(),
			replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
			plugins.nodeResolve,
			plugins.babel,
			plugins.cjs,
			plugins.terser,
		],
	},
];
