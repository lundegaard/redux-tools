import includesTimes from './includesTimes';

const entries = [
	{ path: ['foo'], value: 'bar', namespace: 'ns' },
	{ path: ['foo'], value: 'bar', namespace: 'ns' },
	{ path: ['bar'], value: 'baz', namespace: 'ns' },
];

describe('includesTimes', () => {
	it('returns true for an entry which is included exactly N times', () => {
		expect(
			includesTimes(
				2,
				{
					path: ['foo'],
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
					path: ['bar'],
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
					path: ['LOL'],
					value: 'NOPE',
					namespace: 'ns',
				},
				entries
			)
		).toBe(false);
	});
});
