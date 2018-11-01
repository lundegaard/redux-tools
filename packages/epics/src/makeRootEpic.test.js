import * as R from 'ramda';
import { marbles } from 'rxjs-marbles/jest';
import * as Rx from 'rxjs/operators';
import { ReplaySubject, of } from 'rxjs';

import makeRootEpic from './makeRootEpic';
import { stopEpics } from './actions';

const state = {
	foo: 'bar',
};

describe('makeRootEpic', () => {
	it(
		'passes actions to an injected epic',
		marbles(m => {
			const incOverPayload = R.over(R.lensProp('payload'), R.inc);

			const epic$ = new ReplaySubject();
			const rootEpic = makeRootEpic(epic$, []);
			const injectedEpic = action$ => action$.pipe(Rx.map(incOverPayload));
			epic$.next({ id: 'someId', epic: injectedEpic });

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
			const rootEpic = makeRootEpic(epic$, []);
			const injectedEpic = action$ => action$.pipe(Rx.map(incOverPayload));
			epic$.next({ id: 'someId', epic: injectedEpic });
			epic$.next({ id: 'anotherId', epic: injectedEpic });

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
			const rootEpic = makeRootEpic(epic$, []);
			const injectedEpic = action$ => action$.pipe(Rx.map(R.identity));
			epic$.next({ id: 'someId', epic: injectedEpic, namespace: 'yo' });

			const action$ = m.cold('  -a', { a: {} });
			const expected$ = m.cold('-a', { a: { meta: { namespace: 'yo' } } });

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
			const payload = [{}, state, 'foo'];

			const action$ = m.cold('  -a', { a: {} });
			const expected$ = m.cold('-a', { a: { payload, meta: { namespace: 'yo' } } });

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
		'can be stopped by stopEpics action with correct id',
		marbles(m => {
			const epic$ = new ReplaySubject();
			const rootEpic = makeRootEpic(epic$, []);

			const injectedEpic = R.identity;

			epic$.next({ id: 'someId', epic: injectedEpic });

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
