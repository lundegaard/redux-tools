import { identity } from 'ramda';
import { FUNCTION_KEY } from '@redux-tools/injectors';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';
import { createStore as createStoreRedux } from 'redux';

import makeEnhancer, { storeInterface } from './makeEnhancer';

const createStore = () => ({
	replaceReducer: jest.fn(),
});

const { getEntries } = storeInterface;

describe('makeEnhancer', () => {
	const reducerA = (state = { name: 'a' }) => state;
	let store;

	beforeEach(() => {
		jest.clearAllMocks();
		store = makeEnhancer()(createStore)();
	});

	it('returns a Redux store with defined functions', () => {
		expect(store.injectReducers).toBeInstanceOf(Function);
		expect(store.ejectReducers).toBeInstanceOf(Function);
	});

	it('handles multiple calls to store.injectReducers', () => {
		store.injectReducers({ foo: identity }, { namespace: 'ns' });
		expect(store.replaceReducer).toHaveBeenCalledTimes(1);
		store.injectReducers({ foo: identity }, { namespace: 'ns' });
		expect(store.replaceReducer).toHaveBeenCalledTimes(2);
	});

	it('handles injecting and ejecting functions', () => {
		store.injectReducers(identity, { namespace: 'ns' });

		expect(store.replaceReducer).toHaveBeenCalledTimes(1);
		expect(getEntries(store)).toEqual([
			{ key: FUNCTION_KEY, value: identity, namespace: 'ns', feature: DEFAULT_FEATURE },
		]);

		store.ejectReducers(identity, { namespace: 'ns' });

		expect(store.replaceReducer).toHaveBeenCalledTimes(2);
		expect(getEntries(store)).toEqual([]);
	});

	it('throws when injecting a function without a namespace', () => {
		expect(() => store.injectReducers(identity)).toThrow();
	});

	it('removes data from state after ejecting (object reducers without preloaded state)', () => {
		const storeRedux = createStoreRedux(identity, makeEnhancer());
		expect(storeRedux.getState()).toEqual(undefined);

		storeRedux.injectReducers({ a: reducerA });
		expect(storeRedux.getState()).toEqual({
			a: { name: 'a' },
		});

		storeRedux.ejectReducers({ a: reducerA });
		expect(storeRedux.getState()).toEqual({});

		storeRedux.injectReducers({ a: reducerA }, { namespace: 'nsA' });
		expect(storeRedux.getState()).toEqual({
			namespaces: {
				nsA: { a: { name: 'a' } },
			},
		});

		storeRedux.ejectReducers({ a: reducerA }, { namespace: 'nsA' });
		expect(storeRedux.getState()).toEqual({});

		storeRedux.injectReducers({ a: reducerA }, { namespace: 'nsA', feature: 'featureA' });
		expect(storeRedux.getState()).toEqual({
			featureA: {
				nsA: { a: { name: 'a' } },
			},
		});

		storeRedux.ejectReducers({ a: reducerA }, { namespace: 'nsA', feature: 'featureA' });
		expect(storeRedux.getState()).toEqual({});
	});

	it('removes data from state after ejecting (object reducers with preloaded state)', () => {
		const storeRedux = createStoreRedux(
			identity,
			{ preloadedStateObject: 'example' },
			makeEnhancer()
		);
		expect(storeRedux.getState()).toEqual({ preloadedStateObject: 'example' });

		storeRedux.injectReducers({ a: reducerA });
		expect(storeRedux.getState()).toEqual({
			preloadedStateObject: 'example',
			a: { name: 'a' },
		});

		storeRedux.ejectReducers({ a: reducerA });
		expect(storeRedux.getState()).toEqual({
			preloadedStateObject: 'example',
		});

		storeRedux.injectReducers({ a: reducerA }, { namespace: 'nsA' });
		expect(storeRedux.getState()).toEqual({
			preloadedStateObject: 'example',
			namespaces: {
				nsA: { a: { name: 'a' } },
			},
		});

		storeRedux.ejectReducers({ a: reducerA }, { namespace: 'nsA' });
		expect(storeRedux.getState()).toEqual({
			preloadedStateObject: 'example',
		});

		storeRedux.injectReducers({ a: reducerA }, { namespace: 'nsA', feature: 'featureA' });
		expect(storeRedux.getState()).toEqual({
			preloadedStateObject: 'example',
			featureA: {
				nsA: { a: { name: 'a' } },
			},
		});

		storeRedux.ejectReducers({ a: reducerA }, { namespace: 'nsA', feature: 'featureA' });
		expect(storeRedux.getState()).toEqual({
			preloadedStateObject: 'example',
		});
	});

	it('removes data from state after ejecting (function reducer without preloaded state)', () => {
		const storeRedux = createStoreRedux(state => state, makeEnhancer());
		expect(storeRedux.getState()).toEqual(undefined);

		storeRedux.injectReducers(reducerA, { namespace: 'nsA' });
		expect(storeRedux.getState()).toEqual({
			namespaces: {
				nsA: { name: 'a' },
			},
		});

		storeRedux.ejectReducers(reducerA, { namespace: 'nsA' });
		expect(storeRedux.getState()).toEqual({});

		storeRedux.injectReducers(reducerA, { namespace: 'nsA', feature: 'featureA' });
		expect(storeRedux.getState()).toEqual({
			featureA: {
				nsA: { name: 'a' },
			},
		});

		storeRedux.ejectReducers(reducerA, { namespace: 'nsA', feature: 'featureA' });
		expect(storeRedux.getState()).toEqual({});
	});

	it('removes data from state after ejecting (function reducer with preloaded state)', () => {
		const storeRedux = createStoreRedux(
			identity,
			{ preloadedStateObject: 'example' },
			makeEnhancer()
		);
		expect(storeRedux.getState()).toEqual({ preloadedStateObject: 'example' });

		storeRedux.injectReducers(reducerA, { namespace: 'nsA' });
		expect(storeRedux.getState()).toEqual({
			preloadedStateObject: 'example',
			namespaces: {
				nsA: { name: 'a' },
			},
		});

		storeRedux.ejectReducers(reducerA, { namespace: 'nsA' });
		expect(storeRedux.getState()).toEqual({
			preloadedStateObject: 'example',
		});

		storeRedux.injectReducers(reducerA, { namespace: 'nsA', feature: 'featureA' });
		expect(storeRedux.getState()).toEqual({
			preloadedStateObject: 'example',
			featureA: {
				nsA: { name: 'a' },
			},
		});

		storeRedux.ejectReducers(reducerA, { namespace: 'nsA', feature: 'featureA' });
		expect(storeRedux.getState()).toEqual({
			preloadedStateObject: 'example',
		});
	});

	it('handles initial reducers in makeEnhancer', () => {
		const reducerMockA = jest.fn();
		const reducerMockB = jest.fn((state = { nameB: 'B' }) => state);

		const reducers = {
			reducerStateA: (state = { nameA: 'A' }, action) => {
				reducerMockA(state, action);
				return state;
			},
		};

		const store = createStoreRedux(identity, makeEnhancer(reducers));

		expect(reducerMockA.mock.calls.length).toEqual(0);
		expect(reducerMockB.mock.calls.length).toEqual(0);

		store.injectReducers({ reducerStateB: reducerMockB });

		expect(reducerMockA.mock.calls.length).toEqual(2);
		expect(reducerMockB.mock.calls.length).toEqual(2);

		store.dispatch({ type: 'example' });

		expect(reducerMockA.mock.calls.length).toEqual(3);
		expect(reducerMockA.mock.calls[2][0]).toEqual({ nameA: 'A' });
		expect(reducerMockB.mock.calls.length).toEqual(3);
		expect(reducerMockB.mock.calls[2][0]).toEqual({ nameB: 'B' });
	});
});
