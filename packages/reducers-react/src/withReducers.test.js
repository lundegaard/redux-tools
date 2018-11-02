import withReducers from './withReducers';

describe('withReducers', () => {
	it('is a decorator', () => {
		expect(withReducers(() => {})).toBeInstanceOf(Function);
	});
});
