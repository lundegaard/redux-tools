import withEpics from './withEpics';

describe('withEpics', () => {
	it('is a decorator', () => {
		expect(withEpics(() => {})).toBeInstanceOf(Function);
	});
});
