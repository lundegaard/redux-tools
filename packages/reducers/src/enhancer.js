import { forEachObjIndexed, assocPath, keys, dissocPath, forEach, map } from 'ramda';

import { reducersInjected, reducersEjected } from './actions';
import { makeRootReducer, getReducerPath, filterReducer } from './reducers';

export default function enhancer() {
	return createStore => (...args) => {
		const store = createStore(...args);

		store.injectedReducers = {
			namespaces: {},
		};

		const injectReducers = (reducers, namespace) => {
			const injectReducer = (reducer, key) =>
				(store.injectedReducers = assocPath(
					getReducerPath(key, namespace),
					reducer,
					store.injectedReducers
				));

			const filteredReducers = map(filterReducer(namespace), reducers);
			forEachObjIndexed(injectReducer, filteredReducers);
			store.replaceReducer(makeRootReducer(store.injectedReducers));
			store.dispatch(reducersInjected({ reducers: keys(filteredReducers), namespace }));
		};

		const ejectReducers = (reducers, namespace) => {
			const ejectReducer = key =>
				(store.injectedReducers = dissocPath(
					getReducerPath(key, namespace),
					store.injectedReducers
				));

			const reducerKeys = keys(reducers);
			forEach(ejectReducer, reducerKeys);
			store.replaceReducer(makeRootReducer(store.injectedReducers));
			store.dispatch(reducersEjected({ reducers: reducerKeys, namespace }));
		};

		store.injectReducers = injectReducers;
		store.ejectReducers = ejectReducers;

		return store;
	};
}
