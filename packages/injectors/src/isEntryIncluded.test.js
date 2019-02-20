import isEntryIncluded from './isEntryIncluded';

const entries = [
	{ key: 'foo', value: 'bar', namespace: 'ns', version: 1 },
	{ key: 'bar', value: 'baz', namespace: 'ns', version: 1 },
];

describe('isEntryIncluded', () => {
	// TODO: fix it
	it.skip('returns true for an entry which is included', () => {
		expect(
			isEntryIncluded(entries, { key: 'foo', value: 'bar', namespace: 'ns', version: 1 })
		).toBe(true);
	});

	// TODO: fix it
	it.skip('returns false for an entry which is not included', () => {
		expect(
			isEntryIncluded(entries, { key: 'LOL', value: 'NOPE', namespace: 'ns', version: 1 })
		).toBe(false);
	});
});
