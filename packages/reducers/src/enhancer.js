import { forEachObjIndexed, assocPath, keys, dissocPath, forEach } from 'ramda';

import { reducersInjected, reducersEjected } from './actions';
import { makeRootReducer, getReducerPath } from './reducers';

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

			forEachObjIndexed(injectReducer, reducers);
			store.replaceReducer(makeRootReducer(store.injectedReducers));
			store.dispatch(reducersInjected({ reducers: keys(reducers), namespace }));
		};

		const ejectReducers = (keys, namespace) => {
			const ejectReducer = key =>
				(store.injectedReducers = dissocPath(
					getReducerPath(key, namespace),
					store.injectedReducers
				));

			forEach(ejectReducer, keys);
			store.replaceReducer(makeRootReducer(store.injectedReducers));
			store.dispatch(reducersEjected({ keys, namespace }));
		};

		store.injectReducers = injectReducers;
		store.ejectReducers = ejectReducers;

		return store;
	};
}
