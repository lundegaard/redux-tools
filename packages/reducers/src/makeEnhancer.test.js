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
		const store = createStoreRedux(state => state, makeEnhancer());
		expect(store.getState()).toEqual(undefined);

		store.injectReducers({ a: reducerA });
		expect(store.getState()).toEqual({
			a: { name: 'a' },
		});

		store.ejectReducers({ a: reducerA });
		expect(store.getState()).toEqual({});

		store.injectReducers({ a: reducerA }, { namespace: 'nsA' });
		expect(store.getState()).toEqual({
			namespaces: {
				nsA: { a: { name: 'a' } },
			},
		});

		store.ejectReducers({ a: reducerA }, { namespace: 'nsA' });
		expect(store.getState()).toEqual({});

		store.injectReducers({ a: reducerA }, { namespace: 'nsA', feature: 'nsGroup' });
		expect(store.getState()).toEqual({
			nsGroup: {
				nsA: { a: { name: 'a' } },
			},
		});

		store.ejectReducers({ a: reducerA }, { namespace: 'nsA', feature: 'nsGroup' });
		expect(store.getState()).toEqual({});
	});

	it('removes data from state after ejecting (object reducers wit preloaded state)', () => {
		const store = createStoreRedux(identity, { preloadedStateObject: 'example' }, makeEnhancer());
		expect(store.getState()).toEqual({ preloadedStateObject: 'example' });

		store.injectReducers({ a: reducerA });
		expect(store.getState()).toEqual({
			preloadedStateObject: 'example',
			a: { name: 'a' },
		});

		store.ejectReducers({ a: reducerA });
		expect(store.getState()).toEqual({
			preloadedStateObject: 'example',
		});

		store.injectReducers({ a: reducerA }, { namespace: 'nsA' });
		expect(store.getState()).toEqual({
			preloadedStateObject: 'example',
			namespaces: {
				nsA: { a: { name: 'a' } },
			},
		});

		store.ejectReducers({ a: reducerA }, { namespace: 'nsA' });
		expect(store.getState()).toEqual({
			preloadedStateObject: 'example',
		});

		store.injectReducers({ a: reducerA }, { namespace: 'nsA', feature: 'nsGroup' });
		expect(store.getState()).toEqual({
			preloadedStateObject: 'example',
			nsGroup: {
				nsA: { a: { name: 'a' } },
			},
		});

		store.ejectReducers({ a: reducerA }, { namespace: 'nsA', feature: 'nsGroup' });
		expect(store.getState()).toEqual({
			preloadedStateObject: 'example',
		});
	});

	it('removes data from state after ejecting (function reducer without preloaded state)', () => {
		const store = createStoreRedux(state => state, makeEnhancer());
		expect(store.getState()).toEqual(undefined);

		store.injectReducers(reducerA, { namespace: 'nsA' });
		expect(store.getState()).toEqual({
			namespaces: {
				nsA: { name: 'a' },
			},
		});

		store.ejectReducers(reducerA, { namespace: 'nsA' });
		expect(store.getState()).toEqual({});

		store.injectReducers(reducerA, { namespace: 'nsA', feature: 'nsGroup' });
		expect(store.getState()).toEqual({
			nsGroup: {
				nsA: { name: 'a' },
			},
		});

		store.ejectReducers(reducerA, { namespace: 'nsA', feature: 'nsGroup' });
		expect(store.getState()).toEqual({});
	});

	it('removes data from state after ejecting (function reducer with preloaded state)', () => {
		const store = createStoreRedux(identity, { preloadedStateObject: 'example' }, makeEnhancer());
		expect(store.getState()).toEqual({ preloadedStateObject: 'example' });

		store.injectReducers(reducerA, { namespace: 'nsA' });
		expect(store.getState()).toEqual({
			preloadedStateObject: 'example',
			namespaces: {
				nsA: { name: 'a' },
			},
		});

		store.ejectReducers(reducerA, { namespace: 'nsA' });
		expect(store.getState()).toEqual({
			preloadedStateObject: 'example',
		});

		store.injectReducers(reducerA, { namespace: 'nsA', feature: 'nsGroup' });
		expect(store.getState()).toEqual({
			preloadedStateObject: 'example',
			nsGroup: {
				nsA: { name: 'a' },
			},
		});

		store.ejectReducers(reducerA, { namespace: 'nsA', feature: 'nsGroup' });
		expect(store.getState()).toEqual({
			preloadedStateObject: 'example',
		});
	});
});
