import {
	ifElse,
	isEmpty,
	always,
	o,
	map,
	when,
	useWith,
	curry,
	identity,
	path,
	head,
	split,
} from 'ramda';
import { alwaysEmptyObject, rejectNil, isPlainObject, mapKeys } from 'ramda-extension';
import { combineReducers } from 'redux';
import { isActionFromNamespace, getNamespaceByAction } from '@redux-tools/namespaces';

/**
 * Returns an array to pass to `assocPath` and `dissocPath`.
 *
 * @param {string} reducerId key of the reducer
 * @param {?string} namespace optional namespace
 * @returns {Array} path
 */
export const getReducerPath = (reducerId, namespace) =>
	rejectNil([namespace && 'namespaces', namespace, reducerId]);

/**
 * Wraps a reducer so it won't accept actions from other namespaces.
 *
 * @param {?string} namespace optional namespace
 * @param {Function} reducer reducer to filter
 * @returns {Function} filtered reducer
 */
export const filterReducer = namespace => reducer => (state, action) =>
	isActionFromNamespace(namespace, action) ? reducer(state, action) : state;

const recurseCombineReducers = ifElse(
	isEmpty,
	always(alwaysEmptyObject),
	o(combineReducers, map(when(isPlainObject, object => recurseCombineReducers(object))))
);

const removeSuffix = o(head, split('@'));

/**
 * Attempts to recursively remove suffixes from all keys of an object.
 * If no suffix is present, the key will be skipped.
 *
 * @param {Object} object object to remove the suffixes from
 * @returns {Object} object with suffixes removed
 */
export const removeSuffixFromKeys = o(
	map(when(isPlainObject, object => removeSuffixFromKeys(object))),
	mapKeys(removeSuffix)
);

/**
 * Combines the reducers to create a new reducer. Uses `combineReducers` under the hood
 * and removes all suffixes.
 *
 * @param {Object} injectedReducers recursively nested object with reducers as values
 * @returns {Function} root reducer
 */
export const makeRootReducer = o(recurseCombineReducers, removeSuffixFromKeys);

/**
 * Returns Redux state by namespace. Returns undefined if namespace is undefined.
 *
 * @param {?string} namespace optional namespace
 * @param {Object} state Redux state
 * @returns {?Object} namespaced Redux state
 */
export const getStateByNamespace = curry((namespace, state) => {
	if (!namespace) {
		return undefined;
	}

	return path(['namespaces', namespace], state);
});

/**
 * Returns Redux state by action namespace.
 *
 * @see getStateByNamespace
 *
 * @param {Object} action action with an optionally defined meta.namespace property
 * @param {Object} state Redux state
 * @returns {?Object} namespaced Redux state
 */
export const getStateByAction = useWith(getStateByNamespace, [getNamespaceByAction, identity]);
