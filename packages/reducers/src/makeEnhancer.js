import { identity } from 'ramda';
import { enhanceStore } from '@redux-tools/injectors';
import { isFunction } from 'ramda-extension';
import invariant from 'invariant';

import combineReducerEntries from './combineReducerEntries';
import composeReducers from './composeReducers';

const makeEnhancer = () => createStore => (reducer = identity, ...args) => {
	const prevStore = createStore(reducer, ...args);

	const handler = ({ props, reducers }) => {
		invariant(
			props.namespace || !isFunction(reducers),
			'You can only inject reducers as functions if you specify a namespace.'
		);

		nextStore.replaceReducer(
			composeReducers(reducer, combineReducerEntries(nextStore.entries.reducers))
		);
	};

	const nextStore = enhanceStore(prevStore, 'reducers', {
		onInjected: handler,
		onEjected: handler,
	});

	return nextStore;
};

export default makeEnhancer;
