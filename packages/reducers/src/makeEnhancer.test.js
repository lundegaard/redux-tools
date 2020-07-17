import { identity } from 'ramda';
import { createStore as createStoreRedux } from 'redux';

import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import makeEnhancer, { storeInterface } from './makeEnhancer';

const createStore = () => ({
	replaceReducer: jest.fn(),
	dispatch: jest.fn(),
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

	it('handles injecting and ejecting namespaced reducers as functions', () => {
		store.injectReducers(identity, { namespace: 'ns' });

		expect(store.replaceReducer).toHaveBeenCalledTimes(1);
		expect(getEntries(store)).toEqual([
			{ path: [], value: identity, namespace: 'ns', feature: DEFAULT_FEATURE },
		]);

		store.ejectReducers(identity, { namespace: 'ns' });

		expect(store.replaceReducer).toHaveBeenCalledTimes(2);
		expect(getEntries(store)).toEqual([]);
	});

	it('handles injecting and ejecting global reducers as functions', () => {
		store.injectReducers(identity);

		expect(store.replaceReducer).toHaveBeenCalledTimes(1);
		expect(getEntries(store)).toEqual([{ path: [], value: identity }]);

		store.ejectReducers(identity);

		expect(store.replaceReducer).toHaveBeenCalledTimes(2);
		expect(getEntries(store)).toEqual([]);
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

	it('does not remove data from state after ejecting if the same entry is still present', () => {
		const storeRedux = createStoreRedux(
			identity,
			{ preloadedStateObject: 'example' },
			makeEnhancer()
		);
		expect(storeRedux.getState()).toEqual({ preloadedStateObject: 'example' });

		storeRedux.injectReducers({ a: reducerA });
		storeRedux.injectReducers({ a: reducerA });

		expect(storeRedux.getState()).toEqual({
			preloadedStateObject: 'example',
			a: { name: 'a' },
		});

		storeRedux.ejectReducers({ a: reducerA });

		expect(storeRedux.getState()).toEqual({
			preloadedStateObject: 'example',
			a: { name: 'a' },
		});

		storeRedux.ejectReducers({ a: reducerA });

		expect(storeRedux.getState()).toEqual({
			preloadedStateObject: 'example',
		});

		storeRedux.injectReducers({ a: reducerA }, { namespace: 'nsA' });
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
			namespaces: {
				nsA: { a: { name: 'a' } },
			},
		});

		storeRedux.ejectReducers({ a: reducerA }, { namespace: 'nsA' });

		expect(storeRedux.getState()).toEqual({
			preloadedStateObject: 'example',
		});

		storeRedux.injectReducers({ a: reducerA }, { namespace: 'nsA', feature: 'featureA' });
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
			featureA: {
				nsA: { a: { name: 'a' } },
			},
		});

		storeRedux.ejectReducers({ a: reducerA }, { namespace: 'nsA', feature: 'featureA' });

		storeRedux.injectReducers(reducerA, { namespace: 'nsA' });
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
			namespaces: {
				nsA: { name: 'a' },
			},
		});

		storeRedux.ejectReducers(reducerA, { namespace: 'nsA' });
		expect(storeRedux.getState()).toEqual({
			preloadedStateObject: 'example',
		});

		storeRedux.injectReducers(reducerA, { namespace: 'nsA', feature: 'featureA' });
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
			featureA: {
				nsA: { name: 'a' },
			},
		});

		storeRedux.ejectReducers(reducerA, { namespace: 'nsA', feature: 'featureA' });
		expect(storeRedux.getState()).toEqual({
			preloadedStateObject: 'example',
		});
	});

	it('handles initial reducers', () => {
		const options = {
			initialReducers: {
				reducerStateA: (state = { nameA: 'A' }, action) =>
					action.type === 'exampleA'
						? {
								...state,
								payload: action.payload,
						  }
						: state,
			},
		};

		const store = createStoreRedux(identity, makeEnhancer(options));

		expect(store.getState()).toEqual({
			reducerStateA: { nameA: 'A' },
		});

		store.dispatch({ type: 'exampleA', payload: 'payload' });

		expect(store.getState()).toEqual({
			reducerStateA: { nameA: 'A', payload: 'payload' },
		});
	});

	it('can process initial reducers with later injected reducers', () => {
		const reducerMockB = (state = { nameB: 'B' }, action) =>
			action.type === 'exampleB'
				? {
						...state,
						payload: action.payload,
				  }
				: state;

		const options = {
			initialReducers: {
				reducerStateA: (state = { nameA: 'A' }) => state,
			},
		};

		const store = createStoreRedux(identity, makeEnhancer(options));

		store.injectReducers({ reducerStateB: reducerMockB });
		store.dispatch({ type: 'exampleB', payload: 'payload' });

		expect(store.getState()).toEqual({
			reducerStateA: { nameA: 'A' },
			reducerStateB: { nameB: 'B', payload: 'payload' },
		});
	});
});
