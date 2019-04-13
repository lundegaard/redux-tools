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
					feature: 'grid',
				}
			)
		).toEqual([
			{ key: 'foo', value: 'bar', namespace: 'ns', feature: 'grid' },
			{ key: 'bar', value: 'baz', namespace: 'ns', feature: 'grid' },
		]);
	});
});
