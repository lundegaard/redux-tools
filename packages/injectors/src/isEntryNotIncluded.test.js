import isEntryNotIncluded from './isEntryNotIncluded';

const entries = [
	{ key: 'foo', value: 'bar', namespace: 'ns', version: 1 },
	{ key: 'bar', value: 'baz', namespace: 'ns', version: 1 },
];

describe('isEntryNotIncluded', () => {
	// TODO: fix it
	it.skip('returns false for an entry which is included', () => {
		expect(
			isEntryNotIncluded(entries, { key: 'foo', value: 'bar', namespace: 'ns', version: 1 })
		).toBe(false);
	});

	// TODO: fix it
	it.skip('returns true for an entry which is not included', () => {
		expect(
			isEntryNotIncluded(entries, { key: 'LOL', value: 'NOPE', namespace: 'ns', version: 1 })
		).toBe(true);
	});
});
