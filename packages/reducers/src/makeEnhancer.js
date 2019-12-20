import {
	reduce,
	dissocPath,
	identity,
	isEmpty,
	when,
	o,
	always,
	append,
	either,
	pathOr,
	isNil,
	lensPath,
	view,
	over,
	omit,
	reject,
} from 'ramda';
import { enhanceStore, makeStoreInterface } from '@redux-tools/injectors';
import { DEFAULT_FEATURE, getNamespaceByAction } from '@redux-tools/namespaces';
import { isArray, isFunction } from 'ramda-extension';
import invariant from 'invariant';

import combineReducerEntries from './combineReducerEntries';
import composeReducers from './composeReducers';

export const storeInterface = makeStoreInterface('reducers');

const cleanupReducer = (state, action) => {
	if (action.type !== '@redux-tools/REDUCERS_EJECTED') {
		return state;
	}

	const feature = pathOr(DEFAULT_FEATURE, ['meta', 'feature'], action);
	const pathToNamespace = [feature, getNamespaceByAction(action)];
	const pathToSliceRoot = getNamespaceByAction(action) ? pathToNamespace : [];

	const removeEjectedState = prevState =>
		isArray(action.payload)
			? reduce(
					(nextState, reducerKey) => dissocPath(append(reducerKey, pathToSliceRoot), nextState),
					prevState,
					action.payload
			  )
			: prevState;

	const lensForFeature = lensPath([feature]);
	const lensForNamespace = lensPath(pathToNamespace);

	const cleanEmptyObjects = o(
		when(o(isEmpty, view(lensForFeature)), reject(isEmpty)),
		when(
			either(o(isEmpty, view(lensForNamespace)), always(isNil(action.payload))),
			over(lensForFeature, omit([getNamespaceByAction(action)]))
		)
	);

	return o(cleanEmptyObjects, removeEjectedState)(state);
};

const makeEnhancer = () => createStore => (reducer = identity, ...args) => {
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
				cleanupReducer
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
