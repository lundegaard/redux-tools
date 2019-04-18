import { ifElse, always, o, map, when, isEmpty, reduce, assocPath } from 'ramda';
import { alwaysEmptyObject, isPlainObject } from 'ramda-extension';
import { combineReducers as shallowCombineReducers } from 'redux';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';
import { FUNCTION_KEY } from '@redux-tools/injectors';
import invariant from 'invariant';

import filterReducer from './filterReducer';

export const deepCombineReducers = ifElse(
	isEmpty,
	always(alwaysEmptyObject),
	o(shallowCombineReducers, map(when(isPlainObject, object => deepCombineReducers(object))))
);

const getReducerPath = (feature, namespace, key) => {
	invariant(
		namespace || key !== FUNCTION_KEY,
		'You can only inject reducers as functions if you specify a namespace.'
	);

	if (!namespace) {
		return [key];
	}

	if (key === FUNCTION_KEY) {
		return [feature, namespace];
	}

	return [feature, namespace, key];
};

const entryReducer = (schema, { value, key, namespace, feature }) =>
	assocPath(
		getReducerPath(feature || DEFAULT_FEATURE, namespace, key),
		filterReducer(value, namespace),
		schema
	);

const combineReducerEntries = o(deepCombineReducers, reduce(entryReducer, {}));

export default combineReducerEntries;
