import { append, reject, both } from 'ramda';
import * as Rx from 'rxjs/operators';
import { isActionFromNamespace, attachNamespace } from '@redux-tools/namespaces';
import {
	isEntryIncludedTimes,
	areEntriesEqual,
	isEntryEjectableByVersion,
	isEntryIncluded,
} from '@redux-tools/injectors';

const makeRootEpic = ({ inject$, eject$, streamCreator }) => {
	let epicEntries = [];

	eject$.subscribe(entry => {
		epicEntries = reject(
			both(areEntriesEqual(entry), isEntryEjectableByVersion(entry.version)),
			epicEntries
		);
	});

	return (globalAction$, state$, dependencies) =>
		inject$.pipe(
			Rx.tap(entry => (epicEntries = append(entry, epicEntries))),
			Rx.filter(entry => isEntryIncludedTimes(1, epicEntries, entry)),
			Rx.mergeMap(entry => {
				const { value: epic, namespace } = entry;
				const action$ = globalAction$.pipe(Rx.filter(isActionFromNamespace(namespace)));
				const other$ = streamCreator({ namespace, action$, globalAction$, state$ });

				return epic(action$, state$, other$, dependencies).pipe(
					Rx.map(attachNamespace(namespace)),
					// NOTE: takeUntil should ALWAYS be the last operator in `.pipe()`
					// https://blog.angularindepth.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef
					Rx.takeUntil(
						eject$.pipe(
							Rx.filter(areEntriesEqual(entry)),
							Rx.filter(ejectedEntry => !isEntryIncluded(epicEntries, ejectedEntry))
						)
					)
				);
			})
		);
};

export default makeRootEpic;
