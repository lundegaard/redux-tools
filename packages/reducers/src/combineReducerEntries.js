import { ifElse, always, o, map, when, isEmpty, reduce, assocPath } from 'ramda';
import { alwaysEmptyObject, isPlainObject } from 'ramda-extension';
import { combineReducers as shallowCombineReducers } from 'redux';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import filterReducer from './filterReducer';

export const deepCombineReducers = ifElse(
	isEmpty,
	always(alwaysEmptyObject),
	o(shallowCombineReducers, map(when(isPlainObject, object => deepCombineReducers(object))))
);

const entryReducer = (schema, { value, key, namespace, feature = DEFAULT_FEATURE }) =>
	assocPath(namespace ? [feature, namespace, key] : [key], filterReducer(value, namespace), schema);

const combineReducerEntries = o(deepCombineReducers, reduce(entryReducer, {}));

export default combineReducerEntries;
