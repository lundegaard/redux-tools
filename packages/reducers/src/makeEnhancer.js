import { both, keys, concat, reject, identity } from 'ramda';
import { createEntries, isEntryEjectableByVersion, isEntryIncluded } from '@redux-tools/injectors';

import { reducersInjected, reducersEjected } from './actions';
import combineReducerEntries from './combineReducerEntries';
import composeReducers from './composeReducers';

export default function makeEnhancer() {
	return createStore => (reducer = identity, ...args) => {
		const store = createStore(reducer, ...args);

		let reducerEntries = [];

		store.injectReducers = (reducers, { namespace, version, feature = 'namespaces' }) => {
			reducerEntries = concat(
				reducerEntries,
				createEntries(reducers, { namespace, version, feature })
			);

			store.replaceReducer(composeReducers(reducer, combineReducerEntries(reducerEntries)));
			store.dispatch(reducersInjected({ reducers: keys(reducers), namespace, version, feature }));
			store._reducerEntries = reducerEntries;
		};

		store.ejectReducers = (reducers, { namespace, version, feature = 'namespaces' }) => {
			reducerEntries = reject(
				both(
					isEntryEjectableByVersion(version),
					isEntryIncluded(createEntries(reducers, { namespace, version, feature }))
				),
				reducerEntries
			);

			store.replaceReducer(composeReducers(reducer, combineReducerEntries(reducerEntries)));
			store.dispatch(reducersEjected({ reducers: keys(reducers), namespace, version, feature }));
			store._reducerEntries = reducerEntries;
		};

		return store;
	};
}
