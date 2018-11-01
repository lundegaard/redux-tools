import * as R from 'ramda';
import enhancer from './enhancer';

const createStore = jest.fn(() => ({}));

describe('enhancer', () => {
	beforeEach(() => jest.clearAllMocks());

	it('returns a Redux store with defined functions', () => {
		const store = enhancer()(createStore)();
		expect(store.injectReducers).toBeInstanceOf(Function);
		expect(store.removeReducers).toBeInstanceOf(Function);
	});

	it('populates injectedReducers upon injecting a new one and calls appropriate store methods', () => {
		const store = enhancer()(createStore)();
		store.replaceReducer = jest.fn();
		store.dispatch = jest.fn();
		const reducer = R.o(R.defaultTo(null), R.identity);
		store.injectReducers({ foo: reducer });
		expect(store.injectedReducers.foo).toEqual(reducer);
		expect(store.replaceReducer).toHaveBeenCalled();
		expect(store.dispatch).toHaveBeenCalled();
	});

	it('populates injectedReducers upon injecting a new one (namespaced)', () => {
		const store = enhancer()(createStore)();
		store.replaceReducer = jest.fn();
		store.dispatch = jest.fn();

		const reducer = R.o(R.defaultTo(null), R.identity);
		store.injectReducers({ foo: reducer }, 'ns');
		expect(store.injectedReducers.namespaces.ns.foo).toEqual(reducer);
	});

	it('filters injectedReducers upon removal and calls appropriate store methods', () => {
		const store = enhancer()(createStore)();
		store.replaceReducer = jest.fn();
		store.dispatch = jest.fn();
		store.injectedReducers = { foo: R.o(R.defaultTo(null), R.identity) };
		store.removeReducers(['foo']);
		expect(store.injectedReducers.foo).toBeUndefined();
		expect(store.replaceReducer).toHaveBeenCalled();
		expect(store.dispatch).toHaveBeenCalled();
	});

	it('filters injectedReducers upon removal (namespaced)', () => {
		const store = enhancer()(createStore)();
		store.replaceReducer = jest.fn();
		store.dispatch = jest.fn();
		store.injectedReducers = { namespaces: { ns: { foo: R.o(R.defaultTo(null), R.identity) } } };
		store.removeReducers(['foo'], 'ns');
		expect(store.injectedReducers.namespaces.ns).toEqual({});
	});
});
