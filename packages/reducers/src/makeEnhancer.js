import { identity } from 'ramda';
import { enhanceStore } from '@redux-tools/injectors';
import { isFunction } from 'ramda-extension';
import invariant from 'invariant';

import combineReducerEntries from './combineReducerEntries';
import composeReducers from './composeReducers';

export default function makeEnhancer() {
	return createStore => (reducer = identity, ...args) => {
		const store = createStore(reducer, ...args);

		const handler = ({ props, reducers }) => {
			invariant(
				props.namespace || !isFunction(reducers),
				'You can only inject reducers as functions if you specify a namespace.'
			);

			store.replaceReducer(composeReducers(reducer, combineReducerEntries(store.entries.reducers)));
		};

		enhanceStore(store, 'reducers', {
			onInjected: handler,
			onEjected: handler,
		});

		return store;
	};
}
