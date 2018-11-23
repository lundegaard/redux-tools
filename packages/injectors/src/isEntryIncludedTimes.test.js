import isEntryIncluded from './isEntryIncluded';

const entries = [
	{ key: 'foo', injectable: 'bar', namespace: 'ns', version: 1 },
	{ key: 'foo', injectable: 'bar', namespace: 'ns', version: 2 },
	{ key: 'bar', injectable: 'baz', namespace: 'ns', version: 1 },
];

describe('isEntryIncluded', () => {
	it('returns true for an entry which is included exactly 2 times', () => {
		expect(
			isEntryIncluded(2, entries, { key: 'foo', injectable: 'bar', namespace: 'ns', version: 1 })
		);
	});

	it('returns false for an entry which is included more times', () => {
		expect(
			isEntryIncluded(0, entries, { key: 'bar', injectable: 'baz', namespace: 'ns', version: 1 })
		);
	});

	it('returns false for an entry which is not included at all', () => {
		expect(
			isEntryIncluded(1, entries, { key: 'LOL', injectable: 'NOPE', namespace: 'ns', version: 1 })
		);
	});
});
