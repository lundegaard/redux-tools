import { both, keys, concat, reject } from 'ramda';
import { createEntries, isEntryEjectableByVersion, isEntryIncluded } from '@redux-tools/injectors';

import { reducersInjected, reducersEjected } from './actions';
import combineReducerEntries from './combineReducerEntries';

export default function enhancer() {
	return createStore => (...args) => {
		const store = createStore(...args);

		let reducerEntries = [];

		store.injectReducers = (reducers, namespace, version) => {
			reducerEntries = concat(reducerEntries, createEntries(reducers, namespace, version));
			store.replaceReducer(combineReducerEntries(reducerEntries));
			store.dispatch(reducersInjected({ reducers: keys(reducers), namespace, version }));
		};

		store.ejectReducers = (reducers, namespace, version) => {
			reducerEntries = reject(
				both(
					isEntryEjectableByVersion(version),
					isEntryIncluded(createEntries(reducers, namespace, version))
				),
				reducerEntries
			);

			store.replaceReducer(combineReducerEntries(reducerEntries));
			store.dispatch(reducersEjected({ reducers: keys(reducers), namespace, version }));
		};

		return store;
	};
}
