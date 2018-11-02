import { over, lensProp, inc, identity } from 'ramda';
import { marbles } from 'rxjs-marbles/jest';
import * as Rx from 'rxjs/operators';
import { ReplaySubject, of } from 'rxjs';

import makeRootEpic from './makeRootEpic';
import { stopEpics } from './actions';

const state = {
	foo: 'bar',
};

const incOverPayload = over(lensProp('payload'), inc);
const incEpic = action$ => action$.pipe(Rx.map(incOverPayload));

describe('makeRootEpic', () => {
	it(
		'passes actions to an injected epic',
		marbles(m => {
			const epic$ = new ReplaySubject();
			const rootEpic = makeRootEpic(epic$, []);
			epic$.next({ id: 'someId', epic: incEpic });

			const action$ = m.cold('a', { a: { payload: 1 } });
			const expected$ = m.cold('a', { a: { payload: 2 } });
			const state$ = of(state);

			const actual$ = rootEpic(action$, state$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);

	it(
		'handles multiple injected epics',
		marbles(m => {
			const epic$ = new ReplaySubject();
			const rootEpic = makeRootEpic(epic$, []);
			epic$.next({ id: 'someId', epic: incEpic });
			epic$.next({ id: 'anotherId', epic: incEpic });

			const action$ = m.cold('a', { a: { payload: 1 } });
			const expected$ = m.cold('(aa)', { a: { payload: 2 } });
			const state$ = of(state);

			const actual$ = rootEpic(action$, state$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);

	it(
		'adds namespace to emitted actions',
		marbles(m => {
			const epic$ = new ReplaySubject();
			const rootEpic = makeRootEpic(epic$, []);
			epic$.next({ id: 'someId', epic: identity, namespace: 'yo' });

			const action$ = m.cold('a', { a: {} });
			const expected$ = m.cold('a', { a: { meta: { namespace: 'yo' } } });

			const state$ = of(state);

			const actual$ = rootEpic(action$, state$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);

	it(
		'passes only valid actions to a namespaced epic',
		marbles(m => {
			const epic$ = new ReplaySubject();
			const rootEpic = makeRootEpic(epic$, []);
			epic$.next({ id: 'someId', epic: identity, namespace: 'ns' });

			const valid = { meta: { namespace: 'ns' } };
			const invalid = { meta: { namespace: 'wrong' } };

			const action$ = m.cold('ab', {
				a: valid,
				b: invalid,
			});

			const expected$ = m.cold('a-', {
				a: valid,
			});

			const state$ = of(state);

			const actual$ = rootEpic(action$, state$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);

	it(
		'passes the `streamCreators` return values as arguments to an injected epic',
		marbles(m => {
			const epic$ = new ReplaySubject();
			const streamCreator = jest.fn(() => of('foo'));
			const rootEpic = makeRootEpic(epic$, [streamCreator]);

			const injectedEpic = (action$, state$, foo$) =>
				action$.pipe(
					Rx.withLatestFrom(state$, foo$),
					Rx.map(payload => ({ payload }))
				);

			epic$.next({ id: 'someId', epic: injectedEpic, namespace: 'yo' });

			const state$ = of(state);

			const action = { meta: { namespace: 'yo' } };
			const payload = [action, state, 'foo'];
			const action$ = m.cold('a', { a: action });
			const expected$ = m.cold('a', { a: { ...action, payload } });

			const actual$ = rootEpic(action$, state$);
			m.expect(actual$).toBeObservable(expected$);
			m.flush();

			expect(streamCreator).toHaveBeenCalled();

			const arg = streamCreator.mock.calls[0][0];
			expect(arg.namespace).toBe('yo');
			expect(arg.id).toBe('someId');
			expect(arg.state$).toBe(state$);
			expect(arg.action$).toBe(action$);
			expect(arg.epic).toBe(injectedEpic);
		})
	);

	it(
		'can be stopped by a `stopEpics` action with a correct id',
		marbles(m => {
			const epic$ = new ReplaySubject();
			const rootEpic = makeRootEpic(epic$, []);

			epic$.next({ id: 'someId', epic: identity });

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
