import { ifElse, always, o, map, when, isEmpty, reduce, assocPath } from 'nanoutils';
import { alwaysEmptyObject, isPlainObject } from 'ramda-extension';
import { combineReducers as shallowCombineReducers } from 'redux';

import filterReducer from './filterReducer';

export const deepCombineReducers = ifElse(
	isEmpty,
	always(alwaysEmptyObject),
	o(shallowCombineReducers, map(when(isPlainObject, object => deepCombineReducers(object))))
);

const entryReducer = (schema, { value, key, namespace }) =>
	assocPath(
		namespace ? ['namespaces', namespace, key] : [key],
		filterReducer(value, namespace),
		schema
	);

const combineReducerEntries = o(deepCombineReducers, reduce(entryReducer, {}));

export default combineReducerEntries;
