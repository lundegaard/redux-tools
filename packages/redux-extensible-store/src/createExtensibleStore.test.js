import * as R from 'ramda';
import createExtensibleStore from './createExtensibleStore';

describe('createExtensibleStore', () => {
	it('returns a Redux store with defined functions', () => {
		const store = createExtensibleStore();
		expect(store.injectReducers).toBeInstanceOf(Function);
		expect(store.injectEpics).toBeInstanceOf(Function);
		expect(store.removeReducers).toBeInstanceOf(Function);
		expect(store.removeEpics).toBeInstanceOf(Function);
		expect(store.getState).toBeInstanceOf(Function);
		expect(store.dispatch).toBeInstanceOf(Function);
		expect(store.subscribe).toBeInstanceOf(Function);
	});

	it('populates asyncReducers upon injecting a new one and calls appropriate store methods', () => {
		const store = createExtensibleStore();
		store.replaceReducer = jest.fn();
		store.dispatch = jest.fn();

		const reducer = R.o(R.defaultTo(null), R.identity);
		store.injectReducers({ foo: reducer });
		expect(store.asyncReducers.foo).toEqual(reducer);
		expect(store.replaceReducer).toHaveBeenCalled();
		expect(store.dispatch).toHaveBeenCalled();
	});

	it('populates asyncReducers upon injecting a new one (namespaced)', () => {
		const store = createExtensibleStore();
		store.replaceReducer = jest.fn();
		store.dispatch = jest.fn();

		const reducer = R.o(R.defaultTo(null), R.identity);
		store.injectReducers({ foo: reducer }, 'ns');
		expect(store.asyncReducers.namespaces.ns.foo).toEqual(reducer);
	});

	it('filters asyncReducers upon removal and calls appropriate store methods', () => {
		const store = createExtensibleStore();
		store.replaceReducer = jest.fn();
		store.dispatch = jest.fn();
		store.asyncReducers = { foo: R.o(R.defaultTo(null), R.identity) };
		store.removeReducers(['foo']);
		expect(store.asyncReducers.foo).toBeUndefined();
		expect(store.replaceReducer).toHaveBeenCalled();
		expect(store.dispatch).toHaveBeenCalled();
	});

	it('filters asyncReducers upon removal (namespaced)', () => {
		const store = createExtensibleStore();
		store.replaceReducer = jest.fn();
		store.dispatch = jest.fn();
		store.asyncReducers = { namespaces: { ns: { foo: R.o(R.defaultTo(null), R.identity) } } };
		store.removeReducers(['foo'], 'ns');
		expect(store.asyncReducers.namespaces.ns).toEqual({});
	});
});
