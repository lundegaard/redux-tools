import isEntryIncludedTimes from './isEntryIncludedTimes';

const entries = [
	{ key: 'foo', value: 'bar', namespace: 'ns', version: 1 },
	{ key: 'foo', value: 'bar', namespace: 'ns', version: 2 },
	{ key: 'bar', value: 'baz', namespace: 'ns', version: 1 },
];

describe('isEntryIncludedTimes', () => {
	it('returns true for an entry which is included exactly N times', () => {
		expect(
			isEntryIncludedTimes(2, entries, {
				key: 'foo',
				value: 'bar',
				namespace: 'ns',
				version: 1,
			})
		).toBe(true);
	});

	it('returns false for an entry which is included more times', () => {
		expect(
			isEntryIncludedTimes(0, entries, {
				key: 'bar',
				value: 'baz',
				namespace: 'ns',
				version: 1,
			})
		).toBe(false);
	});

	it('returns false for an entry which is not included at all', () => {
		expect(
			isEntryIncludedTimes(1, entries, {
				key: 'LOL',
				value: 'NOPE',
				namespace: 'ns',
				version: 1,
			})
		).toBe(false);
	});
});
