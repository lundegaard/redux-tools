import isVersionEjectable from './isVersionEjectable';

describe('isVersionEjectable', () => {
	it('returns false if one of the arguments is undefined', () => {
		expect(isVersionEjectable(null, 0)).toBe(false);
		expect(isVersionEjectable(null, 1)).toBe(false);
		expect(isVersionEjectable(0, null)).toBe(false);
		expect(isVersionEjectable(1, null)).toBe(false);
	});

	it('returns true if the version can be ejected', () => {
		expect(isVersionEjectable(5, 5)).toBe(true);
		expect(isVersionEjectable(5, 4)).toBe(true);
		expect(isVersionEjectable(5, 3)).toBe(true);
	});

	it('returns false if the version cannot be ejected', () => {
		expect(isVersionEjectable(5, 6)).toBe(false);
		expect(isVersionEjectable(5, 7)).toBe(false);
	});
});
