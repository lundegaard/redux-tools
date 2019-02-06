import withMiddleware from './withMiddleware';

describe('withMiddleware', () => {
	it('is a decorator', () => {
		expect(withMiddleware(() => {})).toBeInstanceOf(Function);
	});
});
