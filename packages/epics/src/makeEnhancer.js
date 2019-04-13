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

		store.injectEpics = (epics, props) => {
			forEach(entry => inject$.next(entry), createEntries(epics, props));
			store.dispatch(epicsInjected({ epics: keys(epics), ...props }));
		};

		store.ejectEpics = (epics, props) => {
			forEach(entry => eject$.next(entry), createEntries(epics, props));
			store.dispatch(epicsEjected({ epics: keys(epics), ...props }));
		};

		epicMiddleware.run(rootEpic);

		return store;
	};
}
