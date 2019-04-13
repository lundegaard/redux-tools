import { append, equals, includes } from 'ramda';
import * as Rx from 'rxjs/operators';
import { isActionFromNamespace, attachNamespace } from '@redux-tools/namespaces';
import { includesTimes, withoutOnce } from '@redux-tools/utils';

const makeRootEpic = ({ inject$, eject$, store, streamCreator }) => {
	store.epicEntries = [];

	eject$.subscribe(entry => (store.epicEntries = withoutOnce([entry], store.epicEntries)));

	return (globalAction$, state$, dependencies) =>
		inject$.pipe(
			Rx.tap(entry => (store.epicEntries = append(entry, store.epicEntries))),
			Rx.filter(entry => includesTimes(1, entry, store.epicEntries)),
			Rx.mergeMap(entry => {
				const { value: epic, namespace, ...otherProps } = entry;
				const action$ = globalAction$.pipe(Rx.filter(isActionFromNamespace(namespace)));

				const outputAction$ = streamCreator
					? epic(
							action$,
							state$,
							streamCreator({ namespace, action$, globalAction$, state$, ...otherProps }),
							dependencies
					  )
					: epic(action$, state$, dependencies);

				return outputAction$.pipe(
					Rx.map(attachNamespace(namespace)),
					// NOTE: takeUntil should ALWAYS be the last operator in `.pipe()`
					// https://blog.angularindepth.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef
					Rx.takeUntil(
						eject$.pipe(
							Rx.filter(equals(entry)),
							Rx.filter(ejectedEntry => !includes(ejectedEntry, store.epicEntries))
						)
					)
				);
			})
		);
};

export default makeRootEpic;
