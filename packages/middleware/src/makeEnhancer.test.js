import { identity, compose, always, prop, propEq } from 'ramda';
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
			if (action.type === 'MESSAGE') {
				mock('A');
			}

			next(action);
		};

		const middlewareB = () => next => action => {
			if (action.type === 'MESSAGE') {
				mock('B');
			}

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

		store.injectMiddleware({ foo: middlewareA }, { namespace: 'ns' });
		store.dispatch({ payload: 'Yo', type: 'MESSAGE' });
		expect(mock).toHaveBeenCalledWith('A');

		jest.clearAllMocks();
		store.ejectMiddleware({ foo: middlewareA }, { namespace: 'ns' });
		expect(mock).not.toHaveBeenCalled();

		store.injectMiddleware({ foo: middlewareA }, { namespace: 'ns' });
		store.injectMiddleware({ foo: middlewareB }, { namespace: 'ns' });

		store.dispatch({ payload: 'Yo', type: 'MESSAGE' });

		expect(mock.mock.calls[0][0]).toEqual('A');
		expect(mock.mock.calls[1][0]).toEqual('B');
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

	it('calls the middleware in the order of injection', () => {
		const callOrder = [];

		const middlewareA = () => next => action => {
			if (action.type === 'MESSAGE') {
				callOrder.push('a');
			}

			next(action);
		};

		const middlewareB = () => next => action => {
			if (action.type === 'MESSAGE') {
				callOrder.push('b');
			}

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

		store.injectMiddleware({ foo: middlewareA });
		store.injectMiddleware({ foo: middlewareB });
		store.dispatch({ type: 'MESSAGE' });
		expect(callOrder).toEqual(['a', 'b']);
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

	it('has working getState and getNamespacedState', () => {
		const stateMock = jest.fn();
		const namespacedStateMock = jest.fn();
		const differentFeatureMock = jest.fn();

		const middleware = ({ getState, getNamespacedState }) => () => () => {
			stateMock(getState());
			namespacedStateMock(getNamespacedState());
			differentFeatureMock(getNamespacedState('random'));
		};

		const enhancer = makeEnhancer();

		const state = {
			yolo: {
				foo: { bar: 'baz' },
			},
			random: {
				foo: { bar: 'baz' },
			},
		};

		const store = createStore(
			always(state),
			compose(
				enhancer,
				applyMiddleware(enhancer.injectedMiddleware)
			)
		);

		store.injectMiddleware({ foo: middleware }, { namespace: 'foo', feature: 'yolo' });
		store.dispatch({ type: 'MESSAGE' });
		expect(stateMock).toHaveBeenCalledWith(state);
		expect(namespacedStateMock).toHaveBeenCalledWith(state.yolo.foo);
		expect(differentFeatureMock).toHaveBeenCalledWith(state.random.foo);
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

	it('does not modify actions if the middleware is namespaced', () => {
		const mock = jest.fn();

		const middlewareA = () => next => action => {
			next(action);
		};

		const middlewareB = () => () => action => {
			mock(action);
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
		const action = { type: 'MESSAGE' };
		store.dispatch(action);
		expect(mock).toHaveBeenCalledWith(action);
	});

	it('defaults namespace of dispatched actions from namespaced middleware', () => {
		const mock = jest.fn();

		const middlewareA = ({ dispatch }) => next => action => {
			next(action);

			if (action.type === 'MESSAGE') {
				dispatch({ type: 'MESSAGE_REACTION' });
			}
		};

		const middlewareB = () => next => action => {
			next(action);

			if (action.type === 'MESSAGE_REACTION') {
				mock(action);
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
		store.injectMiddleware({ foo: middlewareB });
		const action = { type: 'MESSAGE' };
		store.dispatch(action);
		expect(mock.mock.calls[0][0].meta.namespace).toBe('ns');
	});

	it('does not modify action object without middleware', () => {
		const enhancer = makeEnhancer();
		const store = createStore(
			identity,
			compose(
				enhancer,
				applyMiddleware(enhancer.injectedMiddleware)
			)
		);

		const action = { type: 'MESSAGE' };
		const returnedAction = store.dispatch(action);

		expect(action).toBe(returnedAction);
	});

	it('does not modify action object with injected middleware', () => {
		const middleware = () => next => action => next(action);

		const enhancer = makeEnhancer();
		const store = createStore(
			identity,
			compose(
				enhancer,
				applyMiddleware(enhancer.injectedMiddleware)
			)
		);

		store.injectMiddleware({ foo: middleware }, { namespace: 'ns' });
		const action = { type: 'MESSAGE' };
		const returnedAction = store.dispatch(action);

		expect(action).toBe(returnedAction);
	});

	it('modifies action object with injected middleware', () => {
		const middleware = () => next => action => next({ ...action, payload: 'Foo' });

		const enhancer = makeEnhancer();
		const store = createStore(
			identity,
			compose(
				enhancer,
				applyMiddleware(enhancer.injectedMiddleware)
			)
		);

		store.injectMiddleware({ foo: middleware }, { namespace: 'ns' });
		const action = { type: 'MESSAGE' };
		const returnedAction = store.dispatch(action);

		expect(action).not.toBe(returnedAction);
	});

	it('returns value of outermost middleware injected', () => {
		const propPayload = prop('payload');
		const isMessageType = propEq('type', 'MESSAGE');

		const middlewareA = () => next => action => {
			if (isMessageType(action)) {
				expect(propPayload(action)).toBe('Foo');
			}

			const result = next(action);

			if (isMessageType(action)) {
				expect(propPayload(result)).toBe('Bar');
			}
			return result;
		};

		const middlewareB = () => next => action => {
			if (isMessageType(action)) {
				expect(propPayload(action)).toBe('Foo');
			}

			const result = next({ ...action, payload: 'Bar' });

			if (isMessageType(action)) {
				expect(propPayload(result)).toBe('Bar');
			}
			return result;
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
		store.injectMiddleware({ baz: middlewareB }, { namespace: 'ns' });

		const action = { type: 'MESSAGE', payload: 'Foo' };
		const returnedAction = store.dispatch(action);

		expect(action).not.toBe(returnedAction);
		expect(propPayload(returnedAction)).toBe('Bar');
	});
});
