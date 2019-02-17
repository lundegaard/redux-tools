import { identity, inc, dec } from 'ramda';
import { marbles } from 'rxjs-marbles/jest';
import * as Rx from 'rxjs/operators';
import { ReplaySubject, Subject, Observable } from 'rxjs';

import makeRootEpic from './makeRootEpic';

const incEpic = action$ => action$.pipe(Rx.map(inc));
const decEpic = action$ => action$.pipe(Rx.map(dec));

describe('makeRootEpic', () => {
	let inject$;
	let eject$;
	let rootEpic;

	beforeEach(() => {
		// NOTE: We need to use ReplaySubjects, because when we call `next()` in tests,
		// no subscriptions are active yet, so nothing would happen.
		inject$ = new ReplaySubject();
		eject$ = new ReplaySubject();
		rootEpic = makeRootEpic({ inject$, eject$ });
	});

	it(
		'passes actions to an injected epic',
		marbles(m => {
			inject$.next({ key: 'inc', value: incEpic });
			const action$ = m.cold('a', { a: 0 });
			const expected$ = m.cold('a', { a: 1 });
			const actual$ = rootEpic(action$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);

	it(
		'handles multiple same epics with different keys',
		marbles(m => {
			inject$.next({ key: 'inc1', value: incEpic });
			inject$.next({ key: 'inc2', value: incEpic });
			const action$ = m.cold('a', { a: 0 });
			const expected$ = m.cold('(aa)', { a: 1 });
			const actual$ = rootEpic(action$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);

	it(
		'handles different epics with same keys',
		marbles(m => {
			inject$.next({ key: 'inc', value: incEpic });
			inject$.next({ key: 'inc', value: decEpic });
			const action$ = m.cold('a', { a: 0 });
			const expected$ = m.cold('(ab)', { a: 1, b: -1 });
			const actual$ = rootEpic(action$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);

	it(
		'adds namespace and feature to emitted actions',
		marbles(m => {
			inject$.next({ key: 'id', value: identity, namespace: 'ns', feature: 'grids' });
			const action$ = m.cold('a', { a: {} });
			const expected$ = m.cold('a', { a: { meta: { feature: 'grids', namespace: 'ns' } } });
			const actual$ = rootEpic(action$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);

	it(
		'passes only valid actions to a namespaced epic',
		marbles(m => {
			inject$.next({ key: 'id', value: identity, feature: 'namespaces', namespace: 'ns' });
			const valid = { meta: { feature: 'namespaces', namespace: 'ns' } };
			const invalid = { meta: { namespace: 'wrong' } };
			const action$ = m.cold('vi', { v: valid, i: invalid });
			const expected$ = m.cold('v-', { v: valid });
			const actual$ = rootEpic(action$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);

	it(
		'handles multiple injections of the same epic with increasing version',
		marbles(m => {
			inject$.next({ key: 'id', value: identity, version: 0 });
			inject$.next({ key: 'id', value: identity, version: 1 });
			const action$ = m.cold('a', { a: 0 });
			const expected$ = m.cold('a', { a: 0 });
			const actual$ = rootEpic(action$);
			m.expect(actual$).toBeObservable(expected$);
		})
	);

	it('stops an epic when it ejected', () => {
		const result = [];
		const action$ = new Subject();
		rootEpic(action$).subscribe(result.push.bind(result));
		inject$.next({ key: 'id', value: identity });
		action$.next(true);
		eject$.next({ key: 'id', value: identity });
		action$.next(false);
		expect(result).toEqual([true]);
	});

	it('handles successive injections and ejections (asynchronous React rendering)', () => {
		const result = [];
		const action$ = new Subject();
		rootEpic(action$).subscribe(result.push.bind(result));
		inject$.next({ key: 'id', value: identity, version: 0 });
		inject$.next({ key: 'id', value: identity, version: 1 });
		action$.next(true);
		eject$.next({ key: 'id', value: identity, version: 1 });
		action$.next(false);
		expect(result).toEqual([true]);
	});

	it('handles successive injections and ejections (changing a key of a React component)', () => {
		const result = [];
		const action$ = new Subject();
		rootEpic(action$).subscribe(result.push.bind(result));
		// NOTE: This is the first possible order
		inject$.next({ key: 'id', value: identity, version: 0 });
		inject$.next({ key: 'id', value: identity, version: 1 });
		eject$.next({ key: 'id', value: identity, version: 0 });
		action$.next('hello');

		// NOTE: This is the second possible order
		eject$.next({ key: 'id', value: identity, version: 1 });
		inject$.next({ key: 'id', value: identity, version: 2 });
		action$.next('world');

		expect(result).toEqual(['hello', 'world']);
	});

	it('passes correct arguments to the epic when streamCreator is omitted', () => {
		const epic = jest.fn(identity);
		inject$.next({ key: 'id', value: epic });
		const action$ = new Subject();
		const state$ = 'state$';
		const dependencies = 'dependencies';
		rootEpic = makeRootEpic({ inject$, eject$ });
		rootEpic(action$, state$, dependencies).subscribe();
		expect(epic).toHaveBeenCalledTimes(1);
		expect(epic.mock.calls[0][0]).toBeInstanceOf(Observable);
		expect(epic.mock.calls[0][1]).toEqual('state$');
		expect(epic.mock.calls[0][2]).toEqual('dependencies');
	});

	it('passes correct arguments to the epic when streamCreator is defined', () => {
		const epic = jest.fn(identity);
		inject$.next({ key: 'id', value: epic });
		const streamCreator = jest.fn(() => 'other$');
		const action$ = new Subject();
		const state$ = 'state$';
		const dependencies = 'dependencies';
		rootEpic = makeRootEpic({ inject$, eject$, streamCreator });
		rootEpic(action$, state$, dependencies).subscribe();
		expect(epic).toHaveBeenCalledTimes(1);
		expect(epic.mock.calls[0][0]).toBeInstanceOf(Observable);
		expect(epic.mock.calls[0][1]).toEqual('state$');
		expect(epic.mock.calls[0][2]).toEqual('other$');
		expect(epic.mock.calls[0][3]).toEqual('dependencies');
		expect(streamCreator).toHaveBeenCalledTimes(1);
		expect(streamCreator.mock.calls[0][0].state$).toEqual('state$');
	});
});
