import { identity } from 'ramda';
import { FUNCTION_KEY } from '@redux-tools/injectors';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';
import { createStore as createStoreRedux } from 'redux';

import makeEnhancer, { storeInterface } from './makeEnhancer';

const createStore = () => ({
	replaceReducer: jest.fn(),
	state: {},
});

const { getEntries } = storeInterface;

describe('makeEnhancer', () => {
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
		const reducerA = (state = { name: 'a' }) => state;

		store.injectReducers({ a: reducerA }, { namespace: 'nsA' });
		expect(store.getState()).toEqual({
			namespaces: {
				nsA: { a: { name: 'a' } },
			},
		});

		store.ejectReducers(identity, { namespace: 'nsB' });
		expect(store.getState()).toEqual({});
	});
});
