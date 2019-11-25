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
	const reducerB = (state = { name: 'b' }) => state;
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

	it('removes data from state after reducer ejecting', () => {
		const store = createStoreRedux(identity, makeEnhancer());

		store.injectReducers({ a: reducerA }, { namespace: 'nsA' });
		expect(store.getState()).toEqual({
			namespaces: {
				nsA: { a: { name: 'a' } },
			},
		});

		store.ejectReducers({ a: reducerA }, { namespace: 'nsA' });
		expect(store.getState()).toEqual({});
	});

	it('does not touch state of other reducers after reducer ejecting', () => {
		const store = createStoreRedux(identity, makeEnhancer());

		store.injectReducers({ a: reducerA }, { namespace: 'nsA' });
		store.injectReducers({ b: reducerB }, { namespace: 'nsB' });
		expect(store.getState()).toEqual({
			namespaces: {
				nsA: { a: { name: 'a' } },
				nsB: { b: { name: 'b' } },
			},
		});
		store.ejectReducers({ a: reducerA }, { namespace: 'nsA' });
		expect(store.getState()).toEqual({
			namespaces: {
				nsB: { b: { name: 'b' } },
			},
		});
	});

	it('throws when injecting a function without a namespace', () => {
		expect(() => store.injectReducers(identity)).toThrow();
	});
});
