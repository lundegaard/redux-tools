import { both, keys, concat, reject, identity, o } from 'ramda';
import { createEntries, isEntryEjectableByVersion, isEntryIncluded } from '@redux-tools/injectors';

import { reducersInjected, reducersEjected } from './actions';
import combineReducerEntries from './combineReducerEntries';

export default function enhancer() {
	return createStore => (reducer = identity, ...args) => {
		const store = createStore(reducer, ...args);

		let reducerEntries = [];

		store.injectReducers = (reducers, namespace, version) => {
			reducerEntries = concat(reducerEntries, createEntries(reducers, namespace, version));
			store.replaceReducer(o(reducer, combineReducerEntries(reducerEntries)));
			store.dispatch(reducersInjected({ reducers: keys(reducers), namespace, version }));
			store._reducerEntries = reducerEntries;
		};

		store.ejectReducers = (reducers, namespace, version) => {
			reducerEntries = reject(
				both(
					isEntryEjectableByVersion(version),
					isEntryIncluded(createEntries(reducers, namespace, version))
				),
				reducerEntries
			);

			store.replaceReducer(o(reducer, combineReducerEntries(reducerEntries)));
			store.dispatch(reducersEjected({ reducers: keys(reducers), namespace, version }));
			store._reducerEntries = reducerEntries;
		};

		return store;
	};
}
