import { identity, compose } from 'ramda';
import { createStore as actualCreateStore, applyMiddleware } from 'redux';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

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
		store.injectMiddleware({ foo: identity }, { namespace: 'ns' });

		expect(store.entries.middleware).toEqual([
			{ key: 'foo', value: identity, namespace: 'ns', feature: DEFAULT_FEATURE },
		]);

		store.injectMiddleware({ foo: identity }, { namespace: 'ns' });

		expect(store.entries.middleware).toEqual([
			{ key: 'foo', value: identity, namespace: 'ns', feature: DEFAULT_FEATURE },
			{ key: 'foo', value: identity, namespace: 'ns', feature: DEFAULT_FEATURE },
		]);
	});

	it('dispatches an action when store.injectMiddleware is called', () => {
		store.injectMiddleware({ foo: identity }, { namespace: 'ns' });
		expect(store.dispatch).toHaveBeenCalled();
	});

	it('handles successive calls to store.injectReducers and store.ejectReducers', () => {
		store.injectMiddleware({ foo: identity }, { namespace: 'ns' });

		expect(store.entries.middleware).toEqual([
			{ key: 'foo', value: identity, namespace: 'ns', feature: DEFAULT_FEATURE },
		]);

		store.injectMiddleware({ bar: identity }, { namespace: 'ns' });
		store.ejectMiddleware({ foo: identity }, { namespace: 'ns' });

		expect(store.entries.middleware).toEqual([
			{ key: 'bar', value: identity, namespace: 'ns', feature: DEFAULT_FEATURE },
		]);
	});

	it('dispatches an action when store.ejectMiddleware is called', () => {
		store.ejectMiddleware({ foo: identity }, { namespace: 'ns' });
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

		store.injectMiddleware({ foo: middleware }, { namespace: 'ns' });
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

		store.injectMiddleware({ foo: middlewareA }, { namespace: 'ns' });
		store.dispatch({ payload: 'Yo', type: 'MESSAGE' });
		expect(mock).toHaveBeenCalledWith('A');

		jest.clearAllMocks();
		store.ejectMiddleware({ foo: middlewareA }, { namespace: 'ns' });
		expect(mock).not.toHaveBeenCalled();

		store.injectMiddleware({ foo: middlewareA }, { namespace: 'ns' });
		store.injectMiddleware({ foo: middlewareB }, { namespace: 'ns' });

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

		store.injectMiddleware({ foo: middlewareA }, { namespace: 'A' });
		store.injectMiddleware({ foo: middlewareB }, { namespace: 'B' });
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

		store.injectMiddleware({ foo: middlewareA }, { namespace: null });
		store.injectMiddleware({ foo: middlewareB }, { namespace: null });
		store.dispatch({ type: 'MESSAGE' });
		expect(mockA).toHaveBeenCalledTimes(2);
		expect(mockB).toHaveBeenCalledTimes(2);
	});

	it('only allows a middleware to be injected once (with same key and value)', () => {
		const mockA = jest.fn();

		const middlewareA = () => next => action => {
			next(action);

			if (action.type === 'MESSAGE') {
				mockA(action.payload);
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

		store.injectMiddleware({ foo: middlewareA }, { namespace: null });
		store.injectMiddleware({ foo: middlewareA }, { namespace: null });
		store.dispatch({ type: 'MESSAGE' });
		expect(mockA).toHaveBeenCalledTimes(1);
	});
});
