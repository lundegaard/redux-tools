import {
	reduce,
	path,
	dissocPath,
	identity,
	isEmpty,
	when,
	compose,
	o,
	always,
	concat,
	__,
	append,
	either,
} from 'ramda';
import { enhanceStore, makeStoreInterface } from '@redux-tools/injectors';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';
import { isFunction } from 'ramda-extension';
import invariant from 'invariant';

import combineReducerEntries from './combineReducerEntries';
import composeReducers from './composeReducers';
import combineReducers from './combineReducers';

export const storeInterface = makeStoreInterface('reducers');

const cleanUpReducer = (state, action) => {
	if (action.type !== '@redux-tools/REDUCERS_EJECTED') return state;

	const namespaceGroup = action.meta.feature || DEFAULT_FEATURE;

	const pathToNamespace = [namespaceGroup, action.meta.namespace];
	const pathToReducer = when(always(action.meta.namespace), concat(pathToNamespace))([]);

	const cleanReducers = reduce((state, reducerName) =>
		dissocPath(append(reducerName, pathToReducer), state)
	)(__, action.payload);

	const cleanEmptyObjects = compose(
		when(o(isEmpty, path([namespaceGroup])), dissocPath([namespaceGroup])),
		when(
			either(o(isEmpty, path(pathToNamespace)), always(action.meta.isFunctionReducer)),
			dissocPath(pathToNamespace)
		)
	);

	return o(cleanEmptyObjects, cleanReducers)(state);
};

const makeEnhancer = (initialReducers = {}) => createStore => (reducer = identity, ...args) => {
	const prevStore = createStore(reducer, ...args);

	const handler = ({ props, reducers }) => {
		invariant(
			props.namespace || !isFunction(reducers),
			'You can only inject reducers as functions if you specify a namespace.'
		);

		nextStore.replaceReducer(
			composeReducers(
				reducer,
				combineReducerEntries(storeInterface.getEntries(nextStore)),
				cleanUpReducer,
				combineReducers(initialReducers)
			)
		);
	};

	const nextStore = enhanceStore(prevStore, storeInterface, {
		onInjected: handler,
		onEjected: handler,
	});

	return nextStore;
};

export default makeEnhancer;
