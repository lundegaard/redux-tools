import { both, keys, concat, reject } from 'ramda';
import { createEntries, isVersionEjectable, isEntryIncluded } from '@redux-tools/injectors';

import { reducersInjected, reducersEjected } from './actions';
import combineReducerEntries from './combineReducerEntries';

export default function enhancer() {
	return createStore => (...args) => {
		const store = createStore(...args);

		store.reducerEntries = [];

		store.injectReducers = (reducers, namespace, version) => {
			store.reducerEntries = concat(
				store.reducerEntries,
				createEntries(reducers, namespace, version)
			);

			store.replaceReducer(combineReducerEntries(store.reducerEntries));
			store.dispatch(reducersInjected({ reducers: keys(reducers), namespace, version }));
		};

		store.ejectReducers = (reducers, namespace, version) => {
			store.reducerEntries = reject(
				both(
					isVersionEjectable(version),
					isEntryIncluded(createEntries(reducers, namespace, version))
				),
				store.reducerEntries
			);

			store.replaceReducer(combineReducerEntries(store.reducerEntries));
			store.dispatch(reducersEjected({ reducers: keys(reducers), namespace, version }));
		};

		return store;
	};
}
