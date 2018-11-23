import areEntriesEqual from './areEntriesEqual';

const entryA0 = { injectable: null, key: 'A', version: 0 };
const entryA1 = { injectable: null, key: 'A', version: 1 };
const entryB0 = { injectable: null, key: 'B', version: 0 };
const entryB1 = { injectable: null, key: 'B', version: 1 };

describe('areEntriesEqual', () => {
	it('returns true for identical entries', () => {
		expect(areEntriesEqual(entryA0, entryA0)).toBe(true);
	});

	it('returns true for entries with different version', () => {
		expect(areEntriesEqual(entryA0, entryA1)).toBe(true);
	});

	it('returns false for different entries with same version', () => {
		expect(areEntriesEqual(entryA0, entryB0)).toBe(false);
	});

	it('returns false for different entries with different versions', () => {
		expect(areEntriesEqual(entryA0, entryB1)).toBe(false);
	});
});
