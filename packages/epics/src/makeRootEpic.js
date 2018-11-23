import { map, applyTo, append, identity, assocPath, reject, both } from 'ramda';
import * as Rx from 'rxjs/operators';
import { isActionFromNamespace } from '@redux-tools/namespaces';
import {
	isEntryIncludedTimes,
	areEntriesEqual,
	isVersionEjectable,
	isEntryIncluded,
} from '@redux-tools/injectors';

const makeRootEpic = ({ inject$, eject$, store, streamCreators }) => {
	store.epicEntries = [];

	eject$.subscribe(entry => {
		store.epicEntries = reject(
			both(areEntriesEqual(entry), isVersionEjectable(entry.version)),
			store.epicEntries
		);
	});

	return (globalAction$, state$, dependencies) =>
		inject$.pipe(
			Rx.tap(entry => (store.epicEntries = append(entry, store.epicEntries))),
			Rx.filter(entry => isEntryIncludedTimes(1, store.epicEntries, entry)),
			Rx.mergeMap(entry => {
				const { value: epic, namespace } = entry;
				const action$ = globalAction$.pipe(Rx.filter(isActionFromNamespace(namespace)));
				const bag = { ...entry, epic, store, dependencies, action$, globalAction$, state$ };
				const otherStreams = map(applyTo(bag), streamCreators);

				return epic(action$, state$, ...otherStreams, dependencies).pipe(
					Rx.map(namespace ? assocPath(['meta', 'namespace'], namespace) : identity),
					// NOTE: takeUntil should ALWAYS be the last operator in `.pipe()`
					// https://blog.angularindepth.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef
					Rx.takeUntil(
						eject$.pipe(
							Rx.filter(areEntriesEqual(entry)),
							Rx.filter(ejectedEntry => !isEntryIncluded(store.epicEntries, ejectedEntry))
						)
					)
				);
			})
		);
};

export default makeRootEpic;
