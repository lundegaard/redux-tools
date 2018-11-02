import isErrorAction from './isErrorAction';

describe('isErrorAction', () => {
	it('correctly identifies an error action', () => {
		expect(isErrorAction({ error: true })).toBe(true);
		expect(isErrorAction({ error: false })).toBe(false);
	});
});
