import isEntryIncludedTimes from './isEntryIncludedTimes';

const entries = [
	{ key: 'foo', injectable: 'bar', namespace: 'ns', version: 1 },
	{ key: 'foo', injectable: 'bar', namespace: 'ns', version: 2 },
	{ key: 'bar', injectable: 'baz', namespace: 'ns', version: 1 },
];

describe('isEntryIncludedTimes', () => {
	it('returns true for an entry which is included exactly N times', () => {
		expect(
			isEntryIncludedTimes(2, entries, {
				key: 'foo',
				injectable: 'bar',
				namespace: 'ns',
				version: 1,
			})
		).toBe(true);
	});

	it('returns false for an entry which is included more times', () => {
		expect(
			isEntryIncludedTimes(0, entries, {
				key: 'bar',
				injectable: 'baz',
				namespace: 'ns',
				version: 1,
			})
		).toBe(false);
	});

	it('returns false for an entry which is not included at all', () => {
		expect(
			isEntryIncludedTimes(1, entries, {
				key: 'LOL',
				injectable: 'NOPE',
				namespace: 'ns',
				version: 1,
			})
		).toBe(false);
	});
});
