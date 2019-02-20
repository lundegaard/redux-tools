import { identity } from 'nanoutils';

import enhancer from './enhancer';

const createStore = jest.fn(() => ({
	dispatch: jest.fn(),
	replaceReducer: jest.fn(),
}));

describe('enhancer', () => {
	let store;

	beforeEach(() => {
		jest.clearAllMocks();
		store = enhancer()(createStore)();
	});

	it('returns a Redux store with defined functions', () => {
		expect(store.injectReducers).toBeInstanceOf(Function);
		expect(store.ejectReducers).toBeInstanceOf(Function);
	});

	// TODO: fix it
	it.skip('handles multiple calls to store.injectReducers', () => {
		store.injectReducers({ foo: identity }, 'ns', 0);

		expect(store.replaceReducer).toHaveBeenCalledTimes(1);
		expect(store._reducerEntries).toEqual([
			{ key: 'foo', value: identity, namespace: 'ns', version: 0 },
		]);

		store.injectReducers({ foo: identity }, 'ns', 1);

		expect(store.replaceReducer).toHaveBeenCalledTimes(2);
		expect(store._reducerEntries).toEqual([
			{ key: 'foo', value: identity, namespace: 'ns', version: 0 },
			{ key: 'foo', value: identity, namespace: 'ns', version: 1 },
		]);
	});

	// TODO: fix it
	it.skip('dispatches an action when store.injectReducers is called', () => {
		store.injectReducers({ foo: identity }, 'ns', 0);
		expect(store.dispatch).toHaveBeenCalled();
	});

	// TODO: fix it
	it.skip('handles successive calls to store.injectReducers and store.ejectReducers', () => {
		store.injectReducers({ foo: identity }, 'ns', 0);

		expect(store.replaceReducer).toHaveBeenCalledTimes(1);
		expect(store._reducerEntries).toEqual([
			{ key: 'foo', value: identity, namespace: 'ns', version: 0 },
		]);

		store.injectReducers({ bar: identity }, 'ns', 0);
		store.ejectReducers({ foo: identity }, 'ns', 0);

		expect(store.replaceReducer).toHaveBeenCalledTimes(3);
		expect(store._reducerEntries).toEqual([
			{ key: 'bar', value: identity, namespace: 'ns', version: 0 },
		]);
	});

	it('dispatches an action when store.ejectReducers is called', () => {
		store.ejectReducers({ foo: identity }, 'ns', 0);
		expect(store.dispatch).toHaveBeenCalled();
	});
});
