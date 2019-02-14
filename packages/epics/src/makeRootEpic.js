import { append, reject, both } from 'ramda';
import * as Rx from 'rxjs/operators';
import { isActionFromNamespace, attachNamespace } from '@redux-tools/namespaces';
import {
	isEntryIncludedTimes,
	areEntriesEqual,
	isEntryEjectableByVersion,
	isEntryNotIncluded,
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
				const { value: epic, feature, namespace } = entry;
				const action$ = globalAction$.pipe(Rx.filter(isActionFromNamespace(feature, namespace)));

				const outputAction$ = streamCreator
					? epic(
							action$,
							state$,
							streamCreator({ namespace, action$, globalAction$, state$ }),
							dependencies
					  )
					: epic(action$, state$, dependencies);

				return outputAction$.pipe(
					Rx.map(attachNamespace(feature, namespace)),
					// NOTE: takeUntil should ALWAYS be the last operator in `.pipe()`
					// https://blog.angularindepth.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef
					Rx.takeUntil(
						eject$.pipe(
							Rx.filter(areEntriesEqual(entry)),
							Rx.filter(ejectedEntry => isEntryNotIncluded(epicEntries, ejectedEntry))
						)
					)
				);
			})
		);
};

export default makeRootEpic;
