import invariant from 'invariant';
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
	pluck,
	juxt,
	difference,
} from 'ramda';
import { isArray, isFunction } from 'ramda-extension';

import { enhanceStore, makeStoreInterface } from '@redux-tools/injectors';
import { DEFAULT_FEATURE, getNamespaceByAction } from '@redux-tools/namespaces';

import combineReducerEntries from './combineReducerEntries';
import composeReducers from './composeReducers';

export const storeInterface = makeStoreInterface('reducers');

const cleanupReducer = (state, action) => {
	if (action.type !== '@redux-tools/CLEAN_UP_STATE') {
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

const makeEnhancer = ({ initialReducers } = {}) => createStore => (reducer = identity, ...args) => {
	const prevStore = createStore(reducer, ...args);

	const handleEntriesChanged = ({ props, injectables }) => {
		invariant(
			props.namespace || !isFunction(injectables),
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

	const handleEjected = ({ injectables, entries, props }) => {
		const nextEntries = storeInterface.getEntries(nextStore);
		const fullyEjectedEntries = difference(entries, nextEntries);

		nextStore.dispatch({
			type: '@redux-tools/CLEAN_UP_STATE',
			// TODO: This weird logic is to preserve the original mechanism of `cleanupReducer`.
			payload: typeof injectables === 'function' ? null : pluck('key', fullyEjectedEntries),
			meta: props,
		});
	};

	const nextStore = enhanceStore(prevStore, storeInterface, {
		onInjected: handleEntriesChanged,
		onEjected: juxt([handleEntriesChanged, handleEjected]),
	});

	if (initialReducers) {
		nextStore.injectReducers(initialReducers);
	}

	return nextStore;
};

export default makeEnhancer;
