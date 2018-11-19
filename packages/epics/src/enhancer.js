import { forEachObjIndexed, o } from 'ramda';
import { Subject } from 'rxjs';

import { stopEpics } from './actions';
import makeRootEpic from './makeRootEpic';

export default function enhancer({ epicMiddleware, streamCreators = [] }) {
	return createStore => (...args) => {
		const store = createStore(...args);

		// NOTE: epic$ serves as a proxy between injecting epics and merging their outputs
		// Subject is both an Observer and an Observable.
		// epic$ is an Observer, because we need to notify it by calling `injectEpics` from the outside
		// epic$ is an Observable, because it produces a stream of epics, which we observe and merge
		// into a single action$.
		const epic$ = new Subject();
		const rootEpic = makeRootEpic(epic$, streamCreators);

		const injectEpics = (epics, namespace) =>
			forEachObjIndexed((epic, id) => epic$.next({ epic, id, namespace }), epics);

		const ejectEpics = o(store.dispatch, stopEpics);

		store.injectEpics = injectEpics;
		store.ejectEpics = ejectEpics;

		epicMiddleware.run(rootEpic);

		return store;
	};
}
