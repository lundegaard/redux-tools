import { equals, includes } from 'ramda';
import { Subject } from 'rxjs';
import * as Rx from 'rxjs/operators';

import { enhanceStore, makeStoreInterface } from '@redux-tools/injectors';
import { isActionFromNamespace, defaultNamespace } from '@redux-tools/namespaces';
import { includesTimes } from '@redux-tools/utils';

export const storeInterface = makeStoreInterface('epics');

const makeEnhancer = ({ epicMiddleware, streamCreator }) => createStore => (...args) => {
	const prevStore = createStore(...args);

	const injectedEntries$ = new Subject();
	const ejectedEntries$ = new Subject();

	const rootEpic = (globalAction$, state$, dependencies) =>
		injectedEntries$.pipe(
			Rx.mergeAll(),
			Rx.filter(injectedEntry =>
				includesTimes(1, injectedEntry, storeInterface.getEntries(nextStore))
			),
			Rx.mergeMap(injectedEntry => {
				const { value: epic, namespace, ...otherProps } = injectedEntry;
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
					Rx.map(defaultNamespace(namespace)),
					// NOTE: takeUntil should ALWAYS be the last operator in `.pipe()`
					// https://blog.angularindepth.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef
					Rx.takeUntil(
						ejectedEntries$.pipe(
							Rx.mergeAll(),
							Rx.filter(equals(injectedEntry)),
							Rx.filter(
								ejectedEntry => !includes(ejectedEntry, storeInterface.getEntries(nextStore))
							)
						)
					)
				);
			})
		);

	epicMiddleware.run(rootEpic);

	const nextStore = enhanceStore(prevStore, storeInterface, {
		onInjected: ({ entries }) => injectedEntries$.next(entries),
		onEjected: ({ entries }) => ejectedEntries$.next(entries),
	});

	return nextStore;
};

export default makeEnhancer;
