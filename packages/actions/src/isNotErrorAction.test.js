import isNotErrorAction from './isNotErrorAction';

describe('isNotErrorAction', () => {
	it('correctly identifies an error action', () => {
		expect(isNotErrorAction({ error: true })).toBe(false);
		expect(isNotErrorAction({ error: false })).toBe(true);
	});
});
