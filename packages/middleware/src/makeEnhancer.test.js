import { identity, compose } from 'ramda';
import { createStore as actualCreateStore, applyMiddleware } from 'redux';

import makeEnhancer from './makeEnhancer';

const createStore = jest.fn(() => ({
	dispatch: jest.fn(),
}));

describe('makeEnhancer', () => {
	let store;

	beforeEach(() => {
		jest.clearAllMocks();
		store = makeEnhancer()(createStore)();
	});

	it('returns a Redux store with defined functions', () => {
		expect(store.injectMiddleware).toBeInstanceOf(Function);
		expect(store.ejectMiddleware).toBeInstanceOf(Function);
	});

	it('handles multiple calls to store.injectMiddleware', () => {
		store.injectMiddleware({ foo: identity }, { namespace: 'ns', version: 0 });

		expect(store._middlewareEntries).toEqual([
			{ key: 'foo', value: identity, namespace: 'ns', version: 0, feature: 'namespaces' },
		]);

		store.injectMiddleware({ foo: identity }, { namespace: 'ns', version: 1 });

		expect(store._middlewareEntries).toEqual([
			{ key: 'foo', value: identity, namespace: 'ns', version: 0, feature: 'namespaces' },
			{ key: 'foo', value: identity, namespace: 'ns', version: 1, feature: 'namespaces' },
		]);
	});

	it('dispatches an action when store.injectMiddleware is called', () => {
		store.injectMiddleware({ foo: identity }, { namespace: 'ns', version: 0 });
		expect(store.dispatch).toHaveBeenCalled();
	});

	it('handles successive calls to store.injectReducers and store.ejectReducers', () => {
		store.injectMiddleware({ foo: identity }, { namespace: 'ns', version: 0 });

		expect(store._middlewareEntries).toEqual([
			{ key: 'foo', value: identity, namespace: 'ns', version: 0, feature: 'namespaces' },
		]);

		store.injectMiddleware({ bar: identity }, { namespace: 'ns', version: 0 });
		store.ejectMiddleware({ foo: identity }, { namespace: 'ns', version: 0 });

		expect(store._middlewareEntries).toEqual([
			{ key: 'bar', value: identity, namespace: 'ns', version: 0, feature: 'namespaces' },
		]);
	});

	it('dispatches an action when store.ejectMiddleware is called', () => {
		store.ejectMiddleware({ foo: identity }, { namespace: 'ns', version: 0 });
		expect(store.dispatch).toHaveBeenCalled();
	});

	it('passes actions to the injected middleware', () => {
		const mock = jest.fn();

		const middleware = () => next => action => {
			mock(`${action.payload}yo`);
			next(action);
		};

		const enhancer = makeEnhancer();
		const store = actualCreateStore(
			identity,
			null,
			compose(
				enhancer,
				applyMiddleware(enhancer.injectedMiddleware)
			)
		);

		store.injectMiddleware({ foo: middleware }, { namespace: 'ns', version: 0 });
		store.dispatch({ payload: 'Yo', type: 'MESSAGE' });
		expect(mock).toHaveBeenCalledWith('Yoyo');
	});

	it('handles changes to injected middleware', () => {
		const mock = jest.fn();

		const middlewareA = () => next => action => {
			next(action);

			if (action.type === 'MESSAGE') {
				mock('A');
			}
		};

		const middlewareB = () => next => action => {
			next(action);

			if (action.type === 'MESSAGE') {
				mock('B');
			}
		};

		const enhancer = makeEnhancer();
		const store = actualCreateStore(
			identity,
			null,
			compose(
				enhancer,
				applyMiddleware(enhancer.injectedMiddleware)
			)
		);

		store.injectMiddleware({ foo: middlewareA }, { namespace: 'ns', version: 0 });
		store.dispatch({ payload: 'Yo', type: 'MESSAGE' });
		expect(mock).toHaveBeenCalledWith('A');

		jest.clearAllMocks();
		store.ejectMiddleware({ foo: middlewareA }, { namespace: 'ns', version: 0 });
		expect(mock).not.toHaveBeenCalled();

		store.injectMiddleware({ foo: middlewareA }, { namespace: 'ns', version: 0 });
		store.injectMiddleware({ foo: middlewareB }, { namespace: 'ns', version: 0 });

		store.dispatch({ payload: 'Yo', type: 'MESSAGE' });

		expect(mock.mock.calls[0][0]).toEqual('B');
		expect(mock.mock.calls[1][0]).toEqual('A');
	});

	it('correctly filters actions based on the namespace', () => {
		const mockA = jest.fn();
		const mockB = jest.fn();

		const middlewareA = () => next => action => {
			next(action);
			mockA(action.payload);
		};

		const middlewareB = () => next => action => {
			next(action);
			mockB(action.payload);
		};

		const enhancer = makeEnhancer();
		const store = actualCreateStore(
			identity,
			null,
			compose(
				enhancer,
				applyMiddleware(enhancer.injectedMiddleware)
			)
		);

		store.injectMiddleware({ foo: middlewareA }, { namespace: 'A', version: 0 });
		store.injectMiddleware({ foo: middlewareB }, { namespace: 'B', version: 0 });
		store.dispatch({ payload: 'AaA', type: 'MESSAGE', meta: { namespace: 'A' } });
		store.dispatch({ payload: 'BbB', type: 'MESSAGE', meta: { namespace: 'B' } });
		expect(mockA).toHaveBeenCalledWith('AaA');
		expect(mockA).not.toHaveBeenCalledWith('BbB');
		expect(mockB).toHaveBeenCalledWith('BbB');
		expect(mockB).not.toHaveBeenCalledWith('AaA');
	});

	it('works with multiple middleware', () => {
		const mockA = jest.fn();
		const mockB = jest.fn();

		const middlewareA = () => next => action => {
			next(action);

			if (action.type === 'MESSAGE') {
				mockA(action.payload);
			}
		};

		const middlewareB = () => next => action => {
			next(action);

			if (action.type === 'MESSAGE') {
				mockB(action.payload);
			}
		};

		const enhancer = makeEnhancer();
		const store = actualCreateStore(
			identity,
			null,
			compose(
				enhancer,
				applyMiddleware(middlewareA, enhancer.injectedMiddleware, middlewareB)
			)
		);

		store.injectMiddleware({ foo: middlewareA }, { namespace: null, version: 0 });
		store.injectMiddleware({ foo: middlewareB }, { namespace: null, version: 0 });
		store.dispatch({ type: 'MESSAGE' });
		expect(mockA).toHaveBeenCalledTimes(2);
		expect(mockB).toHaveBeenCalledTimes(2);
	});
});
