import * as R from 'ramda';
import { marbles } from 'rxjs-marbles/jest';
import * as Rx from 'rxjs/operators';
import { ReplaySubject, of } from 'rxjs';

import { makeRootEpic } from './epics';
import { stopEpics } from '../actions';

const state = {
	namespaces: { yo: { foo: 'bar' } },
};

describe('makeRootEpic', () => {
	it(
		'passes actions to an injected epic',
		marbles(m => {
			const incOverPayload = R.over(R.lensProp('payload'), R.inc);

			const epic$ = new ReplaySubject();
			const rootEpic = makeRootEpic(epic$);
			const injectedEpic = action$ => action$.pipe(Rx.map(incOverPayload));
			epic$.next(['someId', injectedEpic]);

			const action$ = m.cold('  -a', { a: { payload: 1 } });
			const expected$ = m.cold('-a', { a: { payload: 2 } });
			const state$ = of(state);

			const actual$ = rootEpic(action$, state$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);

	it(
		'handles multiple injected epics',
		marbles(m => {
			const incOverPayload = R.over(R.lensProp('payload'), R.inc);

			const epic$ = new ReplaySubject();
			const rootEpic = makeRootEpic(epic$);
			const injectedEpic = action$ => action$.pipe(Rx.map(incOverPayload));
			epic$.next(['someId', injectedEpic]);
			epic$.next(['anotherId', injectedEpic]);

			const action$ = m.cold('  -a', { a: { payload: 1 } });
			const expected$ = m.cold('-(aa)', { a: { payload: 2 } });
			const state$ = of(state);

			const actual$ = rootEpic(action$, state$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);

	it(
		'adds namespace to emitted actions',
		marbles(m => {
			const epic$ = new ReplaySubject();
			const rootEpic = makeRootEpic(epic$);
			const injectedEpic = action$ => action$.pipe(Rx.map(R.identity));
			epic$.next(['someId', injectedEpic, 'yo']);

			const action$ = m.cold('  -a', { a: {} });
			const expected$ = m.cold('-a', { a: { meta: { namespace: 'yo' } } });

			const state$ = of(state);

			const actual$ = rootEpic(action$, state$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);

	it(
		'passes state$ and namespacedState$ to the injected epic (namespaced)',
		marbles(m => {
			const epic$ = new ReplaySubject();
			const rootEpic = makeRootEpic(epic$);

			const injectedEpic = (action$, state$, namespacedState$) =>
				action$.pipe(
					Rx.withLatestFrom(state$, namespacedState$),
					Rx.map(array => ({ payload: array }))
				);

			epic$.next(['someId', injectedEpic, 'yo']);

			const state$ = of(state);
			const payload = [
				{}, // action$
				state, // state$
				state.namespaces.yo, // namespacedState$
			];

			const action$ = m.cold('  -a', { a: {} });
			const expected$ = m.cold('-a', { a: { payload, meta: { namespace: 'yo' } } });

			const actual$ = rootEpic(action$, state$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);

	it(
		'passes state$ and namespacedState$ to the injected epic (global)',
		marbles(m => {
			const epic$ = new ReplaySubject();
			const rootEpic = makeRootEpic(epic$);

			const injectedEpic = (action$, state$, namespacedState$) =>
				action$.pipe(
					Rx.withLatestFrom(state$, namespacedState$),
					Rx.map(array => ({ payload: array }))
				);

			epic$.next(['someId', injectedEpic]);

			const state$ = of(state);
			const payload = [
				{}, // action$
				state, // state$
				undefined, // namespacedState$
			];

			const action$ = m.cold('  -a', { a: {} });
			const expected$ = m.cold('-a', { a: { payload } });

			const actual$ = rootEpic(action$, state$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);

	it(
		'throws when attempting to access namespacedState of invalid namespace',
		marbles(m => {
			const epic$ = new ReplaySubject();
			const rootEpic = makeRootEpic(epic$);

			const injectedEpic = (action$, state$, namespacedState$) =>
				action$.pipe(
					Rx.withLatestFrom(namespacedState$),
					Rx.catchError(R.o(value => of({ value }), R.prop('message')))
				);

			epic$.next(['someId', injectedEpic, 'INVALID']);

			const state$ = of(state);

			const action$ = m.cold('----');
			const expected$ = m.cold('a', {
				a: {
					meta: { namespace: 'INVALID' },
					value: 'No local Redux state found for namespace INVALID.',
				},
			});

			const actual$ = rootEpic(action$, state$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);

	it(
		'can be stopped by stopEpics action with correct id',
		marbles(m => {
			const epic$ = new ReplaySubject();
			const rootEpic = makeRootEpic(epic$);

			const injectedEpic = R.identity;

			epic$.next(['someId', injectedEpic]);

			const state$ = of(state);

			const action$ = m.cold('  -a-x-a-s-a', {
				a: {},
				s: stopEpics(['someId', 'otherId']),
				x: stopEpics(['yetAnotherId']),
			});

			const expected$ = m.cold('-a-x-a----', {
				a: {},
				x: stopEpics(['yetAnotherId']),
			});

			const actual$ = rootEpic(action$, state$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);
});
