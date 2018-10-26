import { ifElse, isEmpty, always, o, map, when } from 'ramda';
import { alwaysEmptyObject, rejectNil, isPlainObject } from 'ramda-extension';
import { combineReducers } from 'redux';

import { isActionFromNamespace } from './namespace';
import { removeSuffixFromKeys } from './suffix';

/**
 * Returns an array to pass to `assocPath` and `dissocPath`.
 *
 * @param {String} reducerId key of the reducer
 * @param {?String} namespace optional namespace
 * @returns {Array} path
 */
export const getAsyncReducerPath = (reducerId, namespace) =>
	rejectNil([namespace && 'namespaces', namespace, reducerId]);

/**
 * Wraps a reducer so it won't accept actions from other namespaces.
 *
 * @param {?String} namespace optional namespace
 * @param {Function} reducer reducer to filter
 * @returns {Function} filtered reducer
 */
export const filterReducer = (namespace, reducer) => (state, action) =>
	isActionFromNamespace(namespace, action) ? reducer(state, action) : state;

const combineAsyncReducers = ifElse(
	isEmpty,
	// NOTE: using `alwaysNull` throws an exception on Liferay, but not in the isolated environment.
	always(alwaysEmptyObject),
	o(combineReducers, map(when(isPlainObject, object => combineAsyncReducers(object))))
);

/**
 * Combines the async reducers to create a new reducer. Uses `combineReducers` under the hood
 * and removes all suffixes.
 *
 * @param {Object} asyncReducers recursively nested object with async reducers
 * @returns {Function} root reducer
 */
export const makeRootReducer = o(combineAsyncReducers, removeSuffixFromKeys);
