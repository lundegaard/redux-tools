import {
	identity,
	pluck,
	juxt,
	difference,
	reduce,
	dissocPath,
	head,
	isEmpty,
	path,
	reduced,
	tail,
} from 'ramda';

import { enhanceStore, makeStoreInterface } from '@redux-tools/injectors';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import combineReducerEntries from './combineReducerEntries';
import composeReducers from './composeReducers';

export const storeInterface = makeStoreInterface('reducers');

const cleanupReducer = (state, action) => {
	if (action.type !== '@redux-tools/CLEAN_UP_STATE') {
		return state;
	}

	return reduce(
		(previousState, pathDefinition) => {
			const fullPathDefinition = [
				...(action.meta.namespace ? [action.meta.feature ?? DEFAULT_FEATURE] : []),
				...(action.meta.namespace ? [action.meta.namespace] : []),
				...pathDefinition,
			];

			// GIVEN: fullPathDefinition = ['a', 'b', 'c']
			// THEN: partialPathDefinitions = [['a', 'b', 'c'], ['a', 'b'], ['a']]
			const partialPathDefinitions = reduce(
				(previousPartialPathDefinitions, key) => [
					[...(head(previousPartialPathDefinitions) ?? []), key],
					...previousPartialPathDefinitions,
				],
				[],
				fullPathDefinition
			);

			return reduce(
				(populatedState, partialPathDefinition) =>
					isEmpty(path(partialPathDefinition, populatedState))
						? dissocPath(partialPathDefinition, populatedState)
						: reduced(populatedState),
				// NOTE: `dissocPath` and `tail` are used here to kick-start the cascading process.
				dissocPath(fullPathDefinition, previousState),
				tail(partialPathDefinitions)
			);
		},
		state,
		action.payload
	);
};

const makeEnhancer = ({ initialReducers } = {}) => createStore => (reducer = identity, ...args) => {
	const prevStore = createStore(reducer, ...args);

	const handleEntriesChanged = () =>
		nextStore.replaceReducer(
			composeReducers(
				reducer,
				combineReducerEntries(storeInterface.getEntries(nextStore)),
				cleanupReducer
			)
		);

	const handleEjected = ({ entries, props }) => {
		const nextEntries = storeInterface.getEntries(nextStore);
		const fullyEjectedEntries = difference(entries, nextEntries);

		nextStore.dispatch({
			type: '@redux-tools/CLEAN_UP_STATE',
			payload: pluck('path', fullyEjectedEntries),
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
