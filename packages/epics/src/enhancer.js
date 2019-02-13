import { keys, forEach } from 'ramda';
import { Subject } from 'rxjs';
import { createEntries } from '@redux-tools/injectors';

import { epicsInjected, epicsEjected } from './actions';
import makeRootEpic from './makeRootEpic';

export default function injectableEpics({ epicMiddleware, streamCreator }) {
	return createStore => (...args) => {
		const store = createStore(...args);

		const inject$ = new Subject();
		const eject$ = new Subject();

		const rootEpic = makeRootEpic({ inject$, eject$, store, streamCreator });

		store.injectEpics = (epics, { namespace, version }) => {
			forEach(entry => inject$.next(entry), createEntries(epics, { namespace, version }));
			store.dispatch(epicsInjected({ epics: keys(epics), namespace, version }));
		};

		store.ejectEpics = (epics, { namespace, version }) => {
			forEach(entry => eject$.next(entry), createEntries(epics, { namespace, version }));
			store.dispatch(epicsEjected({ epics: keys(epics), namespace, version }));
		};

		epicMiddleware.run(rootEpic);

		return store;
	};
}
