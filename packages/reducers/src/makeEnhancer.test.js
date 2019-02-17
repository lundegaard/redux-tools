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
		store.injectReducers({ foo: identity }, { namespace: 'ns', version: 0 });

		expect(store.replaceReducer).toHaveBeenCalledTimes(1);
		expect(store._reducerEntries).toEqual([
			{ key: 'foo', value: identity, namespace: 'ns', version: 0, feature: 'namespaces' },
		]);

		store.injectReducers({ foo: identity }, { namespace: 'ns', version: 1 });

		expect(store.replaceReducer).toHaveBeenCalledTimes(2);
		expect(store._reducerEntries).toEqual([
			{ key: 'foo', value: identity, namespace: 'ns', version: 0, feature: 'namespaces' },
			{ key: 'foo', value: identity, namespace: 'ns', version: 1, feature: 'namespaces' },
		]);
	});

	it('dispatches an action when store.injectReducers is called', () => {
		store.injectReducers({ foo: identity }, { namespace: 'ns', version: 0 });
		expect(store.dispatch).toHaveBeenCalled();
	});

	it('handles successive calls to store.injectReducers and store.ejectReducers', () => {
		store.injectReducers({ foo: identity }, { namespace: 'ns', version: 0 });

		expect(store.replaceReducer).toHaveBeenCalledTimes(1);
		expect(store._reducerEntries).toEqual([
			{ key: 'foo', value: identity, namespace: 'ns', version: 0, feature: 'namespaces' },
		]);

		store.injectReducers({ bar: identity }, { namespace: 'ns', version: 0 });
		store.ejectReducers({ foo: identity }, { namespace: 'ns', version: 0 });

		expect(store.replaceReducer).toHaveBeenCalledTimes(3);
		expect(store._reducerEntries).toEqual([
			{ key: 'bar', value: identity, namespace: 'ns', version: 0, feature: 'namespaces' },
		]);
	});

	it('dispatches an action when store.ejectReducers is called', () => {
		store.ejectReducers({ foo: identity }, { namespace: 'ns', version: 0 });
		expect(store.dispatch).toHaveBeenCalled();
	});
});
