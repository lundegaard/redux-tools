import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Subject } from 'rxjs';
import { identity, assocPath, forEach, keys, dissocPath, toPairs, o } from 'ramda';

import { makeRootEpic, makeRootReducer, getAsyncReducerPath } from './utils';
import { stopEpics, reducersInjected, reducersRemoved } from './actions';

export default function createExtensibleStore(
	preloadedState,
	middleware = [],
	composeEnhancers = compose
) {
	const epicMiddleware = createEpicMiddleware();

	// NOTE: epic$ serves as a proxy between injecting epics and merging their outputs
	// Subject is both an Observer and an Observable.
	// epic$ is an Observer, because we need to notify it by calling `injectEpics` from the outside
	// epic$ is an Observable, because it produces a stream of epics, which we observe and merge
	// into a single action$.
	const epic$ = new Subject();
	const rootEpic = makeRootEpic(epic$);

	const store = createStore(
		identity,
		preloadedState,
		composeEnhancers(applyMiddleware(...middleware, epicMiddleware))
	);

	store.asyncReducers = {
		namespaces: {},
	};

	const injectReducers = (reducers, namespace) => {
		const reducerPairs = toPairs(reducers);

		const injectReducer = ([key, reducer]) =>
			(store.asyncReducers = assocPath(
				getAsyncReducerPath(key, namespace),
				reducer,
				store.asyncReducers
			));

		forEach(injectReducer, reducerPairs);

		store.replaceReducer(makeRootReducer(store.asyncReducers));

		// Must dispatch to let new reducers return their initial state
		store.dispatch(reducersInjected({ reducers: keys(reducers), namespace }));
	};

	const removeReducers = (keys, namespace) => {
		const removeReducer = key =>
			(store.asyncReducers = dissocPath(getAsyncReducerPath(key, namespace), store.asyncReducers));

		forEach(removeReducer, keys);

		store.replaceReducer(makeRootReducer(store.asyncReducers));
		store.dispatch(reducersRemoved({ keys, namespace }));
	};

	const injectEpics = (epics, namespace) => {
		const epicPairs = toPairs(epics);
		forEach(epicPair => epic$.next([...epicPair, namespace]), epicPairs);
	};

	const removeEpics = o(store.dispatch, stopEpics);

	store.injectReducers = injectReducers;
	store.injectEpics = injectEpics;

	store.removeReducers = removeReducers;
	store.removeEpics = removeEpics;

	epicMiddleware.run(rootEpic);

	return store;
}
