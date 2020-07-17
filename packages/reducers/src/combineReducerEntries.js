import { reduce, o, assocPath, path } from 'ramda';

import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import combineReducerSchema from './combineReducerSchema';
import { ROOT_KEY } from './constants';
import filterReducer from './filterReducer';

const combineReducerEntries = o(
	combineReducerSchema,
	reduce((schema, entry) => {
		const pathDefinition = [
			...(entry.namespace ? [entry.feature ?? DEFAULT_FEATURE] : []),
			...(entry.namespace ? [entry.namespace] : []),
			...entry.path,
			ROOT_KEY,
		];

		return assocPath(
			pathDefinition,
			[...(path(pathDefinition, schema) ?? []), filterReducer(entry.value, entry.namespace)],
			schema
		);
	}, {})
);

export default combineReducerEntries;
