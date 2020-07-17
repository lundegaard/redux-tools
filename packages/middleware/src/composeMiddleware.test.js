import composeMiddleware from './composeMiddleware';

describe('composeMiddleware', () => {
	const logger = jest.fn();
	const someReduxApi = { dispatch: jest.fn(), getState: jest.fn() };
	const someNext = jest.fn();
	const someAction = { type: 'FOO' };

	const middleware = reduxApi => next => action => {
		logger({ reduxApi, next, action });

		return next(action);
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('handles a single middleware', () => {
		const composedMiddleware = composeMiddleware(middleware);
		composedMiddleware(someReduxApi)(someNext)(someAction);

		expect(logger).toHaveBeenCalledTimes(1);

		expect(logger.mock.calls[0][0]).toEqual({
			reduxApi: someReduxApi,
			next: someNext,
			action: someAction,
		});
	});

	it('handles multiple middleware', () => {
		const composedMiddleware = composeMiddleware(middleware, middleware);
		composedMiddleware(someReduxApi)(someNext)(someAction);

		expect(logger).toHaveBeenCalledTimes(2);

		expect(logger.mock.calls[0][0].reduxApi).toBe(someReduxApi);
		expect(logger.mock.calls[0][0].next).not.toBe(someNext);
		expect(logger.mock.calls[0][0].next).toBeInstanceOf(Function);
		expect(logger.mock.calls[0][0].action).toBe(someAction);

		expect(logger.mock.calls[1][0]).toEqual({
			reduxApi: someReduxApi,
			next: someNext,
			action: someAction,
		});
	});
});
