import { identity } from 'ramda';

import makeEnhancer from './makeEnhancer';

const createStore = jest.fn(() => ({
	dispatch: jest.fn(),
	replaceReducer: jest.fn(),
}));

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
		expect(store.reducerEntries).toEqual([{ key: 'foo', value: identity, namespace: 'ns' }]);

		store.injectReducers({ foo: identity }, { namespace: 'ns' });

		expect(store.replaceReducer).toHaveBeenCalledTimes(2);
		expect(store.reducerEntries).toEqual([
			{ key: 'foo', value: identity, namespace: 'ns' },
			{ key: 'foo', value: identity, namespace: 'ns' },
		]);
	});

	it('dispatches an action when store.injectReducers is called', () => {
		store.injectReducers({ foo: identity }, { namespace: 'ns' });
		expect(store.dispatch).toHaveBeenCalled();
	});

	it('handles successive calls to store.injectReducers and store.ejectReducers', () => {
		store.injectReducers({ foo: identity }, { namespace: 'ns' });

		expect(store.replaceReducer).toHaveBeenCalledTimes(1);
		expect(store.reducerEntries).toEqual([{ key: 'foo', value: identity, namespace: 'ns' }]);

		store.injectReducers({ bar: identity }, { namespace: 'ns' });
		store.ejectReducers({ foo: identity }, { namespace: 'ns' });

		expect(store.replaceReducer).toHaveBeenCalledTimes(3);
		expect(store.reducerEntries).toEqual([{ key: 'bar', value: identity, namespace: 'ns' }]);
	});

	it('dispatches an action when store.ejectReducers is called', () => {
		store.ejectReducers({ foo: identity }, { namespace: 'ns' });
		expect(store.dispatch).toHaveBeenCalled();
	});
});
