import { identity, compose } from 'ramda';
import { createStore, applyMiddleware } from 'redux';

import makeEnhancer from './makeEnhancer';

describe('makeEnhancer', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('returns a Redux store with defined functions', () => {
		const enhancer = makeEnhancer();
		const store = createStore(
			identity,
			compose(
				enhancer,
				applyMiddleware(enhancer.injectedMiddleware)
			)
		);

		expect(store.injectMiddleware).toBeInstanceOf(Function);
		expect(store.ejectMiddleware).toBeInstanceOf(Function);
	});

	it('passes actions to the injected middleware', () => {
		const mock = jest.fn();

		const middleware = () => next => action => {
			mock(`${action.payload}yo`);
			next(action);
		};

		const enhancer = makeEnhancer();
		const store = createStore(
			identity,
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
		const store = createStore(
			identity,
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
		const store = createStore(
			identity,
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
		const store = createStore(
			identity,
			compose(
				enhancer,
				applyMiddleware(middlewareA, enhancer.injectedMiddleware, middlewareB)
			)
		);

		store.injectMiddleware({ foo: middlewareA });
		store.injectMiddleware({ foo: middlewareB });
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
		const store = createStore(
			identity,
			compose(
				enhancer,
				applyMiddleware(enhancer.injectedMiddleware)
			)
		);

		store.injectMiddleware({ foo: middlewareA });
		store.injectMiddleware({ foo: middlewareA });
		store.dispatch({ type: 'MESSAGE' });
		expect(mockA).toHaveBeenCalledTimes(1);
	});

	it('correctly initializes injected middleware', () => {
		const reduxAPIMockA = jest.fn();
		const nextMockA = jest.fn();
		const reduxAPIMockB = jest.fn();
		const nextMockB = jest.fn();

		const middlewareA = reduxAPI => {
			reduxAPIMockA(reduxAPI);

			return next => {
				nextMockA(next);

				return action => {
					next(action);
				};
			};
		};

		const middlewareB = reduxAPI => {
			reduxAPIMockB(reduxAPI);

			return next => {
				nextMockB(next);

				return action => {
					next(action);
				};
			};
		};

		const enhancer = makeEnhancer();
		const store = createStore(
			identity,
			compose(
				enhancer,
				applyMiddleware(enhancer.injectedMiddleware)
			)
		);

		store.injectMiddleware({ foo: middlewareA });

		expect(reduxAPIMockA).toHaveBeenCalledTimes(1);
		expect(nextMockA).toHaveBeenCalledTimes(1);

		expect(reduxAPIMockA.mock.calls[0][0].getState).toBeInstanceOf(Function);
		expect(reduxAPIMockA.mock.calls[0][0].dispatch).toBeInstanceOf(Function);
		expect(nextMockA.mock.calls[0][0]).toBeInstanceOf(Function);

		store.dispatch({ type: 'MESSAGE' });

		expect(reduxAPIMockA).toHaveBeenCalledTimes(1);
		expect(nextMockA).toHaveBeenCalledTimes(1);

		store.injectMiddleware({ foo: middlewareB });

		expect(reduxAPIMockA).toHaveBeenCalledTimes(1);
		expect(nextMockA).toHaveBeenCalledTimes(2);

		expect(reduxAPIMockB).toHaveBeenCalledTimes(1);
		expect(nextMockB).toHaveBeenCalledTimes(1);
	});

	it('works without any injected middleware', () => {
		const enhancer = makeEnhancer();
		const store = createStore(
			identity,
			compose(
				enhancer,
				applyMiddleware(enhancer.injectedMiddleware)
			)
		);

		expect(() => store.dispatch({ payload: 'Yo', type: 'MESSAGE' })).not.toThrow();
	});
});
