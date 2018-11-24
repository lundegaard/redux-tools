import isEntryEjectableByVersion from './isEntryEjectableByVersion';

describe('isEntryEjectableByVersion', () => {
	it('returns true if both versions are nil', () => {
		expect(isEntryEjectableByVersion(null, { version: null })).toBe(true);
	});

	it('returns false if exactly one version is nil', () => {
		expect(isEntryEjectableByVersion(0, { version: null })).toBe(false);
		expect(isEntryEjectableByVersion(null, { version: 0 })).toBe(false);
	});

	it('returns true if the entry can be ejected', () => {
		expect(isEntryEjectableByVersion(5, { version: 5 })).toBe(true);
		expect(isEntryEjectableByVersion(5, { version: 4 })).toBe(true);
		expect(isEntryEjectableByVersion(5, { version: 3 })).toBe(true);
	});

	it('returns false if the entry cannot be ejected', () => {
		expect(isEntryEjectableByVersion(5, { version: 6 })).toBe(false);
		expect(isEntryEjectableByVersion(5, { version: 7 })).toBe(false);
	});
});
