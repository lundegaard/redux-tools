import { keys, forEach } from 'ramda';
import { Subject } from 'rxjs';
import { createEntries } from '@redux-tools/injectors';

import { epicsInjected, epicsEjected } from './actions';
import makeRootEpic from './makeRootEpic';

export default function makeEnhancer({ epicMiddleware, streamCreator }) {
	return createStore => (...args) => {
		const store = createStore(...args);

		const inject$ = new Subject();
		const eject$ = new Subject();

		const rootEpic = makeRootEpic({ inject$, eject$, store, streamCreator });

		store.injectEpics = (epics, { namespace, version, feature = 'namespaces' }) => {
			forEach(entry => inject$.next(entry), createEntries(epics, { namespace, version, feature }));
			store.dispatch(epicsInjected({ epics: keys(epics), namespace, version, feature }));
		};

		store.ejectEpics = (epics, { namespace, version, feature = 'namespaces' }) => {
			forEach(entry => eject$.next(entry), createEntries(epics, { namespace, version, feature }));
			store.dispatch(epicsEjected({ epics: keys(epics), namespace, version, feature }));
		};

		epicMiddleware.run(rootEpic);

		return store;
	};
}
