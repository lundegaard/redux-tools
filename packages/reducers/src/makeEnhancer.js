import { keys, concat, identity } from 'ramda';
import { createEntries } from '@redux-tools/injectors';
import { withoutOnce } from '@redux-tools/utils';
import { isFunction } from 'ramda-extension';
import invariant from 'invariant';

import { reducersInjected, reducersEjected } from './actions';
import combineReducerEntries from './combineReducerEntries';
import composeReducers from './composeReducers';

export default function makeEnhancer() {
	return createStore => (reducer = identity, ...args) => {
		const store = createStore(reducer, ...args);

		store.reducerEntries = [];

		store.injectReducers = (reducers, props = {}) => {
			invariant(
				props.namespace || !isFunction(reducers),
				'You can only inject reducers as functions if you specify a namespace.'
			);

			store.reducerEntries = concat(store.reducerEntries, createEntries(reducers, props));
			store.replaceReducer(composeReducers(reducer, combineReducerEntries(store.reducerEntries)));
			store.dispatch(reducersInjected({ reducers: keys(reducers), ...props }));
		};

		store.ejectReducers = (reducers, props = {}) => {
			store.reducerEntries = withoutOnce(createEntries(reducers, props), store.reducerEntries);
			store.replaceReducer(composeReducers(reducer, combineReducerEntries(store.reducerEntries)));
			store.dispatch(reducersEjected({ reducers: keys(reducers), ...props }));
		};

		return store;
	};
}
