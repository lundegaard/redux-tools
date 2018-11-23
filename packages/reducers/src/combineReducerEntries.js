import { ifElse, always, o, map, when, isEmpty, reduce, assocPath } from 'ramda';
import { alwaysEmptyObject, isPlainObject } from 'ramda-extension';
import { combineReducers as shallowCombineReducers } from 'redux';
import { isActionFromNamespace } from '@redux-tools/namespaces';

export const deepCombineReducers = ifElse(
	isEmpty,
	always(alwaysEmptyObject),
	o(shallowCombineReducers, map(when(isPlainObject, object => deepCombineReducers(object))))
);

export const filterReducer = (reducer, namespace) => (state, action) =>
	isActionFromNamespace(namespace, action) ? reducer(state, action) : state;

const entryReducer = (schema, { injectable, key, namespace }) =>
	assocPath(
		namespace ? ['namespaces', namespace, key] : [key],
		filterReducer(injectable, namespace),
		schema
	);

const combineReducerEntries = o(deepCombineReducers, reduce(entryReducer, {}));

export default combineReducerEntries;
