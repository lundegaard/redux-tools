import createEntries from './createEntries';

describe('createEntries', () => {
	it('correctly creates an array of entries', () => {
		expect(
			createEntries(
				{
					foo: 'bar',
					bar: 'baz',
				},
				{
					namespace: 'ns',
					version: 1,
					feature: 'grid',
				}
			)
		).toEqual([
			{ key: 'foo', value: 'bar', namespace: 'ns', version: 1, feature: 'grid' },
			{ key: 'bar', value: 'baz', namespace: 'ns', version: 1, feature: 'grid' },
		]);
	});
});
