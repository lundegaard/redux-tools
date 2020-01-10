import {
	reduce,
	dissocPath,
	identity,
	isEmpty,
	when,
	o,
	T,
	append,
	pathOr,
	isNil,
	lensPath,
	view,
	over,
	dissoc,
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

	const cleanEmptyNamespace = when(
		// NOTE: Clean if ejecting a function or if all keys have been already ejected.
		isNil(action.payload) ? T : o(isEmpty, view(lensForNamespace)),
		over(lensForFeature, dissoc(getNamespaceByAction(action)))
	);

	const cleanEmptyFeature = when(o(isEmpty, view(lensForFeature)), dissoc(feature));
	const cleanEmptyStateSlices = o(cleanEmptyFeature, cleanEmptyNamespace);

	return o(cleanEmptyStateSlices, removeEjectedState)(state);
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
