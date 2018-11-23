import isEntryIncluded from './isEntryIncluded';

const entries = [
	{ key: 'foo', injectable: 'bar', namespace: 'ns', version: 1 },
	{ key: 'bar', injectable: 'baz', namespace: 'ns', version: 1 },
];

describe('isEntryIncluded', () => {
	it('returns true for an entry which is included', () => {
		expect(
			isEntryIncluded(entries, { key: 'foo', injectable: 'bar', namespace: 'ns', version: 1 })
		).toBe(true);
	});

	it('returns false for an entry which is not included', () => {
		expect(
			isEntryIncluded(entries, { key: 'LOL', injectable: 'NOPE', namespace: 'ns', version: 1 })
		).toBe(false);
	});
});
