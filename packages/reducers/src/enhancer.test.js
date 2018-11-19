import { o, defaultTo, identity } from 'ramda';
import enhancer from './enhancer';

const createStore = jest.fn(() => ({}));
const reducer = o(defaultTo(null), identity);

describe('enhancer', () => {
	beforeEach(() => jest.clearAllMocks());

	it('returns a Redux store with defined functions', () => {
		const store = enhancer()(createStore)();
		expect(store.injectReducers).toBeInstanceOf(Function);
		expect(store.ejectReducers).toBeInstanceOf(Function);
	});

	it('populates injectedReducers upon injecting a new one and calls appropriate store methods', () => {
		const store = enhancer()(createStore)();
		store.replaceReducer = jest.fn();
		store.dispatch = jest.fn();
		store.injectReducers({ foo: reducer });
		expect(store.injectedReducers.foo).toBeInstanceOf(Function);
		expect(store.replaceReducer).toHaveBeenCalled();
		expect(store.dispatch).toHaveBeenCalled();
	});

	it('populates injectedReducers upon injecting a new one (namespaced)', () => {
		const store = enhancer()(createStore)();
		store.replaceReducer = jest.fn();
		store.dispatch = jest.fn();
		store.injectReducers({ foo: reducer }, 'ns');
		expect(store.injectedReducers.namespaces.ns.foo).toBeInstanceOf(Function);
	});

	it('filters injectedReducers upon ejection and calls appropriate store methods', () => {
		const store = enhancer()(createStore)();
		store.replaceReducer = jest.fn();
		store.dispatch = jest.fn();
		store.injectedReducers = { foo: reducer };
		store.ejectReducers({ foo: identity });
		expect(store.injectedReducers.foo).toBeUndefined();
		expect(store.replaceReducer).toHaveBeenCalled();
		expect(store.dispatch).toHaveBeenCalled();
	});

	it('filters injectedReducers upon ejection (namespaced)', () => {
		const store = enhancer()(createStore)();
		store.replaceReducer = jest.fn();
		store.dispatch = jest.fn();
		store.injectedReducers = { namespaces: { ns: { foo: reducer } } };
		store.ejectReducers({ foo: identity }, 'ns');
		expect(store.injectedReducers.namespaces.ns).toEqual({});
	});
});
