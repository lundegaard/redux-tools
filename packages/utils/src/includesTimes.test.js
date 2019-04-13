import includesTimes from './includesTimes';

const entries = [
	{ key: 'foo', value: 'bar', namespace: 'ns' },
	{ key: 'foo', value: 'bar', namespace: 'ns' },
	{ key: 'bar', value: 'baz', namespace: 'ns' },
];

describe('includesTimes', () => {
	it('returns true for an entry which is included exactly N times', () => {
		expect(
			includesTimes(
				2,
				{
					key: 'foo',
					value: 'bar',
					namespace: 'ns',
				},
				entries
			)
		).toBe(true);
	});

	it('returns false for an entry which is included more times', () => {
		expect(
			includesTimes(
				0,
				{
					key: 'bar',
					value: 'baz',
					namespace: 'ns',
				},
				entries
			)
		).toBe(false);
	});

	it('returns false for an entry which is not included at all', () => {
		expect(
			includesTimes(
				1,
				{
					key: 'LOL',
					value: 'NOPE',
					namespace: 'ns',
				},
				entries
			)
		).toBe(false);
	});
});
